import React from 'react';
import './UserAvatar.css';

type User = {
    id: string;
    name: string;
    avatarUrl?: string;
};

interface UserAvatarProps {
    value: User[]; // array of users
}

const MAX_DISPLAY = 2;

const UserAvatar: React.FC<UserAvatarProps> = ({ value }) => {
    if (!value || value.length === 0) return null;

    const visible = value.slice(0, MAX_DISPLAY);
    const overflow = value.length - visible.length;

    return (
        <div className="user-avatar-stack" title={value.map(u => u.name).join(', ')}>
            {visible.map(user => (
                <div key={user.id} className="avatar">
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} />
                    ) : (
                        <div className="avatar-placeholder">{user.name[0]}</div>
                    )}
                </div>
            ))}
            {overflow > 0 && (
                <div className="avatar-overflow">+{overflow}</div>
            )}
        </div>
    );
};

export default UserAvatar;
