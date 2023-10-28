import * as React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1 className="pt-6 text-center text-[40px] font-bold text-[yellow]">
          Star Wars Characters!
        </h1>
        <p className="mt-6 text-center text-3xl font-bold text-[yellow]">
          Here you can know your favourite characters a bit better!
        </p>
      </div>
    );
  }
}

export default Header;
