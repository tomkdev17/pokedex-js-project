
// This is my pokemon repository
let pokemonRepository = (function(){
	let pokemonList = [

	{
		name: 'Bulbasaur', 
		type: ['grass', 'poison'], 
		height: 0.7
	},

	{
		name: 'Charmander', 
		type: ['fire'], 
		height: 0.6
	},

	{
		name: 'Squirtle', 
		type: ['water'], 
		height: 0.5
	}
	];

	function  getAll (){
		return pokemonList;
	}

	function add (pokemon){
		pokemonList.push(pokemon);
	}
	return {
		getAll: getAll,
		add: add 	
	}
})() 

pokemonRepository.getAll().forEach(function (pokemon){
	document.write(pokemon.name + ': [type: ' + pokemon.type + '] [height: ' + pokemon.height + ']');
	if (pokemon.height > 0.6){
		document.write(' Wow! That\'s a big Pokémon!');
	}
	document.write('</br>');
})
