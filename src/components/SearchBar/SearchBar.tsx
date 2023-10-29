import { Component } from 'react';

import SubmitBtn from './ui/SubmitBtn';
import TextInput from './ui/TextInput';

type PropsType = {
  value: string;
  setSearch: (value: string) => void;
  getCharData: () => Promise<void>;
};

class SearchBar extends Component<PropsType> {
  render() {
    const { value, setSearch, getCharData } = this.props;
    return (
      <div className="mt-5">
        <form
          className="flex justify-center gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            getCharData();
          }}
        >
          <TextInput
            placeholder="Type a name!"
            value={value}
            setSearch={setSearch}
          />
          <SubmitBtn />
        </form>
      </div>
    );
  }
}

export default SearchBar;
