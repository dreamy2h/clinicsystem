<?php namespace App\Models\Configuracion;

	use CodeIgniter\Model;

	class md_establecimientos extends Model {
		protected $table      = 'establecimientos';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';

	    protected $allowedFields = ['id', 'nombre', 'id_comuna', 'calle', 'numero', 'resto_direccion', 'id_empresa'];
	}
?>