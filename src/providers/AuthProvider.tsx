import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, finishLoading } from '../app/slices/authSlice';
import { onAuthChange } from '../api/authApi';

const AuthProvider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthChange((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
      dispatch(finishLoading());
    });

    return unsub;
  }, [dispatch]);

  return null;
};

export default AuthProvider;
