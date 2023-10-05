const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
let data = [];

async function getData() {
    const rs = await fetch(URL);
    const response = await rs.json();
    data = response;
    console.log(data);
}
getData();

document.addEventListener('DOMContentLoaded', () => {
    const buscar = document.getElementById('btnBuscar');
    const input = document.getElementById('inputBuscar');
    buscar.addEventListener('click', () => {
        if (input.value.trim() != '') {
            let data_filtrada = data.filter((movie) => {
                let contiene_genero = false;
                for(let u=0; u<movie.genres.lenght; u++){
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
        <li class="list-group-item">
          <h4>${element.title}</h4>
          <p>${element.tagline}</p>
          <div class="rating">
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