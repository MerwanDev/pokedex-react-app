import React, { useState, useEffect } from 'react';

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const getAllPokeData = async (max) => {
    const pokeArr = [];
    const url = "https://pokeapi.co/api/v2/pokemon/";
    for (let index = 1; index <= max; index++) {
      const finalUrl = url + index;

      try {
        const response = await fetch(finalUrl);
        const data = await response.json();
        pokeArr.push(data);
      } catch (error) {
        console.error(error);
      }
    }

    setPokemonData(pokeArr);
  };

  useEffect(() => {
    getAllPokeData(151);
  }, []);

  return (
    <div>    
        <>
        <div className="container">
      {pokemonData.map((pokemon, index) => (
        <div key={index} className="card">
          <a href={`http://localhost:3000/pokemon/${pokemon.id}`}>Voir</a>
          <p className="hp">
            <span>HP</span>
            {pokemon.stats[0].base_stat}
          </p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2 className="poke-name">{pokemon.name}</h2>
          <div className="stats">
            <div>
              <h3>{pokemon.stats[1].base_stat}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>{pokemon.stats[2].base_stat}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>{pokemon.stats[5].base_stat}</h3>
              <p>Speed</p>
            </div>
            <div>
              <h3>{pokemon.stats[3].base_stat}</h3>
              <p>Special Attack</p>
            </div>
            <div>
              <h3>{pokemon.stats[4].base_stat}</h3>
              <p>Special Defense</p>
            </div>
          </div>
        </div>
      ))}
    </div>
        </>
        
    </div>
  );
};

export default Pokemon;
