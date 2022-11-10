import { getLocalStorage } from "./localStorage.js";
import { toasty } from "./toast.js";




const myHeaders = {
    "Content-Type": "application/json",
  };
  


async function login(body) {
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/session/login`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      if(request.ok){
        const response = await request.json();

        document.querySelector("body").insertAdjacentElement('afterbegin',toasty(`Login realizado com sucesso!`))
        localStorage.setItem("user", JSON.stringify(response));
        window.location.reload();
      }else{
        document.querySelector("body").insertAdjacentElement('afterbegin',toasty(`Email ou senha inválido!`, "#ff5e5b"))
      }



    } catch (err) {
            console.log(err);     
   
    }
  }



  async function createUser(body) {
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/users`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      console.log(request)

      if(request.ok){

        document.querySelector("body").insertAdjacentElement('afterbegin',toasty('Login realizado com sucesso!'))
        
        setTimeout(() => {
          
          window.location.reload();
        }, 2000);
      
      }else{
      // mensagem de erro
      console.log(request)

      }
      
       
    } catch (err) {
            console.log(err);     
   
    }
  }




async function updateProfile(body) {

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
  };


  
async function deleteProfile() {

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/users/profile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        }
      });
      
  
      const response = await request.json();

      return response;

    } catch (err) {
      console.log(err)
    }
    
  }

  
  async function profile() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("https://m2-api-adot-pet.herokuapp.com/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }



async function createPet(body) {

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();

      console.log(request)

      if(request.ok){
        document.querySelector("body").insertAdjacentElement('afterbegin',toasty('Pet cadastrado com sucesso!'))
        return response
      }else{
        document.querySelector("body").insertAdjacentElement('afterbegin',toasty('Algo deu errado ao cadastrar o pet. Tente novamente',"#ff5e5b"))
        return response
      }

      return response;
    } catch (err) {
      console.log(err)
    }
  };


  async function updatePetById(body,id){

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/pets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
      const response = await request.json();

      console.log(response)
      return response;
    } catch (err) {
      console.log(err)
    }
  };




async function deletePetById(id){

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/pets/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        }
      });
      
  
      const response = await request.json();
      return response;

    } catch (err) {

      console.log(err)
    }
    
  }

    
  async function readAllPets() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("https://m2-api-adot-pet.herokuapp.com/pets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }

    
  async function readAllMyPets() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("https://m2-api-adot-pet.herokuapp.com/pets/my_pets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }






async function adoptPet(body) {

  const local = getLocalStorage();

  try {
    const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/adoptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local.token}`
      },
      body: JSON.stringify(body)
    });
    

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err)
  }
};



    
async function readAllAdoptions() {
    
  const local = getLocalStorage();

  try {
    const request = await fetch("https://m2-api-adot-pet.herokuapp.com/adoptions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local.token}`,
      },
    })
        
    const response = await request.json();

    return response
  } catch (err) {
    console.log(err);
  }
}

    
async function readAllAdoptionById(id) {
    
  const local = getLocalStorage();

  try {
    const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/adoptions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local.token}`,
      },
    })
        
    const response = await request.json();

    return response
  } catch (err) {
    console.log(err);
  }
}

async function readMyAdoptions() {
    
  const local = getLocalStorage();

  try {
    const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/adoptions/myAdoptions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local.token}`,
      },
    })
        
    const response = await request.json();

    return response
  } catch (err) {
    console.log(err);
  }
}



async function updateAdoptionById(body,id){

  const local = getLocalStorage();

  try {
    const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/adoptions/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local.token}`
      },
      body: JSON.stringify(body)
    });
    

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err)
  }
};

async function deleteAdoptionById(id) {

  const local = getLocalStorage();

  try {
    const request = await fetch(`https://m2-api-adot-pet.herokuapp.com/adoptions/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${local.token}`
      }
    });
    

    const response = await request.json();

    return response;

  } catch (err) {
    console.log(err)
  }
  
}




export{login, createUser,updateProfile,deleteProfile,profile,createPet,updatePetById,deletePetById, readAllPets,readAllMyPets,adoptPet,readAllAdoptions,readAllAdoptionById,readMyAdoptions,updateAdoptionById,deleteAdoptionById}