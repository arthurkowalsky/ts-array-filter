export {};

declare global {
    interface Array<T> {
        where(filters: Filter<T>[]): T[];
    }
}

type FilterOperator = '<' | '<=' | '==' | '>' | '>=' | '!=' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in';

interface Filter<T> {
    field: keyof T;
    operator: FilterOperator;
    value: any;
}

Array.prototype.where = function <T>(filters: Filter<T>[]): T[] {
    const data = this as T[];

    return data.filter((item: T) => {
        return filters.every((filter: Filter<T>) => {
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
                default:
                    return false;
            }
        });
    });
};
