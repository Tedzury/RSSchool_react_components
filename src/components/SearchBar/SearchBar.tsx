import * as React from 'react';

type PropsType = {
  value: string;
  setSearch: (value: string) => void;
  getCharData: () => Promise<void>;
};

class SearchBar extends React.Component<PropsType> {
  render() {
    const { value, setSearch, getCharData } = this.props;
    return (
      <div>
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Type a name!"
            value={value}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="" type="button" onClick={getCharData}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
