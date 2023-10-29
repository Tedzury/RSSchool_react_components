import { Component } from 'react';

class SubmitBtn extends Component {
  render() {
    return (
      <button
        className="
            rounded-md 
            border-2 
            border-[darkgrey] 
            bg-[#e8e6e6] 
            px-2 
            py-1 
            transition-all 
            duration-300 
            hover:bg-[darkgrey]
          "
        type="submit"
      >
        Search
      </button>
    );
  }
}

export default SubmitBtn;
