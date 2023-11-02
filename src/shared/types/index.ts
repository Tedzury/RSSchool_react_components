export type CharObj = {
  name: string;
  id: string;
  description: string;
  thumbnail: string;
  comics: string[];
};

export type responseObj = {
  name: string;
  id: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    items: { name: string }[];
  };
};

export type StateType = {
  searchValue: string;
  isError: boolean;
  charData: CharObj[];
  isLoading: boolean;
  currPage: number;
  totalPages: number;
};
