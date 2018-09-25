mod = 0;//modulo
cap = 0;//capitulo
pag = 0;//pagina

function goToAtiv() {
  window.location = "atividade.html";
}

function toogleBar(){
  if (document.getElementById("sidebar").style.display == 'none')
  {
    document.getElementById("sidebar").style.display = 'block';
    document.getElementById("wrapper").style.marginLeft = "250px";
  }
  else {
    document.getElementById("sidebar").style.display = 'none';
    document.getElementById("wrapper").style.marginLeft = "0";
  }
}


function reform(){

  var size = screen.width;

  if (size < 520){
    var form = document.getElementsByClassName('form-left');
    for(i=0; i<form.length; i++) {
      form[i].style.textAlign = "left";
    }

    form = document.getElementsByClassName('form-rigth');
    for(i=0; i<form.length; i++) {
      form[i].style.width = "250px";
    }
  }
  else{
    var form = document.getElementsByClassName('form-left');
    for(i=0; i<form.length; i++) {
      form[i].style.textAlign = "right";
    }

    form = document.getElementsByClassName('form-rigth');
    for(i=0; i<form.length; i++) {
      form[i].style.width = "350px";
    }
  }
}


function yay(){
  console.log("yay");
}


function loadCap(modulo,capitulo,pagina){
    cap = capitulo;
    mod = modulo;
    pag = pagina;
    var src =  "atividades/" + mod + "_" + cap + "_" + pag + ".html";
    document.getElementById('frame').src = src;
    pageVisibility();
    if (mod != 0)
    {
      var pg = document.getElementsByClassName('title');
      document.getElementsByClassName('title');
      pg[0].innerHTML = atividade[mod][cap-1]
      document.getElementById("continue-button").style.display = "none";
    }else {
      document.getElementById("continue-button").style.display = "block";
    }

    updateSave();
}

function updateSave(){
  var aut = readCookie("autenticado");
  if (!(aut.constructor === Array)){
    aut = JSON.parse(aut);
  }
  var log = readCookie(aut[0]);
  log[3] = mod;
  log[4] = cap;

  aut[4] = mod;
  aut[5] = cap;
  createCookie("autenticado",aut,30);
  createCookie(aut[0],log,30);
}


function createList(){
  var side = document.getElementById("sidebar");
  for (var i = 1; i < atividade.length; i++) {
    side.innerHTML += '<div class="sidebar-item button" value="' + (i) + '" onclick="toogleBox(' + (i) + ')"> Modulo ' + (i) + '</div>'
    for (var j = 0; j < atividade[i].length; j++) {
      side.innerHTML += '<div onclick="loadCap('+ (i) +','+ (j+1) +',0)" style="display: none;" value="' + (i) + '" class="button sidebar-box sidebar-box-'+ (i) +'" >' + atividade[i][j]+ '</div>'
    }

  }
  pageVisibility();
}

function toogleBox(module){
  var list = document.getElementsByClassName('sidebar-box-'+ module);


  for (var l = 0; l < list.length; l++){
    if (list[l].style.display == 'none'){
      list[l].style.display = 'block';
    }else{
      list[l].style.display = 'none';
    }
  }
}


function goPrevious(){
  if (pag > 0){
    pag--;
    loadCap(mod,cap,pag);
  }
  pageVisibility()
}

function goNext(){

  pag++;
  loadCap(mod,cap,pag);

  pageVisibility();
}

function pageVisibility(){
  if (pag == 0 || mod == 0){
    document.getElementById('previous-button').style.display = "none";
  }else{
    document.getElementById('previous-button').style.display = "block";
  }

  if (pag >= atividadeMax[mod][cap-1] || mod == 0){
    document.getElementById('next-button').style.display = "none";
  }else{
    document.getElementById('next-button').style.display = "block";
  }
  if (mod != 0)
  document.getElementById('marcador').innerHTML = (pag+1) + "/" + (atividadeMax[mod][cap-1]+1);

}

function continueButton(){
  var aut = readCookie("autenticado");
  if (!(aut.constructor === Array)){
    aut = JSON.parse(aut);
  }
  loadCap(aut[4],aut[5],0);
}


function verifyLogin(){
  var aut = readCookie("autenticado");
  if (!aut){
    window.location = "index.html";
  }
}

