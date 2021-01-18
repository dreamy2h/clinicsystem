var cupos_disponibles;

function des_habilitar_dist(a, b) {
	$("#btn_nuevo_dist").prop("disabled", b);
    $("#btn_modificar_dist").prop("disabled", a);
    $("#btn_anular_dist").prop("disabled", a);
    $("#btn_aceptar_dist").prop("disabled", a);
    $("#btn_cancelar_dist").prop("disabled", a);

    $("#cmb_tipo_atencion").prop("disabled", a);
    $("#txt_cupos_dist").prop("disabled", a);
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
	                des_habilitar_dist(true, false);
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

function eliminar_distribucion() {
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
	$("#h_especialidad_dist").text($("#cmb_especialidad option:selected").text());
    $("#h_profesional_dist").text($("#cmb_profesional option:selected").text());
    $("#h_fecha_ini_dist").text($("#dt_fecha_inicio").val());
    $("#h_fecha_fin_dist").text($("#dt_fecha_fin").val());
    $("#h_dia_dist").text($("#cmb_dia option:selected").text());

    $("#btn_nuevo_dist").on("click", function() {
        des_habilitar_dist(false, true);
        $("#form_dist_agenda")[0].reset();

        $("#btn_modificar_dist").prop("disabled", true);
        $("#btn_anular_dist").prop("disabled", true);
        $("#txt_id_dist").val("");
    });

    $("#btn_modificar_dist").on("click", function() {
        des_habilitar_dist(false, true);
        $("#btn_modificar_dist").prop("disabled", true);
        $("#btn_anular_dist").prop("disabled", true);
        cupos_disponibles += parseInt($("#txt_cupos_dist").val());
        $("#h_cupos_dist").text("Cupos Disponibles: " + cupos_disponibles);
    });

    $("#btn_anular_dist").on("click", function() {
    	Swal.fire({
            title: "¿Eliminar Distribución?",
            text: "¿Está seguro de eliminar esta distribución?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
               eliminar_distribucion();
            }
        });
    });


	$("#btn_aceptar_dist").on("click", function() {
		if ($("#form_dist_agenda").valid()) {
			guardar_distdet();
		}
	});

    $("#btn_cancelar_dist").on("click", function() {
        des_habilitar_dist(true, false);
        $("#form_dist_agenda")[0].reset();
        $("#grid_distribucion").dataTable().fnReloadAjax(base_url + "/Agenda/ctrl_ingreso_agenda/datatable_distribucion/" + $("#txt_id_agenda_det").val());
    });

    $("#form_dist_agenda").validate({
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
            cmb_tipo_atencion: {
                required: true
            },
            txt_cupos_dist: {
                required: true,
                number: true
            }
        },
        messages: {
            cmb_tipo_atencion: {
                required: "Seleccione un Tipo de Atención"
            },
            txt_cupos_dist: {
                required: "Ingrese cupos",
                number: "Solo números"
            }
        }
    });

	var grid_distribucion = $("#grid_distribucion").DataTable({
        responsive: true,
        paging: true,
        scrollCollapse: true,
        destroy: true,
        select: {
            toggleable: false
        },
        ajax: base_url + "/Agenda/ctrl_ingreso_agenda/datatable_distribucion/" + $("#txt_id_agenda_det").val(),
        columns: [
            { "data": "id" },
            { "data": "id_tipo_ate" },
            { "data": "tipo_atencion" },
            { "data": "cupos" }
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 1 ],
                "visible": false,
                "searchable": false
            }
        ],
        drawCallback: function () {
	      	var api = this.api();
	      	var suma = api.column(3, {page:'current'}).data().sum();
	      	var cupos_totales = $("#txt_cupos").val();
	      	cupos_disponibles = cupos_totales - suma;
	        $("#h_cupos_dist").text("Cupos Disponibles: " + cupos_disponibles);
	    },
	    "order": [[ 0, "desc" ]],
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

    $("#grid_distribucion tbody").on("click", "tr", function () {
        var data = grid_distribucion.row($(this)).data();
        mostrar_datos_distribucion(data);
        if (estado_agenda == "Pendiente") {
            des_habilitar_det(true, false);
            $("#btn_modificar_dist").prop("disabled", false);
            $("#btn_anular_dist").prop("disabled", false);
        }
    });

	llenar_cmb_tipo_atencion();
    des_habilitar_dist(true, false);
    if (estado_agenda == "Generada") {
        $("#btn_nuevo_dist").prop("disabled", true);
    }
});