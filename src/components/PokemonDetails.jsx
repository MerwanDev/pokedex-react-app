import { useParams } from 'react-router-dom';
import NotFound404 from './pages/page_404';
import React, { useState, useEffect } from 'react';

const Produit = () => {
  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState([]);

  const getPokeData = async (id) => {
    const pokeArr = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      pokeArr.push(data);
    } catch (error) {
      console.error(error);
    }

    setPokemonData(pokeArr);
  };

  useEffect(() => {
    getPokeData(id);
  }, []);

  const getCardColor = (type) => {
    switch (type) {
      case 'grass':
        return 'card-green';
      case 'fire':
        return 'card-red';
      case 'water':
        return 'card-blue';
      case 'poison':
          return 'card-violet';
      case 'rock':
        return 'card-grey';
      default:
        return 'card-default';
    }
  };

  return (
    <>
      <div>
        {pokemonData.length > 0 ? (
          <div className="container">
            <div className={`card ${getCardColor(pokemonData[0].types[0].type.name)}`}>
              <a href="http://localhost:3000/pokemon">Retour</a>
              <p className="hp">
                <span>HP</span>
                {pokemonData[0].stats[0].base_stat}
              </p>
              <img src={pokemonData[0].sprites.front_default} alt={pokemonData[0].name} />
              <h2 className="poke-name">{pokemonData[0].name}</h2>
              <div className="stats">
                <div>
                  <h3>{pokemonData[0].stats[1].base_stat}</h3>
                  <p>Attack</p>
                </div>
                <div>
                  <h3>{pokemonData[0].stats[2].base_stat}</h3>
                  <p>Defense</p>
                </div>
                <div>
                  <h3>{pokemonData[0].stats[5].base_stat}</h3>
                  <p>Speed</p>
                </div>
                <div>
                  <h3>{pokemonData[0].stats[3].base_stat}</h3>
                  <p>Special Attack</p>
                </div>
                <div>
                  <h3>{pokemonData[0].stats[4].base_stat}</h3>
                  <p>Special Defense</p>
                </div>
              </div>
              <div className="types">
                <h3>Type(s)</h3>
                {pokemonData[0].types.map((type, index) => (
                  <p key={index}>{type.type.name}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Produit;
