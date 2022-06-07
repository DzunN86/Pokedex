import {logout} from '../../services';
import {showError} from '../../plugins';
import {LOGUT_USER, SET_USER} from '../types';

export const setUser = value => ({
  type: SET_USER,
  payload: value,
});
export const logoutUser = navigation => async dispatch => {
  await logout()
    .then(() => {
      dispatch({type: LOGUT_USER});
      navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
    })
    .catch(err => {
      showError(err);
    });
};
