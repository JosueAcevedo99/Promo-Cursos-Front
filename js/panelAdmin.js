const token = localStorage.getItem("token");
const btn = document.getElementById('btn');
const btnUpdate = document.getElementById('btnUpdate');

btnUpdate.disabled = true;

btn.onclick = () => {
  cargarProductos();
  location.reload();

}


btnUpdate.onclick = () => {
  let id = document.getElementById('txtId').innerHTML;
  modificar(id);
  cargarProductos();
  location.reload();

}

const btnCrear = document.getElementById('btnCrear');

btnCrear.onclick = () => {
  agregarProducto();
  btn.click();
}

const urlGetAll = 'https://promo-cursos.herokuapp.com/api/publicaciones';

const cargarProductos = async () => {

  await fetch(urlGetAll).then((response) => {
    return response.json();
  }).then((curso) => {
    let listadoHtml = '';
    for(let i =0; i<curso.contenido.length; i++){

      let botonEliminar = '<a href="#" onclick="eliminarProducto(' + curso.contenido[i].id + ')" class="btn btn-danger btn-circle btn-sm"><i class="bi bi-trash"></i></a>';
      let botonUpdate = '<a href="#" onclick="llenarformulario(' + curso.contenido[i].id + ')" class="btn btn-danger btn-circle btn-sm"><i class="bi bi-pencil"></i></a>';

      let productoHtml = '<tr><td>' + curso.contenido[i].id + '</td><td>' + curso.contenido[i].titulo + '</td><td>' + curso.contenido[i].descripcion + '</td><td>' + curso.contenido[i].contenido + '</td><td>' + curso.contenido[i].imagen + '</td><td>' + botonEliminar + '</td><td>' + botonUpdate + '</td></tr>';
      listadoHtml += productoHtml;
    

    document.querySelector('#productos tbody').outerHTML = listadoHtml;
  }}).catch(err => {
    console.log("Error Reading data " + err);
  });
}

cargarProductos();


const urlDelete = 'https://promo-cursos.herokuapp.com/api/publicaciones/delete/';

async function eliminarProducto(id)  {
  var succes = true;

  if (!confirm('¿Desea eliminar este producto?')) {
    return;
  }

fetch(urlDelete + id, {
  method: 'DELETE',
  mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'redirect': 'follow',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}})
      .then(response =>{
        if(response.ok){succes = false;}
        return response.json();
      }).then(data => {
       //console.log(data);
      }).catch(err => {
        console.log("Error Reading data " + err);
      });
    
      if(succes){
        alert("el producto fue eliminado!");
      }else{
        alert("algo salio mal");
      }

      btn.click();
    }



const urlCreate = 'https://promo-cursos.herokuapp.com/api/publicaciones';

async function agregarProducto() {
 
  let datos = {};
  datos.titulo = document.getElementById('txtTitle').value;
  datos.descripcion = document.getElementById('txtDescription').value;
  datos.contenido = document.getElementById('txtLink').value;
  datos.imagen = document.getElementById('txtImagen').value;

  var succes = true;

    await fetch(urlCreate, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datos)
  }).then(response =>{
        if(!response.ok){succes = false;}
        //alert(response.ok);
        return response.json();
      }).then(data => {
       //alert(data);
      }).catch(err => {
        console.log("Error Reading data " + err);
      });

  if(succes){
    alert("el producto fue creado con exito!");
  }else{
    alert("algo salió mal!");
  }

  btn.click();
}

const urlUpdate = 'https://promo-cursos.herokuapp.com/api/publicaciones/';

async function modificar(id) {
  var succes = false;

  let datos = {};
  datos.id = id;
  datos.titulo = document.getElementById('txtTitle').value;
  datos.descripcion = document.getElementById('txtDescription').value;
  datos.contenido = document.getElementById('txtLink').value;
  datos.imagen = document.getElementById('txtImagen').value;


  if (!confirm('¿Desea modificar este producto?')) {
    return;
  }

  await fetch(urlUpdate + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(datos)
  }).then(response =>{
    if(response.ok){succes = true;}
    return response.json();
  }).then(data => {
   //console.log(data);
  }).catch(err => {
    console.log("Error Reading data " + err);
  });

  if(succes){
    alert("el producto fue modificado con exito!");
  }else{
    alert("algo salio mal");
  }


  btn.click();

}

const urlGet = 'https://promo-cursos.herokuapp.com/api/publicaciones/';

async function llenarformulario(id) {

  if (!confirm('¿Desea modificar este producto?')) {
    return;
  }

  await fetch(urlGet + id).then((response) => {
    return response.json();
  }).then((curso) => {
    document.getElementById('txtDescription').value = curso.descripcion;
    document.getElementById('txtId').innerHTML = curso.id;
    document.getElementById('txtTitle').value = curso.titulo;
    document.getElementById('txtImagen').value = curso.imagen;
    document.getElementById('txtLink').value = curso.contenido;

  });

  let btnUpdate = document.getElementById('btnUpdate');

  btnUpdate.disabled = false;

}


