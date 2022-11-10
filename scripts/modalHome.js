import { createUser, login } from "./requests.js";

export function modalLogin() {

  const backGroundModal = document.createElement("div");
  backGroundModal.id = "modalHome";
  backGroundModal.classList =
    "dspl-flex justy__cont-center align__items-center";

  let divModal = document.createElement("div");
  divModal.id = "container-modal";
  divModal.classList = "dspl-flex justy__cont-SB flex__direc-column divModal";

  let divHeader = document.createElement("div");
  divHeader.classList = "dspl-flex align__items-center justy__cont-end";

  let buttonClose = document.createElement("button");
  buttonClose.id = "closeModal";
  buttonClose.classList = "dspl-flex";

  let img = document.createElement("img");
  img.src = "/assets/close.svg";
  buttonClose.append(img);

  buttonClose.addEventListener("click", closeModalHome);
  divHeader.append(buttonClose);

  let divMain = document.createElement("div");
  divMain.classList = "dspl-flex align__items-center flex__direc-column gap10";

  let h2 = document.createElement("h2");
  h2.innerText = "Login";
  h2.classList = "title2 font-w700";

  let form = document.createElement("form");
  form.id = "form-register";
  form.classList = "dspl-flex align__items-center flex__direc-column gap10";

  let inputEmail = document.createElement("input");
  inputEmail.name = "email";
  inputEmail.type = "email";
  inputEmail.placeholder = "E-mail";

  let inputPassword = document.createElement("input");
  inputPassword.name = "password";
  inputPassword.type = "password";
  inputPassword.placeholder = "Senha";

  let buttonRegister = document.createElement("button");
  buttonRegister.innerText = "Login";
  buttonRegister.classList = "default-fill-btn text4 font-w600";

  let pReplace = document.createElement("p");
  pReplace.innerHTML =

    `Não tem cadastro? <span id="spanRedirect" style="color: var(--brand100); cursor: var(--pointer)">Clique aqui</span> para se cadastrar.`;
  pReplace.classList = "text6";


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    eventLogin(form);
  });

  spanLoginOrRegister('login', backGroundModal)

  form.append(inputEmail, inputPassword, buttonRegister);

  divMain.append(h2, form, pReplace);

  let divFooter = document.createElement("div");
  divModal.append(divHeader, divMain, divFooter);

  backGroundModal.append(divModal);

  return backGroundModal;
}
function spanLoginOrRegister(text,modal){
  setTimeout(() => {
    const span = document.querySelector('#spanRedirect')

    span.addEventListener('click',()=>{
      if(text == 'login'){
        modal.remove()
        document.body.append(modalRegister());
      }
      if(text == 'register'){
        modal.remove()
        document.body.append(modalLogin());
      }
    })
  }, 250);
}


async function eventLogin(form) {
  const elements = [...form.elements];

  const body = {};

  elements.forEach((elem) => {
    if (elem.tagName == "INPUT") {
      body[elem.name] = elem.value;
    }
  });

  await login(body);
  closeModalHome();
}

export function modalRegister() {

  const backGroundModal = document.createElement("div");
  backGroundModal.id = "modalHome";
  backGroundModal.classList =
    "dspl-flex justy__cont-center align__items-center";

  let divModal = document.createElement("div");
  divModal.id = "container-modal";
  divModal.classList = "dspl-flex justy__cont-SB flex__direc-column divModal";

  let divHeader = document.createElement("div");
  divHeader.classList = "dspl-flex align__items-center justy__cont-end";

  let buttonClose = document.createElement("button");
  buttonClose.id = "closeModal";
  buttonClose.classList = "dspl-flex";

  let img = document.createElement("img");
  img.src = "/assets/close.svg";
  buttonClose.append(img);

  buttonClose.addEventListener("click", closeModalHome);
  divHeader.append(buttonClose);

  let divMain = document.createElement("div");
  divMain.classList = "dspl-flex align__items-center flex__direc-column gap10";

  let h2 = document.createElement("h2");
  h2.innerText = "Cadastrar";
  h2.classList = "title2 font-w700";

  let form = document.createElement("form");
  form.id = "form-register";
  form.classList = "dspl-flex align__items-center flex__direc-column gap10";

  let inputName = document.createElement("input");
  inputName.name = "name";
  inputName.type = "text";
  inputName.placeholder = "Nome";

  let inputEmail = document.createElement("input");
  inputEmail.name = "email";
  inputEmail.type = "email";
  inputEmail.placeholder = "E-mail";

  let inputPassword = document.createElement("input");
  inputPassword.name = "password";
  inputPassword.type = "password";
  inputPassword.placeholder = "Senha";

  let inputAvatar = document.createElement("input");
  inputAvatar.name = "avatar_url";
  inputAvatar.type = "text";
  inputAvatar.placeholder = "Avatar?";

  let buttonRegister = document.createElement("button");
  buttonRegister.innerText = "Cadastrar";
  buttonRegister.classList = "default-fill-btn text4 font-w600";

  let pReplace = document.createElement("p");
  pReplace.innerHTML =
    `Já tem cadastro? <span id="spanRedirect" style="color: var(--brand100); cursor: var(--pointer)">Clique aqui</span> para logar.`;
  pReplace.classList = "text6";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    eventRegister(form);
  });

  form.append(
    inputName,
    inputEmail,
    inputPassword,
    inputAvatar,
    buttonRegister,
    pReplace
  );

  divMain.append(h2, form);

  spanLoginOrRegister('register',backGroundModal)

  let divFooter = document.createElement("div");
  divModal.append(divHeader, divMain, divFooter);

  backGroundModal.append(divModal);

  return backGroundModal;
}

//evento que captura o texto nos inputs e faz a resiçao na api de criar o usuario
async function eventRegister(form) {
  const elements = [...form.elements];


  const body = {};

  elements.forEach((elem) => {
    if (elem.tagName == "INPUT") {
      body[elem.name] = elem.value;
    }
  });

  await createUser(body);

  closeModalHome();
}

function closeModalHome() {
  const modalBg = document.querySelector("#modalHome");
  const modal = document.querySelector("#container-modal");
  modal.classList.add("close-modal");

  setTimeout(() => {
    modalBg.remove();
  }, 495);
}