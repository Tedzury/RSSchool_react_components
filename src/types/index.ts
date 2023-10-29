export type CharObj = {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  eye_color: string;
  skin_color: string;
  hair_color: string;
};

export type StateType = {
  searchValue: string;
  isError: boolean;
  charData: CharObj[];
  isLoading: boolean;
};
