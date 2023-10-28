import { Component } from 'react';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import getCharacters from './service/getCharacters';
import CharList from './components/CharList/CharList';
import ErrorThrower from './components/ErrorThrower/ErrorThrower';
import Loader from './components/Loader/Loader';
import { CharObj } from './types';

type StateType = {
  searchValue: string;
  isError: boolean;
  charData: CharObj[];
  isLoading: boolean;
};

class App extends Component<unknown, StateType> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem('reactComponentSearchTerm') || '',
      isError: false,
      charData: [],
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.getCharData();
  }

  componentDidUpdate(): void {
    if (this.state.isError === true) {
      throw new Error("OMG, you've pressed a button!");
    }
  }

  setSearch(value: string) {
    this.setState({ ...this.state, searchValue: value });
  }

  setError() {
    this.setState({
      ...this.state,
      isError: true,
    });
  }

  async getCharData() {
    this.setState({ ...this.state, isLoading: true });
    const charData = await getCharacters(this.state.searchValue);
    localStorage.setItem('reactComponentSearchTerm', this.state.searchValue);
    this.setState({ ...this.state, isLoading: false, charData });
  }

  render() {
    return (
      <div className="mx-auto max-w-[700px]">
        <Header />
        <div className="mx-3 mt-6 rounded-md border-4 border-[white] bg-[#e8e6e6] p-2">
          <SearchBar
            value={this.state.searchValue}
            setSearch={this.setSearch.bind(this)}
            getCharData={this.getCharData.bind(this)}
          />
          <ErrorThrower setError={this.setError.bind(this)} />
        </div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <CharList characters={this.state.charData} />
        )}
      </div>
    );
  }
}

export default App;
