import * as Yup from 'yup';

const Fpassword = Yup.string()
  .required('Please Enter your password')
  .matches(
    /^(?=.{8,}$)(?=.*[a-z])(?=.*[0-9]).*$/,
    'Password must be contain at least 1 letter and 1 number',
  );

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Fpassword,
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  bio: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Fpassword,
});
