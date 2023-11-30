import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <article>
      <div>here is main page!</div>
      <Link to="/native_form">native form</Link>
      <Link to="/react_hook_form">react hook form</Link>
    </article>
  );
}
