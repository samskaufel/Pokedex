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

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

//prints pokemon list in index page
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    `<p>${pokemon.name}<br>Height: ${pokemon.height}m<br>Type: ${pokemon.type}</p>`
  );
});
