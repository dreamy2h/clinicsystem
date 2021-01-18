var base_url = $("#txt_base_url").val();

function des_habilitar(a, b) {
	$("#btn_nuevo").prop("disabled", b);
	$("#btn_modificar").prop("disabled", a);
	$("#btn_anular").prop("disabled", a);
	$("#btn_aceptar").prop("disabled", a);
	$("#btn_cancelar").prop("disabled", a);
	$("#btn_generar").prop("disabled", a);

	$("#cmb_especialidad").prop("disabled", a);
	$("#cmb_profesional").prop("disabled", a);
	$("#txt_sobrecupo").prop("disabled", a);
	$("#cmb_reemplazo").prop("disabled", a);
	$("#dt_fecha_inicio").prop("disabled", a);
	$("#dt_fecha_fin").prop("disabled", a);
}

function llenar_cmb_especialidad() {
	$.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Agenda/ctrl_ingreso_agenda/llenar_cmb_especialidad",
    }).done( function(data) {
        $("#cmb_especialidad").html('');
        var opciones = "<option value=\"\">Seleccione una especialidad</option>";
        
        for (var i = 0; i < data.length; i++) {
            opciones += "<option value=\"" + data[i].id + "\">" + data[i].glosa + "</option>";
        }

        $("#cmb_especialidad").append(opciones);
    }).fail(function(error){
        respuesta = JSON.parse(error["responseText"]);
        alerta.error("alerta", respuesta.message);
    });
}

function llenar_cmb_profesional() {
	var especialidad = $("#cmb_especialidad").val();

	$.ajax({
        type: "GET",
        dataType: "json",
        url: base_url + "/Agenda/ctrl_ingreso_agenda/llenar_cmb_profesional/" + especialidad,
    }).done( function(data) {
        $("#cmb_profesional").html('');
        $("#cmb_reemplazo").html('');
        var opciones = "<option value=\"\">Seleccione un profesional</option>";
        
        for (var i = 0; i < data.length; i++) {
            opciones += "<option value=\"" + data[i].usu_cod + "\">" + data[i].profesional + "</option>";
        }

        $("#cmb_profesional").append(opciones);
        $("#cmb_reemplazo").append(opciones);
    }).fail(function(error){
        respuesta = JSON.parse(error["responseText"]);
        alerta.error("alerta", respuesta.message);
    });
}

function mostrar_datos_agenda(data) {
	var id_agenda = data["id"];
	var id_especialidad = data["id_especialidad"];
    var usu_cod_prof = data["usu_cod_prof"];
    var sobre_cupo = data["sobre_cupo"];
    var usu_cod_reemplaza = data["usu_cod_reemplaza"];
    var fecha_ini = data["fecha_ini"];
    var fecha_fin = data["fecha_fin"];

    $("#txt_id_agenda").val(id_agenda);
    $("#cmb_especialidad").val(id_especialidad);
    $("#cmb_profesional").val(usu_cod_prof);
    $("#txt_sobrecupo").val(sobre_cupo);
    $("#cmb_reemplazo").val(usu_cod_reemplaza);
    $("#dt_fecha_inicio").val(fecha_ini);
    $("#dt_fecha_fin").val(fecha_fin);
}

function guardar_agenda() {
	var id_agenda = $("#txt_id_agenda").val();
	var id_especialidad = $("#cmb_especialidad").val();
	var usu_cod_prof = $("#cmb_profesional").val();
	var sobre_cupo = $("#txt_sobrecupo").val();
	var usu_cod_reemplazo = $("#cmb_reemplazo").val();
	var fecha_ini = $("#dt_fecha_inicio").val();
	var fecha_fin = $("#dt_fecha_fin").val();

	$.ajax({
        url: base_url + "/Agenda/ctrl_ingreso_agenda/guardar_agenda",
        type: "POST",
        async: false,
        data: {
        	id_agenda: id_agenda,
        	id_especialidad: id_especialidad,
        	usu_cod_prof: usu_cod_prof,
        	sobre_cupo: sobre_cupo,
        	usu_cod_reemplazo: usu_cod_reemplazo,
        	fecha_ini: fecha_ini,
        	fecha_fin: fecha_fin
        },
        success: function(respuesta) {
        	const OK = 1;
        	if (respuesta == OK) {
        		$("#grid_agendas").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agendas");
        		$("#form_agendas")[0].reset();
				des_habilitar(true, false);
        		alerta.ok("alerta", "Agenda guardada con éxito");
        	} else {
        		alerta.error("alerta", respuesta);
        	}
        },
        error: function(error) {
        	respuesta = JSON.parse(error["responseText"]);
            alerta.error("alerta", respuesta.message);
        }
    });
}

function anular_agenda() {
    var id_agenda = $("#txt_id_agenda").val();

    $.ajax({
        url: base_url + "/Agenda/ctrl_ingreso_agenda/anular_agenda",
        type: "POST",
        async: false,
        data: { id_agenda: id_agenda },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                $("#grid_agendas").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agendas");
                alerta.ok("alerta", "Agenda anulada con éxito");
            } else {
                alerta.error("alerta", respuesta);
            }
        },
        error: function(error) {
            respuesta = JSON.parse(error["responseText"]);
            alerta.error("alerta", respuesta.message);
        }
    });
}

