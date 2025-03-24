import { ReactNode } from 'react';

export type RowData = {
    id: string;
    values: Record<string, any>;
};

export interface ColumnDef {
    id: string;
    label: string;
    fieldType?: string;

    // Cell display logic
    renderCell?: (value: any, row: RowData) => ReactNode;

    // Optional inline editor
    renderEditor?: (opts: {
        value: any;
        onChange: (value: any) => void;
        onCancel?: () => void;
    }) => ReactNode;
}
