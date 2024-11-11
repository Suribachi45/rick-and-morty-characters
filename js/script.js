// Obtener el elemento de la lista de personajes y los botones de paginación
const characterList = document.getElementById('character-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

// Variable para almacenar el número de página actual
let currentPage = 1;

// Función para obtener los personajes de la API
function fetchCharacters(page) {
    return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => data.results);
}

// Función para mostrar los personajes en la lista
function displayCharacters(characters) {
  characterList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
  characters.forEach(character => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>Species: ${character.species}</p>
    `;
    characterList.appendChild(listItem);
  });
}

// Función para manejar los eventos de los botones de paginación
function handlePagination() {
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters(currentPage).then(displayCharacters);
    }
  });

  nextPageButton.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage).then(displayCharacters);
  });
}

// Cargar los personajes iniciales
fetchCharacters(currentPage).then(displayCharacters);
handlePagination();