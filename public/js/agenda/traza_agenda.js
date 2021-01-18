$(document).ready(function() {
    var id_agenda = $("#txt_id_agenda").val();

    var grid_traza_agenda = $("#grid_traza_agenda").DataTable({
		responsive: true,
        paging: true,
        scrollY: '50vh',
        scrollCollapse: true,
        destroy: true,
        select: {
            toggleable: false
        },
        ajax: base_url + "/Agenda/ctrl_ingreso_agenda/datatable_traza_agenda/" + id_agenda,
        orderClasses: true,
        columns: [
            { "data": "id" },
            { "data": "id_agenda" },
            { "data": "estado" },
            { "data": "observaciones" },
            { "data": "usuario" },
            { "data": "fecha" }
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }
        ],
        "order": [[ 0, 'desc' ]],
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