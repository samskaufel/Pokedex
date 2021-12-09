// IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  
    function addListItem(pokemon) {
      //create li and button
      let layoutRow = document.querySelector('.layouter');
      let layoutContainer = document.createElement('div');
      layoutContainer.classList.add('col-md-3');
      let listItem = document.createElement('li');
      listItem.classList.add(
        'list-group-item',
        'list-unstyled',
        'border-5',
        'border-white',
        'bg-primary',
        'm-1',
        'p-0'
      );
      let button = document.createElement('button');
      //change text of button and add class "pokemonButton"
      button.innerText = pokemon.name;
      button.classList.add(
        'pokemonButton',
        'show-modal',
        'btn',
        'btn-primary',
        'btn-block'
      );
  
      //bootstrap modal:
      button.setAttribute('data-target', '#pokemonModal');
      button.setAttribute('data-toggle', 'modal');
  
      //attach them to the ul/li respectively
      listItem.appendChild(button);
      layoutContainer.appendChild(listItem);
      layoutRow.appendChild(layoutContainer);
  
      //add Event Listener to Button
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
    }
  
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    //fetch api
    function loadList() {
      return fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          json.results.forEach(function(item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  
  
  
    //load details for pokemon you clicked on
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.id = details.id;
  
          item.types = [];
          let typPoke = details.types;
          for (let i = 0; i < typPoke.length; i++) {
            item.types.push(' ' + typPoke[i].type.name);
          }
  
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  
    //Modal bootstrap
    //add new modal content
    function showModal(pokemon) {
      let modal = document.querySelector('.modal');
      let modalHeader = document.querySelector('.modal-header');
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');
  
      modal.classList.add('text-center', 'border-0', 'mb-1');
      modalHeader.classList.add('text-center', 'bg-primary', 'text-light');
      modalBody.classList.add('pb-5');
  
      modalTitle.innerHTML = '';
      modalBody.innerHTML = '';
  
      let titleElement = document.createElement('h2');
      titleElement.innerText = pokemon.name;
  
      let imgElement = document.createElement('img');
      imgElement.src = pokemon.imageUrl;
      imgElement.classList.add('img-fluid');
      imgElement.setAttribute('style', 'width:50%;');
  
      let contentElement = document.createElement('p');
      contentElement.innerText =
        'Height: ' + pokemon.height + '\n' + 'Weight: ' + pokemon.weight;
  
      let typeElement = document.createElement('p');
      typeElement.innerText = 'Type: ' + pokemon.types;
  
      modalTitle.appendChild(titleElement);
      modalBody.appendChild(imgElement);
      modalBody.appendChild(contentElement);
      modalBody.appendChild(typeElement);
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
      let intro = document.getElementById('intro');
      intro.setAttribute('style', 'display:none;');
      let titleHeader = document.getElementById('titleHeader');
      titleHeader.classList.add('pt-5', 'mt-3');
    });
  
    //access outside the IIFE
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
  
  //load api into pokemonRepository
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });