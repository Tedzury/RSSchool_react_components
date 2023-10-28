import * as React from 'react';

import CharListItem from '../CharListItem/CharListItem';
import { CharObj } from '../../types';

type PropsType = {
  characters: CharObj[];
};

class CharList extends React.Component<PropsType> {
  render() {
    const { characters } = this.props;
    const items = characters.map((char) => {
      return <CharListItem key={char.name} char={char} />;
    });
    return characters.length > 0 ? (
      <ul>{items}</ul>
    ) : (
      <div>Sorry, there is no characters yet!</div>
    );
  }
}

export default CharList;
