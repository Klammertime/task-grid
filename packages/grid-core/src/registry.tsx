import type { ReactNode } from 'react';
import type { ColumnDef, RowData } from './types';

import UserAvatar from '../../ui/src/UserAvatar';
import UserSelect from '../../ui/src/UserSelect';


export type FieldType = 'user' | 'text' | 'number' | string;

type RenderEditorOpts = {
    value: any;
    row: RowData;
    column: ColumnDef;
    onChange: (value: any) => void;
    onCancel?: () => void;
};

export type FieldRenderer = {
    renderCell?: (value: any, row: RowData, column: ColumnDef) => ReactNode;
    renderEditor?: (opts: RenderEditorOpts) => ReactNode;
};

export const fieldRegistry: Record<FieldType, FieldRenderer> = {
    user: {
        renderCell: (value, row, column) => <UserAvatar value={value} />,
        renderEditor: ({ value, onChange, onCancel }) => (
            <UserSelect value={value} onChange={onChange} onCancel={onCancel} />
        )
    },
    text: {
        renderEditor: ({ value, onChange }) => (
            <input
                type="text"
                value={value ?? ''
                }
                onChange={(e) => onChange(e.target.value)}
                className="text-editor"
            />
        )
    },
    number: {
        renderEditor: ({ value, onChange }) => (
            <input
                type="number"
                value={value ?? ''
                }
                onChange={(e) => onChange(Number(e.target.value))}
                className="number-editor"
            />
        )
    }
};
