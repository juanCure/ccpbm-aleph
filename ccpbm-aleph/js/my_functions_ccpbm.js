/* En esta función se implementa la funcionalidad para cambiar la imagen del header de acuerdo 
	 a la página en la que se encuentre el usuario */
function changing_header(){
	// Algunos ejemplos de URL's de las posibles páginas que tendrá el sitio CCPBM
	/*
	var href_login = "http://catalogo.iib.unam.mx/F/15IQXSJ19QEPGKFU3KVVHTS2L4C44N5LD8CP7R2HI7JBVG96J8-34357?func=login&local_base=ccpbm";
	var href_find_b = "http://catalogo.iib.unam.mx/F/15IQXSJ19QEPGKFU3KVVHTS2L4C44N5LD8CP7R2HI7JBVG96J8-08786?func=find-b-0&local_base=CCPBM";
	var image_base_src = "http://catalogo.iib.unam.mx/exlibris/aleph/u23_1/alephe/www_f_spa/icon/bndm-cabeza.jpg";*/
	
	var href = document.location.href;

	var matches = /func=([^&#=]*)/.exec(href);
	var param1 = matches[1];
	// var image_find_b = "../images/bndm-cabeza-find-b-0.jpg";
	var image_header = document.getElementById("image_header");
	// image_header.setAttribute("src", image_find_b);
	image_header.setAttribute("src", "&icon_path/" + "bndm-cabeza-" + param1 + ".jpg");
}

// Implementado la funcionalidad para agregar href para los botones anterior y siguiente del pager
function preparingPagerButtons(){

	var children = document.getElementById("hidden_pager").children;
	var values = {};
	if(children != null && children.length == 2) {
		// El caso cuando es img y anchor
		if(children[0].tagName == "IMG" && children[1].tagName == "A"){
			values.previous = false;
			values.next = true;
			values.previous_href = "#";
			values.next_href = children[1].href;
		}

		// El caso cuando ambos son anchors

		if(children[0].tagName == "A" && children[1].tagName == "A"){
			values.previous = true;
			values.next = true;
			values.previous_href = children[0].href;
			values.next_href = children[1].href;
		}

		// El caso cuando es anchor y img

		if(children[0].tagName == "A" && children[1].tagName == "IMG"){
			values.previous = true;
			values.next = false;
			values.previous_href = children[0].href;
			values.next_href = "#";
		}

	}

	var previous = document.getElementsByClassName("my_previous");
	var next = document.getElementsByClassName("my_next");
	var list_items = document.querySelectorAll(".pager li");


	if(!values.previous){
		list_items[0].className += " disabled";
		list_items[2].className += " disabled"
	}

	if(!values.next) {
		list_items[1].className += " disabled";
		list_items[3].className += " disabled"
	}

	for(var i = 0; i < previous.length; i++) {
		previous[i].href = values.previous_href;
	}

	for(var i = 0; i < next.length; i++) {
		next[i].href = values.next_href;
	}
}

/* Esta función cambia el valor el atributo href de los enlaces que componen el alfabeto*/

function change_ref_link(new_opt){
	/*console.log("Cambiando el href para el enlace");
	console.log("Valor de la opción escogida: ", new_opt);*/
	var alfabeto = document.getElementById("alfabeto");
	var alfabeto_children = alfabeto.children;
	for(var i = 0; i < alfabeto_children.length; i++){
		console.log("child: " + i + " : " + alfabeto_children[i].children[0].href);
		var current_href = alfabeto_children[i].children[0].href;
		var new_href = current_href.replace(/(scan_code=).*?(&)/, '$1' + new_opt + '$2');
		console.log("this is new_href: " + new_href);
		alfabeto_children[i].children[0].href = new_href;
	}	
}

/* Esta función oculta el submenu en las siguientes vistas 
 * find-a-ccpbm - Proyecto
 * find-r-ccpbm - Colecciones
 * find-c-ccpbm - Contacto
 */
 function hide_submenu(){
 	var href = document.location.href;
	var matches = /func=([^&#=]*)/.exec(href);
	var param1 = matches[1];
	if(param1 == "find-a" || param1 == "find-r" || param1 == "find-c"){
		var submenu = document.getElementById("mySubmenu");
		submenu.style.display = "none";
	}
 }

 /* Esta función guarda el estado del índice
  * seleccionada de la vista de Indices
  */

  function save_index(){
  	var input = document.getElementById('select_indices');
  	if(localStorage['indice']){
  		input.value= localStorage['indice'];
  		change_ref_link(localStorage['indice']);
  	}

  	input.onchange = function(){
  		localStorage['indice'] = this.value;
  	}
  }

  /* La siguiente función agrega y elimina la clase que mantiene 
  * fija la caja de herramientas en el top de la pantalla 
  */
function fixed_tools() {
	var header = $("#header");
	var wrapper = $("#tools_wrapper");
	var startPosition = wrapper.offset().top;

	$(document).scroll(function(){
		var y = $(this).scrollTop();
		if(y > startPosition) {
			header.hide();
			wrapper.addClass("fixed-tools");
		} else {
			header.show();
			wrapper.removeClass("fixed-tools");
		}
	});
}

/* Función para verificar en que vista se esta mostrando extrayendo el valor
 * del primer parametro dentro de la URL 
 */
 
function verify_view() {
	var href = document.location.href;
	var matches = /func=([^&#=]*)/.exec(href);
	return matches[1];
}

/* La siguiente función verifica que vista se esta mostrando y establece la clase
 * activo en la pestaña correspondiente del submenú
 */

function set_activo_submenu_nav() {
	var param1 = verify_view();
	if(param1 == "find-b-0"){
		$("#basica").addClass("activo");
	} else if(param1 == "find-d-0" || param1 == "find-d") {
		$("#avanzada").addClass("activo");
	} else if(param1 == "scan-list" || param1 == "scan") {
		$("#indices").addClass("activo");
	} else if(param1 == "history") {
		$("#anteriores").addClass("activo");
	} else if(param1 == "short" || param1 == "find-b" || param1 == "short-0" 
		|| param1 == "history-action" || param1 == "short-jump" || param1 == "short-sort"
		|| param1 == "myshelf-add-selected") {
		$("#resultados").addClass("activo");
	} else if(param1 == "myshelf-short") {
		$("#bibliografia").addClass("activo");
	}	
}

function set_activo_menu_nav(){
	var param1 = verify_view();
	switch (param1){
		case "login" : 
			$("#inicio").addClass("activo");
			break;
		case "find-a" :
			$("#proyecto").addClass("activo");
			break;
		case "find-r":
			$("#colecciones").addClass("activo");
			break;
		case "find-b-0" :
			$("#busquedas").addClass("activo");
			break;
		case "find-c":
			$("#contacto").addClass("activo");
			break;
		default:
			$("#busquedas").addClass("activo");
	}
}