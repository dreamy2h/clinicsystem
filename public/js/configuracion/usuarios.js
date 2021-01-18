var carga_profesiones;
var carga_especialidades;
var multiple = false;
var permisos = [];
var establecimientos = [];
var usuarios = [];
var numero_id = [1];
var base_url = $("#txt_base_url").val();

function cargar_datos_user_prof(usu_cod, numero) {
    if (usuarios.length > 0) {
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].usu_cod == usu_cod) {
                $("#txt_usu_cod-" + numero).val("");
                setTimeout(function() { $("#txt_usu_cod-" + numero).focus(); }, 100);
                alerta.error("alerta", "El usuario ya fue buscado", 5000);
                return false;
            }
        }
    }

    $.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Configuracion/ctrl_usuarios/carga_datos_usu/" + usu_cod,
    }).done( function(respuesta) {
        if (respuesta.length > 0) {
            $("#txt_nombres-" + numero).val(respuesta[0].nombres);
            $("#txt_ape_paterno-" + numero).val(respuesta[0].ape_pat);
            $("#txt_ape_materno-" + numero).val(respuesta[0].ape_mat);
            $("#cmb_usu_tipo-" + numero).val(respuesta[0].usu_tipo);
            $("#cmb_profesion-" + numero).val(respuesta[0].profesion);
            $("#cmb_especialidad-" + numero).val(respuesta[0].especialidad);
            $("#btn_fila-" + numero).prop("disabled", false);
            

            const ACTIVO = "1";
            const BLOQUEADO = "2";
            const NUEVO = "0";

            var icono_clase = obtener_icon_class(numero);

            switch (respuesta[0].estado) {
                case ACTIVO:
                    $("#icon-" + numero).removeClass(icono_clase);
                    $("#icon-" + numero).addClass("fa-user-check verde");
                    $("#estadoUsu-" + numero).attr("title", "Activo");
                    $("#estadoUsu-" + numero).attr("disabled", false);
                    break;
                case BLOQUEADO:
                    $("#icon-" + numero).removeClass(icono_clase);
                    $("#icon-" + numero).addClass("fas fa-user-lock rojo");
                    $("#estadoUsu-" + numero).attr("title", "Bloqueado");
                    $("#estadoUsu-" + numero).attr("disabled", false);
                    break;
                case NUEVO:
                    $("#icon-" + numero).removeClass(icono_clase);
                    $("#icon-" + numero).addClass("fas fa-user-edit gris");
                    $("#estadoUsu-" + numero).attr("title", "Pendiente");
                    $("#estadoUsu-" + numero).attr("disabled", true);
                    break;
            }

            usuarios.push({
                numero: numero,
                usu_cod: usu_cod,
                nombres: respuesta[0].nombres,
                ape_pat: respuesta[0].ape_pat,
                ape_mat: respuesta[0].ape_mat,
                usu_tipo: respuesta[0].usu_tipo,
                profesion: respuesta[0].profesion,
                especialidad: respuesta[0].especialidad,
                usuario_nuevo: false
            });
        } else {
            $("#btn_fila-" + numero).prop("disabled", false);
            usuarios.push({
                numero: numero,
                usu_cod: usu_cod,
                nombres: "",
                ape_pat: "",
                ape_mat: "",
                usu_tipo: "",
                profesion: "",
                especialidad: "",
                usuario_nuevo: true
            });

            alerta.aviso("alerta", "Usuario Nuevo", 4000);
        }

    }).fail(function(error){
        alerta.error("alerta", error, 5000);
    });
}

function obtener_icon_class(numero) {
    var icono_clase;

    if ($("#icon-" + numero).hasClass("fa-user-edit")) {
        icono_clase = "fa-user-edit gris";
    }

    if ($("#icon-" + numero).hasClass("fa-user-check")) {
        icono_clase = "fa-user-check verde";
    }
    
    if ($("#icon-" + numero).hasClass("fa-user-lock")) {
        icono_clase = "fa-user-lock rojo";
    }

    if ($("#icon-" + numero).hasClass("fa-user")) {
        icono_clase = "fa-user gris";
    }

    return icono_clase;
}

function seleccionar_fila(numero, maxField) {
    for (var e = 1; e <= 20; e++) {
        $("#radio_fila-" + e).addClass("radiobutton-deselect");
        $("#radio_fila-" + e).removeClass("radiobutton-select");
    }

    $("#radio_fila-" + numero).removeClass("radiobutton-deselect");
    $("#radio_fila-" + numero).addClass("radiobutton-select");

    var usu_cod = $("#txt_usu_cod-" + numero).val();
    $("#grid_est").dataTable().fnReloadAjax(base_url + "/Configuracion/ctrl_usuarios/data_establecimientos/" + usu_cod);
    $('#grid_est').DataTable().order( [ 2, 'desc' ], [ 1, 'desc' ] ).draw();
    if ($("#cmb_usu_tipo-" + numero).val() == 1) {
        $("#btn_multi").prop("disabled", false);
    }
}

function mostrar_permisos_estab(data) {
    var est_cod = data["id"];
    var fila_radio = $(".radiobutton-select");
    var fila_radio_split = fila_radio[0].id.split("-");
    var numero = fila_radio_split[1];
    var usu_cod = $("#txt_usu_cod-" + numero).val();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Configuracion/ctrl_usuarios/data_permisos_usuario/" + usu_cod + "/" + est_cod,
    }).done( function(respuesta) {
        $("#grid_perfil td").each(function() {
            $(this).closest("tr").removeClass("selected");
        });

        for (var i = 0; i < respuesta.length; i++) {
            var id_permiso = respuesta[i].id_permiso;
            $("#grid_perfil td").each(function() {
                var cellText = $(this).html();

                if(cellText == id_permiso){
                    $(this).closest("tr").addClass("selected");
                }
            });
        }
    }).fail(function(error){
        alerta.error("alerta", error, 5000);
    });
}

var Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut : function (rutCompleto) {
        var rutCompleto_ =  rutCompleto.replace(/\./g, "");

        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto_ ))
            return false;
        var tmp     = rutCompleto_.split('-');
        var digv    = tmp[1]; 
        var rut     = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        return (Fn.dv(rut) == digv );
    },
    dv : function(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
    }
}

function limpiar() {
    $("#form_crear_usu_control")[0].reset();
    $("#grid_est").DataTable().clear().draw();
    $("#grid_perfil td").each(function() {
        $(this).closest("tr").removeClass("selected");
    });

    for (var i = 10; i >= 2; i--) {
        if (document.getElementById("hr-" + i)) {
            $("#hr-" + i).remove();
            $("#row1-" + i).remove();
            $("#row2-" + i).remove();
        }
    }

    var icono_clase = obtener_icon_class(1);
    $("#estadoUsu-1").find("i").removeClass("fas " + icono_clase);
    $("#estadoUsu-1").find("i").addClass("fas fa-user gris");
    $("#radio_fila-1").removeClass("radiobutton-select");
    $("#radio_fila-1").addClass("radiobutton-deselect");
    $("#btn_fila-1").prop("disabled", true);
    usuarios = [];
    numero_id = [1];

    $('#id_select_grupo').multiselect('disable');
    $('#id_select_grupo').multiselect('deselectAll', false);

    $("#grid_est").DataTable().select.style("single");
    $("#btn_multi").html("<i class=\"fas fa-check-double\"></i>Perfil Múltiple");
    $("#btn_multi").removeClass("btn-info");
    $("#btn_multi").addClass("btn-primary");
    $("#btn_multi").prop("disabled", true);

    multiple = false;
}

function menu_permisos(est_cod, est_nombre, numero_permisos, e) {
    var fila_radio = $(".radiobutton-select");
    var fila_radio_split = fila_radio[0].id.split("-");
    var numero = fila_radio_split[1];
    var usu_cod = $("#txt_usu_cod-" + numero).val();

    for (var i = 0; i <= usuarios.length; i++) {
        if (usuarios[i].usu_cod == usu_cod) {
            if (usuarios[i].usuario_nuevo) {
                alerta.error("alerta", "Usuario nuevo, seleccione establecimiento(s) y permisos, luego <strong>Grabar</strong>", 5000);
                return false;
            } else {
                break;
            }
        }
    }

    contar_establecimientos();

    e.preventDefault();
    superCm.createMenu([
        {
            icon: 'fa fa-copy',
            label: 'Copiar Permisos',
            action: function(option, contextMenuIndex, optionIndex) {
                if (establecimientos.length <= 1) {
                    if (copiar_permisos(est_cod, usu_cod)) {
                        alerta.aviso("alerta", "<strong>" + permisos.length + "</strong> permisos copiados desde <strong>" + est_nombre + "</strong>", 5000);
                    } else {
                        alerta.error("alerta", "No fue posible copiar los permisos desde este establecimiento", 5000);
                    }
                } else {
                    alerta.error("alerta", "No se pueden copiar permisos de múltiples establecimientos", 3000);
                }
                superCm.destroyMenu();
            },
            submenu: null,
            disabled: false   //Disabled status of the option
        },
        {
            icon: 'fa fa-paste',
            label: 'Pegar Permisos',
            action: function(option, contextMenuIndex, optionIndex) {
                if (permisos.length > 0 && establecimientos.length > 0) {
                    Swal.fire({
                        title: "¿Desea pegar los permisos?",
                        text: "¡Si el usuario tiene permisos en el establecimiento se mantendrán!",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si",
                        cancelButtonText: "No"
                    }).then((result) => {
                        if (result.isConfirmed) {
                           pegar_permisos(usu_cod); 
                        }
                    });
                } else {
                    alerta.error("alerta", "No hay permisos para pegar o ha seleccionado ningún establecimiento", 5000);
                }
                superCm.destroyMenu();
            },
            submenu: null,
            disabled: false
        },
        {
            icon: 'fa fa-trash',
            label: 'Quitar Permisos',
            action: function(option, contextMenuIndex, optionIndex) {
                if (establecimientos.length > 0) {
                    Swal.fire({
                        title: "¿Está seguro?",
                        text: "¿Desea quitar todos los permisos en los establecimientos seleccionados?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si",
                        cancelButtonText: "No"
                    }).then((result) => {
                        if (result.isConfirmed) {
                           eliminar_permisos(usu_cod);
                        }
                    });
                } else {
                    alerta.aviso("alerta", "Seleccione al menos 1 establecimiento", 5000);
                }
            },
            submenu: null,
            disabled: false
        },
        {
            icon: 'fa fa-hospital',
            label: 'Asignar Establecimiento Base',
            action: function(option, contextMenuIndex, optionIndex) {
                Swal.fire({
                    title: "¿Está seguro?",
                    text: "¿Dejar a " + est_nombre + ", como establecimiento base?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si",
                    cancelButtonText: "No"
                }).then((result) => {
                    if (result.isConfirmed) {
                       asignar_estab_base(usu_cod, est_cod, est_nombre);
                    }
                });
            },
            submenu: null,
            disabled: false
        }
    ], e);
}

