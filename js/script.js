
const characterList = document.getElementById('character-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');


let currentPage = 1;


function fetchCharacters(page) {
    return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.json())
        .then(data => data.results);
}

function displayCharacters(characters) {
  characterList.innerHTML = ''; 
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


fetchCharacters(currentPage).then(displayCharacters);
handlePagination();