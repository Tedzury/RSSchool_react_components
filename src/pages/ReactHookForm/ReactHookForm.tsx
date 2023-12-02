import BackBtn from '../../shared/ui/BackBtn';
import FormHeader from '../../shared/ui/FormHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../store/hooks';
import { useEffect, useState, useRef } from 'react';
import { addFormData } from '../../store/appStateSlice';
import { RawFormDataType } from '../../shared/types';
import {
  defaultValidationSchema,
  rhfSchemaExtension,
} from '../../shared/validationSchema';
import getTextColor from '../../helpers/getTextColor';
import { encodeToBase64 } from '../../helpers/encodeToBase64';
import CountryList from './ui/CountryList';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  ...defaultValidationSchema(),
  ...rhfSchemaExtension(),
});

export default function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fileBtnText, setFileBtnText] = useState('upload');
  const [textColor, setTextColor] = useState('text-[black]');
  const fileLabel = useRef(null);

  function handleBtnTextChange(target: HTMLInputElement) {
    const fileName = target?.files && target.files[0] && target?.files[0].name;
    if (typeof fileName === 'string') {
      setFileBtnText(
        fileName.length > 14 ? fileName.substring(0, 14) + '...' : fileName
      );
    } else {
      setFileBtnText('upload');
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  async function onSubmit({
    name,
    age,
    email,
    password,
    confirmPassword,
    gender,
    accept,
    image,
    country,
  }: RawFormDataType) {
    const myImage = image && image[0];
    const image64 = await encodeToBase64(myImage);
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
    navigate('/');
  }
  useEffect(() => {
    setTextColor(getTextColor(errors.password?.message?.slice(0, 1) as string));
  }, [errors.password?.message]);

  return (
    <>
      <BackBtn />
      <FormHeader title="React hook form" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mt-10 flex flex-col gap-5 px-10 text-accent_beige">
          <div className="items-centers relative flex p-5">
            <label htmlFor="nameInput" className="w-[200px] font-bold">
              Name:
            </label>
            <input
              {...register('name')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="text"
              id="nameInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.name?.message as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="ageInput" className="w-[200px] font-bold">
              Age:
            </label>
            <input
              {...register('age')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="number"
              id="ageInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.age?.message as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="emailInput" className="w-[200px] font-bold">
              Email:
            </label>
            <input
              {...register('email')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="email"
              id="emailInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.email?.message as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="passwordInput" className="w-[200px] font-bold">
              Password:
            </label>
            <input
              {...register('password')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="password"
              id="passwordInput"
            />
            <p className={`${textColor} absolute left-10 top-[60px] text-sm`}>
              {errors.password?.message?.slice(1) as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="confPassInput" className="w-[200px] font-bold">
              Confirm password:
            </label>
            <input
              {...register('confirmPassword')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="password"
              id="confPassInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.confirmPassword?.message as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <p className="w-[200px] font-bold">Gender:</p>
            <div className="flex flex-grow py-1">
              <label
                htmlFor="genderMale"
                className="flex w-1/2 items-center justify-center gap-5"
              >
                Male:
                <input
                  {...register('gender')}
                  type="radio"
                  value="male"
                  id="genderMale"
                />
              </label>
              <label
                htmlFor="genderFemale"
                className="flex w-1/2 items-center justify-center gap-5"
              >
                Female:
                <input
                  {...register('gender')}
                  type="radio"
                  value="female"
                  id="genderFemale"
                />
              </label>
            </div>
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.gender?.message as string}
            </p>
          </div>

          <div className="relative p-5">
            <label htmlFor="acceptInput" className="w-[full] font-bold">
              Accept T&C:
              <input
                {...register('accept')}
                className="ml-[50%] h-[17px] w-[17px] border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
                type="checkbox"
                id="acceptInput"
              />
            </label>
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.accept?.message as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <p className="w-[200px] font-bold">Choose image:</p>
            <div className="flex w-full justify-center">
              <label
                htmlFor="imageInput"
                className="w-[200px] cursor-pointer rounded-md border-b-2 border-t-2 border-accent_beige bg-[#171717] text-center transition-all duration-200 hover:bg-main_bg hover:text-accent_yellow"
                ref={fileLabel}
              >
                {fileBtnText}
                <input
                  {...register('image')}
                  className="w-0 appearance-none"
                  type="file"
                  id="imageInput"
                  onChange={(e) => handleBtnTextChange(e.target)}
                />
              </label>
            </div>
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.image?.message as string}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="countryInput" className="w-[200px] font-bold">
              Country:
            </label>
            <input
              {...register('country')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="text"
              id="countryInput"
              list="countryList"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.country?.message as string}
            </p>
          </div>

          <CountryList />
        </div>

        <div className="mt-10 w-full">
          <button className="mx-auto block w-[300px] rounded-md border-b-2 border-t-2 border-accent_beige bg-[#171717] p-2 font-bold text-accent_beige transition-all duration-200 hover:bg-main_bg hover:text-accent_yellow">
            submit
          </button>
        </div>
      </form>
    </>
  );
}
