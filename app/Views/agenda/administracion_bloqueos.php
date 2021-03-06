<main>
    <div class="container-fluid">
        <h1 class="mt-4">Administración de Bloqueos de Agendas</h1>
        <div class="alert alerta-fijo hidden" role="alert" id="alerta"></div>
        <div class="card mb-4">
            <div class="card-header"><i class="fas fa-calendar mr-1"></i> Bloquear Agenda
                <button class="btn" style="float: right;" data-toggle="collapse" data-target="#collapseForm" title="Colapsar" aria-expanded="true" aria-controls="collapseForm"><i class="fas fa-minus-square"></i></button>
            </div>
            <div id="collapseForm">
                <form id="form_bloqueos" name="form_bloqueos" encType="multipart/form-data">
                    <div class="container-fluid">
                        <br>
                        <div class="card shadow mb-12">
                            <div class="card-body">
                                <div class="container-fluid">
                                    <center>
                                        <button type="button" name="btn_nuevo" id="btn_nuevo" class="btn btn-primary"><i class="fas fa-plus-circle"></i> Nueva Bloqueo</button>
                                        <button type="button" name="btn_modificar" id="btn_modificar" class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Modificar</button>
                                        <button type="button" name="btn_anular" id="btn_anular" class="btn btn-primary"><i class="fas fa-trash"></i> Anular</button>
                                        <button type="button" name="btn_aceptar" id="btn_aceptar" class="btn btn-success"><i class="fas fa-save"></i> Aceptar</button>
                                        <button type="button" name="btn_cancelar" id="btn_cancelar" class="btn btn-danger"><i class="fas fa-ban"></i> Cancelar</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="form-row">
                                    <input type="hidden" name="txt_id_bloqueo" id="txt_id_bloqueo" />
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="cmb_tipo_bloqueo">Tipo de Bloqueo</label>
                                            <select id="cmb_tipo_bloqueo" name="cmb_tipo_bloqueo" class="form-control">
                                                <option value="">Seleccione un tipo de bloqueo</option>
                                                <option value="1">Agenda</option>
                                                <option value="2">Profesional</option>
                                                <option value="3">Día</option>
                                                <option value="4">Bloque</option>
                                                <option value="5">Horas</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12"></div>
                                </div>
                                <div class="form-row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="dt_fecha_inicio">Fecha Inicio</label>
                                            <input type='text' class="form-control" id='dt_fecha_inicio' name="dt_fecha_inicio" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="dt_fecha_fin">Fecha Fin</label>
                                            <input type='text' class="form-control" id='dt_fecha_fin' name="dt_fecha_fin" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="cmb_agenda">Agenda</label>
                                            <select id="cmb_agenda" name="cmb_agenda" class="form-control">
                                                <option value="">Seleccione una Agenda</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="cmb_profesional">Profesional</label>
                                            <select id="cmb_profesional" name="cmb_profesional" class="form-control"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <label class="small mb-1" for="txt_observaciones">Observaciones</label>
                                            <textarea id="txt_observaciones" class="form-control"></textarea>
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
                <i class="fas fa-calendar mr-1"></i>
                Bloqueos Generados
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="grid_agendas" class="table table-bordered" width="100%">
                        <thead class="thead-dark">
                            <tr>
                                <th width="5%">Folio</th>
                                <th width="5%">id_tipo_bloqueo</th>
                                <th width="10%">Tipo Bloqueo</th>
                                <th width="0%">id_especialidad</th>
                                <th width="10%">Especialidad</th>
                                <th width="0%">usu_cod_prof</th>
                                <th width="10%">Profesional</th>
                                <th width="10%">Folio Agenda</th>
                                <th width="10%">Día</th>
                                <th width="5%">Fecha Inicio</th>
                                <th width="5%">Fecha Fin</th>
                                <th width="10%">Usuario</th>
                                <th width="10%">Fecha</th>
                                <th width="10%">Estado</th>
                                <th width="5%">Traza</th>
                            </tr>
                        </thead>
                    </table> 
                </div>
            </div>
        </div>
        <div id="dlg_traza_bloqueos" class="modal fade" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Traza Bloqueo</h4>
                    </div>
                    <div class="modal-body">
                        <div id="divContenedorTrazaBloqueo"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/agenda/administracion_bloqueos.js"></script>
