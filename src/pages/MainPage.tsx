import { Link } from 'react-router-dom';
import { setLastShown } from '../store/appStateSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function MainPage() {
  const { lastShown } = useAppSelector((state) => state.appReducer);
  const dispatch = useAppDispatch();
  return (
    <article>
      <div>here is main page!</div>
      <Link to="/native_form">native form</Link>
      <Link to="/react_hook_form">react hook form</Link>
      <button onClick={() => dispatch(setLastShown(lastShown + 1))}>
        Click
      </button>
      <h4>{lastShown}</h4>
    </article>
  );
}