function copiar_permisos(est_cod, usu_cod) {
    var retorno = false;
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: base_url + "/Configuracion/ctrl_usuarios/data_permisos_usuario/" + usu_cod + "/" + est_cod,
    }).done( function(respuesta) {
        permisos = [];
        for (var i = 0; i < respuesta.length; i++) {
            var id_permiso = respuesta[i].id_permiso;
            permisos.push(id_permiso);
        }
        retorno = true;
    }).fail(function(error){
        retorno = false;
    });
    return retorno;
}

function pegar_permisos(usu_cod) {
    mostrar_standby(true);
    var establecimientos_ = JSON.stringify(establecimientos);
    var permisos_ = JSON.stringify(permisos);
    $.ajax({
        url: "usu_pegar_permisos_usuario.php",
        type: "POST",
        async: false,
        data: {
            usu_cod: usu_cod,
            establecimientos: establecimientos_,
            permisos: permisos_

        },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                alerta.ok("alerta", "Se pegaron los permisos correctamente", 5000);
                $("#grid_est").dataTable().fnReloadAjax(base_url + "/Configuracion/ctrl_usuarios/data_establecimientos/" + usu_cod);
                $('#grid_est').DataTable().order( [ 2, 'desc' ], [ 1, 'desc' ] ).draw();
            } else {
                alerta.error("alerta", respuesta, 5000);
            }
        },
        error: function(error) {
            alerta.error("alerta", error, 5000);
        }
    });

    mostrar_standby(false);
}

function eliminar_permisos(usu_cod) {
    var establecimientos_ = JSON.stringify(establecimientos);
    $.ajax({
        url: "usu_eliminar_permisos_usuario.php",
        type: "POST",
        async: false,
        data: {
            usu_cod: usu_cod,
            establecimientos: establecimientos_
        },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                alerta.ok("alerta", "Se quitaron los permisos correctamente", 5000);
                $("#grid_est").dataTable().fnReloadAjax(base_url + "/Configuracion/ctrl_usuarios/data_establecimientos/" + usu_cod);
                $('#grid_est').DataTable().order( [ 2, 'desc' ], [ 1, 'desc' ] ).draw();
            } else {
                alerta.error("alerta", respuesta, 5000);
            }
        },
        error: function(error) {
            alerta.error("alerta", error, 5000);
        }
    });
}

function contar_establecimientos() {
    establecimientos = [];
    $("#grid_est tr").each(function(value) {
        if ($(this).closest("tr").hasClass("selected")) {
            var fila = $(this).closest("tr");
            var est_cod = fila[0].rowIndex;
            establecimientos.push(est_cod);
        }
    });

    // $("#grid_est").DataTable().column(0).data().each( function ( value, index ) {
    //     console.warn($(this).closest("tr").hasClass("selected"));
    //     console.log( 'Data in index: '+index+' is: '+value );
    // });
}

function contar_permisos() {
    permisos = [];
    $("#grid_perfil tr").each(function(value) {
        if ($(this).closest("tr").hasClass("selected")) {
            var fila = $(this).closest("tr");
            var id_permiso = fila[0].rowIndex;
            permisos.push(id_permiso);
        }
    });
}

function asignar_estab_base(usu_cod, est_cod, est_nombre) {
    $.ajax({
        url: "usu_asignar_estab_base.php",
        type: "POST",
        async: false,
        data: {
            usu_cod: usu_cod,
            est_cod: est_cod
        },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                alerta.ok("alerta", "Se asignó a <strong>" + est_nombre + "</strong>, como establecimiento base", 5000);
                $("#grid_est").dataTable().fnReloadAjax(base_url + "/Configuracion/ctrl_usuarios/data_establecimientos/" + usu_cod);
                $('#grid_est').DataTable().order( [ 2, 'desc' ], [ 1, 'desc' ] ).draw();
            } else {
                alerta.error("alerta", respuesta, 5000);
            }
        },
        error: function(error) {
            alerta.error("alerta", error, 5000);
        }
    });
}

function carga_profesiones() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Configuracion/ctrl_usuarios/carga_profesiones",
    }).done( function(data) {
        $("#cmb_profesion-1").html('');
        var table;     
        table += '<option value=""></option>';
        
        for (var i = 0; i < data.length; i++) {
            table += '<option value="'+data[i].id+'">'+data[i].glosa+'</option>';
                
        }
        
        carga_profesiones = table;
        $("#cmb_profesion-1").append(table);
    }).fail(function(error){
        alerta.error("alerta", error, 3000);
    });
}

function carga_especialidades() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Configuracion/ctrl_usuarios/carga_especialidades",
    }).done( function(data) {
        $("#cmb_especialidad-1").html('');
        var table;     
        table += '<option value=""></option>';
        
        for (var i = 0; i < data.length; i++) {
            table += '<option value="'+data[i].id+'">'+data[i].glosa+'</option>';
        }
        
        carga_especialidades = table;
        $("#cmb_especialidad-1").append(table);
    }).fail(function(error){
        alerta.error("alerta", error, 3000);
    });
}

