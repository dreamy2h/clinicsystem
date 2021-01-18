<main>
    <div class="container-fluid">
    	<div class="alert alerta-fijo hidden" role="alert" id="alerta_detage"></div>
    	<div class="row">
    		<div class="col-xl-12 col-lg-12 col-md-12">
		        <div class="card shadow mb-12">
		            <div class="card-body">
				        <form id="form_det_agenda" name="form_agendas" encType="multipart/form-data">
				            <div class="container-fluid">
				                <br>
				                <div class="card shadow mb-12">
				                    <div class="card-body">
				                        <div class="container-fluid">
				                        	<div class="row">
					                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
					                            	<h7 id="h_especialidad"></h7>
					                            	<h7 id="h_profesional"></h7>
					                            </div>
					                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
						                            <h7 id="h_fecha_ini"></h7>
						                            <h7 id="h_fecha_fin"></h7>
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
				                            	<button type="button" name="btn_nuevo_det" id="btn_nuevo_det" class="btn btn-primary"><i class="fas fa-plus-circle"></i> Nuevo</button>
				                                <button type="button" name="btn_modificar_det" id="btn_modificar_det" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Modificar</button>
                                        		<button type="button" name="btn_anular_det" id="btn_anular_det" class="btn btn-primary"><i class="fas fa-trash"></i> Anular</button>
				                                <button type="button" name="btn_aceptar_det" id="btn_aceptar_det" class="btn btn-success"><i class="fas fa-save"></i> Aceptar</button>
				                                <button type="button" name="btn_cancelar_det" id="btn_cancelar_det" class="btn btn-danger"><i class="fas fa-ban"></i> Cancelar</button>
				                            </center>
				                        </div>
				                    </div>
				                </div>
				                <div class="row">
				                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
				                        <div class="form-row">
				                            <input type="hidden" name="txt_id_agenda_det" id="txt_id_agenda_det" />
				                            <input type="hidden" name="txt_estado_agenda" id="txt_estado_agenda" value="<?php echo $estado_agenda; ?>" />
				                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                                <div class="form-group">
				                                    <label class="small mb-1" for="cmb_dia">Día</label>
				                                    <select id="cmb_dia" name="cmb_dia" class="form-control">
				                                    	<option value="">Seleccione un día de la semana</option>
				                                    	<option value="1">Lunes</option>
				                                    	<option value="2">Martes</option>
				                                    	<option value="3">Miércoles</option>
				                                    	<option value="4">Jueves</option>
				                                    	<option value="5">Viernes</option>
				                                    	<option value="6">Sábado</option>
				                                    	<option value="7">Domingo</option>
				                                    </select>
				                                </div>
				                            </div>
				                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                                <div class="form-group">
				                                    <label class="small mb-1" for="dt_hora_inicio">Hora de Inicio</label>
				                                    <input type='text' class="form-control" id='dt_hora_inicio' name="dt_hora_inicio" />
				                                </div>
				                            </div>
				                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                                <div class="form-group">
				                                    <label class="small mb-1" for="dt_hora_fin">Hora de Término</label>
				                                    <input type='text' class="form-control" id='dt_hora_fin' name="dt_hora_fin" />
				                                </div>
				                            </div>
				                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                                <div class="form-group">
				                                    <label class="small mb-1" for="txt_min_pacientes">Minutos por paciente</label>
				                                    <input class="form-control py-4" id="txt_min_pacientes" name="txt_min_pacientes" type="text" placeholder="Ingrese minutos por paciente" />
				                                </div>
				                            </div>
				                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				                                <div class="form-group">
				                                    <label class="small mb-1" for="txt_cupos">Cupos</label>
				                                    <input class="form-control py-4" id="txt_cupos" name="txt_cupos" type="text" placeholder="Ingrese número de cupos" />
				                                </div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				                <div class="row">
				                	<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
				                		<div class="table-responsive">
						                    <table id="grid_agendas_det" class="table table-bordered" width="100%">
						                        <thead class="thead-dark">
						                            <tr>
						                                <th width="0%">id</th>
						                                <th width="0%">id_agenda</th>
						                                <th width="0%">id_dia</th>
						                                <th width="20%">Día</th>
						                                <th width="15%">Hora Inicio</th>
						                                <th width="15%">Hora Término</th>
						                                <th width="20%">Minutos por Paciente</th>
						                                <th width="20%">Cupos</th>
						                                <th width="10%">Distribuir</th>
						                            </tr>
						                        </thead>
						                    </table> 
						                </div>
				                	</div>
				                </div>
				            </div>
				        </form>
				    </div>
				</div>
		    </div>
    	</div>
    	<div id="dlg_distribuir_detalle" class="modal fade dark" role="dialog">
            <div class="modal-dialog modal-lg" style="background: black;">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #343a40; border-color: #454d55; color: #fff;">
                        <center><h4 class="modal-title">Distribuir Detalle</h4></center>
                    </div>
                    <div class="modal-body">
                        <div id="divContenedorDistDet"></div>
                    </div>
                    <div class="modal-footer">
                        <button id="btn_cerrar_dist" type="button" class="btn btn-dark">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/agenda/detalle_agenda.js"></script>