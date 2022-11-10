import { modalUpdatePet } from "./modalProfile.js";

export function renderPet(pet){

    const card = document.createElement("li");
    card.classList = "profile-page-card dspl-flex justy__cont-SB align__items-center"

    const figure = document.createElement("figure");
    figure.classList = "pet-pic dspl-flex justy__cont-center align__items-center";

    const img = document.createElement("img");
    img.src = pet.avatar_url;

    const div = document.createElement("div");
    div.classList = "pet-infos dspl-flex flex__direc-column justy__cont-center";

    const petName = document.createElement("h3");
    petName.innerHTML = `<span>Nome: </span>${pet.name}`
    const petSpecie = document.createElement("h3");
    petSpecie.innerHTML = `<span>Espécie: </span>${pet.species}`;
    const petAdotable = document.createElement("h3");
    if(pet.available_for_adoption == true){
        petAdotable.innerHTML = `<span>Adotável: </span>Sim`
    }else{
        petAdotable.innerHTML = `<span>Adotável: </span>Não`
    }

    petName.classList = "text-4 font-w600";
    petSpecie.classList = "text-4 font-w600";
    petAdotable.classList = "text-4 font-w600";

    const button = document.createElement("button");
    button.classList = "default-fill-btn";
    button.id = "update-pet";
    button.innerText = "Atualizar";
    
    button.setAttribute("data-pet-id", pet.id)

    button.addEventListener("click", ()=>{
        
        const petId = button.getAttribute("data-pet-id");

        document.body.append(modalUpdatePet(pet));
    });

    figure.append(img);
    div.append(petName, petSpecie, petAdotable, button);
    card.append(figure, div);

    return card
}