function boton_multi_singular() {
    $("#grid_perfil td").each(function() {
        $(this).closest("tr").removeClass("selected");
    });

    $("#grid_est td").each(function() {
        $(this).closest("tr").removeClass("selected");
    });
    
    if (multiple) {
        $("#grid_est").DataTable().select.style("single");
        $("#btn_multi").html("<i class=\"fas fa-check-double\"></i>Perfil Múltiple");
        $("#btn_multi").removeClass("btn-info");
        $("#btn_multi").addClass("btn-primary");

        multiple = false;
    } else {
        $("#grid_est").DataTable().select.style("multi");
        $("#btn_multi").html("<i class=\"fas fa-check\"></i>Perfil Singular");
        $("#btn_multi").removeClass("btn-primary");
        $("#btn_multi").addClass("btn-info");

        multiple = true;
        $("#grid_perfil").dataTable().fnReloadAjax("views/usu_carga_perfiles.php");
    }

    $('#id_select_grupo').multiselect('enable');
    $('#id_select_grupo').multiselect('deselectAll', false);
}

function accion_btn_multi(numero) {
    if ($("#btn_fila-" + numero).find("i").hasClass("radiobutton-select")) {
        const MULTIESTAB = 2;
        if ($("#cmb_usu_tipo-" + numero).val() == MULTIESTAB) {
            $("#btn_multi").prop("disabled", false);
        } else {
            $("#btn_multi").prop("disabled", true);
            multiple = true;
            boton_multi_singular();
        }
    }
}

function convertirMayusculas(texto) {
    var text = texto.toUpperCase().trim();
    return text;
}

function grabar_usuario() {
    var fila_radio = $(".radiobutton-select");
    var fila_radio_split = fila_radio[0].id.split("-");
    var numero = fila_radio_split[1];

    crear_reglas_validation();
    var usuario_nuevo;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usu_cod == $("#txt_usu_cod-" + numero).val()) {
            usuario_nuevo = usuarios[0].usuario_nuevo;
            break;
        }
    }
    
    var datos = {
        usu_cod: $("#txt_usu_cod-" + numero).val(),
        nombres: $("#txt_nombres-" + numero).val(),
        ape_pat: $("#txt_ape_paterno-" + numero).val(),
        ape_mat: $("#txt_ape_materno-" + numero).val(),
        usu_tipo: $("#cmb_usu_tipo-" + numero).val(),
        profesion: $("#cmb_profesion-" + numero).val(),
        especialidad: $("#cmb_especialidad-" + numero).val(),
        usuario_nuevo: usuario_nuevo
    }

    if ($("#form_crear_usu_control").valid()) {
        contar_establecimientos();
        contar_permisos();

        if (establecimientos.length > 0 && permisos.length > 0) {
            mostrar_standby(true);

            var establecimientos_ = JSON.stringify(establecimientos);
            var permisos_ = JSON.stringify(permisos);

            datos["establecimientos"] = establecimientos_;
            datos["permisos"] = permisos_;
            datos["id_estab"] = establecimientos[0];

            $.ajax({
                url: base_url + "/Configuracion/ctrl_usuarios/usuario_add_upd",
                type: "POST",
                async: false,
                data: datos,
                success: function(respuesta) {
                    const OK = 1;
                    var respuesta_ = respuesta.split("--");
                    var resp = respuesta_[0];
                    var clave = respuesta_[1];
                    var usuario_nuevo = respuesta_[2];

                    if (resp == OK) {
                        $("#grid_est").dataTable().fnReloadAjax(base_url + "/Configuracion/ctrl_usuarios/data_establecimientos/" + $("#txt_usu_cod-" + numero).val());
                        $('#grid_est').DataTable().order( [ 2, 'desc' ], [ 1, 'desc' ] ).draw();
                        // cargar_datos_user_prof($("#txt_usu_cod-" + numero).val(), numero);
                        $("#grid_perfil td").each(function() {
                            $(this).closest("tr").removeClass("selected");
                        });

                        $("#grid_est").DataTable().select.style("single");
                        $("#btn_multi").html("<i class=\"fas fa-check-double\"></i>Perfil Múltiple");
                        $("#btn_multi").removeClass("btn-info");
                        $("#btn_multi").addClass("btn-primary");
                        $("#btn_multi").prop("disabled", true);

                        multiple = false;

                        if (usuario_nuevo == "true") {
                            Swal.fire({
                                icon: "success",
                                title: "Clave",
                                text: clave,
                                footer: "Copia la clave para enviar"
                            });
                        } else {
                            alerta.ok("alerta", "Usuario guardado de forma correcta", 5000);
                        }
                    } else {
                        alerta.error("alerta", respuesta, 5000);
                    }
                },
                error: function(error) {
                    alerta.error("alerta", error, 5000);
                }
            });

            mostrar_standby(false);
        } else {
            alerta.error("alerta", "Debe seleccionar establecimientos y permisos", 5000);
        }
    }
}

function resetear_clave(numero) {
    var usu_cod = $("#txt_usu_cod-" + numero).val();
    if (usu_cod != "") {
        $.ajax({
            url: base_url + "/Configuracion/ctrl_usuarios/resetear_clave/" + usu_cod,
            type: "POST",
            async: false,
            data: {
                usu_cod: usu_cod
            },
            success: function(clave) {
                Swal.fire({
                    icon: "success",
                    title: "Clave",
                    text: clave,
                    footer: "Copia la clave para enviar"
                });

                var icono_clase = obtener_icon_class(numero);
                $("#estadoUsu-" + numero).find("i").removeClass(icono_clase);
                $("#estadoUsu-" + numero).find("i").addClass("fas fa-user-edit gris");
                $("#estadoUsu-" + numero).attr("title", "Pendiente");
                $("#estadoUsu-" + numero).attr("disabled", true);
            },
            error: function(error) {
                alerta.error("alerta", error, 5000);
            }
        });
    } else {
        alerta.error("alerta", "Debe buscar al usuario");
    }
}

