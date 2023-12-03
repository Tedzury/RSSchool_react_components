import { UseFormRegister } from 'react-hook-form';

export type AppStateType = {
  countryList: string[];
  formsData: FormDataType[];
};

export type FormDataType = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  image: string;
  country: string;
};

export type RawFormDataType = {
  password?: string | undefined;
  image?: FileList | undefined;
  accept: NonNullable<boolean | undefined>;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female';
  country: string;
  confirmPassword: string;
};

export type RawNativeFormDataType = {
  password?: string | undefined;
  name: string;
  email: string;
  age: number;
  gender: string;
  accept: string | undefined;
  country: string;
  confirmPassword: string;
};

export type FormRegister = UseFormRegister<RawFormDataType>;
