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
                    <button onclick="abrirModalEditar('${integrante.id}', '${integrante.nombre}', '${integrante.apellido}', '${integrante.correo}')">Editar</button>
                    <button onClick="EliminarPersona(${integrante.id})">Eliminar</button>
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
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();
    //validacion
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return;
    }
 
    //llamar a la Api para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, apellido, correo})
    });//fetch para llamar a la api
 
    //verificar si la API responde que los datos fueron enviados
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");
 
        //limpiar formulario
        document.getElementById("frmAgregar").reset();
 
        //cerrar el modal
        modal.close();
       
        //recargar la tabla
        ObtenerIntegrantes();
    }
 
});

async function EliminarPersona(id){
    const confirmacion = confirm("realmente deseas eliminar el registro?");
    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{
            method: "DELETE"
        });

        ObtenerIntegrantes();
    }
}


const modalEditar = document.getElementById("mdEditar")
const btnCerrarEditar = document.getElementById("btnCerrarEditar")

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});

function abrirModalEditar(id, nombre, apellido, correo){
    document.getElementById("TxtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    modalEditar.showModal();
}

document.getElementById("frmEditar").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("TxtIdEditar").value;
    const nombre = document.getElementById("txtNombreEditar").value.trim();
    const apellido = document.getElementById("txtApellidoEditar").value.trim();
    const correo = document.getElementById("txtEmailEditar").value.trim();

    if(!id || !nombre || !apellido || !correo){
        alert("completa todos los campos");
        return;
    }

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({correo, nombre, apellido})
    });

    if(respuesta.ok){
        alert("el registro fue actualizado")
        modalEditar.close();
        ObtenerIntegrantes();
    }
    else{
        alert("error")
    }
    
});

