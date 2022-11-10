import { modalDeleteAcount, modalUpdateProfile,
        modalRegisterPet, modalUpdatePet } from "../../scripts/modalProfile.js";
import { profile, readAllMyPets } from "../../scripts/requests.js";
import { renderPet } from "../../scripts/renderMyPets.js";
import { getLocalStorage } from "../../scripts/localStorage.js";

const updateProfileBtn = document.getElementById("update-infos");
updateProfileBtn.addEventListener("click", async ()=>{
    document.body.append(await modalUpdateProfile())
});

const deleteAccountBtn = document.getElementById("delete-account");
deleteAccountBtn.addEventListener("click", ()=>{
    document.body.append(modalDeleteAcount())
});

const registerPetBtn = document.getElementById("register-new-pet");
registerPetBtn.addEventListener("click",()=>{
    document.body.append(modalRegisterPet())
})


function verifyLogin(){
    
    if(getLocalStorage() !==""){
        renderProfile();
        renderAllPets();
        eventButtons()
    }else{
        document.body.innerHTML = "";
        document.body.innerHTML =
        `
        <main class="main-error dspl-flex flex__direc-column flex justy__cont-center align__items-center">
            <figure class="error-icon">
                <img src="../../assets/not-found.png">
            </figure>
            <h1 class="error-message">Hmmm... Algo deu errado</h1>
            <a class="back-to-home-btn default-bordered-btn" href="../../index.html">Voltar para a Home</a>
        </main>
        `
    }
    
}
function eventButtons(){
    const div = document.querySelector('header div')

    const buttons = [...div.children]

    buttons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            if(btn.innerText == 'Home'){
                window.location.replace('../../index.html')
            }else if(btn.innerText == 'Logout'){
                localStorage.removeItem("user")
                window.location.replace('../../index.html')
            }
        })
    })
}


export const renderProfile = async()=>{

    let imgProfile = document.querySelector("#imgProfile")
    let name = document.querySelector("#name")
    let email = document.querySelector("#email")
    let profileUser = await profile()

    imgProfile.src = profileUser.avatar_url //|| "../../assets/no-image.png"
    name.innerHTML = `<span>Nome</span>: ${profileUser.name}`
    email.innerHTML =`<span>E-mail</span>: ${profileUser.email}`


}


//RENDER ALL PETS FROM LOGGED USER

export async function renderAllPets(){

    const petsUl = document.getElementById("pets-list");
    petsUl.innerHTML = "";

    const pets = await readAllMyPets();

    pets.forEach((pet)=>{
        petsUl.append(renderPet(pet));
    })
}

verifyLogin();