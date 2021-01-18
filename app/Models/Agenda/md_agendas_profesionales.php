<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_agendas_profesionales extends Model {
		protected $table      = 'agendas_profesionales';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id_especialidad', 'usu_cod_prof', 'usu_cod', 'fecha', 'estado'];

	    public function existe_agenda_profesional($id_especialidad, $usu_cod_prof) {
	    	$this->select("count(*) as filas");
	    	$this->where("id_especialidad", $id_especialidad);
	    	$this->where("usu_cod_prof", $usu_cod_prof);
	    	$datos = $this->findAll();
	    	return $datos;
	    }

	    public function estado_agenda_profesional($id_especialidad, $usu_cod_prof) {
	    	$this->select("estado");
	    	$this->where("id_especialidad", $id_especialidad);
	    	$this->where("usu_cod_prof", $usu_cod_prof);
	    	$datos = $this->findAll();
	    	return $datos;
	    }
	}
?>