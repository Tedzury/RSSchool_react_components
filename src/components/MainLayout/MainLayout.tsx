import { Component } from 'react';

import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import getCharacters from '../../service/getCharacters';
import CharList from '../CharList/CharList';
import ErrorThrower from '../ErrorThrower/ErrorThrower';
import Loader from '../Loader/Loader';
import { StateType } from '../../types';

class MainLayout extends Component<unknown, StateType> {
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
    this.setState({ ...this.state, isError: true });
  }

  async getCharData() {
    this.setState({ ...this.state, isLoading: true });
    const charData = await getCharacters(this.state.searchValue.trim());
    localStorage.setItem(
      'reactComponentSearchTerm',
      this.state.searchValue.trim()
    );
    this.setState({ ...this.state, isLoading: false, charData });
  }

  render() {
    const mainContent = this.state.isLoading ? (
      <Loader />
    ) : (
      <CharList characters={this.state.charData} />
    );
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
        {mainContent}
      </div>
    );
  }
}

export default MainLayout;
