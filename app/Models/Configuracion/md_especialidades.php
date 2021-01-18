<?php namespace App\Models\Configuracion;

	use CodeIgniter\Model;

	class md_especialidades extends Model {
		protected $table      = 'especialidades';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'glosa'];
	}
?>