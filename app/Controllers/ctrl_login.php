<?php 
	namespace App\Controllers;
	use App\Models\Configuracion\md_usuarios;
	use App\Models\Configuracion\md_establecimientos;

	class ctrl_login extends BaseController {
		protected $usuarios;
		protected $reglasLogin;

		public function __construct() {
			$this->usuarios = new md_usuarios();
			$this->establecimientos = new md_establecimientos();

			$this->reglasLogin = [
				"usuario" => [
					"rules" => "required",
					"errors" => [
						"required" => "El campo {field} es obligatorio"
					]
				],
				"password" => [
					"rules" => "required",
					"errors" => [
						"required" => "El campo {field} es obligatorio"
					]
				]
			];

			$this->reglasActivar = [
				"clave_activar" => [
					"rules" => "required",
					"errors" => [
						"required" => "El campo {field} es obligatorio"
					]
				],
				"clave_repetir" => [
					"rules" => "required",
					"errors" => [
						"required" => "El campo {field} es obligatorio"
					]
				]
			];
		}

		public function valida() {
			if ($this->request->getMethod() == "post" && $this->validate($this->reglasLogin)) {
				$usuario = $this->request->getPost("usuario");
				$password = $this->request->getPost("password");

				$datosUsuario = $this->usuarios->where("usu_cod", $usuario)->first();
				$establecimiento = $this->establecimientos->select("nombre")->where("id", $datosUsuario["id_estab"])->first();

				if ($datosUsuario != null) {
					if (password_verify($password, $datosUsuario["clave"])) {
						define("ACTIVADO", 1);
						define("BLOQUEADO", 2);
						define("PENDIENTE", 0);

						switch ($datosUsuario["estado"]) {
							case ACTIVADO:
								define("OK", 1);

								$datosSesion = [
									"usu_cod_ses" => $datosUsuario["usu_cod"],
									"nombres_ses" => $datosUsuario["nombres"],
									"ape_pat_ses" => $datosUsuario["ape_pat"],
									"ape_mat_ses" => $datosUsuario["ape_mat"],
									"id_estab_ses" => $datosUsuario["id_estab"],
									"establecimiento_ses" => $establecimiento["nombre"],
									"rut_ses" => $datosUsuario["rut"],
									"dv_ses" => $datosUsuario["dv"]
								];

								$session = session();
								$session->set($datosSesion);

								echo OK;
								break;
							case BLOQUEADO:
								echo "Usuario BLOQUEADO";
								break;
							case PENDIENTE:
								echo "Active su clave";
								break;
						}
						
					} else {
						echo "Usuario o clave errónea";
					}
				} else {
					echo "Usuario o clave errónea";
				}
			} else {
				echo "Usuario o clave errónea";
			}
		}

		public function activar_cuenta() {
			if ($this->request->getMethod() == "post" && $this->validate($this->reglasActivar)) {
				$clave_activar = $this->request->getPost("clave_activar");
				$usu_cod = $this->request->getPost("usu_cod");
				define("OK", 1);
				define("ACTIVADO", 1);
				$estado = ACTIVADO;

				$date = date('Y-m-d');
				$time = date('H:i:s');
				$fecha_reg = $date . " " . $time;
				$clave_hash = password_hash($clave_activar, PASSWORD_DEFAULT);
				
				$data = [
					"clave" => $clave_hash,
					"usu_cod_upd" => $usu_cod,
					"fecha_upd" => $fecha_reg,
					"estado" => $estado
				];

				if ($this->usuarios->update($usu_cod, $data)) {
					echo OK;
				} else {
					echo "Error al activar la clave";
				}
			}
		}

		public function logout() {
			$sesión = session();
			$sesión->destroy();
			return redirect()->to(base_url());
		}
	}	
?>