function llenar_grupo_permisos() {
//     $.ajax({
//         type: "GET",
//         dataType: "json",
//         url: "views/usu_data_grupos.php",
//     }).done( function(data) {
        $("#id_select_grupo").html('');
        var table;     
//         for (var i = 0; i < data.length; i++) {
            table+='<option value="1">asdasdsd</option>';
            table+='<option value="2">sdasdasd</option>';
//         }
        $("#id_select_grupo").append(table);
        $("#id_select_grupo").multiselect("rebuild");
        // $("#id_select_grupo").multiselect("disable");
//     }).fail(function(error){
//         alerta.error("alerta", error, 5000);
//     });
}

// function mostrar_permisos_grupo(id_grupo, checked) {
//     $.ajax({
//         type: "POST",
//         dataType: "json",
//         url: "views/usu_data_permisos_grupo.php",
//         data: {
//             id_grupo: id_grupo
//         }
//     }).done( function(respuesta) {
//         for (var i = 0; i < respuesta.length; i++) {
//             var id_permiso = respuesta[i].PERMISO;
//             $("#grid_perfil td").each(function() {
//                 var cellText = $(this).html();

//                 if (cellText == id_permiso) {
//                     if (checked) {
//                         $(this).closest("tr").addClass("selected");
//                     } else {
//                         $(this).closest("tr").removeClass("selected");
//                     }
//                 }
//             });
//         }

//         // $('#grid_perfil').DataTable().order().draw();
//     }).fail(function(error){
//         alerta.error("alerta", error, 5000);
//     });
// }

// function grabar_todos_usuarios() {
//     if (usuarios.length > 1) {
//         crear_reglas_validation();
//         contar_establecimientos();

//         if ($("#form_crear_usu_control").valid()) {
//             var multiestab = true;
//             var multimensaje;
//             $.each(usuarios, function(index, value){
//                 var numero = value.numero;

//                 if (establecimientos.length > 1) {
//                     if ($("#cmb_usu_tipo-" + numero).val() == "UF") {
//                         multiestab = false;
//                         multimensaje = "Usuario " + $("#txt_usu_cod-" + numero).val() + ", no es <strong>Multi-Establecimiento</strong>";
//                     }
//                 }

//                 value.nombres = $("#txt_nombres-" + numero).val();
//                 value.ape_pat = $("#txt_ape_paterno-" + numero).val();
//                 value.ape_mat = $("#txt_ape_materno-" + numero).val();
//                 value.usu_tipo = $("#cmb_usu_tipo-" + numero).val();
//                 value.profesion = $("#cmb_profesion-" + numero).val();
//                 value.especialidad = $("#cmb_especialidad-" + numero).val();
//             });
            
//             if (multiestab) {
//                 if (establecimientos.length > 0) {
//                     contar_permisos();
//                     if (permisos.length > 0) {
//                         mostrar_standby(true);
//                         var establecimientos_ = JSON.stringify(establecimientos);
//                         var permisos_ = JSON.stringify(permisos);
//                         var usuarios_ = JSON.stringify(usuarios);
//                         var est_cod = establecimientos[0];

//                         var datos = {
//                             usuarios: usuarios,
//                             establecimientos: establecimientos_,
//                             permisos: permisos_,
//                             est_cod: est_cod
//                         }

//                         $.ajax({
//                             url: "usu_usuarios_todos_add.php",
//                             type: "POST",
//                             async: false,
//                             data: datos,
//                             dataType: "json",
//                             success: function(respuesta) {
//                                 if (respuesta.length > 0) {
//                                     var response = "";

//                                     for (var i = 0; i < respuesta.length; i++) {
//                                         if (respuesta[i].usuario_nuevo == "true") {
//                                             response += "Usuario: " + respuesta[i].usu_cod + ", Clave: \"<strong>" + respuesta[0].clave + "</strong>\".<br>";
//                                             var icono_clase = obtener_icon_class(respuesta[i].numero);
//                                             $("#estadoUsu-" + respuesta[i].numero).find("i").removeClass(icono_clase);
//                                             $("#estadoUsu-" + respuesta[i].numero).find("i").addClass("fas fa-user-edit gris");
//                                             $("#estadoUsu-" + respuesta[i].numero).attr("title", "Pendiente");
//                                             $("#estadoUsu-" + respuesta[i].numero).prop("disabled", true);

//                                             $.each(usuarios, function(index, value){
//                                                 if (value.numero == respuesta[i].numero) {
//                                                     value.usuario_nuevo = false;
//                                                 }
//                                             });
//                                         } else {
//                                             response += "Usuario: " + respuesta[i].usu_cod + ", se asignó el perfil solicitado.<br>";
//                                         }
//                                     }

//                                     $("#grid_est").DataTable().clear().draw();
//                                     $("#grid_perfil td").each(function() {
//                                         $(this).closest("tr").removeClass("selected");
//                                     });

//                                     for (var e = 1; e <= numero_id.length; e++) {
//                                         $("#radio_fila-" + e).addClass("radiobutton-deselect");
//                                         $("#radio_fila-" + e).removeClass("radiobutton-select");
//                                     }

