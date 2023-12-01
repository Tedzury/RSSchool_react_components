export type AppStateType = {
  countryList: string[];
  lastShown: number;
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
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  image: FileList;
  country: string;
};


