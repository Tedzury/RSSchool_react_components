import { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="flex justify-center py-3">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
}

export default Loader;
