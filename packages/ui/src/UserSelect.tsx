import React, { useEffect, useState } from 'react';
import './UserAvatar.css';

interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
}

interface UserSelectProps {
    value: string[]; // list of user IDs
    onChange: (value: string[]) => void;
    onCancel?: () => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ value, onChange, onCancel }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) throw new Error('Failed to fetch users');
                const data = await res.json();
                setUsers(data);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
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

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="user-select">
            {users.map(user => (
                <div
                    key={user.id}
                    className={`user-option ${value.includes(user.id) ? 'selected' : ''}`}
                    onClick={() => toggleUser(user.id)}
                >
                    <img src={user.avatarUrl} alt={user.name} />
                    <span>{user.name}</span>
                </div>
            ))}
            <div className="actions">
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default UserSelect;
