<?php 
	namespace App\Controllers\Agenda;

	use App\Controllers\BaseController;
	use App\Models\Agenda\md_agendas;

	class ctrl_administracion_bloqueos extends BaseController {
		protected $agendas;

		public function __construct() {
			$this->agendas = new md_agendas();
		}

		public function validar_sesion() {
			if (!$this->sesión->has("usu_cod_ses")) {
				echo "La sesión expiró, actualice el sitio web con F5";
				exit();
	    	}
		}

		public function llenar_cmb_agenda() {
			$this->validar_sesion();
			$agendas = $this->agendas->select("")->select("glosa")->where("id_estab", $this->sesión->id_estab_ses)->findAll();

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
	}