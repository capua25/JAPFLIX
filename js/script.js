const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
let data = [];
let data_filtrada = [];

async function getData() {
    const rs = await fetch(URL);
    const response = await rs.json();
    data = response;
}
getData();

document.addEventListener('DOMContentLoaded', () => {
    const buscar = document.getElementById('btnBuscar');
    const input = document.getElementById('inputBuscar');
    buscar.addEventListener('click', () => {
        if (input.value.trim() != '') {
            data_filtrada = data.filter((movie) => {
                let contiene_genero = false;
                for(let u=0; u<movie.genres.length; u++){
                    if(movie.genres[u].name.toLowerCase().includes(input.value.toLowerCase())){contiene_genero = true}
                }
                return(
                movie.title.toLowerCase().includes(input.value.toLowerCase()) 
                || contiene_genero
                || movie.tagline.toLowerCase().includes(input.value.toLowerCase()) 
                || movie.overview.toLowerCase().includes(input.value.toLowerCase())
                )
            });
            showList(data_filtrada);
        } else {
            alert('Error');
        }
    });
});

function showList(array){
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    array.forEach(element => {
        let stars = [];
        for(let i=0; i<5; i++){
            if(i<Math.round(element.vote_average/2)){
                stars.push('<span class="fa fa-star checked"></span>')
            }else{
                stars.push('<span class="fa fa-star"></span>')
            }
        }
        lista.innerHTML +=`
        <li class="list-group-item bg-dark text-white d-flex justify-content-between" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" onclick=info(${element.id})>
          <div class="col-7">
            <h4>${element.title}</h4>
            <p>${element.tagline}</p>
          </div>
          <div class="col-sm3">
            ${stars[0]}
            ${stars[1]}
            ${stars[2]}
            ${stars[3]}
            ${stars[4]}
          </div>
        </li>
        `;
    });
}

function info(id){
    const offtitle = document.getElementById('offtitle');
    const offdesc = document.getElementById('offdesc');
    const offcanva = document.getElementById('offcanva');
    const dropoff = document.getElementById('dropoff');
    offcanva.innerHTML = '';
    let info_movie = {};
    data_filtrada.forEach((element) => {
        if(element.id==id){info_movie=element}
    });
    offtitle.innerHTML = `${info_movie.title}`;
    offdesc.innerHTML = `${info_movie.overview}`;
    for(let u=0; u<info_movie.genres.length; u++){
        offcanva.innerHTML += `
        <p class="text-secondary">- ${info_movie.genres[u].name} -</p>
        `;
    }
    dropoff.innerHTML = '';
    dropoff.innerHTML += `
        <li class="d-flex justify-content-between"><p>Year:</p><p>${info_movie.release_date.slice(0,4)}</p></li>
        <li class="d-flex justify-content-between"><p>Runtime:</p><p>${info_movie.runtime} mins</p></li>
        <li class="d-flex justify-content-between"><p>Budget:</p><p>${info_movie.budget}</p></li>
        <li class="d-flex justify-content-between"><p>Revenue:</p><p>${info_movie.revenue}</p></li>
    `;
}