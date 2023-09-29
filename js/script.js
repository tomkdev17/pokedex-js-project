
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
	//This function adds a pokemon to the repository
	function add (pokemon){
	 	if (typeof pokemon !== 'object'){
	 		console.log('New Pokemon submission must be an item');
	 	// still trying to figure out how to use Object.keys to validate the object keys
	 	// } else if (Object.keys(pokemon) !== Object.keys(pokemonList[1]) ) {
	 	// 	console.log('New Pokemon submission must contain "name, type, and height"');
	 	} else {
		pokemonList.push(pokemon);
		}
	}
	//This function creates a button with the name of each pokemon 
	function addListItem(pokemon){
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');

		button.innerText = pokemon.name; 
		button.classList.add('poke-button');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);

		button.addEventListener('click', function(event){
			showDetails(pokemon); 
		})
	} 
	//This function logs the pokemon details to the console when the name is clicked (see above function)
	function showDetails(pokemon){
			console.log(pokemon);
		}
	
	return {
		getAll: getAll,
		add: add, 	
		addListItem: addListItem
	};
})(); 
// This prints the names of the pokemon to their respective buttons
pokemonRepository.getAll().forEach(function (pokemon){
	pokemonRepository.addListItem(pokemon);
});
