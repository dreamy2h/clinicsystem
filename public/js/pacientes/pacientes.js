var cupos_disponibles;

function des_habilitar(a, b) {
	$("#btn_nuevo").prop("disabled", b);
    $("#btn_modificar").prop("disabled", a);
    $("#btn_anular").prop("disabled", a);
    $("#btn_aceptar").prop("disabled", a);
    $("#btn_cancelar").prop("disabled", a);
    $("#btn_buscar").prop("disabled", b);

	$("#cmb_tipo_identificacion").prop("disabled", a)
	$("#txt_identificacion").prop("disabled", a)
	$("#txt_rut").prop("disabled", a)
	$("#txt_nombres").prop("disabled", a)
	$("#txt_apepat").prop("disabled", a)
	$("#txt_apemat").prop("disabled", a)
	$("#cmb_prevision").prop("disabled", a)
	$("#cmb_sexo").prop("disabled", a)
	$("#txt_email").prop("disabled", a)
	$("#cmb_region").prop("disabled", a)
	$("#cmb_provincia").prop("disabled", a)
	$("#cmb_comuna").prop("disabled", a)
	$("#txt_calle").prop("disabled", a)
	$("#txt_numero_direccion").prop("disabled", a)
	$("#txt_resto_direccion").prop("disabled", a)
	$("#txt_fono_fijo").prop("disabled", a)
	$("#txt_fono_movil").prop("disabled", a)
	$("#dt_fecha_nacimiento").prop("disabled", a)
	$("#dt_fecha_fallecimiento    ").prop("disabled", a)
}

function llenar_cmb_tipo_atencion() {
	$.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Agenda/ctrl_ingreso_agenda/llenar_cmb_tipo_atencion",
    }).done( function(data) {
        $("#cmb_tipo_atencion").html('');
        var opciones = "<option value=\"\">Seleccione un tipo de atención</option>";
        
        for (var i = 0; i < data.length; i++) {
            opciones += "<option value=\"" + data[i].id + "\">" + data[i].glosa + "</option>";
        }

        $("#cmb_tipo_atencion").append(opciones);
    }).fail(function(error){
        alerta.error("alerta_detage", error, 3000);
    });
}

function guardar_distdet() {
	var id_dist = $("#txt_id_dist").val();
	var id_det = $("#txt_id_agenda_det").val();
	var tipo_atencion = $("#cmb_tipo_atencion").val();
	var cupos = $("#txt_cupos_dist").val();
    var id_agenda = $("#txt_id_agenda").val();

	if (cupos > cupos_disponibles) {
		alerta.aviso("alerta_detage", "Los cupos ingresados, superan a los cupos disponibles");
	} else {
		$.ajax({
	        url: base_url + "/Agenda/ctrl_ingreso_agenda/guardar_detalle_distribucion",
	        type: "POST",
	        async: false,
	        data: {
	            id_dist: id_dist,
	            id_det: id_det,
	            tipo_atencion: tipo_atencion,
	            cupos: cupos,
                id_agenda: id_agenda
	        },
	        success: function(respuesta) {
	            const OK = 1;
	            if (respuesta == OK) {
	                $("#grid_distribucion").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_distribucion/" + id_det);
	                des_habilitar(true, false);
	                alerta.ok("alerta_detage", "Distribución guardada con éxito");
	            } else {
	                alerta.error("alerta_detage", respuesta);
	            }
	        },
	        error: function(error) {
	        	respuesta = JSON.parse(error["responseText"]);
	            alerta.error("alerta_detage", respuesta.message);
	        }
	    });
	}
}

function mostrar_datos_distribucion(data) {
    var id_dist = data["id"];
    var id_tipo_ate = data["id_tipo_ate"];
    var cupos = data["cupos"];

    $("#txt_id_dist").val(id_dist);
    $("#cmb_tipo_atencion").val(id_tipo_ate);
    $("#txt_cupos_dist").val(cupos);
}

function eliminar_paciente() {
	var id_dist = $("#txt_id_dist").val();
    var id_agenda = $("#txt_id_agenda").val();

	$.ajax({
        url: base_url + "/Agenda/ctrl_ingreso_agenda/eliminar_distribucion",
        type: "POST",
        async: false,
        data: { 
            id_dist: id_dist,
            id_agenda: id_agenda
        },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                $("#grid_distribucion").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_distribucion/" + $("#txt_id_agenda_det").val());
                alerta.ok("alerta_detage", "Distribución eliminada con éxito");
            } else {
                alerta.error("alerta_detage", respuesta);
            }
        },
        error: function(error) {
        	respuesta = JSON.parse(error["responseText"]);
            alerta.error("alerta_detage", respuesta.message);
        }
    });
}

$(document).ready(function() {
    $("#btn_nuevo_dist").on("click", function() {
        des_habilitar(false, true);
        $("#form_pacientes")[0].reset();

        $("#btn_modificar").prop("disabled", true);
        $("#btn_anular").prop("disabled", true);
        $("#txt_id_paciente").val("");
    });

    $("#btn_modificar").on("click", function() {
        des_habilitar(false, true);
        $("#btn_modificar").prop("disabled", true);
        $("#btn_anular").prop("disabled", true);
    });

    $("#btn_anular").on("click", function() {
    	Swal.fire({
            title: "¿Eliminar Paciente?",
            text: "¿Está seguro de eliminar este paciente?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
               eliminar_paciente();
            }
        });
    });


	$("#btn_aceptar").on("click", function() {
		if ($("#form_pacientes").valid()) {
			guardar_paciente();
		}
	});

    $("#btn_cancelar").on("click", function() {
        des_habilitar(true, false);
        $("#form_pacientes")[0].reset();
    });

    $("#form_pacientes").validate({
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
        },
        rules:  {
            txt_nombres: {
                required: true,
                maxlength: 45
            },
            txt_apepat: {
                required: true,
                maxlength: 45
            },
            txt_apemat: {
                required: true,
                maxlength: 45
            },
            cmb_sexo: {
                required: true
            },
            txt_numero_direccion: {
            	number: true,
            	maxlength: 5
            }
        },
        messages: {
            txt_nombres: {
                required: "El nombre es obligario",
                maxlength: "Sobre pasa el largo de caracteres"
            },
            txt_apepat: {
                required: "El apellido paterno es obligario",
                maxlength: "Sobre pasa el largo de caracteres"
            },
            txt_apemat: {
                required: "El apellido materno es obligario",
                maxlength: "Sobre pasa el largo de caracteres"
            },
            cmb_sexo: {
                required: "El sexo es obligario"
            },
            txt_numero_direccion: {
            	number: "Solo números",
            	maxlength: "Sobre pasa el largo de caracteres"
            }
        }
    });

    des_habilitar(true, false);
});