function logOff(){
  localStorage.removeItem("autenticado");
  window.location = "index.html";
}

function createCookie(cname, cvalue, exdays) {
    localStorage.setItem(cname,JSON.stringify(cvalue));


    /*
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    */
}

function readCookie(name) {
    return JSON.parse(localStorage.getItem(name));


    //var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  /*
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  */
}

function doLogin(login,senha){
  var user = readCookie(login);
  if (user)
  if (user[2] == senha){
    return 1;
  }
  return 0;
}

function submit(){
  var login = document.getElementById("field-login").value;
  var senha = document.getElementById("field-senha").value;
  if (doLogin(login,senha) == 1){
    var list = readCookie(login);
    list.unshift(login);
    createCookie("autenticado",JSON.stringify(list),1);
    window.location = "atividade.html";
  }else{
    document.getElementById("login-error").innerHTML = "O usuário ou a senha estão incorretos";
  }
}




function newLogin(login,nome,email,senha){
  var list = [nome,email,senha,0,0];
  createCookie(login,list,30);
}


function testNewLogin(){
  var valid = 1;
  var login = document.getElementById("form-login").value;
  var nome = document.getElementById("form-nome").value;
  var senha = document.getElementById("form-senha").value;
  var email = document.getElementById("form-email").value;
  var senha2 = document.getElementById("form-senha2").value;

  document.getElementById("div-login").innerHTML = ""
  document.getElementById("div-email").innerHTML = ""
  document.getElementById("div-nome").innerHTML = ""
  document.getElementById("div-senha").innerHTML = ""
  document.getElementById("div-senha2").innerHTML = ""

  if (senha != senha2){
    document.getElementById("div-senha2").innerHTML = "A senha precisa ser a mesma";
    valid = 0;
  }
  if (senha.length < 6){
    document.getElementById("div-senha").innerHTML = "A senha precisa de pelo menos 6 caracteres";
    valid = 0;
  }

  if (readCookie(login)){
    document.getElementById("div-login").innerHTML = "O login já está em uso";
    valid = 0;
  }


  if (valid == 0){
    return false;
  }else {
    yay();
    newLogin(login,nome,email,senha);
    return true;
    window.location = "index.html";
  }
}


function loadUseOpt(){

  var aut = readCookie("autenticado");
  if (!(aut.constructor === Array)){
    aut = JSON.parse(aut);
  }


  document.getElementById("form-nome").value = aut[1];
  document.getElementById("form-email").value = aut[2];
}


function testAltLogin(){
  var valid = 1;

  var aut = readCookie("autenticado");
  if (!(aut.constructor === Array)){
    aut = JSON.parse(aut);
  }

  var login = aut[0];
  var nome = document.getElementById("form-nome").value;
  var senha = document.getElementById("form-senha").value;
  var email = document.getElementById("form-email").value;
  var senha2 = document.getElementById("form-senha2").value;

  document.getElementById("div-email").innerHTML = ""
  document.getElementById("div-nome").innerHTML = ""
  document.getElementById("div-senha").innerHTML = ""
  document.getElementById("div-senha2").innerHTML = ""

  if (senha != senha2){
    document.getElementById("div-senha2").innerHTML = "A senha precisa ser a mesma";
    valid = 0;
  }

  if (senha.length < 6 && senha.length > 0){
    document.getElementById("div-senha").innerHTML = "A senha precisa de pelo menos 6 caracteres";
    valid = 0;
  }



  if (valid == 0){
    return false;
  }else {
    yay();
    newLogin(login,nome,email,senha);
    return true;
    window.location = "atividade.html";
  }
}


function continueButtonPos(){
  var bt = document.getElementById('continue-button');
  var aut = readCookie("autenticado");
  if (!(aut.constructor === Array)){
    aut = JSON.parse(aut);
  }
  bt.innerHTML += "<br/>Módulo: " + aut[4] + ", Capitulo: " + aut[5];
}



function loadUserDiv(){
  var aut = readCookie("autenticado");
  if (!(aut.constructor === Array)){
    aut = JSON.parse(aut);
  }
  document.getElementById('div-user').innerHTML = aut[1];
  yay();
}

function goToConf(){
  window.location = "alterarUsuario.html"
}
