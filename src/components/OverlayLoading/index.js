import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../themes';

const OverlayLoading = ({title}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default OverlayLoading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {...FONTS.h3, marginTop: 12, color: COLORS.white},
});
