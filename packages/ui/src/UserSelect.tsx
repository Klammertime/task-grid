import React, { useEffect, useState } from 'react';

type User = {
    id: string;
    name: string;
    avatarUrl?: string;
};

interface UserSelectProps {
    value: User[];
    onChange: (newUsers: User[]) => void;
}

const MOCK_USERS: User[] = [
    { id: '1', name: 'Kenny Williams' },
    { id: '2', name: 'Gabriel Lima' },
    { id: '3', name: 'Akash Guru' },
    { id: '4', name: 'Srinivas Gorur Shandilya' }
];

const UserSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<User[]>(MOCK_USERS);

    const toggleUser = (user: User) => {
        const exists = value.find(u => u.id === user.id);
        if (exists) {
            onChange(value.filter(u => u.id !== user.id));
        } else {
            onChange([...value, user]);
        }
    };

    const filtered = options.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="user-select">
            <input
                placeholder="Search users..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <ul className="user-options">
                {filtered.map(user => (
                    <li key={user.id} onClick={() => toggleUser(user)}>
                        <input
                            type="checkbox"
                            checked={!!value.find(u => u.id === user.id)}
                            readOnly
                        />
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSelect;
