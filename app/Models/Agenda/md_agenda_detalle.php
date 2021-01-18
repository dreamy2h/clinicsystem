<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_agenda_detalle extends Model {
		protected $table      = 'agenda_detalle';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'id_agenda', 'dia', 'hora_inicio', 'hora_fin', 'min_paciente', 'cupos', 'estado', 'usu_cod', 'fecha'];

	    public function exite_registro($db, $id_agenda, $dia, $hora_inicio, $hora_fin, $id_det) {
	    	// define("ACTIVO", 1);
	    	$estado = ACTIVO;

	    	$consulta = "SELECT 
							count(*) as filas
						from 
							agenda_detalle 
						where 
							id_agenda = ? and 
						    dia = ? and 
						    estado = ? and
							(hora_inicio between ? and ? or
						    hora_fin between ? and ? or
						    ?  between hora_inicio and hora_fin or
						    ?  between hora_inicio and hora_fin)";

			if ($id_det != "") {
				$consulta .= " and id <> ?";
			}
						    
			$bind = [$id_agenda, $dia, $estado, $hora_inicio, $hora_fin, $hora_inicio, $hora_fin, $hora_inicio, $hora_fin];

			if ($id_det != "") {
				array_push($bind, $id_det);
			}

			$query = $db->query($consulta, $bind);
			$row = $query->getRow();
			$filas = $row->filas;

			if ($filas > 0) {
				return true;
			} else {
				return false;
			}	
	    }
	}
?>