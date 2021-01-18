<main>
    <div class="container-fluid">
        <h1 class="mt-4">Pacientes</h1>
        <div class="alert alerta-fijo hidden" role="alert" id="alerta"></div>

        <div class="container-fluid">
        	<br>
	        <div class="card shadow mb-12">
	            <div class="card-body">
	                <div class="container-fluid">
	                    <center>
	                        <button type="button" name="btn_nuevo" id="btn_nuevo" class="btn btn-primary"><i class="fas fa-plus-circle"></i> Nuevo</button>
	                        <button type="button" name="btn_modificar" id="btn_modificar" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Modificar</button>
	                        <button type="button" name="btn_anular" id="btn_anular" class="btn btn-primary"><i class="fas fa-trash"></i> Anular</button>
	                        <button type="button" name="btn_aceptar" id="btn_aceptar" class="btn btn-success"><i class="fas fa-save"></i> Aceptar</button>
	                        <button type="button" name="btn_cancelar" id="btn_cancelar" class="btn btn-danger"><i class="fas fa-ban"></i> Cancelar</button>
	                        <button type="button" name="btn_buscar" id="btn_buscar" class="btn btn-info"><i class="fas fa-search"></i> Buscar</button>
	                    </center>
	                </div>
	            </div>
	        </div>
	        <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                	<div class="card shadow mb-12">
			            <div class="card-body">
			                <div class="container-fluid">
			                	<form id="form_pacientes" name="form_pacientes" encType="multipart/form-data">
				                    <div class="row">
				                        <input type="hidden" name="txt_id_paciente" id="txt_id_paciente" />
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="cmb_tipo_identificacion">Tipo de Identificación</label>
				                                <select id="cmb_tipo_identificacion" name="cmb_tipo_identificacion" class="form-control">
				                                    <option value="1">RUT Nacional</option>
				                                    <option value="2">Sin RUT</option>
				                                    <option value="3">Pasaporte</option>
				                                    <option value="4">Identificación de su País</option>
				                                </select>
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                        	<div class="form-group">
				                        		<label class="small mb-1" for="txt_identificacion">Identificación</label>
				                        		<input type='text' class="form-control" id='txt_identificacion' name="txt_identificacion" />
				                        	</div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                        	<div class="form-group">
				                        		<label class="small mb-1" for="txt_rut">RUT</label>
				                        		<input type='text' class="form-control" id='txt_rut' name="txt_rut" />
				                        	</div>
				                        </div>
				                    </div>
				                    <div class="row">
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_nombres">Nombres</label>
				                                <input type='text' class="form-control" id='txt_nombres' name="txt_nombres" />
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_apepat">Ap. Paterno</label>
				                                <input type='text' class="form-control" id='txt_apepat' name="txt_apepat" />
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_apemat">Ap. Materno</label>
				                                <input type='text' class="form-control" id='txt_apemat' name="txt_apemat" />
				                            </div>
				                        </div>
				                    </div>
				                    <div class="row">
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="cmb_prevision">Previsión</label>
				                                <select id="cmb_prevision" name="cmb_prevision" class="form-control"></select>
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="cmb_sexo">Sexo</label>
				                                <select id="cmb_sexo" name="cmb_sexo" class="form-control"></select>
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_email">Correo Electrónico</label>
				                                <input type='text' class="form-control" id='txt_email' name="txt_email" />
				                            </div>
				                        </div>
				                    </div>
				                    <div class="row">
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="cmb_region">Región</label>
				                                <select id="cmb_region" name="cmb_region" class="form-control"></select>
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="cmb_provincia">Provincia</label>
				                                <select id="cmb_provincia" name="cmb_provincia" class="form-control"></select>
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="cmb_comuna">Comuna</label>
				                                <select id="cmb_comuna" name="cmb_comuna" class="form-control"></select>
				                            </div>
				                        </div>
				                    </div>
				                    <div class="row">
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_calle">Calle</label>
				                                <input type='text' class="form-control" id='txt_calle' name="txt_calle" />
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_numero_direccion">Número</label>
				                                <input type='text' class="form-control" id='txt_numero_direccion' name="txt_numero_direccion" />
				                            </div>
				                        </div>
				                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_resto_direccion">Resto Dirección</label>
				                                <input type='text' class="form-control" id='txt_resto_direccion' name="txt_resto_direccion" />
				                            </div>
				                        </div>
				                    </div>
				                    <div class="row">
				                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_fono_fijo">Fono Fijo</label>
				                                <input type='text' class="form-control" id='txt_fono_fijo' name="txt_fono_fijo" />
				                            </div>
				                        </div>
				                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="txt_fono_movil">Fono Móvil</label>
				                                <input type='text' class="form-control" id='txt_fono_movil' name="txt_fono_movil" />
				                            </div>
				                        </div>
				                    </div>
				                    <div class="row">
				                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="dt_fecha_nacimiento">Fecha Nacimiento</label>
				                                <input type='text' class="form-control" id='dt_fecha_nacimiento' name="dt_fecha_nacimiento" />
				                            </div>
				                        </div>
				                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                            <div class="form-group">
				                                <label class="small mb-1" for="dt_fecha_fallecimiento">Fecha Fallecimiento</label>
				                                <input type='text' class="form-control" id='dt_fecha_fallecimiento' name="dt_fecha_fallecimiento" />
				                            </div>
				                        </div>
				                    </div>
				                </form>
			                </div>
			            </div>
			        </div>
                </div>
            </div>
	    </div>
    </div>
</main>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/pacientes/pacientes.js"></script>