// pokemon objects
let pokemonList = [
    { 
        name: 'Bulbasaur', 
        height: 0.7, 
        type: ['grass', 'poison']
    },
    { 
        name: 'Ivysaur', 
        height: 1, 
        type: ['grass', 'poison']
    },
    { 
        name: 'Venusaur', 
        height: 2, 
        type: ['grass', 'poison']
    }
];

// this lists the pokemon and their height, and makes a note if their height is >1.9
for (let i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`)
    if (pokemonList[i].height >1.9){
        document.write(`${pokemonList[i].name} - Wow, that's big!`);
    }
}
