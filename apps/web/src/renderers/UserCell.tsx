// import React from 'react';
// import type { ColumnDef, RowData } from 'grid-core';
// import { UserAvatarGroup } from 'ui';

// interface Props {
//     value: RowData['values']['assignee'];
//     row: RowData;
//     column: ColumnDef;
// }

// const UserCell: React.FC<Props> = ({ value }) => {
//     return <UserAvatarGroup users={value} />;
// };

// export default UserCell;


import React from 'react';
import { UserAvatarGroup } from 'ui';

import type { ColumnDef, RowData } from 'grid-core';

interface Props {
    value: any;
    row: RowData;
    column: ColumnDef;
}

const UserCell: React.FC<Props> = ({ value }) => {
    // Normalize user data (array of user objects)
    const users = Array.isArray(value) ? value : [];

    return <UserAvatarGroup users={users} />;
};

export default UserCell;
