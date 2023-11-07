
// This is my pokemon repository
let pokemonRepository = (function(){
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	// Allows pokmeonList to be called out of pokemonRepository
	function  getAll (){
		return pokemonList;
	}
	//Adds a pokemon to the repository
	function add (pokemon){
		if (typeof pokemon !== 'object'){
			console.log('New Pokemon submission must be an item');
		} else {
		pokemonList.push(pokemon);
		}
	}
	//Creates a list of buttons with the name of each pokemon 
	function addListItem(pokemon){
		let pokemonList = document.querySelector('.list-unstyled');
		let listItem = document.createElement('li');
		let button = document.createElement('button');

		button.innerText = pokemon.name; 
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#pokemonModal');
		button.classList.add('btn','btn-outline-danger','btn-block', 'poke-button');
		listItem.classList.add('list-group-item');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);

		button.addEventListener('click', function(){
			showDetails(pokemon); 
		});
	} 

	//Opens the modal to show Pokemon details
	function showDetails(pokemon){
		loadDetails(pokemon).then(function () {
			fillModal(pokemon);
		});
	}

	//Fetches the Pokémon list from pokeapi
	function loadList() {
		showLoadingMessage();
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
			hideLoadingMessage();
		}).catch(function (e) {
			console.error(e);
			hideLoadingMessage();
		});
	}

	//Fetches the Pokémon details from pokeapi
	function loadDetails(item) {
		hideLoadingMessage();
		let url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
			//Parses the types array to be accessible to the Modal
			let arrayOfTypes = [];
			details.types.forEach(function (item){
				arrayOfTypes.push(item.type.name);
			});
			item.typesArray = arrayOfTypes.join(', ');

			hideLoadingMessage();
		}).catch(function (e) {
			console.error(e);
			hideLoadingMessage();
		});
	}

	//The two functions below show/hide the loading message
	function showLoadingMessage(){
			let loadingMessage = document.querySelector('.loading-message');
				let message = document.createElement('p');
				message.innerText = 'Loading...  '; 
				loadingMessage.appendChild(message);
				loadingMessage.classList.toggle('loading');
		}
	function hideLoadingMessage(){
				let loadingMessage = document.querySelector('.loading-message');
				loadingMessage.classList.toggle('loading');
			}

	//Fills bootstrap modal with pokemon details

	function fillModal(pokemon) {

		let modalTitle = document.querySelector('#pokemon-name');
		let modalBody = document.querySelector('#pokemon-details');

		modalTitle.innerHTML = '';
		modalBody.innerHTML = '';

		modalTitle.innerText = pokemon.name;

		let pokeImg = document.createElement('img');
		pokeImg.src = pokemon.imageUrl;
		pokeImg.alt = 'Picture of ' + pokemon.name;

		let pokeHeight = document.createElement('p');
		pokeHeight.innerText = 'Height: ' + pokemon.height;

		let pokeTypes = document.createElement('p');
		pokeTypes.innerText = 'Types: ' + pokemon.typesArray;	
		
		modalBody.append(pokeImg, pokeHeight, pokeTypes);

	}

	return {
		getAll: getAll,
		add: add, 	
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		fillModal: fillModal
	};
	
})(); 
	// This prints the names of the pokemon to their respective buttons
		pokemonRepository.loadList().then(function (){
		pokemonRepository.getAll().forEach(function (pokemon){
		pokemonRepository.addListItem(pokemon);
	});
	});





































//
	