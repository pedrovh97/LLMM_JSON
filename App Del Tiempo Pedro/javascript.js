let url = './ejercicio5.json';

const imgDiaActual = document.getElementById("img-dia-actual");
const temperaturaDiaActual = document.getElementById("temperatura-dia-actual");
const estadoDiaActual = document.getElementById("estado-nombre");
const ciudad = document.getElementById("ciudad");

const vientoActual = document.getElementById("viento-dia");
const humedadActual = document.getElementById("humedad-dia");

const diasProximo = document.getElementsByClassName("dia");
const imgTiemProximo = document.getElementsByClassName("img-dia");
const temperaturaProxima = document.getElementsByClassName("temperatura-dia");

async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

obtenerJSON(url)
	.then(json => {

		imgDiaActual.src = json.dias[0].estado.icono;
		temperaturaDiaActual.innerText = "🌡 " + json.dias[0].temperatura + " º";
		estadoDiaActual.innerText = json.dias[0].estado.nombre;
		ciudad.innerText = "📍 " + json.ciudad;

		vientoActual.innerText = json.dias[0].viento + " Km/h";
		humedadActual.innerText = json.dias[0].humedad + " %";
	
		for (var i = 0; i < diasProximo.length ; i++) {

		diasProximo[i].innerText = "Día: " + json.dias[i+1].dia;
		imgTiemProximo[i].src = json.dias[i+1].estado.icono;
		temperaturaProxima[i].innerText = "🌡 " + json.dias[i+1].temperatura + " º";
		}
	});
