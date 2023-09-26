
// This is my pokemon repository
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

pokemonList.forEach(function (pokemon){
	document.write(pokemon.name + ': [type: ' + pokemon.type + '] [height: ' + pokemon.height + '] </br>');
});