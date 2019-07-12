let beersURL = "http://localhost:3000/beers";
let ul = document.querySelector(".list-group");
let button = document.querySelector(".edit-beer");

fetch("http://localhost:3000/beers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})
  .then(respone => respone.json())
  .then(beers => {
    console.log(beers);
    let Beers = beers;
    addbeers(Beers);
  });

function addbeers(Beers) {
  for (let i = 0; i < Beers.length; i++) {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = `${Beers[i].name}`;

    ul.append(li);

    li.addEventListener("click", e => {
      e.preventDefault();
      ul.innerHTML = "";

      fetch(`http://localhost:3000/beers/${Beers[i].id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(respone => respone.json())
        .then(single => {
          console.log(single);
          addsinglebeers(single);
        });
      function addsinglebeers(single) {
        console.log(single);
        // for (let i in single) {
        let div = document.querySelector("#beer-detail");

        let h1 = document.createElement("h1");
        h1.innerText = `${single.name}`;

        let img = document.createElement("img");
        img.src = `${single.image_url}`;

        let h3 = document.createElement("h3");
        h3.innerText = `${single.tagline}`;

        let textarea = document.createElement("textarea");
        textarea.innerText = "Beer description";

        let button = document.createElement("button");
        button.setAttribute("id", "edit-beer");
        button.setAttribute("class", "btn btn-info");
        button.innerText = "Save";

        div.append(h1, img, h3, textarea, button);

        button.addEventListener("click", e => {
          e.preventDefault();
          ul.innerHTML = "";

          fetch(`http://localhost:3000/beers/${Beers[i].id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              description: "textarea.value"
            })
          });
        });
        //   }
      }
    });
  }
}
