<?php namespace App\Models\Pacientes;

	use CodeIgniter\Model;

	class md_pacientes extends Model {
		protected $table      = 'pacientes';
	    protected $primaryKey = 'id';

	    protected $returnType     = 'array';
	    protected $useSoftDeletes = false;

	    protected $allowedFields = ['id', 'tipo_identificacion', 'codigo_identificacion', 'rut', 'dv', 'nombres', 'ape_pat', 'ape_mat', 'prevision', 'sexo', 'comuna', 'fono_fijo', 'fono_movil', 'calle', 'numero_direccion', 'resto_direccion', 'fecha_nacimiento', 'fecha_fallecimiento', 'email', 'usu_cod', 'fecha'];
	}
?>