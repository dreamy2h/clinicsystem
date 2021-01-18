<?php namespace App\Models\Configuracion;

	use CodeIgniter\Model;

	class md_permisos_detalle extends Model {
		protected $table      = 'permisos_detalle';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'nombre', 'id_grupo', 'ruta', 'estado'];

	    protected $useTimestamps = false;
	    protected $createdField  = 'fecha_reg';
	    protected $updatedField  = 'fecha_upd';
	    protected $deletedField  = 'eliminado';

	    protected $validationRules    = [];
	    protected $validationMessages = [];
	    protected $skipValidation     = false;
	}
?>