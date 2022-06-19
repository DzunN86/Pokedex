import { useNavigation } from '@react-navigation/native';
import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import { useSelector } from 'react-redux';
import {Logo} from '../../assets/images';
import {COLORS, FONTS, SIZES} from '../../themes';

const HomeHeader = () => {
  const userProfile = useSelector(state => state.UserReducer.userData);
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: SIZES.font,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={Logo}
          resizeMode="contain"
          style={{width: 100, height: 35, tintColor: COLORS.white}}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={{width: 45, height: 45}}>
          <Image
            source={{
              uri: userProfile.avatar,
            }}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 45,
              borderColor: COLORS.white,
              borderWidth: 2,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: SIZES.padding2}}>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.white,
          }}>
          Hello {userProfile.name} 👋
        </Text>

        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}>
          Let`s catch some pokemon
        </Text>
      </View>
    </View>
  );
};

export default memo(HomeHeader);
