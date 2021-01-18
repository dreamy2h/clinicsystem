<?php 
	namespace App\Controllers\Configuracion;

	use App\Controllers\BaseController;
	use App\Models\Configuracion\md_usuarios;
	use App\Models\Configuracion\md_permisos_detalle;
	use App\Models\Configuracion\md_profesiones;
	use App\Models\Configuracion\md_especialidades;
	use App\Models\Configuracion\md_permisos_usuario_estab;

	class ctrl_usuarios extends BaseController {
		protected $usuarios;
		protected $permisos_detalle;
		protected $profesiones;
		protected $especialidades;
		protected $permisos;
		protected $sesión;

		public function __construct() {
			$this->usuarios = new md_usuarios();
			$this->permisos_detalle = new md_permisos_detalle();
			$this->profesiones = new md_profesiones();
			$this->especialidades = new md_especialidades();
			$this->permisos = new md_permisos_usuario_estab();
			$this->sesión = session();
		}

		public function data_permisos($activo = 1) {
			$permisos_detalle = $this->permisos_detalle->select("id")->select("nombre")->where("estado", $activo)->findAll();

			$data = array();

			foreach ($permisos_detalle as $key) {
				$row = array(
					"id" => $key["id"],
					"nombre" => $key["nombre"]
				);

				$data[] = $row;
			}

			$salida = array("data" => $data);
			echo json_encode($salida);
		}

		public function data_establecimientos($usu_cod) {
			$db = \Config\Database::connect();
			define("ACTIVO", 1);
			$estado = ACTIVO;
		
			$consulta = "SELECT 
							e.id AS id,
							e.nombre AS nombre,
							(SELECT COUNT(*) FROM permisos_usuario_estab WHERE permisos_usuario_estab.usu_cod = ? AND permisos_usuario_estab.id_estab = e.id and estado = ?) AS permisos,
							CASE WHEN e.id = (SELECT  usuarios.id_estab FROM usuarios WHERE usuarios.usu_cod = ?) THEN '*' ELSE '...' END AS estab_base
						FROM
							establecimientos e";

			$query = $db->query($consulta, [$usu_cod, $estado, $usu_cod]);
			$establecimientos = $query->getResultArray();

			foreach ($establecimientos as $key) {
				$row = array(
					"id" => $key["id"],
					"nombre" => $key["nombre"],
					"permisos" => $key["permisos"],
					"estab_base" => $key["estab_base"]
				);

				$data[] = $row;
			}

			$salida = array("data" => $data);
			echo json_encode($salida);
		}

		public function carga_profesiones() {
			$profesiones = $this->profesiones->findAll();

			$data = array();

			foreach ($profesiones as $key) {
				$row = array(
					"id" => $key["id"],
					"glosa" => $key["glosa"]
				);

				$data[] = $row;
			}

			// $salida = array("data" => $data);
			echo json_encode($data);
		}

		public function carga_especialidades() {
			$especialidades = $this->especialidades->findAll();

			$data = array();

			foreach ($especialidades as $key) {
				$row = array(
					"id" => $key["id"],
					"glosa" => $key["glosa"]
				);

				$data[] = $row;
			}

			// $salida = array("data" => $data);
			echo json_encode($data);
		}

		public function data_carga_permisos() {
			$method = $request->getMethod(true);
			print_r($method);
		}

		public function carga_datos_usu($usu_cod) {
			$usuarios = $this->usuarios->where("usu_cod", $usu_cod)->findAll();
			echo json_encode($usuarios);
		}

		public function data_permisos_usuario($usu_cod, $id_estab) {
			$permisos = $this->permisos->permisos_usuarios($usu_cod, $id_estab);
			$data = array();

			foreach ($permisos as $key) {
				$row = array(
					"id_permiso" => $key["id_permiso"]
				);

				$data[] = $row;
			}

			echo json_encode($data);
		}

		public function desbloquear_usuario($usu_cod, $estado) {
			if ($estado == "true") { $estado = 1; } else { $estado = 2; }
			$date = date('Y-m-d');
			$time = date('H:i:s');
			$fecha_upd = $date . " " . $time;

			$data = [
			    'usu_cod'  => $usu_cod,
			    'estado' => $estado,
			    'usu_cod_upd' => $this->sesión->usu_cod_ses,
				'fecha_upd' => $fecha_upd
			];
			
			$execute = $this->usuarios->save($data);

			if ($execute) {
				echo 1;
			} else {
				if ($estado == 1) {
					echo "Error al activar usuario";
				} else {
					echo "Error al bloquear usuario";
				}
			}
		}

		public function usuario_add_upd() {
			define("OK", 1);
			$date = date('Y-m-d');
			$time = date('H:i:s');
			$fecha_reg = $date . " " . $time;
			$clave = $this->generar_clave();

			if ($this->usuario_add($fecha_reg, $clave)) {
				if ($this->permisos_add($fecha_reg)) {
					echo OK . "--" . $clave ."--" . $this->request->getPost("usuario_nuevo");
				} else {
					echo "Error al modificar permisos 173";
				}
			} else {
				if ($this->request->getPost("usuario_nuevo") == "true") {
					echo "Error al ingresar al usuario";
				} else {
					echo "Error al modificar al usuario";
				}
			}
		}

		public function usuario_add($fecha_reg, $clave) {
			$clave_hash = password_hash($clave, PASSWORD_DEFAULT);
			$rut_completo = explode("-", $this->request->getPost("usu_cod"));
			$usu_rut = $rut_completo[0];
			$usu_dig = $rut_completo[1];
			define("PENDIENTE", 0);
			$estado = PENDIENTE;

			$datos_user = $this->usuarios->existe_usuario($this->request->getPost("usu_cod"));
			$filas = $datos_user[0]["filas"];
			
			$data = [
				"rut" => $usu_rut,
				"dv" => $usu_dig,
				"nombres" => $this->request->getPost("nombres"),
				"ape_pat" => $this->request->getPost("ape_pat"),
				"ape_mat" => $this->request->getPost("ape_mat"),
				"usu_tipo" => $this->request->getPost("usu_tipo"),
				"profesion" => $this->request->getPost("profesion"),
				"especialidad" => $this->request->getPost("especialidad"),
				"id_estab" => $this->request->getPost("id_estab"),
				"usu_cod_upd" => $this->sesión->usu_cod_ses,
				"fecha_upd" => $fecha_reg,
				"eliminado" => 1,
			];
			
			if ($filas > 0) {
				return $this->usuarios->update($this->request->getPost("usu_cod"), $data);
			} else {
				$data["clave"] = $clave_hash;
				$data["estado"] = $estado;
				$data["usu_cod_reg"] = $this->sesión->usu_cod_ses;
				$data["fecha_reg"] = $fecha_reg;
				$data["usu_cod"] = $this->request->getPost("usu_cod");
				
				if ($this->usuarios->insert($data)) {
					return false;
				} else {
					return true;
				}
			}
		}

		public function permisos_add($fecha_reg) {
			$db = \Config\Database::connect();
			$establecimientos_ = json_decode($this->request->getPost("establecimientos"));
			$permisos_ = json_decode($this->request->getPost("permisos"));
			$usu_cod = $this->request->getPost("usu_cod");
			define("DESACTIVADO", 0);
			define("ACTIVADO", 1);
			$estado = ACTIVADO;

			foreach ($establecimientos_ as $key => $id_estab) {
				foreach ($permisos_ as $key => $id_permiso) {
					$tiene_permiso = $this->permisos->tiene_permiso($usu_cod, $id_estab, $id_permiso);
					$filas = $tiene_permiso[0]["filas"];

					if ($filas == 0) {
						$data = [
							"usu_cod" => $usu_cod,
							"id_estab" => $id_estab,
							"id_permiso" => $id_permiso,
							"estado" => $estado,
							"usu_cod_upd" => $this->sesión->usu_cod_ses,
							"fecha_upd" => $fecha_reg
						];

						$execute = $this->permisos->insert($data);

						if ($execute) {
							echo "Error al agregar permisos 250";
							exit();	
						} 
					} else {
						$estado_ = $this->permisos->estado_permiso($usu_cod, $id_estab, $id_permiso);
						$estado_ = $estado_[0]["estado"];
						if ($estado_ == DESACTIVADO) {
							$consulta = "UPDATE permisos_usuario_estab set estado = ?, usu_cod_upd = ?, fecha_upd = ? where usu_cod = ? and id_estab = ? and id_permiso = ?";

							$query = $db->query($consulta, [$estado, $this->sesión->usu_cod_ses, $fecha_reg, $usu_cod, $id_estab, $id_permiso]);

							if (!$query) {
								$error = $db->error();
								print_r($error);
								exit();	
							}
						}
					}
				}	
			}

			$datos = [
	    		"estado" => 0,
	    		"usu_cod_upd" => $this->sesión->usu_cod_ses,
	    		"fecha_upd" => $fecha_reg
	    	];
	    	
	    	return $this->permisos->whereNotIn('id_permiso', $permisos_)->set($datos)->update();
		}

		public function resetear_clave($usu_cod) {
			$date = date('Y-m-d');
			$time = date('H:i:s');
			$fecha_reg = $date . " " . $time;
			$clave = $this->generar_clave();
			$clave_hash = password_hash($clave, PASSWORD_DEFAULT);
			define("PENDIENTE", 0);
			$estado = PENDIENTE;
			
			$data = [
				"clave" => $clave_hash,
				"estado" => $estado,
				"usu_cod_upd" => $this->sesión->usu_cod_ses,
				"fecha_upd" => $fecha_reg
			];

			if ($this->usuarios->update($usu_cod, $data)) {
				echo $clave;
			} else {
				echo "Error al crear clave";
			}
		}

		public function generar_clave() {
			$cadena_base =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			$cadena_base .= '0123456789' ;
			$cadena_base .= '!@#%^&*()_,./<>?;:[]{}\|=+';

			$password = '';
			$limite = strlen($cadena_base) - 1;

			for ($i=0; $i < 20; $i++)
			    $password .= $cadena_base[rand(0, $limite)];

			return $password;
		}
	}
?>