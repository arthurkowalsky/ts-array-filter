import '../src/index';


interface Example {
    id: number;
    name: string;
    tags: string[];
    optional?: string;
}

const data: Example[] = [
    { id: 1, name: 'Example 1', tags: ['tag1', 'tag2'] },
    { id: 2, name: 'Example 2', tags: ['tag2', 'tag3'] },
    { id: 3, name: 'Example 3', tags: ['tag1', 'tag3'] },
];

describe('Array.where filters', () => {
    test('<', () => {
        const result = data.where([
            {field: 'id', operator: '<', value: 3},
        ]);
        expect(result.length).toBe(2);
    });

    test('<=', () => {
        const result = data.where([
            {field: 'id', operator: '<=', value: 2},
        ]);
        expect(result.length).toBe(2);
    });

    test('==', () => {
        const result = data.where([
            {field: 'name', operator: '==', value: 'Example 2'},
        ]);
        expect(result.length).toBe(1);
    });
    test('>', () => {
        const result = data.where([
            { field: 'id', operator: '>', value: 1 },
        ]);
        expect(result.length).toBe(2);
    });

    test('>=', () => {
        const result = data.where([
            { field: 'id', operator: '>=', value: 2 },
        ]);
        expect(result.length).toBe(2);
    });

    test('!=', () => {
        const result = data.where([
            { field: 'name', operator: '!=', value: 'Example 1' },
        ]);
        expect(result.length).toBe(2);
    });

    test('array-contains', () => {
        const result = data.where([
            { field: 'tags', operator: 'array-contains', value: 'tag1' },
        ]);
        expect(result.length).toBe(2);
    });

    test('array-contains-any', () => {
        const result = data.where([
            { field: 'tags', operator: 'array-contains-any', value: ['tag1', 'tag3'] },
        ]);
        expect(result.length).toBe(3);
    });

    test('in', () => {
        const result = data.where([
            { field: 'id', operator: 'in', value: [1, 3] },
        ]);
        expect(result.length).toBe(2);
    });

    test('not-in', () => {
        const result = data.where([
            { field: 'id', operator: 'not-in', value: [1, 3] },
        ]);
        expect(result.length).toBe(1);
    });
});


describe('Array.where filters with safeguards', () => {

    test('invalid number comparison', () => {
        const result = data.where([
            { field: 'name', operator: '<', value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('array-contains-any with non-array filter value', () => {
        const result = data.where([
            { field: 'tags', operator: 'array-contains-any', value: 'tag1' },
        ]);
        expect(result.length).toBe(0);
    });

    test('in with non-array filter value', () => {
        const result = data.where([
            { field: 'id', operator: 'in', value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('not-in with non-array filter value', () => {
        const result = data.where([
            { field: 'id', operator: 'not-in', value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('optional field with undefined value', () => {
        const result = data.where([
            { field: 'optional', operator: '==', value: undefined },
        ]);
        expect(result.length).toBe(3);
    });
});
