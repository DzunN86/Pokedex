import ImagePicker from 'react-native-image-crop-picker';

export const withCamera = () =>
  ImagePicker.openCamera({
    width: 780,
    height: 780,
    cropping: true,
  });

export const withGallery = () =>
  ImagePicker.openPicker({
    width: 780,
    height: 780,
    cropping: true,
  });
