import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/authApi';
import { fetchTestData } from '../app/slices/testSlice';
import type { TestType } from '../app/slices/testSlice';
import { fetchUserData } from '../app/slices/userDataSlice';

const AppInitFetcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        const testTypes: TestType[] = ['blood', 'urine', 'vitamin', 'genetic'];

        try {
          await Promise.all(
            testTypes.map((type) =>
              dispatch(
                fetchTestData({ uid: user.uid, testType: type })
              ).unwrap(),
              dispatch(fetchUserData({uid: user.uid})).unwrap()
            )
          );
        } catch (error) {
          console.error('Error fetching test data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AppInitFetcher;
