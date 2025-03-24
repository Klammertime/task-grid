import { ReactNode } from 'react';

export type RowData = {
    id: string;
    values: Record<string, any>;
};

export interface ColumnDef {
    id: string;
    label: string;
    fieldType: string;

    // Cell display logic
    renderCell?: (value: any, row: RowData, column: ColumnDef) => ReactNode;

    renderEditor?: (opts: {
        value: any;
        column: ColumnDef;
        row: RowData;
        onChange: (value: any) => void;
        onCancel?: () => void;
    }) => ReactNode;
}