//                                     $("#grid_est").DataTable().select.style("single");
//                                     $("#btn_multi").html("<i class=\"fas fa-check-double\"></i>Perfil Múltiple");
//                                     $("#btn_multi").removeClass("btn-info");
//                                     $("#btn_multi").addClass("btn-primary");
//                                     $("#btn_multi").prop("disabled", true);
//                                     multiple = false;

//                                     Swal.fire({
//                                         icon: "success",
//                                         title: "Clave",
//                                         html: response,
//                                         footer: "Copia la clave para enviar"
//                                     });
//                                 } else {
//                                     alerta.error("alerta", String(respuesta), 5000);
//                                 }
//                             },
//                             error: function(error) {
//                                 alerta.error("alerta", error, 5000);
//                             }
//                         });

//                         mostrar_standby(false);
//                     } else {
//                         alerta.error("alerta", "Debe seleccionar al menos un permiso");
//                     }
//                 } else {
//                     alerta.error("alerta", "Debe seleccionar al menos un establecimiento");
//                 }
//             } else {
//                 alerta.error("alerta", multimensaje);
//             }
//         }
//     } else {
//         alerta.error("alerta", "Debe haber más de un usuario para poder realizar esta acción");
//     }
// }

function mostrar_standby(mostrar) {
    if (mostrar) {
        $("#divStandBy").addClass("standby");
        $("#divSpinner").addClass("spinner-border");
        $("#divSpinner").addClass("spinner-center");
    } else {
        $("#divStandBy").removeClass("standby");
        $("#divSpinner").removeClass("spinner-border");
        $("#divSpinner").removeClass("spinner-center");
    }
}

function crear_reglas_validation() {
    for (var i = 0; i < usuarios.length; i++) {
        var numero = usuarios[i].numero;

        $("#txt_usu_cod-" + numero).rules("add", { 
            required: true,
            maxlength: 10,
            messages: { 
                required: "El RUT es obligatorio",
                maxlength: "Máximo 10 caracteres"
            }
        });
        
        $("#txt_nombres-" + numero).rules("add", { 
            required: true,
            maxlength: 20,
            messages: { 
                required: "Los nombres son obligatorios",
                maxlength: "Máximo 20 caracteres"
            }
        });
        
        $("#txt_ape_paterno-" + numero).rules("add", { 
            required: true,
            maxlength: 20,
            messages: { 
                required: "Apellido Materno es obligatorio",
                maxlength: "Máximo 15 caracteres"
            }
        });
        
        $("#txt_ape_materno-" + numero).rules("add", { 
            required: true,
            maxlength: 15,
            messages: { 
                required: "Apellido Paterno es obligatorio",
                maxlength: "Máximo 20 caracteres"
            }
        });

        $("#cmb_usu_tipo-" + numero).rules("add", { 
            required: true,
            messages: { 
                required: "El tipo de usuario es obligatorio"
            }
        });

        $("#cmb_profesion-" + numero).rules("add", { 
            required: true,
            messages: { 
                required: "La profesión es obligatoria" 
            }
        });;
    }
}

function desbloquear_usuario(numero, truefalse) {
    if (truefalse) {
        var titulo = "Desbloquear usuario";
        var texto = "¿Desbloquear usuario?"
    } else {
        var titulo = "Bloquear usuario";
        var texto = "¿Bloquear usuario?"
    }

    Swal.fire({
        title: titulo,
        text: texto,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            var usu_cod = $("#txt_usu_cod-" + numero).val();
           $.ajax({
                url: base_url + "/Configuracion/ctrl_usuarios/desbloquear_usuario/" + usu_cod + "/" + truefalse,
                type: "GET",
                async: false,
                success: function(respuesta) {
                    const OK = 1;
                    if (respuesta == OK) {
                        if (truefalse) {
                            alerta.ok("alerta", "Desbloqueo exitoso", 5000);
                            $("#icon-" + numero).removeClass("fa-user-lock rojo");
                            $("#icon-" + numero).addClass("fa-user-check verde");
                            $("#estadoUsu-" + numero).attr("title", "Activo");
                        } else {
                            alerta.ok("alerta", "Bloqueo exitoso", 5000);
                            $("#icon-" + numero).removeClass("fa-user-check verde");
                            $("#icon-" + numero).addClass("fa-user-lock rojo");
                            $("#estadoUsu-" + numero).attr("title", "Bloqueado");
                        }
                    } else {
                        alerta.error("alerta", respuesta);
                    }
                },
                error: function(error) {
                    alerta.error("alerta", error, 5000);
                }
            });
        }
    });
}

