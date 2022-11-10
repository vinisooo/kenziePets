
import { createPet, deleteProfile, profile, updateProfile, updatePetById } from "./requests.js"
import { renderAllPets, renderProfile } from "../pages/profile/profile.js"
import { toasty } from "./toast.js"


export function modalDeleteAcount(){
    let section = document.createElement('section')
    section.id = "modalProfile"
    section.classList = 'dspl-flex justy__cont-center align__items-center'
    
        let form = document.createElement('form')
        form.classList = 'dspl-flex justy__cont-SB flex__direc-column'
        

            let divHeader = document.createElement('div')
            divHeader.classList = 'dspl-flex align__items-center justy__cont-end'

                let buttonClose = document.createElement('button')
                buttonClose.id = 'closeModal'
                buttonClose.classList = 'dspl-flex'

                    let img = document.createElement('img')
                        img.src = '/assets/close.svg'
                buttonClose.append(img)
                buttonClose.addEventListener('click', closeModal);

            divHeader.append(buttonClose)
        
            let divMain = document.createElement('div')
            divMain.classList = 'dspl-flex align__items-center flex__direc-column gap10'

                let h2 = document.createElement('h2')
                h2.innerText = 'Deseja mesmo deletar sua conta?'
                h2.classList = 'title2 font-w700'

                let buttonNotDel = document.createElement('button')
                buttonNotDel.innerText = 'Não desejo deletar minha conta'
                buttonNotDel.classList = 'default-fill-btn text4 font-w600'
                

                let buttonDelet = document.createElement('button')
                buttonDelet.innerText = 'Quero deletar minha conta'
                buttonDelet.classList = 'default-bordered-btn red-border-btn text4 font-w600'

                buttonNotDel.addEventListener('click', closeModal)

                buttonDelet.addEventListener('click', (e)=>{
                    e.preventDefault()

                    const p = document.createElement('p')
                    p.style.color = 'red'
                    p.innerText = "Deseja Realmente Excluir a conta?"
                    p.classList = 'title2 font-w700'

                    const buttonDelete = document.createElement('button')
                    buttonDelete.innerText = "Sim, Deletar"
                    buttonDelete.classList = 'default-bordered-btn red-border-btn text4 font-w600'

                    const buttonCancel = document.createElement('button')
                    buttonCancel.innerText = 'Não, Cancelar'
                    buttonCancel.classList = 'default-fill-btn text4 font-w600'

                    buttonCancel.addEventListener('click', closeModal)
                    buttonDelete.addEventListener('click', async(e)=>{
                        e.preventDefault()
                        await deleteProfile()
                        localStorage.removeItem("user")
                        setTimeout(() => {
                            window.location.replace('../../index.html')
                        }, 2000);
                    })

                    divMain.innerHTML = ''
                    divMain.append(p,buttonDelete,buttonCancel)
                })

            divMain.append(h2,buttonNotDel,buttonDelet)

            let divFooter = document.createElement('div')
        form.append(divHeader,divMain,divFooter)

    section.append(form)

    return section
}


export async function modalUpdateProfile(){
    const response = await profile()

    let section = document.createElement('section')
    section.id = "modalProfile"
    section.classList = 'dspl-flex justy__cont-center align__items-center'

        let form = document.createElement('form')
        form.classList = 'dspl-flex justy__cont-SB flex__direc-column'

            let divHeader = document.createElement('div')
            divHeader.classList = 'dspl-flex align__items-center justy__cont-end'

                let buttonClose = document.createElement('button')
                buttonClose.id = 'closeModal'
                buttonClose.classList = 'dspl-flex'

                    let img = document.createElement('img')
                        img.src = '/assets/close.svg'
                buttonClose.append(img)
                buttonClose.addEventListener('click', closeModal);

            divHeader.append(buttonClose)
        
            let divMain = document.createElement('div')
            divMain.classList = 'dspl-flex align__items-center flex__direc-column gap10'

                let h2 = document.createElement('h2')
                h2.innerText = 'Atualizar perfil'
                h2.classList = 'title2 font-w700'

                let inputName = document.createElement('input')
                inputName.type = 'text'
                inputName.placeholder = 'Nome'
                inputName.value = response.name

                let inputEmail = document.createElement('input')
                inputEmail.type = 'email'
                inputEmail.placeholder = 'E-mail'
                inputEmail.value = response.email
                inputEmail.disabled = true

                let inputAvatar = document.createElement('input')
                inputAvatar.type = 'text'
                inputAvatar.placeholder = 'Avatar'
                inputAvatar.value = response.avatar_url

                let buttonUpdate = document.createElement('button')
                buttonUpdate.innerText = 'Atualizar'
                buttonUpdate.classList = 'default-fill-btn text4 font-w600'

                buttonUpdate.addEventListener('click', async (e)=>{
                    e.preventDefault()

                    const body = {
                        name: inputName.value,
                        avatar_url: inputAvatar.value
                    }
                    await updateProfile(body)
                    document.querySelector("body").insertAdjacentElement('afterbegin',toasty('Perfil atualizado com sucesso!'))

                    setTimeout(() => {
                        buttonClose.click();
                        renderProfile()
                    }, 500);
                })

            divMain.append(h2,inputName, inputEmail, inputAvatar, buttonUpdate)

            let divFooter = document.createElement('div')
        form.append(divHeader,divMain,divFooter)

    section.append(form)

    return section
}


