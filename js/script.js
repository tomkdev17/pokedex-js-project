
// This is my pokemon repository
let pokemonRepository = (function(){
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	// This function allows pokmeonList to be called out of pokmeonRepository
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
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url 
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types; 
		}).catch(function (e) {
			console.error(e);
		});
	}

	
	return {
		getAll: getAll,
		add: add, 	
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};
})(); 
// This prints the names of the pokemon to their respective buttons
pokemonRepository.loadList().then(function (){
	pokemonRepository.getAll().forEach(function (pokemon){
	pokemonRepository.addListItem(pokemon);
});
})



	