import React from 'react';
import './UserAvatar.css';

interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

interface Props {
    user?: User;            // allow undefined for safety
    size?: number;          // optional size prop
}

const UserAvatar: React.FC<Props> = ({ user, size = 32 }) => {
    if (!user) return null; // 🔐 guard against undefined

    return (
        <img
            className="user-avatar"
            src={user.avatarUrl}
            alt={user.name}
            title={user.name}
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                objectFit: 'cover',
            }}
        />
    );
};

export default UserAvatar;
