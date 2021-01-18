<?php 
	namespace App\Models;
	use CodeIgniter\Model;

	class md_usuarios extends Model {
		protected $table      = 'usuarios';
	    protected $primaryKey = 'usu_cod';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = true;

	    protected $allowedFields = ['usu_cod', 'rut', 'dv', 'nombres', 'ape_pat', 'ape_mat', 'profesion', 'especialidad', 'estado'];

	    protected $useTimestamps = false;
	    protected $createdField  = 'fecha_reg';
	    protected $updatedField  = 'fecha_update';
	    protected $deletedField  = 'eliminado';
	}
?>