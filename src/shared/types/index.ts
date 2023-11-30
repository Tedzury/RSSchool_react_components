export type AppStateType = {
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
  picture: File;
  country: string;
};
