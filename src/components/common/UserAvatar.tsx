import React, { useState } from 'react';
import { Avatar, type AvatarProps } from 'antd';
import type { AuthUser } from '../../api/authApi';

interface UserAvatarProps extends AvatarProps {
  user: AuthUser;
}
const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = user?.photoURL && !imgError;
  let fontSize = 15;

  if (props.size && typeof props.size === 'number' && props.size > 50) {
    fontSize = 40;
  }
  return (
    <Avatar
      src={hasPhoto ? user.photoURL : undefined}
      size={props.size ?? 'small'}
      draggable={false}
      {...props}
      onError={() => {
        setImgError(true);
        return false;
      }}
      style={{
        fontSize: fontSize,
      }}
    >
      {(!user?.photoURL || imgError) && user?.firstName[0].toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
