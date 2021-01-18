<?php 
	namespace App\Controllers\Agenda;

	use App\Controllers\BaseController;
	use App\Models\Configuracion\md_usuarios;
	use App\Models\Agenda\md_agenda_especialidades;
	use App\Models\Agenda\md_agendas_profesionales;

	class ctrl_agenda_prof extends BaseController {
		protected $agenda_especialidades;
		protected $profesionales;
		protected $agendas_profesionales;
		protected $sesión;

		public function __construct() {
			$this->agenda_especialidades = new md_agenda_especialidades();
			$this->profesionales = new md_usuarios();
			$this->agendas_profesionales = new md_agendas_profesionales();
			$this->sesión = session();
		}

		public function llenar_cmb_especialidades() {
			$agenda_especialidades = $this->agenda_especialidades->select("id")->select("glosa")->where("id_estab", $this->sesión->id_estab_ses)->findAll();

			$data = array();

			foreach ($agenda_especialidades as $key) {
				$row = array(
					"id" => $key["id"],
					"glosa" => $key["glosa"]
				);

				$data[] = $row;
			}

			// $salida = array("data" => $data);
			echo json_encode($data);
		}

		public function llenar_cmb_profesional() {
			$profesionales = $this->profesionales->select("usu_cod")->select("nombres")->select("ape_pat")->select("ape_mat")->whereNotIn("profesion", [112, 114, 119, 169])->findAll();

			$data = array();

			foreach ($profesionales as $key) {
				$row = array(
					"usu_cod" => $key["usu_cod"],
					"nombres" => $key["nombres"],
					"ape_pat" => $key["ape_pat"],
					"ape_mat" => $key["ape_mat"]
				);

				$data[] = $row;
			}

			// $salida = array("data" => $data);
			echo json_encode($data);
		}

		public function datatable_agendas_profesionales() {
			$db = \Config\Database::connect();
			define("ACTIVO", 1);
			$estado = ACTIVO;
		
			$consulta = "SELECT 
							ae.glosa as especialidad,
						    concat('(',u.usu_cod,')', ' ', u.nombres, ' ', u.ape_pat, ' ', u.ape_mat) as profesional
						from 
							agendas_profesionales ap
						    inner join agenda_especialidades ae on ae.id = ap.id_especialidad
						    inner join usuarios u on u.usu_cod = ap.usu_cod_prof
						where 
							ap.estado = ?";

			$query = $db->query($consulta, [$estado]);
			$establecimientos = $query->getResultArray();

			foreach ($establecimientos as $key) {
				$row = array(
					"especialidad" => $key["especialidad"],
					"profesional" => $key["profesional"]
				);

				$data[] = $row;
			}

			$salida = array("data" => $data);
			echo json_encode($salida);
		}

		public function guardar_agenda_profesionales() {
			$date = date('Y-m-d');
			$time = date('H:i:s');
			$fecha = $date . " " . $time;
			$usu_cod = $this->sesión->usu_cod_ses;
			define("ACTIVO", 1);
			define("DESACTIVADO", 0);
			$estado = ACTIVO;

			define("OK", 1);

			$especialidad = $this->request->getPost("especialidad");
			$profesional = $this->request->getPost("profesional");

			$existe = $this->agendas_profesionales->existe_agenda_profesional($especialidad, $profesional);
			$filas = $existe[0]["filas"];

			if ($filas == 0) {
				$datos = [
					"id_especialidad" => $especialidad,
					"usu_cod_prof" => $profesional,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha,
					"estado" => $estado
				];

				$execute = $this->agendas_profesionales->insert($datos);

				if ($execute) {
					echo "Error al asignar la agenda a profesional";
					exit();	
				} else {
					echo OK;
				}
			} else {
				$estado_ = $this->agendas_profesionales->estado_agenda_profesional($especialidad, $profesional);
				$estado_ = $estado_[0]["estado"];
				if ($estado_ == DESACTIVADO) {
					$consulta = "UPDATE agendas_profesionales set estado = ?, usu_cod = ?, fecha = ? where id_especialidad = ? and usu_cod_prof = ?";

					$query = $db->query($consulta, [$estado, $usu_cod, $fecha, $especialidad, $profesional]);

					if (!$query) {
						$error = $db->error();
						print_r($error);
						exit();	
					} else {
						echo OK;
					}
				} else {
					echo "Ya existe el registro y se encuentra activado";
				}
			}
		}
	}
?>