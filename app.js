"use strict";
/* 

Este block coge elementos necesarios y los pone en variables. 
 	- El documento es la pagina de HTML 
 	- querySelector() coge un elemento segun la etiqueta, clase, o id
 		*** los clases tienen que empezar con "." y ids con "#" como en CSS) ***
 	- getElementById() coge elementos por su id especificamente y es un poco mas rapido

 */
const formDiv = document.querySelector(".login-container");
const loginForm = document.getElementById("login");
const loginLockIcon = document.querySelector(".fa-lock");
const content = document.querySelectorAll("figure, aside, div, footer");
const cover = document.querySelector(".cover");

/* Un event listener se sujeta al elemento y escucha ciertas acciones. 
La accion es el primer argumento, y la funcion es el segundo */

loginForm.addEventListener("submit", login);

// Objecto que guarda el nombre de usuario y la contraseña
const credentials = {
	username: "ejemplo",
	password: "root",
};

/* Este funcion sirve para quitar el contenido antes de iniciar sesion. Esta sujetada a 
la lista "content" que contiene cada elemento de tipo <figure>, <aside>, <div>, y <footer>. 
Tambien se añaden clases importantes a los elementos */

function hideContent() {
	content.forEach((element) => {
		element.style.display = "none";
		element.classList.add("transition-speed", "fade-out");
	});
}

/* Esta funcion tiene 2 funciones dentro para gestionar la carga y aparicion de los elementos
segun el desplazamiento del raton y posicion del usuario en la pagina */

function lazyLoad() {
	const revealThreshold = 400; //Cantidad de pixeles suficientes para mostrar el contenido

	/* Esta funcion sirve para comprobar si se debe mostrar un elemento segun su posicion. 
	getBoundingClientRect devuelve un objecto de valores de los dimensiones de un elemento. La
	funcion devuelve un booleano de si se ve una parte suficiente grande del elemento */

	function isShown(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 - revealThreshold &&
			rect.bottom <= window.innerHeight + revealThreshold
		);
	}
	/* Esta funcion gestiona la animacion de los elementos cuando aparacen y desaparcen. Utiliza
	un forEach para comprobar cada componente en la pagina y llama a isShown para comprobar su
	posicion. */
	function handleScroll() {
		content.forEach((element) => {
			if (isShown(element)) {
				element.classList.add("fade-in");
				element.classList.remove("fade-out");
				element.style.display = "";
			} else {
				element.classList.remove("fade-in");
				element.classList.add("fade-out");
			}
		});
	}
	// Añadir un event listener a la pantalla que ejecuta cuando el usuario desplaza
	window.addEventListener("scroll", handleScroll);
	handleScroll();

	// Quitar el fondo de login
	cover.classList.add("fade-out");
	setTimeout(() => {
		cover.style.display = "none";
	}, 1500);
}

/* Esta funcion sirve para la authorizacion y para iniciar sesion. preventDefault() impide que 
la pagina se recargue. Se guardan los campos para la identificacion en variables y la funcion
comprueba los valores dentro de los campos. Si son validos, llama a la funcion lazyLoad() para 
mostrar el contenido. Si no, pone una animacion */

function login(event) {
	event.preventDefault();
	const usernameField = document.getElementById("username-field");
	const passwordField = document.getElementById("password-field");

	if (
		credentials.username == usernameField.value &&
		credentials.password == passwordField.value
	) {
		formDiv.classList.add("fade-out");
		passwordField.classList.remove("wrong");
		lazyLoad();
	} else {
		passwordField.classList.add("wrong");
		setTimeout(() => {
			passwordField.classList.remove("wrong");
		}, 500);
	}
}
