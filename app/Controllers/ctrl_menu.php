<?php 
	namespace App\Controllers;

	class ctrl_menu extends BaseController {
		public function ingreso_agenda() {
			echo view('agenda/ingreso_agenda');
		}

		public function agendas_profesional() {
			echo view('agenda/agendas_profesional');
		}

		public function usuarios() {
			echo view('configuracion/usuarios');
		}

		public function administracion_bloqueos() {
			echo view('agenda/administracion_bloqueos');
		}

		public function pacientes() {
			echo view('pacientes/pacientes');	
		}
	}
?>