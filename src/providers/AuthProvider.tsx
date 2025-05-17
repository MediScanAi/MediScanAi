import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, finishLoading } from '../app/slices/authSlice';
import { auth } from '../api/authApi';

const AuthProvider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.emailVerified) {
        dispatch(setUser({ uid: u.uid, email: u.email }));
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
