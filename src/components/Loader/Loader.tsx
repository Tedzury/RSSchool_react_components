import * as React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div className="flex justify-center py-3">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
}

export default Loader;
