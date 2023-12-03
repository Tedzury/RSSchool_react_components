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

const validationSchema = Yup.object({
  ...defaultValidationSchema(),
  ...nativeSchemaExtension(),
});

type ValidationError = {
  message: string;
  path: string;
  type: string;
};

type YupErrors = {
  inner: ValidationError[];
};

const defaultErrorState = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  accept: '',
  image: '',
  country: '',
};

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
          <div className="items-centers relative flex p-5">
            <label htmlFor="nameInput" className="w-[200px] font-bold">
              Name:
            </label>
            <input
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="text"
              name="name"
              id="nameInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.name}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="ageInput" className="w-[200px] font-bold">
              Age:
            </label>
            <input
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="number"
              name="age"
              id="ageInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.age}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="emailInput" className="w-[200px] font-bold">
              Email:
            </label>
            <input
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="email"
              name="email"
              id="emailInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.email}
            </p>
          </div>

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

          <div className="items-centers relative flex p-5">
            <label htmlFor="confPassInput" className="w-[200px] font-bold">
              Confirm password:
            </label>
            <input
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="password"
              name="confirmPassword"
              id="confPassInput"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.confirmPassword}
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
                  type="radio"
                  name="gender"
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
                  type="radio"
                  name="gender"
                  value="female"
                  id="genderFemale"
                />
              </label>
            </div>
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.gender}
            </p>
          </div>

          <div className="relative p-5">
            <label htmlFor="acceptInput" className="w-[full] font-bold">
              Accept T&C:
              <input
                className="ml-[50%] h-[17px] w-[17px] border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
                type="checkbox"
                name="accept"
                id="acceptInput"
              />
            </label>
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.accept}
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
                  className="w-0 appearance-none"
                  type="file"
                  name="image"
                  id="imageInput"
                  onChange={(e) => handleBtnTextChange(e.target)}
                />
              </label>
            </div>
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.image}
            </p>
          </div>

          <div className="items-centers relative flex p-5">
            <label htmlFor="countryInput" className="w-[200px] font-bold">
              Country:
            </label>
            <input
              className="w-full border-b-2 border-accent_beige bg-main_bg py-1 pl-2 text-center outline-none"
              type="text"
              name="country"
              id="countryInput"
              list="countryList"
            />
            <p className="absolute left-10 top-[60px] text-sm text-accent_yellow">
              {errors.country}
            </p>
          </div>

          <CountryList />
        </div>

        <div className="mt-10 w-full">
          <button className="mx-auto block w-[300px] rounded-md border-b-2 border-t-2 border-accent_beige bg-[#171717] p-2 font-bold text-accent_beige transition-all duration-200 hover:bg-main_bg hover:text-accent_yellow disabled:border-accent_beige/40 disabled:bg-[#171717]/40 disabled:text-accent_beige/40">
            submit
          </button>
        </div>
      </form>
    </>
  );
}
