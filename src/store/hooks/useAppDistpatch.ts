import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
