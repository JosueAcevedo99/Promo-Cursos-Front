const btn = document.getElementById('btn-iniciar');

btn.onclick = () => {
    verificarUsuario();
}

const btnnew = document.getElementById('btnnew');

btnnew.onclick = () => {
    window.location.href = 'registro.html';
}

const urlVerify = 'https://promo-cursos.herokuapp.com/api/iniciarSesion'; 

async function verificarUsuario() {

  let datos = {};
  datos.usernameOrEmail = document.getElementById('txtUser').value;
  datos.password = document.getElementById('txtPassword').value;
   
  var token = "invalidToken";
  var succes = false;
  
    await fetch(urlVerify, {
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
      return response.json();
    }).then(data => {
      if(succes){
        token = data.tokenDeAcceso;
      }
    }).catch(err => {
      console.log("Error Reading data " + err);
    });
      
    if(succes){
      alert(" bienvenido!");
      localStorage.setItem("token", token);
      localStorage.setItem("username", datos.usernameOrEmail);
      if(datos.usernameOrEmail == "admin@admin.com" || datos.usernameOrEmail == "admin"){
        window.location.href = 'panelAdmin.html' 
      }else{
        window.location.href = 'index.html' 
      }
    }else{
      alert("Datos incorrectos, reintentalo por favor!");
      location.reload();
    }
  
  }

