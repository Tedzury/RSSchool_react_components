import * as React from 'react';

type PropsType = {
  setError: () => void;
};

class ErrorThrower extends React.Component<PropsType> {
  render() {
    return (
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          className="w-[300px] rounded-md bg-[yellow] px-2 py-1 font-bold"
          onClick={this.props.setError}
        >
          Throw an error!
        </button>
      </div>
    );
  }
}

export default ErrorThrower;
