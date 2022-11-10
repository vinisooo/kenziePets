import { login, readAllPets } from "../../scripts/requests.js"
import { renderAllPets } from "../../scripts/modalPets.js"
import { modalRegister, modalLogin } from "../../scripts/modalHome.js"
import { getLocalStorage } from "../../scripts/localStorage.js"

function verifyLogin(){

    if(getLocalStorage() !== ""){

        const mainHeaderBtns = document.getElementById("main-header-btns");
        mainHeaderBtns.innerHTML =
        `
        <a class="default-bordered-btn" href="./pages/profile/profile.html" target="_blank">Perfil</a>
        <button class="default-fill-btn" id="log-out">Logout</button>
        `;

        const logOutBtn = document.getElementById("log-out");
        logOutBtn.addEventListener("click",()=>{
            localStorage.removeItem("user");
            window.location.reload();
        })
    }
}
verifyLogin();


const ulTag = document.querySelector('main section ul')

export async function responsePets(){
    const response = await readAllPets()
    
    const petForAdopt = response.filter(pet => pet.available_for_adoption)

    ulTag.innerHTML = ''
    petForAdopt.forEach(async pet=>{
        ulTag.append(await renderAllPets(pet))
    })
}
responsePets();

const registerBtn = document.getElementById("register-btn");
registerBtn.addEventListener("click", ()=>{
    document.body.append(modalRegister());
})

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click",()=>{
    document.body.append(modalLogin());
})