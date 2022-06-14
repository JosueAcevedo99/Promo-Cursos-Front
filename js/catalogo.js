const token = localStorage.getItem("token");
//console.log(token);
const url = 'https://promo-cursos.herokuapp.com/api/publicaciones';


const cargarCatalogo = async () => {

  const container = document.querySelector('#portafolio');
  let contentHTML = '';

  await fetch(url).then((response) => {
    return response.json();
  }).then((curso) => {
      for(let i =0; i<curso.contenido.length; i++){
      
      const imagen = curso.contenido[i].imagen;
      const tittle = curso.contenido[i].titulo;
      const description = curso.contenido[i].descripcion;
      const link = curso.contenido[i].contenido;
      const id = curso.contenido[i].id;

      contentHTML += `
              <div class="col-md-6 my-3">
              <img src="${imagen}" class="img-thumbnail imgCatalogo">
              </div>
              <div class="col-md-6 mt-3 ">
                    <h5 class="title mt-3">Curso: ${tittle}</h5>
                    <h5 class="title mt-3">Descripción: ${description}</h5>
                    <a class = "btn" href="${link}" target="_blank">Visitar</a>
                    <button type="button" onclick="imprimir(${id})" class="btn btn-outline-light" >Ver comentarios</button>
              </div>
              `;
      }
    
  }).catch(err => {
    console.log("Error Reading data " + err);
  });

  container.innerHTML = contentHTML;

}

cargarCatalogo();


async function imprimir(id) {
  window.location.href = "curso.html?id=" + id;
}