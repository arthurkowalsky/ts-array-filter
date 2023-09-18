export {};

declare global {
    interface Array<T> {
        where(filters: Filter<T>[]): T[];
        orWhere(filters: Filter<T>[]): T[];
    }
}

export type FilterOperator =
    '<'
    | '<='
    | '=='
    | '>'
    | '>='
    | '!='
    | 'array-contains'
    | 'array-contains-any'
    | 'in'
    | 'not-in'
    | 'startswith'
    | 'endswith'
    | 'contains'
    | 'regex'
    | 'null'
    | 'not-null'
    | 'true'
    | 'false'
    | 'exists'
    | 'not-exists';

interface Filter<T> {
    field: keyof T;
    operator: FilterOperator;
    value?: any;
}

const isFiltered = function<T> (item: T, filter: Filter<T>): boolean {
    const fieldValue = item[filter.field as keyof T];

    switch (filter.operator) {
        case '<':
            return typeof fieldValue === 'number' && fieldValue < filter.value;
        case '<=':
            return typeof fieldValue === 'number' && fieldValue <= filter.value;
        case '==':
            return fieldValue === filter.value;
        case '>':
            return typeof fieldValue === 'number' && fieldValue > filter.value;
        case '>=':
            return typeof fieldValue === 'number' && fieldValue >= filter.value;
        case '!=':
            return fieldValue !== filter.value;
        case 'array-contains':
            return Array.isArray(fieldValue) && fieldValue.includes(filter.value);
        case 'array-contains-any':
            return Array.isArray(fieldValue) && Array.isArray(filter.value) && fieldValue.some((value: any) => filter.value.includes(value));
        case 'in':
            return Array.isArray(filter.value) && filter.value.includes(fieldValue);
        case 'not-in':
            return Array.isArray(filter.value) && !filter.value.includes(fieldValue);
        case 'startswith':
            return typeof fieldValue === 'string' && fieldValue.startsWith(filter.value);
        case 'endswith':
            return typeof fieldValue === 'string' && fieldValue.endsWith(filter.value);
        case 'contains':
            return typeof fieldValue === 'string' && fieldValue.includes(filter.value);
        case 'regex':
            return typeof fieldValue === 'string' && new RegExp(filter.value).test(fieldValue);
        case 'null':
            return fieldValue === null;
        case 'not-null':
            return fieldValue !== null;
        case 'true':
            return fieldValue === true;
        case 'false':
            return fieldValue === false;
        case 'exists':
            return fieldValue !== undefined;
        case 'not-exists':
            return fieldValue === undefined;
        default:
            return false;
    }
}

Array.prototype.where = function <T>(filters: Filter<T>[]): T[] {
    const data = this as T[];

    return data.filter((item: T) => {
        return filters.every((filter: Filter<T>) => isFiltered(item, filter));
    });
};

Array.prototype.orWhere = function <T>(filters: Filter<T>[]): T[] {
    const data = this as T[];

    return data.filter((item: T) => {
        return filters.some((filter: Filter<T>) => isFiltered(item, filter));
    });
};