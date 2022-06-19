import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {Avatar, BottomSheet} from '@rneui/base';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardInfo,
  CustomButton,
  CustomInput,
  OverlayLoading,
} from '../../components';
import {getProfile} from '../../services';
import {logoutUser, setUser} from '../../store/actions';
import {COLORS, SIZES} from '../../themes';
import {showError, showSuccess, withCamera, withGallery} from '../../plugins';

export default function ProfileScreen({navigation}) {
  const userProfile = useSelector(state => state.UserReducer.userData);
  const [isVisible, setIsVisible] = useState(false);
  const [modalAvatar, setModalAvatar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      name: userProfile.name,
      bio: userProfile.bio,
    },
  });

  const dispatch = useDispatch();

  // Logout
  const onLogout = () => {
    dispatch(logoutUser(navigation));
  };

  const resetModalProfile = () => {
    setIsVisible(false);
    reset();
  };

  const resetModalImage = () => {
    setModalAvatar(false);
  };

  const updateProfile = async data => {
    try {
      await database()
        .ref(`/users/${userProfile.id_user}`)
        .update({name: data.name, bio: data.bio})
        .then(() => {
          getProfile(userProfile.email).then(async snapshot => {
            let userData = Object.values(snapshot.val())[0];
            dispatch(setUser(userData));
          });
          setIsVisible(false);
          showSuccess('Profile updated');
        });
    } catch (error) {
      showError(error);
    }
  };

  const updateAvatar = async data => {
    try {
      await database()
        .ref(`/users/${userProfile.id_user}`)
        .update({avatar: data})
        .then(() => {
          getProfile(userProfile.email).then(async snapshot => {
            let userData = Object.values(snapshot.val())[0];
            dispatch(setUser(userData));
          });
          setUploading(false);
          showSuccess('Avatar updated');
        });
    } catch (error) {
      setUploading(false);
      showError(error);
    }
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
    filename = userProfile.id_user + '.' + extension;

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
      await updateAvatar(url);
    } catch (e) {
      console.log(e);
      setUploading(false);
      return null;
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Avatar User */}
        <View style={styles.fotoProfile}>
          <Avatar
            size={160}
            rounded
            source={{
              uri: userProfile.avatar,
            }}
          />
          <TouchableOpacity
            style={styles.editAvatar}
            onPress={() => setModalAvatar(true)}>
            <View style={styles.camera}>
              <Icon name="camera" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>
        {/* Info user */}
        <View style={styles.infoUser}>
          <CardInfo
            icon="person"
            label="Nama"
            content={userProfile.name}
            edit
            onPress={() => setIsVisible(true)}
          />
          <CardInfo
            icon="information-circle"
            label="Bio"
            content={userProfile.bio}
          />
          <CardInfo
            topDivider
            icon="mail"
            label="Email"
            content={userProfile.email}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            icon={<Icon name="log-out" size={20} color={COLORS.white} />}
            danger
            title="Logout"
            onPress={onLogout}
          />
        </View>
        {/* Modal Update Info User */}
        <BottomSheet isVisible={isVisible} onBackdropPress={resetModalProfile}>
          <View style={styles.form}>
            <CustomInput
              testID="input-name"
              label="Nama"
              name="name"
              iconPosition="right"
              placeholder="Enter Name"
              control={control}
              rules={{
                required: 'Name is required',
              }}
            />
            <CustomInput
              testID="input-bio"
              label="Bio"
              name="bio"
              iconPosition="right"
              placeholder="Enter Bio"
              control={control}
              rules={{
                required: 'Bio is required',
              }}
            />
            <View style={styles.buttonAction}>
              <CustomButton
                style={styles.btnStyle}
                secondary
                onPress={resetModalProfile}
                title="Cancel"
              />
              <CustomButton
                style={styles.btnStyle}
                primary
                title="Save"
                onPress={handleSubmit(updateProfile)}
              />
            </View>
          </View>
        </BottomSheet>
        {/* Modal Upload Avatars */}
        <BottomSheet isVisible={modalAvatar} onBackdropPress={resetModalImage}>
          <View style={styles.form}>
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
      </View>
      {uploading && <OverlayLoading title={transferred + '% Completed!'} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  fotoProfile: {
    marginTop: 40,
    alignSelf: 'center',
  },
  form: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
  infoUser: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  buttonAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnStyle: {
    marginLeft: 10,
    width: '20%',
  },
  buttonWrapper: {
    width: SIZES.width * 0.9,
    position: 'absolute',
    bottom: 19,
    alignSelf: 'center',
  },
});
