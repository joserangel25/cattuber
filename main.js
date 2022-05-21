const URL_API_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_KEY = '880210c2-ffd7-4746-9f5a-ed6f94511a5f';
const URL_API_FAVORITES = `https://api.thecatapi.com/v1/favourites?limit&api_key=${API_KEY}`;
const URL_API_FAVORITES_DELETE = `https://api.thecatapi.com/v1/favourites?limit&api_key=${API_KEY}`;


//Referencias al DOM
const imgHtmlArray = document.querySelectorAll('.randomsImg');
const btnAddFavArray = document.querySelectorAll('.btn-fav');
const favoritesMichisHtml = document.querySelector('#favoritesMichis');

const getRandomMichis = async () => {
  const respuesta = await fetch(URL_API_RANDOM);
  const data      = await respuesta.json();
  data.forEach((img, ind) => {
      imgHtmlArray[ind].src=`${img.url}`;
      imgHtmlArray[ind].id=`${img.id}`;
  });
}

const getFavoritesMichis = async () => {
  try {
    const respuesta = await fetch(URL_API_FAVORITES);
    const data      = await respuesta.json();
    if( respuesta.status === 200){
      data.forEach(img => {

      const htmlDiv = `
        <article>
          <img width="150" alt="Foto de gatito aleatorio" src="${img.image.url}" id="${img.image.id}" />
          <div class="btn-delete-fav">No Fav</div>
        </article>
      `; 
      favoritesMichisHtml.innerHTML += htmlDiv;

      });
    } else {
      throw new Error ('Falló la conexión para guardar el michi en el servidor')
    }
  } catch (error) {
    console.log(error)
  }
}

const saveFavoritesMiches = async (id) => {
  let img = {
    "image_id": id,
  }
  //Aquí estamos guardando un gato dentro de nuestros favoritos
  const respuesta = await fetch(URL_API_FAVORITES, {
    method: "POST",
    headers: {
    "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(img)
  });
  // console.log(respuesta)
  getFavoritesMichis();
  (respuesta.ok ) ? console.log('agregado a favorito') : console.log('No se pudo agregar a Favs')
}

async function deleteMichi (id) {
const respuesta = await fetch(URL_API_FAVORITES_DELETE(id), {
  method: "DELETE",
});
// console.log(respuesta)
getFavoritesMichis();
(respuesta.ok ) ? console.log('agregado a favorito') : console.log('No se pudo agregar a Favs')
}

//Tods los escuchadores de eventos
btnAddFavArray.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const id = e.target.previousElementSibling.id;
    saveFavoritesMiches(id)
  });
});

// setTimeout(() => {
//   const btnDeleteFavArray = document.querySelectorAll('.btn-delete-fav');
// console.log(btnDeleteFavArray)


// btnDeleteFavArray.forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     console.log(e)
//   });
// });
// }, 10000);


// const getDivsDeleteFavs = () => {
//   const btnDeleteFavArray = document.querySelectorAll('.btn-delete-fav');
//   console.log(btnDeleteFavArray)

//   btnDeleteFavArray.forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     console.log(e)
//   });
//   });
// }

//Al cargar la página
window.onload = () => {
  getRandomMichis()
  getFavoritesMichis()
  // getDivsDeleteFavs()
};

window.addEventListener('DOMContentLoaded', (event) => {
  const btnDeleteFavArray = document.querySelectorAll('.btn-delete-fav');
  console.log(btnDeleteFavArray)
});