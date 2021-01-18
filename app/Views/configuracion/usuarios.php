<?php 
    if (isset($_GET["usu_cod"])) {
        $usu_cod = $_GET["usu_cod"];
    } else {
        $usu_cod = "";
    }
?>
<input type="hidden" name="usu_cod" id="usu_cod" value="<?php echo $usu_cod; ?>">
<main>
    <div id="divStandBy">
        <center><div id="divSpinner"></div></center>
    </div>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <div class="alert alerta-fijo hidden" role="alert" id="alerta"></div>
            <div id="content" style="margin-bottom: 20px;">
                <div class="container-fluid" style="margin-top: 20px;">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12">
                            <div class="card shadow mb-12">
                                <div class="card-body">
                                    <div class="container-fluid">
                                        <center>
                                            <button type="button" class="btn btn-success" id="btn_grabar_todos"><i class="far fa-save"></i> Grabar Usuario Múltiple</button>
                                            <button type="button" class="btn btn-primary" id="btn_grabar"><i class="far fa-save"></i> Grabar</button>
                                            <button type="button" class="btn btn-info" id="btn_limpiar"><i class="fas fa-broom"></i> Limpiar</button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="hidden" id="alerta"> -->
                        
                    <!-- </div> -->
                    <hr>
                    <div class="row">
                        <div class="col-xl-8 col-lg-8">
                            <form id="form_crear_usu_control" name="form_crear_usu_control" encType="multipart/form-data">
                                <div class="card shadow mb-12">
                                    <div class="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                                        <h6 class="m-0 font-weight-bold text-gray">Usuarios - Profesionales</h6>
                                        <a href="javascript:void(0);" class="add_button1" id="icon_usuario_add"><i class="fas fa-plus-circle" style="color:green;font-size: 35px;"></i></a>
                                    </div>
                                    <div class="card-body">
                                        <div id="field_wrapper1">
                                            <div class="row" id="row1-1">
                                                <div class="col-xl-1 col-lg-1">
                                                    <button type="button" class="btn btn-default" role="group" id="btn_fila-1"><i id="radio_fila-1" class="far fa-circle radiobutton-deselect" data-toggle="tooltip" data-placement="left" title="Nuevo"></i></button>
                                                </div>
                                                <div class="col-xl-2 col-lg-2">
                                                    <label class="col-xl-12 control-label">Rut:</label>
                                                     <input type="text" class="form-control" name="txt_usu_cod-1" id="txt_usu_cod-1" placeholder="11111111-1">
                                                </div>
                                                <div class="col-xl-4 col-lg-4">
                                                    <label class="col-xl-12 control-label">Nombres:</label>
                                                     <input type="text" class="form-control" name="txt_nombres-1" id="txt_nombres-1">
                                                </div>
                                                <div class="col-xl-2 col-lg-2">
                                                    <label class="col-xl-12 control-label">A.Paterno:</label>
                                                     <input type="text" class="form-control" name="txt_ape_paterno-1" id="txt_ape_paterno-1">
                                                </div>
                                                <div class="col-xl-2 col-lg-2">
                                                    <label class="col-xl-12 control-label">A.Materno:</label>
                                                     <input type="text" class="form-control" name="txt_ape_materno-1" id="txt_ape_materno-1">
                                                </div>
                                            </div>
                                            <div class="row" id="row2-1">
                                                <div class="col-xl-2 col-lg-2">
                                                    <label class="col-xl-12 control-label">Tipo de Usuario:</label>
                                                    <select class="form-control" name="cmb_usu_tipo-1" id="cmb_usu_tipo-1">
                                                        <option value="1">Usuario Final</option>
                                                        <option value="2">Usuario Multi-Establecimiento</option>
                                                    </select>
                                                </div>
                                                <div class="col-xl-3 col-lg-3">
                                                    <label class="col-xl-12 control-label">Profesión:</label>
                                                    <select class="form-control" name="cmb_profesion-1" id="cmb_profesion-1">
                                                    </select>
                                                </div>
                                                <div class="col-xl-3 col-lg-3">
                                                    <label class="col-xl-12 control-label">Especialidad:</label>
                                                    <select class="form-control" name="cmb_especialidad-1" id="cmb_especialidad-1">
                                                    </select>
                                                </div>
                                                <div class="col-xl-1 col-lg-1">
                                                    <button type="button" class="btn btn-default" id="resetkey-1"><i class="fas fa-key" style="padding-top: 18px;color:#4c6ef5;font-size: 35px;"></i></button>
                                                </div>
                                                <div class="col-xl-1 col-lg-1">
                                                    <button type="button" class="btn btn-default" id="removeUsu-1"><i class="fas fa-minus-circle" style="padding-top: 18px;font-size: 35px;"></i></button>
                                                </div>
                                                <div class="col-xl-1 col-lg-1">
                                                    <button type="button" class="btn btn-default" id="estadoUsu-1"><i id="icon-1" class="fas fa-user gris" style="padding-top: 18px;;font-size: 35px;"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr>
                            
                            <div class="card shadow mb-12">
                                <div class="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-gray">Establecimientos</h6>
                                </div>
                                <div class="card-body">
                                    <div id="field_wrapper3">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12">
                                                <div class="table-responsive table-est" style="overflow-x: hidden;">
                                                    <div align="center">
                                                        <button id="btn_multi" type="button" class="btn btn-primary"><i class="fas fa-check-double"></i>Perfil Múltiple</button>
                                                        
                                                    </div>
                                                    <div class="table-responsive">
                                                        <table id="grid_est" class="table table-bordered"  width="100%">
                                                            <thead class="thead-dark">
                                                                <tr>
                                                                    <th>Código</th>
                                                                    <th>Establecimiento</th>
                                                                    <th>N° de Permisos</th>
                                                                    <th>Estab. Base</th>
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
                        </div>
                        <hr>
                        <div class="col-xl-4 col-lg-4"> 
                            <div class="card shadow mb-12">
                                <div class="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-gray">Perfil</h6>
                                </div>
                                <div class="card-body card-body-est">
                                    <div class="col-xl-12 col-lg-12">
                                        <select multiple="multiple" id="id_select_grupo"></select>
                                    </div>
                                    <hr>
                                    <div class="col-xl-12 col-lg-12">
                                        <div class="table-responsive" style="overflow-x: hidden;">
                                            <div class="table-responsive">
                                                <table class="table table-bordered" width="100%" cellspacing="0" id="grid_perfil">
                                                    <thead class="thead-dark">
                                                        <tr>
                                                            <th>Codigo</th>
                                                            <th>Descipción</th>
                                                            <!-- <th style="display: none;">Grupo</th> -->
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
                </div>
            </div>
        </div>
    </div>
</main>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/configuracion/usuarios.js"></script>        
