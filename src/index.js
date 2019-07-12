document.addEventListener("DOMContentLoaded", function() {});
 
document.getElementById('Beers').addEventListener('click', getBeers);

document.getElementById('addBeer').addEventListener('click', addBeer);

function getBeers(){

    fetch('http://localhost:3000/beers')
    .then((res) => res.json())
    .then((data) => {
        data.forEach(function(beer){
            let div = document.createElement('div')
            let name = document.createElement('li')
            let description = document.createElement('li')
            let image = document.createElement('img')
            let checkBeer = document.createElement('button')
            let beer_id = beer.id
            
            checkBeer.addEventListener('click', function(id){
                fetch(`http://localhost:3000/beers/`+id)
                .then((res) => res.json())
                .then((data) => {
        
            let beer = data

            name.innerHTML = beer.name
            description.innerHTML = beer.description
            

            div.append(name, description) 
            document.getElementById("beer-detail").append(div)
        });
            })


            name.innerHTML = beer.name
            description.innerHTML = beer.description
            image.src = beer.image_url
            checkBeer.innerText = "Details"

            div.append(name, description, image, checkBeer) 
            document.getElementById("list-group").append(div)
        });
    })
 }


 function addBeer(){
       
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    fetch('http://localhost:3000/beers',{
        method:'POST',
        headers: {'Accept': 'application/json, text/plain, */*' ,
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
    title:title, 
    body:body
    })
})
}