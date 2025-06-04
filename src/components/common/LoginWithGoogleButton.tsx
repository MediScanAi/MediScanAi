import { message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { loginWithGoogle } from '../../api/authApi';
import { setUser } from '../../app/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import SecondaryButton from './SecondaryButton';

interface PropsTypes {
  toggleLoading: (isLoading: boolean) => void;
}
const LoginWithGoogleButton: React.FC<PropsTypes> = ({ toggleLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    toggleLoading(true);
    try {
      const user = await loginWithGoogle();
      if (user) {
        dispatch(setUser(user));
        message.success('Google login successful');
        navigate('/');
      } else {
        message.info('Google login cancelled');
      }
    } catch (_) {
      message.error('Google login failed');
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <SecondaryButton
      block
      icon={<GoogleOutlined />}
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </SecondaryButton>
  );
};

export default LoginWithGoogleButton;
