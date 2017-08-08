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