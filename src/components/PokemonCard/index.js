import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {pokemonColors} from '../../utils';

export default function PokemonCard(props) {
  const {pokemon} = props;
  const navigation = useNavigation();

  const pokemonColor = pokemonColors[pokemon.type];
  const bgStyles = {backgroundColor: pokemonColor, ...styles.bgStyles};

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('PokeDetailScreen', pokemon)}>
      <View style={styles.card}>
        <View style={styles.card_spacing}>
          <View style={bgStyles}>
            <Image
              style={styles.card_imagePokemon}
              source={{uri: pokemon.imgUrl}}
            />
            <Text style={styles.card_name}>{pokemon.name}</Text>
            {pokemon.types.map((type, idx) => {
              return (
                <View key={idx} style={styles.card_typeContainer}>
                  <Text style={styles.card_typeText}>{type.type.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 140,
  },
  card_spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  card_imagePokemon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
  card_name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },
  card_typeContainer: {
    backgroundColor: '#fff',
    opacity: 0.3,
    borderRadius: 10,
    alignSelf: 'baseline',
    margin: 1,
  },
  card_typeText: {
    color: 'black',
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    opacity: 1,
  },
});
