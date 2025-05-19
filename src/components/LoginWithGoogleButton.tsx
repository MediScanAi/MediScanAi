import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

interface LoginWithGoogleButtonProps {
  handleGoogleLogin: () => void;
}

const LoginWithGoogleButton: React.FC<LoginWithGoogleButtonProps> = ({
  handleGoogleLogin,
}) => {
  return (
    <Button
      block
      type="default"
      htmlType="button"
      icon={<GoogleOutlined />}
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </Button>
  );
};

export default LoginWithGoogleButton;
