var base_url = $("#txt_base_url").val();

function des_habilitar(a, b) {
	$("#cmb_especialidad").prop("disabled", a);
	$("#cmb_profesional").prop("disabled", a);
	$("#btn_aceptar").prop("disabled", a);
	$("#btn_cancelar").prop("disabled", a);
	$("#btn_nuevo").prop("disabled", b);
}

function llenar_cmb_especialidad() {
	$.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Agenda/ctrl_agenda_prof/llenar_cmb_especialidades",
    }).done( function(data) {
        $("#cmb_especialidad").html("");
        var opciones = "<option value=\"\">Seleccione una especialidad</option>";
        
        for (var i = 0; i < data.length; i++) {
            opciones += "<option value=\"" + data[i].id + "\">" + data[i].glosa + "</option>";
        }

        $("#cmb_especialidad").append(opciones);
    }).fail(function(error){
        alerta.error("alerta", error, 3000);
    });
}

function llenar_cmb_profesional() {
	$.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Agenda/ctrl_agenda_prof/llenar_cmb_profesional",
    }).done( function(data) {
        $("#cmb_profesional").html('');
        var opciones = "<option value=\"\">Seleccione un profesional</option>";
        
        for (var i = 0; i < data.length; i++) {
            opciones += "<option value=\"" + data[i].usu_cod + "\">" + data[i].nombres + " " + data[i].ape_pat + " " + data[i].ape_mat + "</option>";
        }

        $("#cmb_profesional").append(opciones);
    }).fail(function(error){
        alerta.error("alerta", error, 3000);
    });
}

function guardar_agenda_profesionales() {
	var especialidad = $("#cmb_especialidad").val();
	var profesional = $("#cmb_profesional").val();

	$.ajax({
        url: base_url + "/Agenda/ctrl_agenda_prof/guardar_agenda_profesionales",
        type: "POST",
        async: false,
        data: {
        	especialidad: especialidad,
        	profesional: profesional
        },
        success: function(respuesta) {
        	const OK = 1;
        	if (respuesta == OK) {
        		$("#grid_age_profesional").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_agenda_prof/datatable_agendas_profesionales");
        		$("#form_agendas_prof")[0].reset();
				des_habilitar(true, false);
        		alerta.ok("Se asignó correctamente la especialidad al profesional");
        	} else {
        		alerta.error("alerta", respuesta);
        	}
        },
        error: function(error) {
        	alerta.error("alerta", error);
        }
    });
}

$(document).ready(function() {
	des_habilitar(true, false);
	llenar_cmb_especialidad();
	llenar_cmb_profesional();

	$("#btn_nuevo").on("click", function() {
		des_habilitar(false, true);
	});

	$("#btn_aceptar").on("click", function() {
		guardar_agenda_profesionales();
	});

	$("#btn_cancelar").on("click", function() {
		$("#form_agendas_prof")[0].reset();
		des_habilitar(true, false);
	});

    $("#grid_age_profesional").DataTable({
    	responsive: true,
        paging: true,
        scrollY: '50vh',
        scrollCollapse: true,
        destroy:true,
        ajax: base_url + "/Agenda/ctrl_agenda_prof/datatable_agendas_profesionales",
        orderClasses: true,
        columns: [
            { "data":"especialidad" },
            { "data": "profesional" }
        ],
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
});