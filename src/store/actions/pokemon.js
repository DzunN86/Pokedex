import Axios from 'axios';
import {POKEMON_LOADING, SET_NEXT, SET_POKEMON} from '../types';

export const setNext = value => ({
  type: SET_NEXT,
  payload: value,
});

export const setPokemon = value => ({
  type: SET_POKEMON,
  payload: value,
});

export const pokemonLoading = value => ({
  type: POKEMON_LOADING,
  payload: value,
});

export function fetchPokemons(next) {
  return async dispatch => {
    try {
      dispatch(pokemonLoading(true));
      let url = '';
      if (next) {
        url = next;
      } else {
        url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';
      }
      const res = await Axios.get(url);
      let result = await res.data;

      const pokemonsArray = [];
      for await (const pokemon of result.results) {
        const pokemonDetailsResponse = await Axios.get(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.data;

        pokemonsArray.push({
          id: pokemonDetails.id,
          name:
            pokemonDetails.name[0].toUpperCase() +
            pokemonDetails.name.substring(1),
          type: pokemonDetails.types[0].type.name,
          types: pokemonDetails.types,
          imgUrl:
            pokemonDetails.sprites.other['official-artwork'].front_default,
        });
      }

      await dispatch(setPokemon(pokemonsArray));
      await dispatch(setNext(result.next));
      dispatch(pokemonLoading(false));
    } catch (error) {
      dispatch(pokemonLoading(false));
    }
  };
}
