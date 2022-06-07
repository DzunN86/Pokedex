import {SET_POKEMON, POKEMON_LOADING, SET_NEXT, SET_BACK} from '../types';
import Axios from 'axios';

export const setNext = value => ({
  type: SET_NEXT,
  payload: value,
});
export const setBack = value => ({
  type: SET_BACK,
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

// export const fetchPokemons = next => async dispatch => {
//   try {
//     dispatch(pokemonLoading(true));
//     let url = '';
//     if (next) {
//       url = next;
//     } else {
//       url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';
//     }
//     const res = await Axios.get(url);
//     let result = await res.data.result;

//     const pokemonsArray = [];

//     for await (const pokemon of result) {
//       const pokemonDetailsResponse = await Axios.get(pokemon.url);
//       console.log("Detail Pokemon", pokemonDetailsResponse.data);


//       const pokemonDetails = await pokemonDetailsResponse.data;

//       pokemonsArray.push({
//         id: pokemonDetails.id,
//         name:
//           pokemonDetails.name[0].toUpperCase() +
//           pokemonDetails.name.substring(1),
//         type: pokemonDetails.types[0].type.name,
//         types: pokemonDetails.types,
//         moves: pokemonDetails.moves,
//         order: pokemonDetails.order,
//         imgUrl: pokemonDetails.sprites.other['official-artwork'].front_default,
//         species: pokemonDetails.species.name,
//         height: pokemonDetails.height,
//         weight: pokemonDetails.weight,
//         abilities: pokemonDetails.abilities,
//         stats: pokemonDetails.stats,
//       });
//     }
//     console.log("pokemonsArray", pokemonsArray)
//     await dispatch(setPokemon(pokemonsArray));
//     await dispatch(setNext(result.next));
//     await dispatch(setBack(result.previous));
//     await dispatch(pokemonLoading(false));
    
//   } catch (error) {
//     console.log(error);
//     await dispatch(pokemonLoading(false));
//   }
// };

export function fetchPokemons(next){
  return async (dispatch) => {
    try {
      dispatch(pokemonLoading(true))
      let url = ''
      if (next){
        url = next
      } else {
        url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
      }
      const res = await Axios.get(url)
      let result = await res.data.result

      const pokemonsArray = [];
      for await (const pokemon of result) {
        const pokemonDetailsResponse = await Axios.get(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.data;

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1),
          type: pokemonDetails.types[0].type.name,
          types: pokemonDetails.types,
          moves: pokemonDetails.moves,
          order: pokemonDetails.order,
          imgUrl: pokemonDetails.sprites.other["official-artwork"].front_default,
          species: pokemonDetails.species.name,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          abilities: pokemonDetails.abilities,
          stats: pokemonDetails.stats,
        });
      }

      // console.log(pokemonsArray[0].stats[0])
      await dispatch(setPokemon(pokemonsArray))
      await dispatch(setNext(result.next))
      await dispatch(setBack(result.previous))
      dispatch(pokemonLoading(false))
    } catch (error) {
      console.log(error,'\n---ERROR FETCH POKEMON---')
      dispatch(pokemonLoading(false))
    }
  }
}
