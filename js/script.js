const API_URL = "https://retoolapi.dev/mC6TM2/integrantes";

async function ObtenerIntegrantes() {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    MostrarDatos(data);
}

function MostrarDatos(datos){
    const tabla = document.querySelector("#tabla tbody")
     tabla.innerHTML = " ";
     datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Editar</button>
                </td>
            </tr>
        `;
     });    
}


ObtenerIntegrantes();
