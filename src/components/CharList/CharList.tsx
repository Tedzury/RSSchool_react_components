import { Component } from 'react';

import CharListItem from '../CharListItem/CharListItem';
import { CharObj } from '../../types';

type PropsType = {
  characters: CharObj[];
};

class CharList extends Component<PropsType> {
  render() {
    const { characters } = this.props;
    const elements = characters.map((char) => {
      return <CharListItem key={char.name} char={char} />;
    });
    return (
      <div className="mx-3 mt-5 rounded-md border-4 border-[white] bg-[#e8e6e6] p-3">
        {characters.length > 0 ? (
          <ul>{elements}</ul>
        ) : (
          <div className="text-center">Sorry, there is no characters yet!</div>
        )}
      </div>
    );
  }
}

export default CharList;
