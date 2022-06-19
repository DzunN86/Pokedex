import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Easing,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';
import {backgroundColors, pokemonColors} from '../../utils';

export default function PokeDetail({route}) {
  const item = route.params;
  const pokemonColor = backgroundColors[item.type];
  const bgStyles = {backgroundColor: pokemonColor, ...styles.imgCard};
  const animateCatchValue = useState(new Animated.Value(0))[0];

  const rotate = animateCatchValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 10],
    outputRange: [
      '0deg',
      '14deg',
      '-8deg',
      '14deg',
      '-4deg',
      '10deg',
      '0deg',
      '0deg',
    ],
  });

  const animate = async () => {
    animateCatchValue.setValue(0);
    Animated.timing(animateCatchValue, {
      toValue: 10,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 2500,
    }).start();
  };

  useEffect(() => {
    animate();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="ios-arrow-back-circle" size={35} color={COLORS.white} />
          <View style={styles.headerName}>
            <Text style={styles.namePoke}>{item.name}</Text>
            {/* <Text style={styles.nameType}>{item.species.name}</Text> */}
          </View>
          <Icon name="ios-arrow-back" size={35} color={COLORS.secondary} />
        </View>
        <View style={styles.body}>
          <View style={bgStyles}>
            <TouchableWithoutFeedback onPress={animate}>
              <Animated.Image
                style={[styles.detail__imagePokemon, {transform: [{rotate}]}]}
                source={{uri: item.imgUrl}}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.detail__pokemon}>
            <Text style={styles.sub_info}>About</Text>
            <Text style={styles.sub_content}>
              There is a plant seed on its back right from the day this Pokémon
              is born. The seed slowly grows larger. While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.
            </Text>
            <Text style={styles.sub_info}>Type</Text>
            <View style={{flexDirection: 'row', paddingVertical: 10}}>
              {item.types.map((type, idx) => {
                return (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: pokemonColors[type.type.name],
                      ...styles.card_typeContainer,
                    }}>
                    <Text style={styles.card_typeText}>{type.type.name}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.sub_info}>Ability</Text>
            <Text style={styles.sub_info}>Moves</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  detail__pokemon: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginHorizontal: SIZES.width * 0.09,
  },
  sub_info: {
    ...FONTS.h1,
    color: COLORS.white,
    marginBottom: 10,
    marginVertical: 10,
  },
  sub_content: {
    ...FONTS.body3,
    color: COLORS.white,
    marginVertical: 10,
    textAlign: 'justify',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  detail__imagePokemon: {
    height: 250,
    width: 250,
  },
  namePoke: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  nameType: {
    ...FONTS.body2,
    color: COLORS.white,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.width / 15,
    marginTop: 20,
    width: SIZES.width / 1.2,
    height: SIZES.width / 1.2,
    // paddingHorizontal: SIZES.width * 0.05,
    // paddingVertical: SIZES.height * 0.1,
  },
  card_typeContainer: {
    borderRadius: 10,
    alignSelf: 'baseline',
    paddingHorizontal: SIZES.width * 0.05,
    marginRight: 10,
  },
  card_typeText: {
    color: '#fff',
    ...FONTS.body3,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    opacity: 1,
  },
  headerName: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
