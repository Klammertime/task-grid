import React, { useEffect, useState } from 'react';
import { UserAvatar } from 'ui';
import './UserSelect.css';

interface User {
    id: string;
    name: string;
    avatarUrl: string;
    email?: string;
}

interface UserSelectProps {
    value: string[]; // selected user IDs
    onChange: (value: string[]) => void;
    onCancel?: () => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) throw new Error('Failed to fetch users');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const toggleUser = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter(v => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-select">
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
                        className={`user-option ${value.includes(user.id) ? 'selected' : ''}`}
                        onClick={() => toggleUser(user.id)}
                    >
                        <UserAvatar user={user} />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSelect;
