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
