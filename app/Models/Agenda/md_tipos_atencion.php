<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_tipos_atencion extends Model {
		protected $table      = 'agenda_tipos_atencion';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'glosa', 'estado'];
	}
?>