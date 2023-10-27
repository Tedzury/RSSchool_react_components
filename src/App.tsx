import * as React from 'react';

class App extends React.Component {
  state = { value: 1 };

  componentDidUpdate(): void {
    if (this.state.value === 2) {
      throw new Error("OMG, you've pressed a button!");
    }
  }

  render() {
    return (
      <>
        <div className="mx-auto my-[20px] w-[200px] bg-[red]">
          Hello world! for you and you parents.
        </div>
        <button
          type="button"
          className="w-[100px] bg-[yellow]"
          onClick={() => {
            this.setState({ value: this.state.value + 1 });
          }}
        >
          throw error
        </button>
      </>
    );
  }
}

export default App;
