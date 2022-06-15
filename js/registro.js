const btnCrear = document.getElementById('btn-crear');

btnCrear.onclick = () => {
  if(document.getElementById('txtCorreo').value != "" && document.getElementById('txtPassword').value != "" && document.getElementById('txtUserName').value != ""){
    agregarUsuario();
  }else{
    alert("Debes llenar todos los campos");
  }
}


const urlCreate = 'https://promo-cursos.herokuapp.com/api/registrar';

async function agregarUsuario() {

  let datos = {};
  datos.email = document.getElementById('txtCorreo').value;
  datos.username = document.getElementById('txtUserName').value;
  datos.password = document.getElementById('txtPassword').value;
 
  var succes = false;
  var succesText = "empty";

  await fetch(urlCreate, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  }).then(response =>{
      if(response.ok){
        succes = true;
      }
    return response.text();
  }).then(info =>{
    succesText = info;
  }).catch(err => {
    console.log("Error Reading data " + err);
  });

  if(succes){
    alert(succesText + ", bienvenido!");
    window.location.href = 'login.html'  
  }else{
    alert(succesText + ", reintentalo por favor!");
    location.reload();
  }


}
