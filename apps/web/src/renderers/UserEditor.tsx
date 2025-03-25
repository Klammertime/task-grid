import React, { useEffect, useState } from 'react';
import { UserAvatar } from 'ui';
import './UserEditor.css';

interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

interface Props {
    value: User[];
    onChange: (users: User[]) => void;
    onCancel?: () => void;
}

const UserEditor: React.FC<Props> = ({ value, onChange }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(setUsers)
            .catch(console.error);
    }, []);

    const toggleUser = (user: User) => {
        const exists = value.find(u => u.id === user.id);
        if (exists) {
            onChange(value.filter(u => u.id !== user.id));
        } else {
            onChange([...value, user]);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-editor-select">
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="user-search-input"
            />

            <div className="user-dropdown">
                {filteredUsers.map(user => (
                    <div
                        key={user.id}
                        className={`user-option ${value.find(u => u.id === user.id) ? 'selected' : ''}`}
                        onClick={() => toggleUser(user)}

                    >
                        <UserAvatar user={user} />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserEditor;
