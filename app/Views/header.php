<?php 
    $sesión = session();
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Sistema Clínico</title>
        <link href="<?php echo base_url(); ?>/css/styles.css" rel="stylesheet" />
        <link href="<?php echo base_url(); ?>/css/estilo_extra.css" rel="stylesheet" />
        <link href="<?php echo base_url(); ?>/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
        <link href="<?php echo base_url(); ?>/css/jquerysctipttop.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>/Multiple-Select/dist/css/bootstrap-multiselect.min.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>/sweetalert2/sweetalert2.min.css" rel="stylesheet">
        <link href="<?php echo base_url(); ?>/context-menu/context-menu.min.css" rel="stylesheet" type="text/css">
        <script src="<?php echo base_url(); ?>/js/all.min.js"></script>
    </head>

    <body class="sb-nav-fixed">
        <input type="hidden" id="txt_base_url" name="txt_base_url" value="<?php echo base_url(); ?>">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="index.html">Sistema Clínico</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
            
            <!-- Navbar-->
            <ul class="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><?php echo $sesión->nombres_ses . " " . $sesión->ape_pat_ses . " "; ?><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#"><?php echo $sesión->establecimiento_ses; ?></a>
                        <a class="dropdown-item" href="#">Actualizar Clave</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="<?php echo base_url(); ?>/ctrl_login/logout">Cerrar Sesión</a>
                    </div>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <a class="nav-link collapsed" data-toggle="collapse" data-target="#collapsePacientes" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-hospital-user"></i></div>
                                Pacientes
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapsePacientes" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" id="menu_pacientes">Pacientes</a>
                                    <a class="nav-link" id="menu_ficha_paciente">Ficha del Paciente</a>
                                </nav>
                            </div>
                            <a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseAdmAgenda" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-calendar"></i></div>
                                Agendas
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseAdmAgenda" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" id="menu_agendasProf">Agendas por Prof.</a>
                                    <a class="nav-link" id="menu_ingresoAgenda">Adm. de Agendas</a>
                                    <a class="nav-link" id="menu_admBloqueos">Adm. Bloqueos</a>
                                    <a class="nav-link" id="menu_citarPac">Citar Pacientes</a>
                                </nav>
                            </div>
                            <a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseConfiguracion" aria-expanded="false" aria-controls="collapseConfiguracion">
                                <div class="sb-nav-link-icon"><i class="fas fa-tools"></i></div>
                                Configuración
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseConfiguracion" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" id="menu_usuarios">Usuarios</a>
                                    <a class="nav-link" id="menu_establecimientos">Establecimientos</a>
                                    <a class="nav-link" id="menu_agendas_especialidades">Especialidades de Agenda</a>
                                    <a class="nav-link" id="menu_agendas_tipos_atencion">Tipos de Atención</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <?php echo $sesión->establecimiento_ses; ?>
                    </div>
                </nav>
            </div>