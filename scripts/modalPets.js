import { responsePets } from "../pages/home/index.js"
import { getLocalStorage } from "./localStorage.js"
import { adoptPet } from "./requests.js"
import { toasty } from "./toast.js"


export async function renderAllPets(pet){

    let li = document.createElement('li')
    li.id = pet.id
    li.classList = 'dspl-flex flex__direc-column'

        let figure = document.createElement('figure')
            let img = document.createElement('img')
            if(pet.avatar_url != "https://imagemLegal.com"){
                img.src = pet.avatar_url
            }
            

        figure.append(img)

        let div = document.createElement('div')
        div.classList = 'dspl-flex flex__direc-column'

            let h2 = document.createElement('h2')
            h2.innerText = pet.name
            h2.classList = 'title2 font-w700'

            let small = document.createElement('small')
            small.innerText = pet.species
            small.classList = 'text6 font-w600'

            let button = buttonAdopt(getLocalStorage(), li.id)

        div.append(h2, small, button)

    li.append(figure, div)

    return li
}
function buttonAdopt(token, id){
    if(token){
        let button = document.createElement('button')
        button.innerText = 'Me adota?'

        button.addEventListener('click', async ()=>{
            let body = {
                pet_id: id,
            }

            await adoptPet(body)

            document.querySelector("body").insertAdjacentElement('afterbegin',toasty('Pet adotado com sucesso!'))

            responsePets()
        })

        return button
    }else{
        return ''
    }
}