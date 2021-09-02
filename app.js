const API = "https://pokeapi.co/api/v2/pokemon/";

const form = document.querySelector('.form-container');
const input = document.querySelector('#inputPokemon');
const searchButton = document.querySelector('.submitPokemon');

const alertMessage = document.querySelector(".alert");
const loader = document.querySelector(".loader-wrapper");

//Popup
const popupCloseButton = document.querySelector(".popup-close-button");
const popupWrapper = document.querySelector(".popup-wrapper");

//Pokemon info
const pokemonImage = document.querySelector(".pokemon-image");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonHeight = document.querySelector(".pokemon-height");
const pokemonWeight = document.querySelector(".pokemon-weight");

const checkInput = () => {
    return input.value.length >= 4;
}

const closePopup = () => {
    popupWrapper.style.display = "none";
}

const setPokemonInfo = (data) => {
    pokemonImage.setAttribute("src", data.sprites.other["official-artwork"].front_default);
    pokemonName.textContent = data.name;
    pokemonHeight.textContent = `${data.height} feet`;
    pokemonWeight.textContent = `${data.weight} lb`;

    popupWrapper.style.display = "block";
}

const showAlert = (message) => {
    alertMessage.textContent = message;
    alertMessage.style.display = "block";
}

const hideAlert = () => {
    alertMessage.style.display = "none";
}

const showLoader = () => {
    loader.style.display = "flex";
}

const hideLoader = () => {
    loader.style.display = "none";
}

const fetchPokemon = (e) => {
    e.preventDefault();
    showLoader();
    hideAlert();

    if(!checkInput()) {
        showAlert("Your search must be at least 4 characters long");
        return;
    }

    showLoader();

    fetch(API + input.value.toLowerCase())
    .then(resp => {
        if(!resp.ok) {
            hideLoader();
            if(resp.status === 404) {
                showAlert("Ops, nothing has been found!");
            } else {
                showAlert("Ops, something went wrong!");
            }
        }
        return resp.json()
    })
    .then(result => {
        hideLoader();
        setPokemonInfo(result)
    })
}

form.addEventListener('submit', fetchPokemon)

popupCloseButton.addEventListener("click", closePopup)