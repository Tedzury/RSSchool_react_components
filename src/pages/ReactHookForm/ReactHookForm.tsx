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
import CountryList from '../../shared/ui/CountryList';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextInputWrap from './ui/TextInputWrap';
import GenderInputWrap from './ui/GenderInputWrap';
import TermsAndCondWrap from './ui/TermsAndCondWrap';
import FileInputWrap from './ui/FileInputWrap';
import PassTogglerBtn from '../../shared/ui/PassTogglerBtn';

const validationSchema = Yup.object({
  ...defaultValidationSchema(),
  ...rhfSchemaExtension(),
});

export default function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fileBtnText, setFileBtnText] = useState('upload');
  const [textColor, setTextColor] = useState('text-[black]');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [passInputType, setPassInputType] = useState('password');
  const [confPassInputType, setConfPassInputType] = useState('password');
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
    formState: { errors, touchedFields },
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

  const errorsArr = Object.values(errors);
  const touchedArr = Object.values(touchedFields);

  useEffect(() => {
    setTextColor(getTextColor(errors.password?.message?.slice(0, 1) as string));
    const allTouched = Array.from(Object.keys(touchedFields)).length === 9;
    const allValid = Array.from(Object.keys(errors)).length === 0;
    if (allTouched && allValid) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [errorsArr, touchedArr, errors, touchedFields]);

  return (
    <>
      <BackBtn />
      <FormHeader title="React hook form" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mt-10 flex flex-col gap-5 px-10 text-accent_beige">
          <TextInputWrap
            errorMsg={errors.name?.message as string}
            label="Name:"
            idFor="nameInput"
          >
            <input
              {...register('name')}
              className="text_input"
              type="text"
              id="nameInput"
            />
          </TextInputWrap>
          <TextInputWrap
            errorMsg={errors.age?.message as string}
            label="Age:"
            idFor="ageInput"
          >
            <input
              {...register('age')}
              className="text_input"
              type="number"
              id="ageInput"
            />
          </TextInputWrap>
          <TextInputWrap
            errorMsg={errors.email?.message as string}
            label="Email:"
            idFor="emailInput"
          >
            <input
              {...register('email')}
              className="text_input"
              type="email"
              id="emailInput"
            />
          </TextInputWrap>
          <div className="items-centers relative flex p-5">
            <label htmlFor="passwordInput" className="w-[200px] font-bold">
              Password:
            </label>
            <input
              {...register('password')}
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type={passInputType}
              id="passwordInput"
            />
            <PassTogglerBtn toggleType={setPassInputType} />
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
              className="text_input"
              type={confPassInputType}
              id="confPassInput"
            />
            <PassTogglerBtn toggleType={setConfPassInputType} />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.confirmPassword?.message as string}
            </p>
          </div>
          <GenderInputWrap errorMsg={errors.gender?.message as string}>
            <input
              {...register('gender')}
              type="radio"
              value="male"
              id="genderMale"
            />
            <input
              {...register('gender')}
              type="radio"
              value="female"
              id="genderFemale"
            />
          </GenderInputWrap>
          <TermsAndCondWrap errorMsg={errors.accept?.message as string}>
            <input
              {...register('accept')}
              className="ml-[50%] h-[17px] w-[17px] border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="checkbox"
              id="acceptInput"
            />
          </TermsAndCondWrap>
          <FileInputWrap errorMsg={errors.image?.message as string}>
            <label
              htmlFor="imageInput"
              className="file_input_label"
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
          </FileInputWrap>
          <TextInputWrap
            errorMsg={errors.country?.message as string}
            label="Country:"
            idFor="countryInput"
          >
            <input
              {...register('country')}
              className="text_input"
              type="text"
              id="countryInput"
              list="countryList"
            />
          </TextInputWrap>
          <CountryList />
        </div>

        <div className="mt-10 w-full">
          <button disabled={isSubmitDisabled} className="submit_btn">
            submit
          </button>
        </div>
      </form>
    </>
  );
}
