import { FormEvent, useEffect, useRef, useState } from 'react';
import BackBtn from '../../shared/ui/BackBtn';
import FormHeader from '../../shared/ui/FormHeader';
import CountryList from '../../shared/ui/CountryList';
import * as Yup from 'yup';
import {
  defaultValidationSchema,
  nativeSchemaExtension,
} from '../../shared/validationSchema';
import getTextColor from '../../helpers/getTextColor';
import { useAppDispatch } from '../../store/hooks';
import { addFormData } from '../../store/appStateSlice';
import { encodeToBase64 } from '../../helpers/encodeToBase64';
import { useNavigate } from 'react-router-dom';
import TextInputWrap from '../ReactHookForm/ui/TextInputWrap';
import GenderInputWrap from '../ReactHookForm/ui/GenderInputWrap';
import TermsAndCondWrap from '../ReactHookForm/ui/TermsAndCondWrap';
import FileInputWrap from '../ReactHookForm/ui/FileInputWrap';
import { defaultErrorState } from '../../shared/constants';
import { YupErrors } from '../../shared/types';

const validationSchema = Yup.object({
  ...defaultValidationSchema(),
  ...nativeSchemaExtension(),
});

export default function NativeForm() {
  const [errors, setErrors] = useState(defaultErrorState);
  const [textColor, setTextColor] = useState('text-[black]');
  const [fileBtnText, setFileBtnText] = useState('upload');
  const fileLabel = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTextColor(getTextColor(errors.password.slice(0, 1)));
  }, [errors.password]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formObj = Object.fromEntries(formData);
    setErrors(defaultErrorState);
    try {
      await validationSchema.validate(formObj, { abortEarly: false });
      const image64 = await encodeToBase64(formObj.image as File);
      dispatch(
        addFormData({
          name: formObj.name as string,
          age: Number(formObj.age),
          email: formObj.email as string,
          password: formObj.password as string,
          confirmPassword: formObj.confirmPassword as string,
          gender: formObj.gender as string,
          accept: true,
          country: formObj.country as string,
          image: image64 as string,
        })
      );
      navigate('/');
    } catch (e) {
      (e as YupErrors).inner.forEach((error) => {
        setErrors((prev) => {
          return { ...prev, [error.path]: error.message };
        });
      });
    }
  }
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
  return (
    <>
      <BackBtn />
      <FormHeader title="Native form" />
      <form onSubmit={(e) => handleSubmit(e)} noValidate>
        <div className="mt-10 flex flex-col gap-5 px-10 text-accent_beige">
          <TextInputWrap errorMsg={errors.name} label="Name:" idFor="nameInput">
            <input
              className="text_input"
              type="text"
              id="nameInput"
              name="name"
            />
          </TextInputWrap>
          <TextInputWrap errorMsg={errors.age} label="Age:" idFor="ageInput">
            <input
              name="age"
              className="text_input"
              type="number"
              id="ageInput"
            />
          </TextInputWrap>
          <TextInputWrap
            errorMsg={errors.email}
            label="Email:"
            idFor="emailInput"
          >
            <input
              name="email"
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
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="password"
              name="password"
              id="passwordInput"
            />
            <p className={`${textColor} absolute left-10 top-[60px] text-sm`}>
              {errors.password.slice(1)}
            </p>
          </div>
          <TextInputWrap
            errorMsg={errors.confirmPassword}
            label="Confirm password:"
            idFor="confPassInput"
          >
            <input
              name="confirmPassword"
              className="text_input"
              type="password"
              id="confPassInput"
            />
          </TextInputWrap>
          <GenderInputWrap errorMsg={errors.gender}>
            <input name="gender" type="radio" value="male" id="genderMale" />
            <input
              name="gender"
              type="radio"
              value="female"
              id="genderFemale"
            />
          </GenderInputWrap>
          <TermsAndCondWrap errorMsg={errors.accept}>
            <input
              name="accept"
              className="ml-[50%] h-[17px] w-[17px] border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="checkbox"
              id="acceptInput"
            />
          </TermsAndCondWrap>
          <FileInputWrap errorMsg={errors.image}>
            <label
              htmlFor="imageInput"
              className="file_input_label"
              ref={fileLabel}
            >
              {fileBtnText}
              <input
                name="image"
                className="w-0 appearance-none"
                type="file"
                id="imageInput"
                onChange={(e) => handleBtnTextChange(e.target)}
              />
            </label>
          </FileInputWrap>
          <TextInputWrap
            errorMsg={errors.country}
            label="Country:"
            idFor="countryInput"
          >
            <input
              name="country"
              className="text_input"
              type="text"
              id="countryInput"
              list="countryList"
            />
          </TextInputWrap>
          <CountryList />
        </div>

        <div className="mt-10 w-full">
          <button className="submit_btn">submit</button>
        </div>
      </form>
    </>
  );
}
