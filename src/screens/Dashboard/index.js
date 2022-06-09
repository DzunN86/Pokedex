import React, {useEffect} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainBg} from '../../assets/images';
import {CustomButton, HomeHeader, PokemonCard} from '../../components';
import {fetchPokemons} from '../../store/actions';
import {COLORS, FONTS, SIZES} from '../../themes';

export default function Dashboard() {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.PokeReducer.pokemons);
  const loading = useSelector(state => state.PokeReducer.loading);
  const next = useSelector(state => state.PokeReducer.next);

  useEffect(() => {
    dispatch(fetchPokemons(next));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon, indx) => indx.toString()}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        ListHeaderComponent={<HomeHeader />}
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
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}>
        <Image source={MainBg} style={styles.bgImg} />
        {/* <View style={{height: 300, backgroundColor: COLORS.secondary}} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    // padding: 10,
  },
  text_title: {
    ...FONTS.largeTitle,
    color: COLORS.black,
    margin: 10,
    marginBottom: 15,
  },
  bgImg: {
    width: '100%',
    height: SIZES.height / 2,
  },
});
