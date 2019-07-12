class Beer {
    
    constructor () {
        
        fetch('http://localhost:3000/beers')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            this.result = result
            this.render()
        })
    }
    
    render() {
        let ul = document.querySelector('#list-group');
        let div = document.querySelector('#beer-detail')
        this.result.forEach(i => {
            
            let li = document.createElement('li')
            let img = document.createElement('img')
            let h3 = document.createElement('h3')
            let textArea = document.createElement('input')
            textArea.setAttribute('type', 'text')
            let BUTTON = document.createElement('BUTTON')
            BUTTON.setAttribute('id', 'edit-beer')

            li.innerText = i.name
            img.src = i.image_url
            h3.innerText = i.tagline
            BUTTON.innerText = "Save"

            ul.append(li, img, textArea, BUTTON)
 
        })
    }
}




class ShowBeer extends Beer {

    constructor () {
        super ()

        
    }
}




class EditBeer extends Beer {
    
    constructor () {
        super ()
        this.editBeer()
    }
    
    
    editBeer() {
        
        document.getElementById('edit-beer').addEventListener('submit', (e) => {
            e.preventDefault()
            
            fetch(' http://localhost:3000/beers/', + id, {
                method: 'PATCH', 
                headers: {
                    "Content-Type": "Application/json",
                    "Accept": "Application/json"
                },
                body: JSON.stringify({
                    description: textArea.value 
                })
            })
            alert('uggabugga')
            this.render()
        })
    }
}


addEventListener('DOMContentLoaded', main) 

    function main() {
        new Beer 
        // new EditBeer
    }


