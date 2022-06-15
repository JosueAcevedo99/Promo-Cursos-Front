const token = localStorage.getItem("token");
//console.log(token);

const btnLog = document.getElementById('bntLog');

const bntLogOut = document.getElementById('bntLogOut');

async function btnComent() {
  if(token == null){
    alert("Debes iniciar sesión para comentar");
    btnLog.click();
  }
}

if(token != null){
  btnLog.style.display = "none";
}else{
  bntLogOut.style.display = "none";
}


bntLogOut.onclick = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('username');
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const id = getParameterByName('id');


const userName = localStorage.getItem("username");
const baseUrl = 'https://promo-cursos.herokuapp.com/api/publicaciones/';
const url = baseUrl + id;


const cargarCurso = async () => {

  const container = document.querySelector('#portafolio');
  let contentHTML = '';

  await fetch(url).then((response) => {
    return response.json();
  }).then((curso) => {
      const imagen = curso.imagen;
      const tittle = curso.titulo;
      const description = curso.descripcion;
      const link = curso.contenido;
      const comentarios = curso.comentarios;

      contentHTML += `
              <div class="col-md-12 my-3">
              <img src="${imagen}" class="img-thumbnail imgCatalogo">
              </div>
              <div class="col-md-12 mt-3 ">
                    <h5 class="title mt-3">Curso: ${tittle}</h5>
                    <h5 class="title mt-3">Descripción: ${description}</h5>
                    <a class = "btn" href="${link}" target="_blank">Visitar</a>
                    <button data-bs-toggle="modal" onclick="btnComent()" data-bs-target="#exampleModalDetalles" type="button" class="btn btn-outline-light" >Comentar</button>
              </div>`;
              for(let i = 0; i<comentarios.length; i++){
                var comentario = comentarios[i].cuerpo;
                var user =  comentarios[i].nombre;
                var idcomentario = comentarios[i].id;
                if(userName == comentarios[i].nombre){
                contentHTML += `
                <div class="col-md-12 mt-3 d-flex flex-row">
                        <h5 class="title mt-3">${user}: ${comentario}</h5>
                        <a href="#" onclick="eliminarComentario(${idcomentario})" class="btn btn-danger btn-circle btn-sm"><i class="bi bi-trash"></i></a>
                </div>
                `;}else{
                    contentHTML += `
                    <div class="col-md-12 mt-3 d-flex flex-row">
                            <h5 class="title mt-3">${user}: ${comentario}</h5>
                    </div>`
                }}
      
    
  }).catch(err => {
    console.log("Error Reading data " + err);
  });

  container.innerHTML = contentHTML;

}

cargarCurso();

let idLong = id;

let urlComent = "https://promo-cursos.herokuapp.com/api/publicaciones/" + idLong +"/comentarios";

async function comentar() {
    let comentario = document.getElementById('txtComentario').value;
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "nombre": userName,
  "cuerpo": comentario
});

var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
};

fetch(urlComent, requestOptions)
		.then(response => response.text())
		.then(result => {
            console.log(result); window.location.href = "curso.html?id=" + id})
		.catch(error => {console.log('error', error); window.location.href = "curso.html?id=" + id});

}// fin comentar


let urldelete = "https://promo-cursos.herokuapp.com/api/publicaciones/" + idLong +"/comentarios/";

async function eliminarComentario(idcomentario){

    if (!confirm('¿Desea eliminar este comentario?')) {
        return;
      }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
		method: 'DELETE',
		headers: myHeaders,
		redirect: 'follow'
};

fetch(urldelete + idcomentario, requestOptions)
		.then(response => response.text())
		.then(result => {
            console.log(result); window.location.href = "curso.html?id=" + id})
		.catch(error => {console.log('error', error); window.location.href = "curso.html?id=" + id});
}