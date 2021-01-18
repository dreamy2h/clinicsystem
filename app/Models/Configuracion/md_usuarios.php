<?php namespace App\Models\Configuracion;

	use CodeIgniter\Model;

	class md_usuarios extends Model {
		protected $table      = 'usuarios';
	    protected $primaryKey = 'usu_cod';

	    protected $returnType     = 'array';
	    // protected $useSoftDeletes = true;

	    protected $allowedFields = ['usu_cod', 'clave', 'rut', 'dv', 'nombres', 'ape_pat', 'ape_mat', 'usu_tipo','profesion', 'especialidad', 'id_estab', 'estado', 'usu_cod_reg', 'fecha_reg', 'usu_cod_upd', 'fecha_upd', 'eliminado'];

	    public function existe_usuario($usu_cod) {
	    	$this->select("count(*) as filas");
	    	$this->where("usu_cod", $usu_cod);
	    	$datos = $this->findAll();
	    	return $datos;	
	    }
	    
	}
?>