$(document).ready(function() {
    document.oncontextmenu = function() {return false;};
    var usu_cod_ini = $("#usu_cod").val().trim();
    
    var maxField = 10;
    var x1 = 1;
    var x2 = 1;
    
    $("#btn_fila-1").prop("disabled", true);
    $("#estadoUsu-1").prop("disabled", true);
    $("#btn_multi").prop("disabled", true);
    $("#removeUsu-1").prop("disabled", true);

    $("#btn_multi").click(function() {
        boton_multi_singular() 
    });

    $("#icon_usuario_add").click(function(){ 
        if(x1 < maxField){ 
            x1++;
            x2++;
            numero_id.push(x2);
            var fieldHTML1 = ""; 
            fieldHTML1 += '<hr id="hr-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += '<div id="row1-' + numero_id[numero_id.length-1] + '" class="row">';
            fieldHTML1 += ' <div class="col-xl-1 col-lg-1">';
            fieldHTML1 += '     <button type="button" class="btn btn-default" role="group" id="btn_fila-' + numero_id[numero_id.length-1] + '"><i id="radio_fila-' + numero_id[numero_id.length-1] + '" class="far fa-circle radiobutton-deselect" data-toggle="tooltip" data-placement="left" title="Nuevo"></i></button>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-2 col-lg-2">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">Rut:</label>';
            fieldHTML1 += '     <input type="text" class="form-control" name="txt_usu_cod-' + numero_id[numero_id.length-1] + '" id="txt_usu_cod-' + numero_id[numero_id.length-1] + '" placeholder="11111111-1">';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-4 col-lg-4">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">Nombres:</label>';
            fieldHTML1 += '     <input type="text" class="form-control" name="txt_nombres-' + numero_id[numero_id.length-1] + '" id="txt_nombres-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-2 col-lg-2">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">A.Paterno:</label>';
            fieldHTML1 += '     <input type="text" class="form-control" name="txt_ape_paterno-' + numero_id[numero_id.length-1] + '" id="txt_ape_paterno-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-2 col-lg-2">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">A.Materno:</label>';
            fieldHTML1 += '     <input type="text" class="form-control" name="txt_ape_materno-' + numero_id[numero_id.length-1] + '" id="txt_ape_materno-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += ' </div>';
            fieldHTML1 += '</div>';
            fieldHTML1 += '<div id="row2-' + numero_id[numero_id.length-1] + '" class="row">';
            fieldHTML1 += ' <div class="col-xl-2 col-lg-2">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">Tipo de Usuario:</label>';
            fieldHTML1 += '     <select class="form-control" name="cmb_usu_tipo-' + numero_id[numero_id.length-1] + '" id="cmb_usu_tipo-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += '         <option value="UF">Usuario Final</option>';
            fieldHTML1 += '         <option value="ME">Usuario Multi-Establecimiento</option>';
            fieldHTML1 += '     </select>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-3 col-lg-3">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">Profesión:</label>';
            fieldHTML1 += '     <select class="form-control" name="cmb_profesion-' + numero_id[numero_id.length-1] + '" id="cmb_profesion-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += '     </select>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-3 col-lg-3">';
            fieldHTML1 += '     <label class="col-xl-12 control-label">Especialidad:</label>';
            fieldHTML1 += '     <select class="form-control" name="cmb_especialidad-' + numero_id[numero_id.length-1] + '" id="cmb_especialidad-' + numero_id[numero_id.length-1] + '">';
            fieldHTML1 += '     </select>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-1 col-lg-1">';
            fieldHTML1 += '     <button type="button" class="btn btn-default" id="resetkey-' + numero_id[numero_id.length-1] + '"><i class="fas fa-key" style="padding-top: 18px;color:#4c6ef5;font-size: 35px;"></i></button>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-1 col-lg-1">';
            fieldHTML1 += '     <button type="button" class="btn btn-default" id="removeUsu-' + numero_id[numero_id.length-1] + '"><i class="fas fa-minus-circle" style="padding-top: 18px;color:red;font-size: 35px;"></i></button>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += ' <div class="col-xl-1 col-lg-1">';
            fieldHTML1 += '     <button type="button" class="btn btn-default" id="estadoUsu-' + numero_id[numero_id.length-1] + '"><i id="icon-' + numero_id[numero_id.length-1] + '" class="fas fa-user" style="padding-top: 18px;;font-size: 35px;"></i></button>';
            fieldHTML1 += ' </div>';
            fieldHTML1 += '</div>';
            
            $("#field_wrapper1").append(fieldHTML1); 
            $("#btn_fila-" + numero_id[numero_id.length-1]).prop("disabled", true);
            $("#cmb_profesion-" + numero_id[numero_id.length-1]).append(carga_profesiones);
            $("#cmb_especialidad-" + numero_id[numero_id.length-1]).append(carga_especialidades);
            $("#estadoUsu-" + numero_id[numero_id.length-1]).prop("disabled", true);
        }
    });

    for (var i = 1; i <= 20; i++) {
        $("#field_wrapper1").on("click", "#removeUsu-" + i, function(e){ 
            var id = this.id.split("-");
            var numero = id[1];

            for (var i = 0; i < usuarios.length; i++) {
                if (usuarios[i].numero == numero) {
                    usuarios.splice(i, 1);
                }
            }

            $("#hr-" + numero).remove();
            $("#row1-" + numero).remove();
            $("#row2-" + numero).remove();

            x1--;
            numero_id.splice(i, 1);
        });

        $("#field_wrapper1").on("click", "#btn_fila-" + i, function(e){
            var id = this.id.split("-");
            var numero = id[1];
            seleccionar_fila(numero, maxField);
        });

        $("#field_wrapper1").on("blur", "#txt_usu_cod-" + i, function(e){ 
            var usu_cod = this.value;
            var id = this.id.split("-");
            var numero = id[1];
            if (Fn.validaRut(usu_cod)) {
                cargar_datos_user_prof(usu_cod, numero);
            } else if (usu_cod != "") {
                alerta.error("alerta", "<strong>RUT incorrecto</strong>", 3000);
                $("#txt_usu_cod-" + numero).val("");
                setTimeout(function() { $("#txt_usu_cod-" + numero).focus(); }, 100);
            }
        });

        $("#field_wrapper1").on("keypress", "#txt_usu_cod-" + i, function(e){ 
            if (e.keyCode == 13) {
                this.blur();
            }
        });

        $("#field_wrapper1").on("change", "#cmb_usu_tipo-" + i, function(e){
            var id = this.id.split("-");
            var numero = id[1];
            accion_btn_multi(numero);
        });

        $("#field_wrapper1").on("blur", "#txt_nombres-" + i, function(e){
            this.value = convertirMayusculas(this.value);
        });

        $("#field_wrapper1").on("blur", "#txt_ape_paterno-" + i, function(e){
            this.value = convertirMayusculas(this.value);
        });

        $("#field_wrapper1").on("blur", "#txt_ape_materno-" + i, function(e){
            this.value = convertirMayusculas(this.value);
        });

        $("#field_wrapper1").on("click", "#resetkey-" + i, function(e){
            var id = this.id.split("-");
            var numero = id[1];
            resetear_clave(numero);
        });

        $("#field_wrapper1").on("click", "#estadoUsu-" + i, function(e){
            var id = this.id.split("-");
            var numero = id[1];

            if (this.title == "Bloqueado") {
                desbloquear_usuario(numero, true);
            } else if (this.title == "Activo") {
                desbloquear_usuario(numero, false);
            }
        });
    }

 
    var vgridest = $('#grid_est').DataTable({
        responsive: true,
        paging:   false,
        scrollY: '50vh',
        scrollCollapse: true,
        destroy:true,
        // ajax: base_url + "/Configuracion/ctrl_usuarios/data_establecimientos",
        columns: [
            { "data": "id" },
            { "data": "nombre" },
            { "data": "permisos" },
            { "data": "estab_base", "render": function(data, type, row) {
                if ( data == "*" ){
                    icon_est = "<center><div><i class='fas fa-hospital' style='color:gray; font-size: 20px;' data-toggle='tooltip' data-placement='left' title='Establecimiento base'></i></div></center>";
                } else {
                    icon_est = '<center>...</center>';
                }

                return icon_est;
            }},
        ],
        select: {
            "style": "single"
        },
        "createdRow": function( row, data, dataIndex ) {
            $(row).attr("id", data["id"]);
        },
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "select": {
                "rows": "<br/>%d Establecimientos Seleccionados"
            },
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Sig.",
                "previous": "Ant."
            }
        },
        "fnRowCallback": function(nRow,data,iDisplayIndex, iDisplayIndexFull) {
            $(nRow).on('mousedown', function(e){
                if( e.button == 2 ) {
                    menu_permisos(data.id, data.nombre, data.permisos, e);
                    return false;
                }
                
                return true;
            });
        }
    });

    $("#grid_est tbody").on("click", "tr", function () {
        if (!multiple) {
            var data = vgridest.row($(this)).data();
            // var est_cod = data["ID"];
            // $("#grid_perfil").dataTable().fnReloadAjax("views/usu_carga_perfiles.php?est_cod=" + est_cod);
            $('#id_select_grupo').multiselect('enable');
            $('#id_select_grupo').multiselect('deselectAll', false);
            mostrar_permisos_estab(data);
        }
    });


    var vgridperfil = $('#grid_perfil').DataTable({
        responsive: true,
        paging: false,
        scrollY: '50vh',
        scrollCollapse: true,
        destroy:true,
        ajax: base_url + "/Configuracion/ctrl_usuarios/data_permisos",
        orderClasses: true,
        columns: [
            { "data":"id" },
            { "data": "nombre" },
        ],
        select: {
            "style": "multi"
        },
        createdRow: function( row, data, dataIndex ) {
            $(row).attr("id", data["ID"]);
        },
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "select": {
                "rows": "<br/>%d Perfiles Seleccionados"
            },
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Sig.",
                "previous": "Ant."
            }
        }
    });

    $("#grid_perfil").on( "select", function () {
        rowEst = vgridperfil.rows( { selected: true } ).data().pluck( 'ID' ).toArray();
    });

    $("#id_select_grupo").multiselect({
        buttonWidth: '100%',
        maxHeight: 400,
        dropRight:true,
        enableFiltering: true,
        filterPlaceholder: 'Buscar por glosa...',
        onChange: function(option, checked, select) {
            // mostrar_permisos_grupo(option[0].value, checked);
        },
        buttonText: function(options) {
            if (options.length === 0) {
                return 'Nada seleccionado';
            } else if (options.length > 3) {
                return options.length + ' seleccionados';
            } else {
                var selected = [];
                options.each(function() {
                    selected.push([$(this).text(), $(this).data('order')]);
                });

                selected.sort(function(a, b) {
                    return a[1] - b[1];
                });

                var text = '';
                for (var i = 0; i < selected.length; i++) {
                    text += selected[i][0] + ', ';
                }

                return text.substr(0, text.length -2);
            }
        },
        disableIfEmpty: true
    });

    $("#btn_grabar").on("click", function(){
        grabar_usuario();
    });

    $("#btn_limpiar").on("click", function(){
        limpiar();
        x1 = 1;
    });

    // $("#btn_grabar_todos").on("click", function(){
    //     grabar_todos_usuarios();
    // });

    carga_profesiones();
    carga_especialidades();
    llenar_grupo_permisos();

    $("#form_crear_usu_control").validate({
        debug: true,
        errorClass: "my-error-class",
        highlight: function (element, required) {
            $(element).fadeOut(function () {
                $(element).fadeIn();
                $(element).css('border', '2px solid #FDADAF');
            });
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).css('border', '1px solid #CCC');
        }
    });

    if (usu_cod_ini != "") {
        $("#txt_usu_cod-1").val(usu_cod_ini);
        $("#txt_usu_cod-1").blur();
    }
});