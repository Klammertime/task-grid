import type { ReactNode } from 'react';
import type { ColumnDef, RowData } from './types';

import UserSelect from '../../ui/src/UserSelect';

import UserCell from '../../../apps/web/src/renderers/UserCell';
import UserEditor from '../../../apps/web/src/renderers/UserEditor';


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
        renderCell: (value, row, column) => <UserCell value={value} row={row} column={column} />,
        renderEditor: ({ value, onChange, onCancel }) => (
            <UserEditor value={value} onChange={onChange} onCancel={onCancel} />
        ),
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