function generar_agenda() {
    var id_agenda = $("#txt_id_agenda").val();

    $.ajax({
        url: base_url + "/Agenda/ctrl_ingreso_agenda/generar_agenda",
        type: "POST",
        async: false,
        data: { id_agenda: id_agenda },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                $("#grid_agendas").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agendas");
                alerta.ok("alerta", "Agenda generada con éxito");
            } else {
                alerta.error("alerta", respuesta);
            }
        },
        error: function(error) {
            respuesta = JSON.parse(error["responseText"]);
            alerta.error("alerta", respuesta.message);
        }
    });
}

$(document).ready(function() {
	des_habilitar(true, false);
	llenar_cmb_especialidad();
	llenar_cmb_profesional();

	$("#form_agendas").validate({
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
            cmb_especialidad: {
                required: true
            },
            cmb_profesional: {
                required: true
            },
            dt_fecha_inicio: {
                required: true
            },
            dt_fecha_fin: {
                required: true
            }
        },
        messages: {
            cmb_especialidad: {
                required: "Seleccione una especialidad",
            },
            cmb_profesional: {
                required: "Seleccione un profesional"
            },
            dt_fecha_inicio: {
                required: "Seleccione una fecha"
            },
            dt_fecha_fin: {
                required: "Seleccione una fecha"
            }
        }
    });

	$("#btn_nuevo").on("click", function() {
		des_habilitar(false, true);
		$("#form_agendas")[0].reset();

		$("#btn_modificar").prop("disabled", true);
		$("#btn_anular").prop("disabled", true);
		$("#btn_generar").prop("disabled", true);
	});

	$("#btn_modificar").on("click", function() {
		des_habilitar(false, true);
		$("#btn_modificar").prop("disabled", true);
		$("#btn_anular").prop("disabled", true);
		$("#btn_generar").prop("disabled", true);
	});

    $("#btn_anular").on("click", function() {
        Swal.fire({
            title: "¿Eliminar Agenda?",
            text: "¿Está seguro de eliminar esta Agenda?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
               anular_agenda();
            }
        });
    });

	$("#btn_aceptar").on("click", function() {
		if ($("#form_agendas").valid()) {
			guardar_agenda();
		}
	});

	$("#btn_cancelar").on("click", function() {
		$("#form_agendas")[0].reset();
		des_habilitar(true, false);
	});

    $("#btn_generar").on("click", function() {
        generar_agenda();
    });

	$("#cmb_especialidad").on("change", function() {
		if ($("#cmb_especialidad").val() != "") {
			llenar_cmb_profesional();
		}
	});

	var grid_agendas = $("#grid_agendas").DataTable({
		responsive: true,
        paging: true,
        scrollY: '50vh',
        scrollCollapse: true,
        destroy: true,
        select: {
            toggleable: false
        },
        ajax: base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agendas",
        orderClasses: true,
        columns: [
            { "data": "id" },
            { "data": "id_especialidad" },
            { "data": "especialidad" },
            { "data": "usu_cod_prof" },
            { "data": "profesional" },
            { "data": "usu_cod_reemplaza" },
            { "data": "prof_reemplazo" },
            { "data": "establecimiento" },
            { "data": "sobre_cupo" },
            { "data": "fecha_ini" },
            { "data": "fecha_fin" },
            { "data": "usuario" },
            { "data": "fecha" },
            { "data": "estado" },
            { 
                "data": "id",
                "render": function(data, type, row) {
                    return "<button type='button' class='traza_agenda btn btn-warning' title='Traza Agenda'><i class='fas fa-shoe-prints'></i></button>";
                }
            }
        ],
        "columnDefs": [
            {
                "targets": [ 1 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 3 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 5 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 7 ],
                "visible": false,
                "searchable": false
            }
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

	$("#grid_agendas tbody").on("click", "tr", function () {
		var data = grid_agendas.row($(this)).data();
        mostrar_datos_agenda(data);
        des_habilitar(true, false);

        var estado = data["estado"];

		if (estado == "Pendiente") {
       	    $("#btn_modificar").prop("disabled", false);
            $("#btn_anular").prop("disabled", false); 
            $("#btn_generar").prop("disabled", false); 
        }
	});

	$("#grid_agendas tbody").on("dblclick", "tr", function () {
        var data = grid_agendas.row($(this)).data();
        var estado_agenda = data['estado'];

		$("#divContenedorDetalle").load(
            base_url + "/Agenda/ctrl_ingreso_agenda/v_detalle_agenda/" + estado_agenda,
        ); 
		$('#dlg_detalle_agenda').modal('show');
	});

    $("#grid_agendas tbody").on("click", "button.traza_agenda", function () {
        var data = grid_agendas.row( $(this).parents("tr") ).data();
        var id_agenda = data["id"];

        $("#divContenedorTrazaAgenda").load(
            base_url + "/Agenda/ctrl_ingreso_agenda/v_traza_agenda"
        ); 
        $('#dlg_traza_agenda').modal('show');
    });
	
	$("#dt_fecha_inicio").datetimepicker({
		format: "DD-MM-YYYY",
		minDate: new Date()
	}).on("dp.change", function(value) {
		$('#dt_fecha_fin').data("DateTimePicker").minDate(this.value);
	});
	
	$("#dt_fecha_fin").datetimepicker({
		format: "DD-MM-YYYY"
	});
});