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
        dispatch(
          setUser({ firstName: '', lastName: '', uid: u.uid, email: u.email }) // todo: add user last and first name
        );
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
