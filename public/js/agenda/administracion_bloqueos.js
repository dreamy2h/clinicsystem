var base_url = $("#txt_base_url").val();

function des_habilitar(a, b) {
	$("#btn_nuevo").prop("disabled", b);
	$("#btn_modificar").prop("disabled", a);
	$("#btn_anular").prop("disabled", a);
	$("#btn_aceptar").prop("disabled", a);
	$("#btn_cancelar").prop("disabled", a);

	$("#cmb_tipo_bloqueo").prop("disabled", a);
	$("#dt_fecha_inicio").prop("disabled", a);
	$("#dt_fecha_fin").prop("disabled", a);
	$("#cmb_agenda").prop("disabled", a);
	$("#cmb_profesional").prop("disabled", a);
	$("#txt_observaciones").prop("disabled", a);
}

function llenar_cmb_agenda() {
	var fecha_ini = $("#dt_fecha_inicio").val();
	var fecha_fin = $("#dt_fecha_fin").val();
	if (fecha_ini =! "" && fecha_fin != "") {
		$.ajax({
		    type: "GET",
		    dataType: "json",
		    url: base_url + "/Agenda/ctrl_administracion_bloqueos/llenar_cmb_agenda/" + fecha_ini + "/" + fecha_fin,
		}).done( function(data) {
		    $("#cmb_agenda").html('');
		    var opciones = "<option value=\"\">Seleccione una Agenda</option>";
		    
		    for (var i = 0; i < data.length; i++) {
		        opciones += "<option value=\"" + data[i].id_agenda + "\">" + data[i].agenda + "</option>";
		    }

		    $("#cmb_agenda").append(opciones);
		}).fail(function(error){
		    respuesta = JSON.parse(error["responseText"]);
            alerta.error("alerta_detage", respuesta.message);
		});
	} else {
		alerta.aviso("alerta", "Fecha Inicio o Fecha Fin, vacíos");
	}
}

$(document).ready(function() {
	des_habilitar(true, false);
	llenar_cmb_agenda();
	// llenar_cmb_profesional();

	$("#dt_fecha_inicio").datetimepicker({
		format: "DD-MM-YYYY",
		minDate: new Date()
	}).on("dp.change", function(value) {
		$('#dt_fecha_fin').data("DateTimePicker").minDate(this.value);
	});
	
	$("#dt_fecha_fin").datetimepicker({
		format: "DD-MM-YYYY"
	});

	$("#form_bloqueos").validate({
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
            cmb_tipo_bloqueo: {
                required: true
            },
            dt_fecha_inicio: {
                required: true
            },
            dt_fecha_fin: {
                required: true
            },
            cmb_agenda: {
                required: true
            },
            cmb_profesional: {
            	required: true	
            }
        },
        messages: {
            cmb_tipo_bloqueo: {
                required: "Tipo de bloqueo es obligatorio"
            },
            dt_fecha_inicio: {
                required: "Fecha inicio es obligatoria"
            },
            dt_fecha_fin: {
                required: "Fecha fin es obligatoria"
            },
            cmb_agenda: {
                required: "La agenda es obligatoria"
            },
            cmb_profesional: {
            	required: "El profesional es obligatorio"
            }
        }
    });

    $("#btn_nuevo").on("click", function() {
		des_habilitar(false, true);
		$("#form_bloqueos")[0].reset();

		$("#btn_modificar").prop("disabled", true);
		$("#btn_anular").prop("disabled", true);
	});

	$("#btn_modificar").on("click", function() {
		des_habilitar(false, true);
		$("#btn_modificar").prop("disabled", true);
		$("#btn_anular").prop("disabled", true);
	});

	$("#btn_anular").on("click", function() {
        Swal.fire({
            title: "¿Eliminar Bloqueo?",
            text: "¿Está seguro de eliminar este bloqueo?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
               anular_bloqueo();
            }
        });
    });

	$("#btn_aceptar").on("click", function() {
		if ($("#form_bloqueos").valid()) {
			guardar_bloqueo();
		}
	});

	$("#btn_cancelar").on("click", function() {
		$("#form_bloqueos")[0].reset();
		des_habilitar(true, false);
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
        // ajax: base_url + "/Agenda/ctrl_ingreso_agenda/datatable_agendas",
        orderClasses: true,
        columns: [
            { "data": "id" },
            { "data": "id_tipo_bloqueo" },
            { "data": "tipo_bloqueo" },
            { "data": "id_especialidad" },
            { "data": "Agenda" },
            { "data": "usu_cod_prof" },
            { "data": "profesional" },
            { "data": "id_agenda" },
            { "data": "dia" },
            { "data": "fecha_ini" },
            { "data": "fecha_fin" },
            { "data": "usuario" },
            { "data": "fecha" },
            { "data": "estado" },
            { 
                "data": "id",
                "render": function(data, type, row) {
                    return "<button type='button' class='traza_bloqueo btn btn-warning' title='Traza Agenda'><i class='fas fa-shoe-prints'></i></button>";
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
});