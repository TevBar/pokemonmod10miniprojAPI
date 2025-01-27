const form = document.getElementById('searchForm');
const pokemonInfo = document.getElementById('pokemonInfo');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('pokemonSearch').value.trim().toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) throw new Error('Pokémon not found.');
    const data = await response.json();

    pokemonInfo.innerHTML = `
      <div class="card mx-auto" style="width: 18rem;">
        <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${data.name}</h5>
          <p class="card-text">ID: ${data.id}</p>
          <p class="card-text">Type: ${data.types.map(t => t.type.name).join(', ')}</p>
          <p class="card-text">Abilities: ${data.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
      </div>
    `;
  } catch (error) {
    pokemonInfo.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
});