export function modalRegisterPet(){
    let section = document.createElement('section')
    section.id = "modalProfile"
    section.classList = 'dspl-flex justy__cont-center align__items-center'

        let form = document.createElement('form')
        form.classList = 'dspl-flex justy__cont-SB flex__direc-column'

            let divHeader = document.createElement('div')
            divHeader.classList = 'dspl-flex align__items-center justy__cont-end'

                let buttonClose = document.createElement('button')
                buttonClose.id = 'closeModal'
                buttonClose.classList = 'dspl-flex'

                    let img = document.createElement('img')
                        img.src = '/assets/close.svg'
                buttonClose.append(img)

                buttonClose.addEventListener('click', closeModal)
            divHeader.append(buttonClose)
        
            let divMain = document.createElement('div')
            divMain.classList = 'dspl-flex align__items-center flex__direc-column gap10'

                let h2 = document.createElement('h2')
                h2.innerText = 'Cadastrar pet'
                h2.classList = 'title2 font-w700'

                let inputName = document.createElement('input')
                inputName.type = 'text'
                inputName.placeholder = 'Nome'

                let inputSpecies = document.createElement('select')
                inputSpecies.innerHTML =
                `
                <option value="" selected hidden disabled>Selecionar espécie</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Aves">Aves</option>
                <option value="Repteis">Répteis</option>
                <option value="Outros">Outros</option>
                `

                let inputBreed = document.createElement('input')
                inputBreed.placeholder = 'Raça'

                let inputAvatar = document.createElement('input')
                inputAvatar.type = 'text'
                inputAvatar.placeholder = 'Avatar'

                let buttonRegister = document.createElement('button')
                buttonRegister.innerText = 'Cadastrar'
                buttonRegister.classList = 'default-fill-btn text4 font-w600'

                buttonRegister.addEventListener('click', (e)=>{
                    e.preventDefault();
                    const petName = inputName.value;
                    const petSpecies = inputSpecies.value;
                    const petBreed = inputBreed.value;
                    const petPic = inputAvatar.value;


                    const data = {
                        name: petName,
                        bread: petBreed,
                        species: petSpecies,
                        avatar_url: petPic
                    }


                    createPet(data).then(()=>{
                        renderAllPets();
                        buttonClose.click();
                    })

                })

            divMain.append(h2,inputName, inputSpecies, inputBreed, inputAvatar, buttonRegister)

            let divFooter = document.createElement('div')
        form.append(divHeader,divMain,divFooter)

    section.append(form)

    return section
}

export function modalUpdatePet(petData){
    let section = document.createElement('section')
    section.id = "modalProfile"
    section.classList = 'dspl-flex justy__cont-center align__items-center'

        let form = document.createElement('form')
        form.classList = 'dspl-flex justy__cont-SB flex__direc-column'

            let divHeader = document.createElement('div')
            divHeader.classList = 'dspl-flex align__items-center justy__cont-end'

                let buttonClose = document.createElement('button')
                buttonClose.id = 'closeModal'
                buttonClose.classList = 'dspl-flex'

                    let img = document.createElement('img')
                        img.src = '/assets/close.svg'
                buttonClose.append(img)

                buttonClose.addEventListener('click', closeModal);
            divHeader.append(buttonClose)
        
            let divMain = document.createElement('div')
            divMain.classList = 'dspl-flex align__items-center flex__direc-column gap10'

                let h2 = document.createElement('h2')
                h2.innerText = 'Atualizar pet'
                h2.classList = 'title2 font-w700'

                let inputAvatar = document.createElement('input')
                inputAvatar.type = 'text'
                inputAvatar.placeholder = 'Avatar'

                let buttonUpdatePet = document.createElement('button')
                buttonUpdatePet.innerText = 'Atualizar'
                buttonUpdatePet.classList = 'text4 font-w600 default-fill-btn'
                

                buttonUpdatePet.addEventListener('click',async (e)=>{
                    e.preventDefault();
                    const newAvatar = inputAvatar.value;
                    console.log(petData)
                    const data = {
                        name: petData.name,
                        bread: petData.bread,
                        species: petData.species,
                        avatar_url: newAvatar
                    }
                    
                    document.querySelector("body").insertAdjacentElement('afterbegin',toasty('Pet atualizado com sucesso!'))

                    updatePetById(data, petData.id)
                    .then(()=>{
                        renderAllPets();
                        buttonClose.click();
                    })

                })

            divMain.append(h2, inputAvatar, buttonUpdatePet)

            let divFooter = document.createElement('div')
        form.append(divHeader,divMain,divFooter)

    section.append(form)

    
    return section
}

function closeModal(event){

    event.preventDefault();

    const modalBg = event.target.closest("#modalProfile");
    const modal = event.target.closest("form");
    modal.classList.add("close-modal");

    setTimeout(()=>{

        modalBg.remove();

    },495)

}