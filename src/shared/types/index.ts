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

export type AppStateType = {
  searchValue: string;
  charData: CharObj[];
  currPage: number;
  totalPages: number;
  limit: number;
  isListLoading: boolean;
  isDetailsLoading: boolean;
};

export type CharListResponse = {
  data: {
    total: number;
    results: responseObj[];
  };
};
