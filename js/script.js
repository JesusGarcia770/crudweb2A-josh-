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


//agregar nuevo integrante
const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrar");

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});
btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//e representa a submit
    //capturar valores
    const nombre = document.getElementById("txtNombre").ariaValueMax.trim();
    const apellido = document.getElementById("txtApellido").ariaValueMax.trim();
    const correo = document.getElementById("txtEmail").ariaValueMax.trim();
    //validacion
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return;
    }

    //llamar a la Api para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST"
    });//fetch para llamar a la api

});