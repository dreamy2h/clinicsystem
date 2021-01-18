<?php namespace App\Models\Agenda;

	use CodeIgniter\Model;

	class md_agenda_especialidades extends Model {
		protected $table      = 'agenda_especialidades';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'glosa', 'id_estab'];
	}
?>