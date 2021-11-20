// IIFE
let pokemonRepository = (function () {
    let pokemonList = [
    {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['grass', 'poison'],
    },
    {
    name: 'Ivysaur',
    height: 1,
    type: ['grass', 'poison'],
    },
    {
    name: 'Venusaur',
    height: 2,
    type: ['grass', 'poison'],
    },
];

function add(pokemon) {
    if (
    typeof pokemon === 'object' && 
    'name' in pokemon && 
    'height' in pokemon &&
    'types' in pokemon) 
    {
    pokemonList.push(pokemon);
    } else {
    console.log('pokemon is not correct');
    }
}

function getAll() {
    return pokemonList;
}

function addListItem (pokemon) {
    // assigns the list of pokemons to HTML
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    // adds class to button for CSS styling
    button.classList.add('button-class');

    // append children
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    // add event listener
    button.addEventListener('click', function () {
        showDetails(pokemon)
    });
}

function showDetails (pokemon) {
    console.log(pokemon);
}

return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
};
})();

console.log(pokemonRepository.getAll(
));

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
}); 
