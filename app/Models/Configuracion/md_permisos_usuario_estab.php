<?php namespace App\Models\Configuracion;

	use CodeIgniter\Model;

	class md_permisos_usuario_estab extends Model {
		protected $table      = 'permisos_usuario_estab';
	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['usu_cod', 'id_estab', 'id_permiso', 'estado', 'usu_cod_upd', 'fecha_upd'];

	    public function permisos_usuarios($usu_cod, $id_estab) {
	    	$this->select("id_permiso");
	    	$this->where("usu_cod", $usu_cod);
	    	$this->where("id_estab", $id_estab);
	    	$this->where("estado", 1);
	    	$datos = $this->findAll();
	    	return $datos;
	    }

	    public function tiene_permiso($usu_cod, $id_estab, $id_permiso) {
	    	$this->select("count(*) as filas");
	    	$this->where("usu_cod", $usu_cod);
	    	$this->where("id_estab", $id_estab);
	    	$this->where("id_permiso", $id_permiso);
	    	$datos = $this->findAll();
	    	return $datos;
	    }

	    public function estado_permiso($usu_cod, $id_estab, $id_permiso) {
	    	$this->select("estado");
	    	$this->where("usu_cod", $usu_cod);
	    	$this->where("id_estab", $id_estab);
	    	$this->where("id_permiso", $id_permiso);
	    	$datos = $this->findAll();
	    	return $datos;	
	    }
	}
?>