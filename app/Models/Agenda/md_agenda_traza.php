<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_agenda_traza extends Model {
		protected $table      = 'agenda_traza';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'id_agenda', 'estado', 'observaciones', 'usu_cod', 'fecha'];

	    public function datatable_traza_agenda($conn, $id_agenda) {
	    	$consulta = "SELECT 
							at.id,
						    at.id_agenda,
						    ate.glosa as estado,
						    at.observaciones,
						    concat(nombres, ' ', ape_pat, ' ', ape_mat) as usuario,
						    date_format(fecha, '%d-%m-%Y %H:%i') as fecha
						FROM 
							agenda_traza at
						    inner join agenda_traza_estados ate on ate.id = at.estado
						    inner join usuarios u on u.usu_cod = at.usu_cod
						where 
							at.id_agenda = $id_agenda";

			$query = $conn->query($consulta);
			$grid_traza = $query->getResultArray();

			foreach ($grid_traza as $key) {
				$row = array(
					"id" => $key["id"],
					"id_agenda" => $key["id_agenda"],
					"estado" => $key["estado"],
					"observaciones" => $key["observaciones"],
					"usuario" => $key["usuario"],
					"fecha" => $key["fecha"]
				);

				$data[] = $row;
			}

			if (isset($data)) {
				$salida = array("data" => $data);
				return json_encode($salida);
			} else {
				return "{ \"data\": [] }";
			}
	    }
	}
?>