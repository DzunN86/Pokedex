import {POKEMON_LOADING, SET_NEXT, SET_POKEMON} from '../types';

const initialState = {
  pokemons: [],
  next: null,
  loading: false,
};

export const PokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };
    case POKEMON_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_NEXT:
      return {
        ...state,
        next: action.payload,
      };
    default:
      return state;
  }
};
