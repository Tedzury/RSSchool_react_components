import * as Yup from 'yup';
import { countryList } from './constants';

const nameRegEx = /^[A-Z].*$/;
const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const MAX_FILE_SIZE = 512000;

export const defaultValidationSchema = () => {
  return {
    name: Yup.string().required('Name is required!').matches(nameRegEx, {
      message: 'Name must start with uppercase letter!',
      excludeEmptyString: true,
    }),
    email: Yup.string().required('Email is required!').matches(emailRegEx, {
      message: 'Email must be email@example.com',
      excludeEmptyString: true,
    }),
    age: Yup.number()
      .transform((value) => (Number.isNaN(value) ? 0 : value))
      .required('Age is required!')
      .integer('Age must be an integer')
      .min(1, 'Age can`t be less then 1'),
    gender: Yup.string()
      .required('Gender is required!')
      .oneOf(['male', 'female']),
    accept: Yup.boolean()
      .oneOf([true], 'Acceptance of T&C required!')
      .required('Acceptance of T&C required!'),
    image: Yup.mixed<FileList>()
      .test('File presence', 'Image is required', (value) =>
        (value as FileList)[0] ? true : false
      )
      .test(
        'Max file size',
        'Image must be less then 500KB',
        (value) => value && (value as FileList)[0]?.size < MAX_FILE_SIZE
      )
      .test(
        'Image extension',
        'Only images jpeg and png images are allowed',
        (value) => {
          if (value) {
            const extension = (value as FileList)[0]?.name.slice(
              (value as FileList)[0].name.lastIndexOf('.')
            );
            return ['.jpeg', '.jpg', 'png'].includes(extension);
          }
          return false;
        }
      ),
    country: Yup.string()
      .required('Country is required')
      .oneOf(countryList, 'Only suggested countries are available'),
    password: Yup.string().test(
      'Password strength validation',
      'Weak password',
      (value, context) => {
        if (!value)
          return context.createError({ message: ' Password is required' });
        const errors = [];
        const capital = /[A-Z]/;
        const lower = /[a-z]/;
        const number = /[0-9]/;
        const special = /[^A-Za-z0-9]/;
        if (value.search(capital) < 0) errors.push('uppercase');
        if (value.search(lower) < 0) errors.push('lowercase');
        if (value.search(number) < 0) errors.push('number');
        if (value.search(special) < 0) errors.push('special char');
        if (errors.length > 0)
          return context.createError({
            message: `${errors.length}Pass must contain ${errors.join(', ')}`,
          });
        return true;
      }
    ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Password mismatch'),
  };
};

export const rhfSchemaExtension = () => {
  return {
    accept: Yup.boolean()
      .oneOf([true], 'Acceptance of T&C required!')
      .required('Acceptance of T&C required!'),
    image: Yup.mixed<FileList>()
      .test('File presence', 'Image is required', (value) =>
        (value as FileList)[0] ? true : false
      )
      .test(
        'Max file size',
        'Image must be less then 500KB',
        (value) => value && (value as FileList)[0]?.size < MAX_FILE_SIZE
      )
      .test(
        'Image extension',
        'Only images jpeg and png images are allowed',
        (value) => {
          if (value) {
            const extension = (value as FileList)[0]?.name.slice(
              (value as FileList)[0].name.lastIndexOf('.')
            );
            return ['.jpeg', '.jpg', '.png'].includes(extension);
          }
          return false;
        }
      ),
  };
};

export const nativeSchemaExtension = () => {
  return {
    accept: Yup.string()
      .oneOf(['on'], 'Acceptance of T&C required!')
      .required('Acceptance of T&C required!'),
    image: Yup.mixed<File>()
      .test('File presence', 'Image is required', (value) =>
        value ? true : false
      )
      .test(
        'Max file size',
        'Image must be less then 500KB',
        (value) => value && value?.size < MAX_FILE_SIZE
      )
      .test(
        'Image extension',
        'Only images jpeg and png images are allowed',
        (value) => {
          if (value) {
            const extension = value?.name.slice(value.name.lastIndexOf('.'));
            return ['.jpeg', '.jpg', '.png'].includes(extension);
          }
          return false;
        }
      ),
  };
};
