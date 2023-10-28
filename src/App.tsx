import * as React from 'react';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import getCharacters from './service/getCharacters';
import CharList from './components/CharList/CharList';
import { CharObj } from './types';

type StateType = {
  searchValue: string;
  errorCount: number;
  charData: CharObj[];
};

class App extends React.Component {
  state: StateType = {
    searchValue: '',
    errorCount: 0,
    charData: [],
  };

  componentDidUpdate(): void {
    if (this.state.errorCount === 1) {
      throw new Error("OMG, you've pressed a button!");
    }
  }

  setSearch(value: string) {
    this.setState({ ...this.state, searchValue: value });
  }

  setCharData(arr: CharObj[]) {
    this.setState({ ...this.state, charData: arr });
  }

  async getCharData() {
    const charData = await getCharacters(this.state.searchValue);
    this.setCharData(charData);
  }

  render() {
    return (
      <div className="mx-auto max-w-[700px]">
        <Header />
        <div className="mx-3 mt-6 rounded-md bg-[#e8e6e6] p-2">
          <SearchBar
            value={this.state.searchValue}
            setSearch={this.setSearch.bind(this)}
            getCharData={this.getCharData.bind(this)}
          />
          <button
            type="button"
            className="w-[100px] bg-[yellow]"
            onClick={() => {
              this.setState({
                ...this.state,
                errorCount: this.state.errorCount + 1,
              });
            }}
          >
            throw error
          </button>
          <CharList characters={this.state.charData} />
        </div>
      </div>
    );
  }
}

export default App;
