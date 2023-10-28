import * as React from 'react';

import { CharObj } from '../../types';

type PropsType = {
  char: CharObj;
};

class CharListItem extends React.Component<PropsType> {
  render() {
    const {
      name,
      birth_year,
      height,
      mass,
      eye_color,
      skin_color,
      hair_color,
    } = this.props.char;
    return (
      <li className="my-3 rounded-md border-2 border-[grey] p-3 font-bold">
        <h3 className="text-xl">{name}</h3>
        <h2 className="mt-2 pl-3 text-lg">Details:</h2>
        <div className="mt-2 flex flex-wrap pl-6">
          <p className="w-full sm:w-1/2">Birth year: {birth_year}</p>
          <p className="w-full sm:w-1/2">Height: {height}</p>
          <p className="w-full sm:w-1/2">Weight: {mass}</p>
          <p className="w-full sm:w-1/2">Eye color: {eye_color}</p>
          <p className="w-full sm:w-1/2">Skin color: {skin_color}</p>
          <p className="w-full sm:w-1/2">Hair color: {hair_color}</p>
        </div>
      </li>
    );
  }
}

export default CharListItem;
