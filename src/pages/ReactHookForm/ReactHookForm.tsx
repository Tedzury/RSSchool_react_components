import BackBtn from '../../shared/ui/BackBtn';
import FormHeader from '../../shared/ui/FormHeader';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { countryList } from '../../shared/constants';
import { useEffect, useState } from 'react';
import { addFormData } from '../../store/appStateSlice';

const nameRegEx = /^[A-Z].*$/;
const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const MAX_FILE_SIZE = 512000;

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required!')
    .matches(nameRegEx, {
      message: 'Name must start with uppercase letter!',
      excludeEmptyString: true,
    })
    .min(2, 'Name must be at least 2 characters long!'),
  email: Yup.string()
    .required('Email is required!')
    .matches(emailRegEx, {
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
});

function getColor(numb: string) {
  switch (numb) {
    case '3':
      return 'text-[red]';
    case '2':
      return 'text-[orange]';
    case '1':
      return 'text-[yellow]';
    default:
      return 'text-[black]';
  }
}

const toBase64 = (fileList: FileList | undefined) =>
  new Promise((resolve, reject) => {
    if (!fileList) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

type RawFormDataType = {
  image?: FileList | undefined;
  password?: string | undefined;
  name: string;
  email: string;
  age: number;
  gender: string;
  accept: NonNullable<boolean | undefined>;
  country: string;
  confirmPassword: string;
};

export default function ReactHookForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { countryList } = useAppSelector((state) => state.appReducer);
  const list = countryList.map((country) => (
    <option key={country} value={country}></option>
  ));

  const onSubmit: SubmitHandler<RawFormDataType> = async (data) => {
    console.log(data);
    const {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      accept,
      image,
      country,
    } = data;
    const image64 = await toBase64(image);
    dispatch(
      addFormData({
        name,
        age,
        email,
        password: password as string,
        confirmPassword,
        gender,
        accept,
        image: image64 as string,
        country,
      })
    );
    reset();
  };

  const [textColor, setTextColor] = useState('black');
  useEffect(() => {
    setTextColor(getColor(errors.password?.message?.slice(0, 1) as string));
  }, [errors.password?.message]);

  return (
    <>
      <BackBtn />
      <FormHeader title="React hook form" />
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input {...register('name')} placeholder="Name" type="text" />
        <p>{errors.name?.message as string}</p>

        <input
          {...register('email')}
          placeholder="Email address"
          type="email"
        />
        <p>{errors.email?.message as string}</p>

        <input {...register('age')} type="number" placeholder="0" />
        <p>{errors.age?.message as string}</p>

        <input {...register('gender')} type="radio" value="male" />
        <input {...register('gender')} type="radio" value="female" />
        <p>{errors.gender?.message as string}</p>

        <input {...register('accept')} type="checkbox" />
        <p>{errors.accept?.message as string}</p>

        <input {...register('image')} type="file" />
        <p>{errors.image?.message as string}</p>

        <input
          {...register('country')}
          placeholder="Country..."
          type="text"
          list="countryList"
        />
        <p>{errors.country?.message as string}</p>

        <input
          {...register('password')}
          placeholder="Password..."
          type="password"
        />
        <p className={`${textColor}`}>
          {errors.password?.message?.slice(1) as string}
        </p>

        <input
          {...register('confirmPassword')}
          placeholder="Password confirm..."
          type="password"
        />
        <p>{errors.confirmPassword?.message as string}</p>

        <datalist id="countryList">{list}</datalist>

        <button>submit</button>
      </form>
    </>
  );
}
