import {POKEMON_LOADING, SET_BACK, SET_NEXT, SET_POKEMON} from '../types';

const initialState = {
  pokemons: [],
  next: null,
  back: null,
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
    case SET_BACK:
      return {
        ...state,
        back: action.payload,
      };

    default:
      return state;
  }
};
