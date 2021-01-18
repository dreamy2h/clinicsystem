<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_agendas extends Model {
		protected $table      = 'agendas';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'id_especialidad', 'usu_cod_prof', 'usu_cod_reemplaza', 'id_estab', 'sobre_cupo', 'fecha_inicio', 'fecha_fin', 'usu_cod', 'fecha', 'estado'];

	    public function exite_registro($conn, $id_especialidad, $usu_cod_prof, $fecha_ini, $fecha_fin, $id_estab, $id_agenda) {
	    	define("ANULADA", 2);
	    	$estado = ANULADA;

	    	$consulta = "SELECT 
							count(*) as filas
						from 
							agendas
						where 
							id_especialidad = ? and 
							usu_cod_prof = ? and 
							estado <> ? and
							id_estab = ? and
							(date_format(fecha_inicio, '%d-%m-%Y') between ? and ? or
							date_format(fecha_fin, '%d-%m-%Y') between ? and ? or
							?  between date_format(fecha_inicio, '%d-%m-%Y') and date_format(fecha_fin, '%d-%m-%Y') or
							?  between date_format(fecha_inicio, '%d-%m-%Y') and date_format(fecha_fin, '%d-%m-%Y'))";

			if ($id_agenda != "") {
				$consulta .= " and id <> ?";
			}
						    
			$bind = [$id_especialidad, $usu_cod_prof, $estado, $id_estab, $fecha_ini, $fecha_fin, $fecha_ini, $fecha_fin, $fecha_ini, $fecha_fin];

			if ($id_agenda != "") {
				array_push($bind, $id_agenda);
			}

			$query = $conn->query($consulta, $bind);
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