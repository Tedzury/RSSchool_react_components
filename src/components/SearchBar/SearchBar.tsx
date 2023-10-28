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
      <div className="mt-5">
        <form
          className="flex justify-center gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            getCharData();
          }}
        >
          <input
            type="text"
            placeholder="Type a name!"
            className="rounded-md pl-3"
            value={value}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="
            rounded-md 
            border-2 
            border-[darkgrey] 
            bg-[#e8e6e6] 
            px-2 
            py-1 
            transition-all 
            duration-300 
            hover:bg-[darkgrey]
          "
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
