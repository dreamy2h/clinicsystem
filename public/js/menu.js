$(document).ready(function() {
	var base_url = $("#txt_base_url").val();

	$("#menu_ingresoAgenda").click(function() {
		$("#content").load(base_url + "/ctrl_menu/ingreso_agenda");
	});

	$("#menu_agendasProf").click(function() {
		$("#content").load(base_url + "/ctrl_menu/agendas_profesional");
	});

	$("#menu_usuarios").click(function() {
		$("#content").load(base_url + "/ctrl_menu/usuarios");
	});

	$("#menu_admBloqueos").click(function() {
		$("#content").load(base_url + "/ctrl_menu/administracion_bloqueos");
	});
	
	$("#menu_pacientes").click(function() {
		$("#content").load(base_url + "/ctrl_menu/pacientes");
	})
});