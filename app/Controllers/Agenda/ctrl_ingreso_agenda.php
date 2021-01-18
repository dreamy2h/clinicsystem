<?php 
	namespace App\Controllers\Agenda;

	use App\Controllers\BaseController;
	use App\Models\Configuracion\md_usuarios;
	use App\Models\Agenda\md_agenda_especialidades;
	use App\Models\Agenda\md_agendas_profesionales;
	use App\Models\Agenda\md_agendas;
	use App\Models\Agenda\md_agenda_detalle;
	use App\Models\Agenda\md_tipos_atencion;
	use App\Models\Agenda\md_agenda_detalle_distribucion;
	use App\Models\Agenda\md_agenda_traza;

	class ctrl_ingreso_agenda extends BaseController {
		protected $agenda_especialidades;
		protected $profesionales;
		protected $agendas_profesionales;
		protected $agendas;
		protected $agenda_detalle;
		protected $tipos_atencion;
		protected $agenda_detalle_distribucion;
		protected $agenda_traza;
		protected $sesión;
		protected $db;

		public function __construct() {
			$this->agenda_especialidades = new md_agenda_especialidades();
			$this->profesionales = new md_usuarios();
			$this->agendas_profesionales = new md_agendas_profesionales();
			$this->agendas = new md_agendas();
			$this->agenda_detalle = new md_agenda_detalle();
			$this->tipos_atencion = new md_tipos_atencion();
			$this->agenda_detalle_distribucion = new md_agenda_detalle_distribucion();
			$this->agenda_traza = new md_agenda_traza();
			$this->sesión = session();
			$this->db = \Config\Database::connect();
		}

		public function validar_sesion() {
			if (!$this->sesión->has("usu_cod_ses")) {
				echo "La sesión expiró, actualice el sitio web con F5";
				exit();
	    	}
		}

		public function llenar_cmb_especialidad() {
			$this->validar_sesion();
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

		public function llenar_cmb_profesional($id_especialidad) {
			$this->validar_sesion();
			define("ACTIVO", 1);
			$estado = ACTIVO;
		
			$consulta = "SELECT 
							u.usu_cod,
						    concat(u.nombres, ' ', u.ape_pat, ' ', u.ape_mat) as profesional
						from 
							agendas_profesionales ap
						    inner join usuarios u on u.usu_cod = ap.usu_cod_prof
						where
						    ap.estado = ?";

			if ($id_especialidad != "null") {
				$consulta .= " and ap.id_especialidad = ?";
			}

			$consulta .= " order by u.nombres asc";

			$bind = [$estado];

			if ($id_especialidad != "null") {
				array_push($bind, $id_especialidad);
			}			

			$query = $this->db->query($consulta, $bind);
			$profesionales_ = $query->getResultArray();

			foreach ($profesionales_ as $key) {
				$row = array(
					"usu_cod" => $key["usu_cod"],
					"profesional" => $key["profesional"]
				);

				$data[] = $row;
			}

			// $salida = array("data" => $data);
			if (isset($data)) {
				echo json_encode($data);	
			} else {
				echo "[]";
			}
			
		}

		public function datatable_agendas() {
			$this->validar_sesion();
			define("ACTIVO", 1);
			$estado = ACTIVO;
		
			$consulta = "SELECT 
							a.id,
							a.id_especialidad,
						    ae.glosa as especialidad,
						    a.usu_cod_prof,
						    concat(u.nombres, ' ', u.ape_pat, ' ', u.ape_mat) as profesional,
						    a.usu_cod_reemplaza,
						    concat(u2.nombres, ' ', u2.ape_pat, ' ', u2.ape_mat) as prof_reemplazo,
						    e.nombre as establecimiento,
						    a.sobre_cupo,
						    date_format(fecha_inicio, '%d-%m-%Y') as fecha_ini,
						    date_format(fecha_fin, '%d-%m-%Y') as fecha_fin,
						    concat(u3.nombres, ' ', u3.ape_pat, ' ', u3.ape_mat) as usuario,
						    date_format(fecha, '%d-%m-%Y %H:%i') as fecha,
						    IFNULL(ELT(FIELD(a.estado, 0, 1, 2), 'Pendiente','Generada', 'Anulada'),'Sin registro') as estado
						FROM 
							agendas a
						    inner join agenda_especialidades ae on ae.id = a.id_especialidad
						    inner join usuarios u on u.usu_cod = a.usu_cod_prof
						    left join usuarios u2 on u2.usu_cod = a.usu_cod_reemplaza
						    inner join establecimientos e on e.id = a.id_estab
						    inner join usuarios u3 on u3.usu_cod = a.usu_cod";

			$query = $this->db->query($consulta);
			$grid_agendas = $query->getResultArray();

			foreach ($grid_agendas as $key) {
				$row = array(
					"id" => $key["id"],
					"id_especialidad" => $key["id_especialidad"],
					"especialidad" => $key["especialidad"],
					"usu_cod_prof" => $key["usu_cod_prof"],
					"profesional" => $key["profesional"],
					"usu_cod_reemplaza" => $key["usu_cod_reemplaza"],
					"prof_reemplazo" => $key["prof_reemplazo"],
					"establecimiento" => $key["establecimiento"],
					"sobre_cupo" => $key["sobre_cupo"],
					"fecha_ini" => $key["fecha_ini"],
					"fecha_fin" => $key["fecha_fin"],
					"usuario" => $key["usuario"],
					"fecha" => $key["fecha"],
					"estado" => $key["estado"]
				);

				$data[] = $row;
			}

			if (isset($data)) {
				$salida = array("data" => $data);
				echo json_encode($salida);
			} else {
				echo "{ \"data\": [] }";
			}
		}

		public function v_detalle_agenda($estado_agenda) {
			$this->validar_sesion();
			$datos["estado_agenda"] = $estado_agenda;
			echo view("agenda/detalle_agenda", $datos);
		}

		public function v_distribuir_detalle() {
			$this->validar_sesion();
			echo view("agenda/distribuir_detalle");
		}

		public function v_traza_agenda() {
			$this->validar_sesion();
			echo view("agenda/traza_agenda");
		}

		public function guardar_agenda() {
			$this->validar_sesion();
			date_default_timezone_set('America/Santiago');
			define("OK", 1);
			define("GUARDAR_AGENDA", 1);
			define("MODIFICAR_AGENDA", 2);
			define("PENDIENTE", 0);

			$date = date("Y-m-d H:i:s");
			$fecha = $date;
			$usu_cod = $this->sesión->usu_cod_ses;
			$id_estab = $this->sesión->id_estab_ses;

			$id_agenda = $this->request->getPost("id_agenda");
			$id_especialidad = $this->request->getPost("id_especialidad");
			$usu_cod_prof = $this->request->getPost("usu_cod_prof");
			$sobre_cupo = $this->request->getPost("sobre_cupo");
			$usu_cod_reemplazo = $this->request->getPost("usu_cod_reemplazo");
			$fecha_ini = $this->request->getPost("fecha_ini");
			$fecha_fin = $this->request->getPost("fecha_fin");
			$estado = PENDIENTE;

			$estado_agenda = GUARDAR_AGENDA;

			if ($this->agendas->exite_registro($this->db, $id_especialidad, $usu_cod_prof, $fecha_ini, $fecha_fin, $id_estab, $id_agenda)) {
				echo "El registro ya existe, o se topa con alguna fecha de otra agenda";
				exit();
			}

			$data = [
			    "id_especialidad" => $id_especialidad,
			    "usu_cod_prof" => $usu_cod_prof,
			    "usu_cod_reemplaza" => $usu_cod_reemplazo,
			    "id_estab" => $id_estab,
			    "sobre_cupo" => $sobre_cupo,
			    "fecha_inicio" => date_format(date_create($fecha_ini), 'Y-m-d'),
			    "fecha_fin" => date_format(date_create($fecha_fin), 'Y-m-d'),
			    "usu_cod" => $usu_cod,
			    "fecha" => $fecha,
			    "estado" => $estado
			];

			if ($id_agenda != "") {
				$data["id"] = $id_agenda;
				$estado_agenda = MODIFICAR_AGENDA;
			}

			if ($this->agendas->save($data)) {
				$data_traza = [
					"estado" => $estado_agenda,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha
				];

				if ($id_agenda != "") {
					$data_traza["id_agenda"] = $id_agenda;
				} else {
					$consulta_id = $this->agendas->select("max(id) as id_agenda")->first();
					$id_agenda = $consulta_id["id_agenda"];

					$data_traza["id_agenda"] = $id_agenda;
				}

				if ($this->agenda_traza->save($data_traza)) {
					echo OK;	
				} else {
					echo "Ocurrió un error al guardar la traza de la agenda";
				}
			} else {
				echo "Ocurrió un error al guardar la agenda";
			}
		}

		public function datatable_agenda_detalle($id_agenda) {
			$this->validar_sesion();
			$consulta = "SELECT
							id,
						    id_agenda,
							IFNULL(ELT(FIELD(dia, 1, 2, 3, 4, 5, 6, 7), 'Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),'Sin registro') as dia,
							dia as id_dia,
						    hora_inicio,
						    hora_fin,
						    min_paciente,
						    cupos
						from 
							agenda_detalle
						where
							id_agenda = ?";

			$query = $this->db->query($consulta, [$id_agenda]);
			$grid_agendas = $query->getResultArray();

			foreach ($grid_agendas as $key) {
				$row = array(
					"id" => $key["id"],
					"id_agenda" => $key["id_agenda"],
					"id_dia" => $key["id_dia"],
					"dia" => $key["dia"],
					"hora_inicio" => $key["hora_inicio"],
					"hora_fin" => $key["hora_fin"],
					"min_paciente" => $key["min_paciente"],
					"cupos" => $key["cupos"]
				);

				$data[] = $row;
			}

			if (isset($data)) {
				$salida = array("data" => $data);
				echo json_encode($salida);
			} else {
				echo "{ \"data\": [] }";
			}
		}

		public function guardar_agenda_detalle() {
			$this->validar_sesion();
			date_default_timezone_set('America/Santiago');
			define("OK", 1);
			define("ACTIVO", 1);
			define("GUARDAR_DETALLE", 5);
			define("MODIFICAR_DETALLE", 6);

			$date = date("Y-m-d H:i:s");
			$fecha = $date;
			$usu_cod = $this->sesión->usu_cod_ses;
			$id_estab = $this->sesión->id_estab_ses;
			$estado = ACTIVO;
			$estado_traza = GUARDAR_DETALLE;

			$id_agenda = $this->request->getPost("id_agenda");
			$dia = $this->request->getPost("dia");
			$hora_inicio = $this->request->getPost("hora_inicio");
			$hora_fin = $this->request->getPost("hora_fin");
			$min_pac = $this->request->getPost("min_pac");
			$cupos = $this->request->getPost("cupos");
			$id_det = $this->request->getPost("id_det");

			if ($this->agenda_detalle->exite_registro($this->db, $id_agenda, $dia, $hora_inicio, $hora_fin, $id_det)) {
				echo "El registro ya existe, o se topa con algún horario";
				exit();
			}

			$data = [
			    "id_agenda" => $id_agenda,
			    "dia" => $dia,
			    "hora_inicio" => $hora_inicio,
			    "hora_fin" => $hora_fin,
			    "min_paciente" => $min_pac,
			    "cupos" => $cupos,
			    "estado" => $estado,
			    "usu_cod" => $usu_cod,
			    "fecha" => $fecha
			];

			if ($id_det != "") {
				$data["id"] = $id_det;
				$estado_traza = MODIFICAR_DETALLE;
			}

			if ($this->agenda_detalle->save($data)) {
			 	$data_traza = [
					"id_agenda" => $id_agenda,
					"estado" => $estado_traza,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha
				];

				if ($this->agenda_traza->save($data_traza)) {
			 		echo OK;
			 	} else {
			 		echo "Ocurrió un error al guardar la traza de la agenda";
			 	}
			} else {
				echo "Ocurrió un error al guardar detalle de la agenda";
			}
		}

		public function llenar_cmb_tipo_atencion() {
			$this->validar_sesion();
			define("ACTIVO", 1);
			$estado = ACTIVO;

			$tipos_atencion = $this->tipos_atencion->select("id")->select("glosa")->where("estado", $estado)->findAll();

			$data = array();

			foreach ($tipos_atencion as $key) {
				$row = array(
					"id" => $key["id"],
					"glosa" => $key["glosa"]
				);

				$data[] = $row;
			}

			// $salida = array("data" => $data);
			echo json_encode($data);
		}

		public function datatable_distribucion($id_det) {
			$this->validar_sesion();
			$consulta = "SELECT 
							dist.id,
							dist.id_tipo_atencion as id_tipo_ate,
						    ata.glosa as tipo_atencion,
						    dist.cupos
						from 
							agenda_detalle_distribucion dist
						    inner join agenda_tipos_atencion ata on ata.id = dist.id_tipo_atencion
						where
							dist.id_detalle = ? and
							dist.estado = ?";

			define("ACTIVO", 1);
			$estado = ACTIVO;

			$query = $this->db->query($consulta, [$id_det, $estado]);
			$grid_distribucion = $query->getResultArray();

			foreach ($grid_distribucion as $key) {
				$row = array(
					"id" => $key["id"],
					"id_tipo_ate" => $key["id_tipo_ate"],
					"tipo_atencion" => $key["tipo_atencion"],
					"cupos" => $key["cupos"]
				);

				$data[] = $row;
			}

			if (isset($data)) {
				$salida = array("data" => $data);
				echo json_encode($salida);
			} else {
				echo "{ \"data\": [] }";
			}
		}

		public function guardar_detalle_distribucion() {
			$this->validar_sesion();
			date_default_timezone_set('America/Santiago');
			define("OK", 1);
			define("ACTIVO", 1);
			define("GUARDAR_DISTRIBUCION", 8);
			define("MODIFICAR_DISTRIBUCION", 9);

			$date = date("Y-m-d H:i:s");
			$fecha = $date;
			$usu_cod = $this->sesión->usu_cod_ses;
			$estado = ACTIVO;
			$estado_traza = GUARDAR_DISTRIBUCION;

			$id_dist = $this->request->getPost("id_dist");
			$id_det = $this->request->getPost("id_det");
			$tipo_atencion = $this->request->getPost("tipo_atencion");
			$cupos = $this->request->getPost("cupos");
			$id_agenda = $this->request->getPost("id_agenda");

			$existe_tipo_ate = $this->agenda_detalle_distribucion->select("count(*) as filas")
							->where("id_detalle", $id_det)
							->where("id_tipo_atencion", $tipo_atencion)
							->where("estado", 1)
							->first();
			
			$filas = $existe_tipo_ate["filas"];

			if ($filas > 0 and $id_dist == "") {
				echo "Tipo de atención ya existe, modifique el registro, en lugar de insertar uno nuevo";
				exit();
			}
			
			$data = [
			    "id_detalle" => $id_det,
			    "id_tipo_atencion" => $tipo_atencion,
			    "cupos" => $cupos,
			    "estado" => $estado,
			    "usu_cod" => $usu_cod,
			    "fecha" => $fecha
			];

			if ($id_dist != "") {
				$data["id"] = $id_dist;
				$estado_traza = MODIFICAR_DISTRIBUCION;
			}

			if ($this->agenda_detalle_distribucion->save($data)) {
			 	$data_traza = [
					"id_agenda" => $id_agenda,
					"estado" => $estado_traza,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha
				];

				if ($this->agenda_traza->save($data_traza)) {
			 		echo OK;
			 	} else {
			 		echo "Ocurrió un error al guardar la traza de la agenda";
			 	}
			} else {
				echo "Ocurrió un error al guardar la distribución";
			}
		}

		public function eliminar_distribucion() {
			$this->validar_sesion();
			define("ELIMINADO", 0);
			define("ELIMINAR_DISTRIBUCION", 10);
			define("OK", 1);

			$id_dist = $this->request->getPost("id_dist");
			$id_agenda = $this->request->getPost("id_agenda");

			$estado_traza = ELIMINAR_DISTRIBUCION;
			$estado = ELIMINADO;
			$date = date("Y-m-d H:i:s");
			$fecha = $date;
			$usu_cod = $this->sesión->usu_cod_ses;

			$data = [
			    "estado" => $estado,
			    "usu_cod" => $usu_cod,
			    "fecha" => $fecha,
			    "id" => $id_dist
			];

			if ($this->agenda_detalle_distribucion->save($data)) {
				$data_traza = [
					"id_agenda" => $id_agenda,
					"estado" => $estado_traza,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha
				];

				if ($this->agenda_traza->save($data_traza)) {
			 		echo OK;
			 	} else {
			 		echo "Ocurrió un error al guardar la traza de la agenda";
			 	}
			} else {
				echo "Ocurrió un error al eliminar la distribución";
			}
		}

		public function anular_agenda() {
			$this->validar_sesion();
			define("ANULADA", 2);
			define("OK", 1);
			define("ANULAR_AGENDA", 3);

			$id_agenda = $this->request->getPost("id_agenda");
			$date = date("Y-m-d H:i:s");
			$fecha = $date;
			$usu_cod = $this->sesión->usu_cod_ses;

			$estado = ANULADA;
			$estado_traza = ANULAR_AGENDA;

			$data = [
			    "estado" => $estado,
			    "usu_cod" => $usu_cod,
			    "fecha" => $fecha,
			    "id" => $id_agenda
			];

			if ($this->agendas->save($data)) {
				$data_traza = [
					"id_agenda" => $id_agenda,
					"estado" => $estado_traza,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha
				];

				if ($this->agenda_traza->save($data_traza)) {
			 		echo OK;
			 	} else {
			 		echo "Ocurrió un error al guardar la traza de la agenda";
			 	}
			} else {
				echo "Ocurrió un error al anular la agenda";
			}
		}

		public function eliminar_detalle() {
			$this->validar_sesion();
			define("ELIMINADO", 0);
			define("OK", 1);
			define("ELIMINAR_DETALLE", 7);

			$id_agenda = $this->request->getPost("id_agenda");
			$id_det = $this->request->getPost("id_det");
			$date = date("Y-m-d H:i:s");
			$fecha = $date;
			$usu_cod = $this->sesión->usu_cod_ses;

			$estado = ELIMINADO;
			$estado_traza = ELIMINAR_DETALLE;

			$data = [
			    "estado" => $estado,
			    "usu_cod" => $usu_cod,
			    "fecha" => $fecha,
			    "id" => $id_det
			];

			if ($this->agenda_detalle->save($data)) {
				$data_traza = [
					"id_agenda" => $id_agenda,
					"estado" => $estado_traza,
					"usu_cod" => $usu_cod,
					"fecha" => $fecha
				];

				if ($this->agenda_traza->save($data_traza)) {
			 		echo OK;
			 	} else {
			 		echo "Ocurrió un error al guardar la traza de la agenda";
			 	}
			} else {
				echo "Ocurrió un error al anular la agenda";
			}
		}

		public function datatable_traza_agenda($id_agenda) {
			$this->validar_sesion();
			echo $this->agenda_traza->datatable_traza_agenda($this->db, $id_agenda);
		}

		public function generar_agenda() {
			$this->validar_sesion();
			define("PENDIENTE", 0);
			define("GENERADA", 1);
			define("ACTIVO", 1);
			define("GENERA_AGENDA", 4);
			define("OK", 1);

			$id_agenda = $this->request->getPost("id_agenda");
			$estado_agenda = PENDIENTE;
			$estado_detdist = ACTIVO;
			$estado_traza = GENERA_AGENDA;
			$usu_cod = $this->sesión->usu_cod_ses;
			$fecha = date("Y-m-d H:i:s");

			$consulta_agenda = $this->agendas->select("count(*) as filas")
										->where("id", $id_agenda)
										->where("estado", $estado_agenda)
										->first();

			$filas = $consulta_agenda["filas"];

			if ($filas > 0) {
				$consulta_detalle = $this->agenda_detalle->select("id")
														->select("id_agenda")
														->select("IFNULL(ELT(FIELD(dia, 1, 2, 3, 4, 5, 6, 7), 'Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),'Sin registro') as dia")
														->select("hora_inicio")
														->select("hora_fin")
														->select("min_paciente")
														->select("cupos")
														->where("id_agenda", $id_agenda)
														->where("estado", $estado_detdist)
														->findAll();
				$filas_det = count($consulta_detalle);

				if ($filas_det > 0) {
					foreach ($consulta_detalle as $key) {
						$id_det = $key["id"];
						$dia = $key["dia"];
						$hora_inicio = $key["hora_inicio"];
						$hora_fin = $key["hora_fin"];
						$cupos_totales = $key["cupos"];

						$consulta_dist = $this->agenda_detalle_distribucion->select("*")
																			->where("id_detalle", $id_det)
																			->where("estado", $estado_detdist)
																			->findAll();
						$filas_dist = count($consulta_dist);
						
						if ($filas_dist > 0) {
							$cupos = 0;
							foreach ($consulta_dist as $key) {
								$cupos += $key["cupos"];
							}

							if ($cupos < $cupos_totales or $cupos > $cupos_totales) {
								echo "Hay problemas en la distribución de cupos.<br>Día: $dia.<br>Hora Inicio: $hora_inicio.<br>Hora Fin: $hora_fin.";
								exit();
							}
						} else {
							echo "Hay detalles de agenda sin distribución.<br>Día: $dia.<br>Hora Inicio: $hora_inicio.<br>Hora Fin: $hora_fin.";
							exit();
						}
					}

					$estado_agenda = GENERADA;

					$data = [
					    "estado" => $estado_agenda,
					    "usu_cod" => $usu_cod,
					    "fecha" => $fecha,
					    "id" => $id_agenda
					];

					if ($this->agendas->save($data)) {
						$data_traza = [
							"id_agenda" => $id_agenda,
							"estado" => $estado_traza,
							"usu_cod" => $usu_cod,
							"fecha" => $fecha
						];	

						if ($this->agenda_traza->save($data_traza)) {
			 				echo OK;
			 			} else {
			 				echo "Ocurrió un error al guardar la traza de la agenda";
			 				exit();
			 			}
					} else {
						echo "Ocurrió un error al generar la agenda";
						exit();
					}
				} else {
					echo "Agenda no tiene detalle";
					exit();
				}
			} else {
				echo "No se puede generar la agenda, verifique que la agenda esté en estado pendiente";
				exit();
			}
		}
	}