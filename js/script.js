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

for (let i = 0; i < pokemonList.length; i++) {

	document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');

	if (pokemonList[i].height > 0.6) {
		document.write(' - Wow! That\'s a big Pokémon! ');
	}
	document.write('<br>');
}