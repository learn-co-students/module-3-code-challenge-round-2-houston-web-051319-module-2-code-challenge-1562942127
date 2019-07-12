class Beer {
    constructor(id, name, tagline, first_brewed, description, image_url, food_pairing, brewers_tips, contributed_by) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
        this.first_brewed = first_brewed;
        this.description = description;
        this.image_url = image_url;
        this.food_pairing = food_pairing;
        this.brewers_tips = brewers_tips;
        this.contributed_by = contributed_by;
        this.render()
    }

    render() {

        // Find beer list and beer detail elements on html page
        let beer_list = document.querySelector(`ul`);
        let beer_detail = document.getElementById('beer-detail')
        
        //Create list item for each beer
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item')
        li.innerText = this.name;
        
        // Click on a list item and it will bring up beer details
        li.addEventListener('click', (e) => {
            beer_detail.innerText = ''

            this.beer_details();
            
            // Create, add details and event listeners to elements, and append them to beer detail div
            let h1 = document.createElement('h1');
            h1.innerText = this.name;
            let img = document.createElement('img');
            img.src = this.image_url;
            let h3 = document.createElement('h3');
            h3.innerText = this.tagline;
            let textArea = document.createElement('textarea');
            textArea.innerText = this.description;
            let button = document.createElement('button');
            button.setAttribute('id', 'edit-beer');
            button.setAttribute('class', 'btn btn-info');
            button.innerText = "Save";

            // Save button updates beer details on server side and front end
            button.addEventListener('click', (e) => {
                console.log(textArea.value);
                this.description = textArea.value;

                fetch(`http://localhost:3000/beers/${this.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        description: textArea.value
                    })
                })
                .then(function (result) {
                    console.log('patched');
                    console.log(result);
                })

            })

            beer_detail.append(h1, img, h3, textArea, button)
        })
        beer_list.append(li);

    }

    // Method for API request to get specific beer details
    beer_details() {
        fetch(`http://localhost:3000/beers/${this.id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log('sup');
                console.log(result);
                
            })
    }


}

window.addEventListener('DOMContentLoaded', (e) => {
    
    // API Request to get all beers
    function get_beers() {
        fetch('http://localhost:3000/beers')
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(result);
                for (let i = 0; i < result.length; i++) {
                    new Beer(result[i].id, result[i].name, result[i].tagline, result[i].first_brewed, result[i].description, result[i].image_url, result[i].food_pairing, result[i].brewers_tips, result[i].contributed_by);
                }
    
            })
    }
    
    get_beers()


})

