import { Component } from 'react';

type PropsType = {
  value: string;
  placeholder: string;
  setSearch: (value: string) => void;
};

class TextInput extends Component<PropsType> {
  render() {
    const { value, placeholder, setSearch } = this.props;
    return (
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-md pl-3"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  }
}

export default TextInput;
