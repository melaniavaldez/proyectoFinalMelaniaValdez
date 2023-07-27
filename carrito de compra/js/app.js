//variables
const listaTienda = document.querySelector('#lista-tienda');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-producto tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

//eventos
listaTienda.addEventListener('click', agregarProducto);
carrito.addEventListener('click', eliminarProducto);
vaciarCarritoBtn.addEventListener('click', () => {
	articulosCarrito = [];
	vaciarCarrito();
});

document.addEventListener('DOMContentLoaded', () => {
	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

	carritoHTML();
});

//funciones
function agregarProducto(e) {
	e.preventDefault();

	//solo ejecutarse cuando encuentra una etiqueta con la clase agregar-carrito
	if (e.target.classList.contains('agregar-carrito')) {
		//una vez el producto seleccionado recorro el dom y vuelvo a los padres del boton para extraer toda la informacion
		const productoSeleccionado = e.target.parentElement.parentElement;

		//enviamos el producto seleccionado para tomar sus datos
		leerDatosProducto(productoSeleccionado);
	}
}

function leerDatosProducto(productoSeleccionado) {
	const infoProducto = {
		imagen: productoSeleccionado.querySelector('img').src,
		titulo: productoSeleccionado.querySelector('h4').textContent,
		precio: productoSeleccionado.querySelector('span').textContent,
		cantidad: 1,
		id: productoSeleccionado.querySelector('a').getAttribute('data-id'),
	};

	const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);

	if (existe) {
		const producto = articulosCarrito.map((productos) => {
			if (productos.id === infoProducto.id) {
				productos.cantidad++;
				return productos;
			} else {
				return productos;
			}
		});

		articulosCarrito = [...producto];
	} else {
		articulosCarrito = [infoProducto, ...articulosCarrito];
	}

	//forma con push
	//articulosCarrito.push(infoProducto);

	carritoHTML();
}

function carritoHTML() {
	//limpar el html
	vaciarCarrito();

	articulosCarrito.forEach((infoProducto) => {
		const row = document.createElement('tr');
		row.innerHTML = `
            <td> 
                <img src="${infoProducto.imagen}" width="100"/>
            </td>
            <td> 
                ${infoProducto.titulo}
            </td>
            <td> 
                ${infoProducto.precio}
            </td>

            <td> 
                ${infoProducto.cantidad}
            </td>

			<td> <a href="#" class="borrar-producto" data-id="${infoProducto.id}"> X </a>  </td>

        `;

		contenedorCarrito.appendChild(row);
	});

	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function eliminarProducto(e) {
	e.preventDefault();

	if (e.target.classList.contains('borrar-producto')) {
		const productoId = e.target.getAttribute('data-id');

		//eliminar del arreglo del carrito
		articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId);

		carritoHTML();
	}
}

function vaciarCarrito() {
	contenedorCarrito.innerHTML = '';
}

//toastify

	Toastify({
		text: "Estas concectado",
		className: "info",
		duration: 4000,
		style: {
		  background: "linear-gradient(to right, #00b09b, #96c93d)",
		}
	  }).showToast();	


// ASINCRONÍA

function eventoFuturo(valorBooleano) {
	return new Promise((resolve, reject) => {
	  setTimeout(() => {
		valorBooleano ? resolve("RESUELTA") : reject("RECHAZADA")
	  }, 2000)
	})
  }
  
  eventoFuturo(true)
	.then(respuesta => {
	  console.log(respuesta)
	})
	.catch(respuesta => {
	  console.log(respuesta)
	})	  

