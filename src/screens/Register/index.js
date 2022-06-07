import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Pikachu} from '../../assets';
import {CustomButton, CustomInput} from '../../components';
import {registerSchema, showError, showSuccess} from '../../plugins';
import {addUser, register} from '../../services';
import {COLORS, FONTS, SIZES} from '../../themes';

export default function Register({navigation}) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const onRegister = ({email, password, name, bio}) => {
    setLoading(true);
    register(email, password)
      .then(res => {
        addUser(email, name, res.user.uid, bio).then(
          () => console.log('Data set.'),
          showSuccess('Register successfully.'),
          navigation.navigate('LoginScreen'),
        );
        setLoading(false);
      })
      .catch(err => {
        showError(err.message);
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} testID="LoginScreen">
      <View style={styles.container}>
        <LottieView style={styles.logoImage} source={Pikachu} autoPlay />
        <View style={styles.form}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={registerSchema}
            onSubmit={values => onRegister(values)}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <>
                <CustomInput
                  label="Full Name"
                  name="name"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  error={errors.name && touched.name}
                  iconPosition="right"
                  placeholder="Enter Full Name"
                />
                <CustomInput
                  label="Email"
                  name="email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email && touched.email}
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
                <CustomInput
                  label="Bio (optional)"
                  name="bio"
                  onChangeText={handleChange('bio')}
                  value={values.bio}
                  error={errors.bio && touched.bio}
                  iconPosition="right"
                  placeholder="Enter bio"
                />
                <CustomButton
                  testID="btn-login"
                  primary
                  loading={loading}
                  disabled={loading}
                  title="LOGIN"
                  disable={!(dirty && isValid)}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>

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
