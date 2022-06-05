import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {Pikachu} from '../../assets';
import {CustomButton, CustomInput} from '../../components';
import {showError} from '../../plugins';
import {getProfile, login} from '../../services';
import {setUser} from '../../store/actions';
import {COLORS, FONTS, SIZES} from '../../themes';

export default function Login({navigation}) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogin = data => {
    setLoading(true);
    login(data.email, data.password)
      .then(() => {
        getProfile(data.email).then(async snapshot => {
          if (snapshot.val() == null) {
            Alert.alert('Invalid Email Id');
            return false;
          }
          let userData = Object.values(snapshot.val())[0];
          console.log(userData);
          dispatch(setUser(userData));
        });
        navigation.navigate('DashboardUserScreen');
        setLoading(false);
      })
      .catch(err => {
        showError(err);
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} testID="LoginScreen">
      <View style={styles.container}>
        <LottieView style={styles.logoImage} source={Pikachu} autoPlay />
        <View style={styles.form}>
          <CustomInput
            testID="input-email"
            label="Email"
            name="email"
            iconPosition="right"
            placeholder="Enter Email"
          />
          <CustomInput
            testID="input-password"
            label="Password"
            name="password"
            iconPosition="right"
            secureTextEntry={isSecureEntry}
            placeholder="Enter Password"
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Icon
                  name={isSecureEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            }
          />
          <CustomButton
            testID="btn-login"
            primary
            loading={loading}
            disabled={loading}
            title="LOGIN"
            onPress={onLogin}
          />

          <View style={styles.createSection}>
            <Text style={styles.infoText}>Dont have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}>
              <Text style={styles.linkBtn}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 190,
    borderRadius: 10,
  },
  scroll: {flexGrow: 1, backgroundColor: COLORS.white},
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoImage: {
    height: SIZES.width * 0.7,
    width: SIZES.width * 0.7,
    alignSelf: 'center',
    // marginTop: 50,
  },
  title: {
    ...FONTS.h2,
    textAlign: 'center',
    paddingTop: 20,
    color: COLORS.black,
  },

  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },

  form: {
    paddingTop: 10,
  },
  createSection: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  linkBtn: {
    marginTop: 7,
    color: COLORS.primary,
    ...FONTS.h3,
  },

  infoText: {
    ...FONTS.body4,
  },
});
