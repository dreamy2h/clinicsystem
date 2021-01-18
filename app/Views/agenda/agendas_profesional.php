<main>
    <div class="container-fluid">
        <h1 class="mt-4">Agendas por Profesional</h1>
        <div class="alert alerta-fijo hidden" role="alert" id="alerta"></div>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-calendar mr-1"></i> Ingreso de Agendas por Profesional
                <button class="btn" style="float: right;" data-toggle="collapse" data-target="#collapseForm" title="Colapsar" aria-expanded="true" aria-controls="collapseForm"><i class="fas fa-minus-square"></i></button>
            </div>
        	<div id="collapseForm">
                <form id="form_agendas_prof" name="form_agendas_prof" encType="multipart/form-data">
                    <div class="container-fluid">
                        <br>
                        <div class="card shadow mb-12">
                            <div class="card-body">
                                <div class="container-fluid">
                                    <center>
                                        <button type="button" name="btn_nuevo" id="btn_nuevo" class="btn btn-primary"><i class="fas fa-save"></i> Nuevo</button>
                                        <button type="button" name="btn_nuevo" id="btn_aceptar" class="btn btn-success"><i class="fas fa-save"></i> Aceptar</button>
                                        <button type="button" name="btn_nuevo" id="btn_cancelar" class="btn btn-danger"><i class="fas fa-ban"></i> Cancelar</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="form-row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="cmb_especialidad">Especialidad</label>
                                            <select id="cmb_especialidad" class="form-control"></select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="cmb_profesional">Profesional</label>
                                            <select id="cmb_profesional" class="form-control"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-calendar mr-1"></i> Agendas por Profesional Creadas
                <button class="btn" style="float: right;" data-toggle="collapse" data-target="#collapseForm2" title="Colapsar" aria-expanded="true" aria-controls="collapseForm2"><i class="fas fa-minus-square"></i></button>
            </div>
        	<div id="collapseForm2">
        		<div class="card-body">
	        		<div class="table-responsive">
	                    <table id="grid_age_profesional" class="table table-bordered" width="100%">
	                        <thead class="thead-dark">
	                            <tr>
	                                <th width="20%">Especialidad</th>
	                                <th width="20%">Profesional</th>
	                            </tr>
	                        </thead>
	                    </table> 
	                </div>
	            </div>
            </div>
        </div>
    </div>
</main>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/agenda/agenda_profesional.js"></script>