import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from 'src/store';

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;
