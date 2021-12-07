// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } 
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    // assigns the list of pokemons to HTML
    let layoutrow = document.querySelector(".layouter");
    let container = document.createElement("div");
    container.classList.add("col-md-3");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add(
        "list-group-item",
        "list-unstyled"
    );
    
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add(
        "pokemonButton",
        "show-modal",
        "btn"
    );

    // bootstrap modal
    button.setAttribute("data-target", "#pokemonModal");
    button.setAttribute("data-toggle", "modal");

    // append children
    listpokemon.appendChild(button);
    container.appendChild(listpokemon);
    layoutrow.appendChild(container);

    // add event listener
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //   Clear all existing modal content
  function showModal(pokemon) {
    let modal = document.querySelector(".modal");
    let modalHeader = document.querySelector(".modal-header");
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    modal.classList.add("text-center");
    modalHeader.classList.add("text-center");
    modalBody.classList.add(pb-5);

    modalTitle.innerHTML = " ";
    modalBody.innerHTML = " ";

    let titleElement = document.createElement("h2");
    titleElement.innerText = pokemon.name;

    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add("img-fluid");
    imageElement.setAttribute("style", "width:50%");

    let contentElement = document.createElement("p");
    contentElement.innerText = 
    "Height: " + pokemon.height;   

    modalTitle.appendChild(titleElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(contentElement);
  }

  let searchPokemon = document.querySelector('#search-input');
  searchPokemon.addEventListener('input', () => {
    let value = searchPokemon.value.toLowerCase();
    let pokemonList = document.querySelectorAll('li');
    pokemonList.forEach(pokemon => {
      if (pokemon.innerText.toLowerCase().includes(value))
        pokemon.style.display = 'block';
      else pokemon.style.display = 'none';
    });
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
