
// This is my pokemon repository
let pokemonRepository = (function(){
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	// Allows pokmeonList to be called out of pokmeonRepository
	function  getAll (){
		return pokemonList;
	}
	//Adds a pokemon to the repository
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
	//Creates a list of buttons with the name of each pokemon 
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
		});
	} 

	//Opens the modal to show Pokemon details
	function showDetails(pokemon){
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
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
			showLoadingMessage();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
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

	
	//Creates modal with pokemon details
	function showModal(pokemon){
		let modalContainer = document.querySelector('#pokemodal-container');

			modalContainer.innerHTML = '';

			let modal = document.createElement('div');
			modal.classList.add('modal');

			let closeButtonElement = document.createElement('button');
			closeButtonElement.classList.add('modal-close');
			closeButtonElement.innerText = 'Close';
			closeButtonElement.addEventListener('click', hideModal);

			let pokeImg = document.createElement('img');
			pokeImg.classList.add('poke-img');
			pokeImg.src = pokemon.imageUrl;

			let pokeName = document.createElement('h1');
			pokeName.innerText = pokemon.name;

			let pokeHeight = document.createElement('p');
			pokeHeight.innerText = 'Height: ' + pokemon.height; 

			// let pokeTypes = document.createElement('p');
			// pokeTypes.innerText = 'Types: ' + pokemon.types;


			modal.appendChild(closeButtonElement);
			modal.appendChild(pokeImg);
			modal.appendChild(pokeName);
			modal.appendChild(pokeHeight);
			// modal.appendChild(pokeTypes);
			
			modalContainer.appendChild(modal);

			modalContainer.classList.add('is-visible');

			modalContainer.addEventListener('click', (e) => {
				let target = e.target;
				if (target === modalContainer){
					hideModal(); 
				}
			});
			window.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
					hideModal();
				}
			});
		}
		
	function hideModal(){
		let modalContainer = document.querySelector('#pokemodal-container');
		modalContainer.classList.remove('is-visible');
	}

	return {
		getAll: getAll,
		add: add, 	
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
		// showModal: showModal
	};
	
})(); 
	// This prints the names of the pokemon to their respective buttons
		pokemonRepository.loadList().then(function (){
		pokemonRepository.getAll().forEach(function (pokemon){
		pokemonRepository.addListItem(pokemon);
	});
	});





































//
	