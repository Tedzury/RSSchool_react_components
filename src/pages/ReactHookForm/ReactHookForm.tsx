import BackBtn from '../../shared/ui/BackBtn';
import FormHeader from '../../shared/ui/FormHeader';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { addFormData } from '../../store/appStateSlice';
import { RawFormDataType } from '../../shared/types';
import { validationSchema } from '../../shared/validationSchema';
import getTextColor from '../../helpers/getTextColor';
import { encodeToBase64 } from '../../helpers/encodeToBase64';

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

  const onSubmit: SubmitHandler<RawFormDataType> = async ({
    name,
    age,
    email,
    password,
    confirmPassword,
    gender,
    accept,
    image,
    country,
  }) => {
    const image64 = await encodeToBase64(image);
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

  const [textColor, setTextColor] = useState('text-[black]');
  useEffect(() => {
    setTextColor(getTextColor(errors.password?.message?.slice(0, 1) as string));
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
