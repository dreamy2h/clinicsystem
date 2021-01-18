<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_agenda_detalle_distribucion extends Model {
		protected $table      = 'agenda_detalle_distribucion';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'id_detalle', 'id_tipo_atencion', 'cupos', 'estado', 'usu_cod', 'fecha'];
	}
?>