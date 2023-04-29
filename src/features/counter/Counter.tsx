import { decrement, increment, incrementByAmount } from './counterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>{' '}
        <button aria-label="Decrement value" onClick={() => dispatch(incrementByAmount(2))}>
          Decrement
        </button>
      </div>
    </div>
  );
}
