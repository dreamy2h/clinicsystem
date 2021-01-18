<main>
    <div class="container-fluid">
    	<div class="alert alerta-fijo hidden" role="alert" id="alerta_detage"></div>
    	<div class="card shadow mb-12">
            <div class="card-body">
        		<div class="container-fluid">
	                <br>
	                <div class="card shadow mb-12">
	                    <div class="card-body">
	                        <div class="container-fluid">
	                            <div class="row">
		                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
		                            	<h6 id="h_especialidad_dist"></h6>
		                            	<h6 id="h_profesional_dist"></h6>
		                            </div>
		                        </div>
		                        <br>
		                        <div class="row">
		                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
			                            <h6 id="h_fecha_ini_dist"></h6>
			                            <h6 id="h_fecha_fin_dist"></h6>
			                        </div>
			                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
			                            <h6 id="h_dia_dist"></h6>
			                            <h6 id="h_cupos_dist"></h6>
			                        </div>
		                        </div>
	                        </div>
	                    </div>
	                </div>
	                <br>
	                <div class="card shadow mb-12">
	                    <div class="card-body">
	                        <div class="container-fluid">
	                            <center>
	                                <button type="button" name="btn_nuevo_dist" id="btn_nuevo_dist" class="btn btn-primary"><i class="fas fa-plus-circle"></i> Nuevo</button>
	                                <button type="button" name="btn_modificar_dist" id="btn_modificar_dist" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Modificar</button>
                            		<button type="button" name="btn_anular_dist" id="btn_anular_dist" class="btn btn-primary"><i class="fas fa-trash"></i> Eliminar</button>
	                                <button type="button" name="btn_aceptar_dist" id="btn_aceptar_dist" class="btn btn-success"><i class="fas fa-save"></i> Aceptar</button>
	                                <button type="button" name="btn_cancelar_dist" id="btn_cancelar_dist" class="btn btn-danger"><i class="fas fa-ban"></i> Cancelar</button>		                            </center>
	                        </div>
	                    </div>
	                </div>
            		<form id="form_dist_agenda" name="form_dist_agenda" encType="multipart/form-data">    
            			<div class="row">
		                	<input type="hidden" name="txt_id_dist" id="txt_id_dist" />
		                	<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="small mb-1" for="cmb_tipo_atencion">Tipo de Atención</label>
		                            <select id="cmb_tipo_atencion" name="cmb_tipo_atencion" class="form-control"></select>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label class="small mb-1" for="txt_cupos_dist">Cupos</label>
		                            <input class="form-control py-4" id="txt_cupos_dist" name="txt_cupos_dist" type="text" placeholder="Ingrese cupos al tipo de atención" />
                                </div>
                            </div>
		            	</div>
	            	</form>
	                <div class="row">
	                	<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
	                		<div class="table-responsive">
			                    <table id="grid_distribucion" class="table table-bordered" width="100%">
			                        <thead class="thead-dark">
			                            <tr>
			                                <th width="0%">id_dist</th>
			                                <th width="0%">id_tipo_ate</th>
			                                <th width="70%">Tipo de atencion</th>
			                                <th width="30%">Cupos</th>
			                            </tr>
			                        </thead>
			                    </table> 
			                </div>
	                	</div>
	                </div>
	            </div>
            </div>
        </div>
    </div>
</main>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/agenda/distribuir_detalle.js"></script>