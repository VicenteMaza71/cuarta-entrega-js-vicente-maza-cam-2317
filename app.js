const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);

buttonClear.addEventListener('click' , deletePokemons);

async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    const pokemonDataJSON = await res.json()

    const allItems = [];
    const result = [];

    for (let pokemonInfo in pokemonDataJSON) { 
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
    }

    console.table(result); 

    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default;

    
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`; 

    
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Type: ${result[16][1][0].type.name}`;

    
    const hp = document.createElement('p');
    hp.innerText = `HP: ${result[15][1][0].base_stat}`;

    hp.classList.add('pokemonStats');

    
    const attack = document.createElement('p');
    attack.innerText = `Attack: ${result[15][1][1].base_stat}`;
    attack.classList.add('pokemonStats');

   
    const defense = document.createElement('p');
    defense.innerText = `Defense: ${result[15][1][2].base_stat}`;

    
    const specialAttack = document.createElement('p');
    specialAttack.innerText = `Special Attack: ${result[15][1][3].base_stat}`;
    specialAttack.classList.add('pokemonStats');

   
    const specialDefense = document.createElement('p');
    specialDefense.innerText = `Special Defense: ${result[15][1][4].base_stat}`;
    specialDefense.classList.add('pokemonStats');

    
    const speed = document.createElement('p');
    speed.innerText = `Speed: ${result[15][1][5].base_stat}`; 

    const stats = document.createElement('div');
    stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
    stats.classList.add('pokemonStatsContainer');

    
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("No se encontro");
  }
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}
