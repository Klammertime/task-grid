import React from 'react';
import './UserAvatarGroup.css';
import UserAvatar from './UserAvatar';

interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

interface Props {
    users: User[];
    maxVisible?: number;
}

const UserAvatarGroup: React.FC<Props> = ({ users, maxVisible = 2 }) => {
    const visible = users.slice(0, maxVisible);
    const overflow = users.length - visible.length;

    return (
        <div className="user-avatar-group" title={users.map(u => u.name).join(', ')}>
            {visible.map(user => (
                <UserAvatar key={user.id} user={user} />
            ))}
            {overflow > 0 && (
                <span className="user-avatar-overflow">+{overflow}</span>
            )}
        </div>
    );
};

export default UserAvatarGroup;
