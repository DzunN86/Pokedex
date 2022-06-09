import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';
import {backgroundColors} from '../../utils';

export default function PokeDetail({route}) {
  const item = route.params;
  const pokemonColor = backgroundColors[item.type];
  const bgStyles = {backgroundColor: pokemonColor, ...styles.imgCard};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="ios-arrow-back-circle" size={35} color={COLORS.white} />
          <View style={styles.headerName}>
            <Text style={styles.namePoke}>{item.name}</Text>
            <Text style={styles.nameType}>{item.type}</Text>
          </View>
          <Icon name="ios-arrow-back" size={35} color={COLORS.secondary} />
        </View>
        <View style={styles.body}>
          <View style={bgStyles}>
            <Image
              style={styles.detail__imagePokemon}
              source={{uri: item.imgUrl}}
            />
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
    // padding: 10,
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
    marginTop: 15,
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
  headerName: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
