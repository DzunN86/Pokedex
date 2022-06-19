import {Formik} from 'formik';
import React, {useState} from 'react';
import {Avatar, BottomSheet} from '@rneui/base';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IIcon from 'react-native-vector-icons/Ionicons';
import {Pokeball} from '../../assets';
import {CustomButton, CustomInput, OverlayLoading} from '../../components';
import {
  registerSchema,
  showError,
  showSuccess,
  withCamera,
  withGallery,
} from '../../plugins';
import {addUser, register} from '../../services';
import {COLORS, FONTS, SIZES} from '../../themes';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';

export default function Register({navigation}) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [modalAvatar, setModalAvatar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const resetModalImage = () => {
    setModalAvatar(false);
  };

  const onRegister = ({email, password, name, bio}) => {
    setLoading(true);
    register(email, password)
      .then(res => {
        addUser(email, name, res.user.uid, bio, avatar).then(
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

  const takePhotoFromCamera = () => {
    setModalAvatar(false);
    withCamera()
      .then(val => {
        console.log(val);
        const imageUri = Platform.OS === 'ios' ? val.sourceURL : val.path;
        uploadImage(imageUri);
      })
      .catch(() => {});
  };

  const choosePhotoFromLibrary = () => {
    setModalAvatar(false);
    withGallery()
      .then(val => {
        console.log(val);
        const imageUri = Platform.OS === 'ios' ? val.sourceURL : val.path;
        uploadImage(imageUri);
      })
      .catch(() => {});
  };

  const uploadImage = async imageUri => {
    if (imageUri == null) {
      return null;
    }
    const uploadUri = imageUri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    // const name = filename.split('.').slice(0, -1).join('.');
    filename = uuid.v4 + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      setAvatar(url);
    } catch (e) {
      console.log(e);
      setUploading(false);
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} testID="LoginScreen">
      <View style={styles.container}>
        <View style={styles.fotoProfile}>
          <Avatar
            size={160}
            rounded
            source={avatar ? {uri: avatar} : Pokeball}
          />
          <TouchableOpacity
            style={styles.editAvatar}
            onPress={() => setModalAvatar(true)}>
            <View style={styles.camera}>
              <IIcon name="camera" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={registerSchema}
            onSubmit={values => onRegister(values)}>
            {({handleChange, handleSubmit, values, errors, isValid, dirty}) => (
              <>
                <CustomInput
                  label="Full Name"
                  name="name"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  error={errors.name}
                  iconPosition="right"
                  placeholder="Enter Full Name"
                />
                <CustomInput
                  label="Email"
                  name="email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  iconPosition="right"
                  placeholder="Enter Email"
                />
                <CustomInput
                  testID="input-password"
                  label="Password"
                  name="password"
                  iconPosition="right"
                  onChangeText={handleChange('password')}
                  secureTextEntry={isSecureEntry}
                  value={values.password}
                  error={errors.password}
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
                  error={errors.bio}
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
              <Text style={styles.linkBtn}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Modal Upload Avatars */}
      <BottomSheet isVisible={modalAvatar} onBackdropPress={resetModalImage}>
        <View style={styles.formPicker}>
          <CustomButton
            primary
            icon={<Icon name="camera" size={20} color={COLORS.white} />}
            title="Take Photo"
            onPress={takePhotoFromCamera}
          />
          <CustomButton
            secondary
            icon={<Icon name="image" size={20} color={COLORS.white} />}
            title="Choose Photo"
            onPress={choosePhotoFromLibrary}
          />
        </View>
      </BottomSheet>
      {uploading && <OverlayLoading title={transferred + '% Completed!'} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 190,
    borderRadius: 10,
  },
  fotoProfile: {
    marginTop: 40,
    alignSelf: 'center',
  },
  editAvatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: 10,
  },
  camera: {
    backgroundColor: COLORS.primary,
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  formPicker: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
