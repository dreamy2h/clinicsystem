<?php namespace App\Models\Configuracion;

	use CodeIgniter\Model;

	class md_profesiones extends Model {
		protected $table      = 'profesiones';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'glosa'];
	}
?>