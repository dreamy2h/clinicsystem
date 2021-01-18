var estado_agenda = $("#txt_estado_agenda").val();

function guardar_detalle() {
    var dia = $("#cmb_dia").val()
    var hora_inicio = $("#dt_hora_inicio").val();
    var hora_fin = $("#dt_hora_fin").val();
    var min_pac = $("#txt_min_pacientes").val();
    var cupos = $("#txt_cupos").val();
    var id_agenda = $("#txt_id_agenda").val();
    var id_det = $("#txt_id_agenda_det").val();

    $.ajax({
        url: base_url + "/Agenda/ctrl_ingreso_agenda/guardar_agenda_detalle",
        type: "POST",
        async: false,
        data: {
            dia: dia,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            min_pac: min_pac,
            cupos: cupos,
            id_agenda: id_agenda,
            id_det: id_det
        },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                $("#grid_agendas_det").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agenda_detalle/" + id_agenda);
                des_habilitar_det(true, false);
                alerta.ok("alerta_detage", "Detalle agenda guardada con éxito");
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

function calcular_hora_termino() {
	var hora_inicio = $("#dt_hora_inicio").val();
	var min_pac = $("#txt_min_pacientes").val();
	var cupos = $("#txt_cupos").val();

	if (hora_inicio != "" && min_pac != "" && cupos != "") {
		var min_sum = min_pac * cupos;
		var hora_sum = min_sum/60;
		
		var hora_fin = moment(hora_inicio, 'HH:mm').add(hora_sum, 'hours').format('HH:mm');

		$("#dt_hora_fin").val(hora_fin);
	}
}

function des_habilitar_det(a, b) {
	$("#btn_nuevo_det").prop("disabled", b);
    $("#btn_modificar_det").prop("disabled", a);
    $("#btn_anular_det").prop("disabled", a);
    $("#btn_aceptar_det").prop("disabled", a);
    $("#btn_cancelar_det").prop("disabled", a);

    $("#cmb_dia").prop("disabled", a);
    $("#dt_hora_inicio").prop("disabled", a);
    $("#txt_min_pacientes").prop("disabled", a);
    $("#txt_cupos").prop("disabled", a);
}

function mostrar_datos_agenda_det(data) {
    var id_det = data["id"];
    var id_dia = data["id_dia"];
    var hora_inicio = data["hora_inicio"];
    var hora_fin = data["hora_fin"];
    var min_paciente = data["min_paciente"];
    var cupos = data["cupos"];

    $("#txt_id_agenda_det").val(id_det);
    $("#cmb_dia").val(id_dia);
    $("#dt_hora_inicio").val(hora_inicio);
    $("#dt_hora_fin").val(hora_fin);
    $("#txt_min_pacientes").val(min_paciente);
    $("#txt_cupos").val(cupos);
}

function eliminar_detalle() {
    var id_det = $("#txt_id_agenda_det").val();
    var id_agenda = $("#txt_id_agenda").val();

    $.ajax({
        url: base_url + "/Agenda/ctrl_ingreso_agenda/eliminar_detalle",
        type: "POST",
        async: false,
        data: { 
            id_det: id_det,
            id_agenda: id_agenda
        },
        success: function(respuesta) {
            const OK = 1;
            if (respuesta == OK) {
                $("#grid_agendas_det").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_distribucion/" + $("#txt_id_agenda").val());
                alerta.ok("alerta_detage", "Detalle eliminado con éxito");
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
    $("#h_especialidad").text($("#cmb_especialidad option:selected").text());
    $("#h_profesional").text($("#cmb_profesional option:selected").text());
    $("#h_fecha_ini").text($("#dt_fecha_inicio").val());
    $("#h_fecha_fin").text($("#dt_fecha_fin").val());

	$("#dt_hora_fin").prop("disabled", true);

	$("#dt_hora_inicio").datetimepicker({
		format: 'HH:mm'
	});

	$("#dt_hora_inicio").on("blur", function() {
		if ($("#form_det_agenda").valid()) {
			calcular_hora_termino();
		}
	});

	$("#txt_min_pacientes").on("blur", function() {
		if ($("#form_det_agenda").valid()) {
			calcular_hora_termino();
		}
	});

	$("#txt_cupos").on("blur", function() {
		if ($("#form_det_agenda").valid()) {
			calcular_hora_termino();
		}
	});

    $("#btn_nuevo_det").on("click", function() {
        des_habilitar_det(false, true);
        $("#form_det_agenda")[0].reset();

        $("#btn_modificar_det").prop("disabled", true);
        $("#btn_anular_det").prop("disabled", true);
        $("#txt_id_agenda_det").val("");
    });

    $("#btn_modificar_det").on("click", function() {
        des_habilitar_det(false, true);
        $("#btn_modificar_det").prop("disabled", true);
        $("#btn_anular_det").prop("disabled", true); 
    });

    $("#btn_anular_det").on("click", function() {
        Swal.fire({
            title: "¿Eliminar Detalle?",
            text: "¿Está seguro de eliminar este detalle?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
               eliminar_detalle();
            }
        });
    });

	$("#btn_aceptar_det").on("click", function() {
		if ($("#form_det_agenda").valid()) {
			guardar_detalle();
		}
	});

    $("#btn_cancelar_det").on("click", function() {
        des_habilitar_det(true, false);
        $("#form_det_agenda")[0].reset();
    });

    $("#btn_cerrar_dist").on("click", function() {
        $("#dlg_distribuir_detalle").modal("hide");
    });

	$("#form_det_agenda").validate({
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
            cmb_dia: {
                required: true
            },
            dt_hora_inicio: {
                required: true
            },
            dt_hora_fin: {
                required: true
            },
            txt_min_pacientes: {
                required: true,
                maxlength: 2,
                number: true
            },
            txt_cupos: {
                required: true,
                maxlength: 3,
                number: true
            }
        },
        messages: {
            cmb_dia: {
                required: "Seleccione un día de la semana"
            },
            dt_hora_inicio: {
                required: "Seleccione una hora"
            },
            dt_hora_fin: {
                required: "Seleccione una hora"
            },
            txt_min_pacientes: {
                required: "Ingrese minutos por paciente",
                maxlength: "Máximo 2 caracteres",
                number: "Solo números"
            },
            txt_cupos: {
                required: "Ingrese el número de cupos",
                maxlength: "Máximo 3 caracteres",
                number: "Solo números"
            }
        }
    });

    var grid_agendas_det = $("#grid_agendas_det").DataTable({
        responsive: true,
        paging: true,
        scrollCollapse: true,
        destroy: true,
        select: {
            toggleable: false
        },
        ajax: base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agenda_detalle/" + $("#txt_id_agenda").val(),
        orderClasses: true,
        columns: [
            { "data": "id" },
            { "data": "id_agenda" },
            { "data": "id_dia" },
            { "data": "dia" },
            { "data": "hora_inicio" },
            { "data": "hora_fin" },
            { "data": "min_paciente" },
            { "data": "cupos" },
            { 
                "data": "id",
                "render": function(data, type, row) {
                    return "<button type='button' class='distribuir btn btn-warning' title='Distribuir'><i class='fas fa-asterisk'></i></button>";
                }
            },
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": true
            },
            {
                "targets": [ 1 ],
                "visible": false,
                "searchable": true
            },
            {
                "targets": [ 2 ],
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

    $("#grid_agendas_det tbody").on("click", "tr", function () {
        var data = grid_agendas_det.row($(this)).data();
        mostrar_datos_agenda_det(data);

        if (estado_agenda == "Pendiente") {
            des_habilitar_det(true, false);
            $("#btn_modificar_det").prop("disabled", false);
            $("#btn_anular_det").prop("disabled", false); 
        }
    });

    $("#grid_agendas_det tbody").on("click", "button.distribuir", function () {
        var data = grid_agendas_det.row( $(this).parents("tr") ).data();

        var id = data['id'];
        
        $("#divContenedorDistDet").load(
            base_url + "/Agenda/ctrl_ingreso_agenda/v_distribuir_detalle"
        ); 
        $('#dlg_distribuir_detalle').modal('show');
    });

    des_habilitar_det(true, false);
    if (estado_agenda == "Generada") {
        $("#btn_nuevo_det").prop("disabled", true);
    }
});