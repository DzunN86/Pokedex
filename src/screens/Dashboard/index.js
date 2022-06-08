import React, {useEffect} from 'react';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomButton, PokemonCard} from '../../components';
import {fetchPokemons} from '../../store/actions';
import {COLORS, FONTS} from '../../themes';

export default function Dashboard() {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.PokeReducer.pokemons);
  const loading = useSelector(state => state.PokeReducer.loading);
  const next = useSelector(state => state.PokeReducer.next);

  useEffect(() => {
    dispatch(fetchPokemons(next));
    console.log('Helloooooooooooooooooooooo pokemon', pokemons);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text_title}>Pokédex</Text>
      <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={pokemon => String(pokemon.id)}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        ListFooterComponent={() => (
          <View style={{padding: 5, marginTop: 10}}>
            <CustomButton
              primary
              loading={loading}
              disabled={loading}
              title="Show More"
              disable={next === null}
              onPress={() => dispatch(fetchPokemons(next))}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FBFB',
    // padding: 10,
  },
  text_title: {
    ...FONTS.largeTitle,
    color: COLORS.black,
    margin: 10,
    marginBottom: 15,
  },
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'android' ? 5 : 0,
  },
});
