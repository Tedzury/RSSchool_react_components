import { FormEvent, useEffect, useState } from 'react';
import BackBtn from '../../shared/ui/BackBtn';
import FormHeader from '../../shared/ui/FormHeader';
import CountryList from '../ReactHookForm/ui/CountryList';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTextColor(getTextColor(errors.password.slice(0, 1)));
    console.log(errors.password);
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
  return (
    <>
      <BackBtn />
      <FormHeader title="Native form" />
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
      >
        <input placeholder="Name" type="text" name="name" />
        <p>{errors.name}</p>

        <input placeholder="Email address" type="email" name="email" />
        <p>{errors.email}</p>

        <input type="number" placeholder="0" name="age" />
        <p>{errors.age}</p>

        <input type="radio" value="male" name="gender" />
        <input type="radio" value="female" name="gender" />
        <p>{errors.gender}</p>

        <input type="checkbox" name="accept" />
        <p>{errors.accept}</p>

        <input type="file" name="image" multiple={false} />
        <p>{errors.image}</p>

        <input
          placeholder="Country..."
          type="text"
          list="countryList"
          name="country"
        />
        <p>{errors.country}</p>

        <input placeholder="Password..." type="password" name="password" />
        <p className={`${textColor}`}>{errors.password.slice(1)}</p>

        <input
          placeholder="Password confirm..."
          type="password"
          name="confirmPassword"
        />
        <p>{errors.confirmPassword as string}</p>

        <CountryList />

        <button>submit</button>
      </form>
    </>
  );
}
