import '../src/index';
import {FilterOperator} from "../src";

interface Example {
    id: number;
    name: string;
    active: boolean;
    tags: string[];
    optional?: string | null;
}

const data: Example[] = [
    { id: 1, name: 'Example 1', active: true, tags: ['tag1', 'tag2'] },
    { id: 2, name: 'Example 2', active: false, tags: ['tag2', 'tag3'] },
    { id: 3, name: 'Example 3', active: true, tags: ['tag1', 'tag3'], optional: 'test' },
    { id: 4, name: 'Example 4', active: true, tags: [], optional: null },
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
        expect(result.length).toBe(3);
    });

    test('>=', () => {
        const result = data.where([
            { field: 'id', operator: '>=', value: 2 },
        ]);
        expect(result.length).toBe(3);
    });

    test('!=', () => {
        const result = data.where([
            { field: 'name', operator: '!=', value: 'Example 1' },
        ]);
        expect(result.length).toBe(3);
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
        expect(result.length).toBe(2);
    });


    test('startswith', () => {
        const result = data.where([
            { field: 'name', operator: 'startswith', value: 'Example' },
        ]);
        expect(result.length).toBe(4);
    });

    test('endswith', () => {
        const result = data.where([
            { field: 'name', operator: 'endswith', value: '3' },
        ]);
        expect(result.length).toBe(1);
    });

    test('contains', () => {
        const result = data.where([
            { field: 'name', operator: 'contains', value: 'ample' },
        ]);
        expect(result.length).toBe(4);
    });

    test('regex', () => {
        const result = data.where([
            { field: 'name', operator: 'regex', value: /^Example\s\d$/ },
        ]);
        expect(result.length).toBe(4);
    });

    test('null', () => {
        const result = data.where([
            { field: 'optional', operator: 'null' },
        ]);
        expect(result.length).toBe(1);
    });

    test('not-null', () => {
        const result = data.where([
            { field: 'optional', operator: 'not-null' },
        ]);
        expect(result.length).toBe(3);
    });

    test('true', () => {
        const result = data.where([
            { field: 'active', operator: 'true' },
        ]);
        expect(result.length).toBe(3);
    });

    test('false', () => {
        const result = data.where([
            { field: 'active', operator: 'false' },
        ]);
        expect(result.length).toBe(1);
    });

    test('exists', () => {
        const result = data.where([
            { field: 'optional', operator: 'exists' },
        ]);
        expect(result.length).toBe(2);
    });

    test('not-exists', () => {
        const result = data.where([
            { field: 'optional', operator: 'not-exists' },
        ]);
        expect(result.length).toBe(2);
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
        expect(result.length).toBe(2);
    });

    test('Invalid operator', () => {
        const result = data.where([
            { field: 'id', operator: 'invalid-operator' as FilterOperator, value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('Invalid field', () => {
        const result = data.where([
            { field: 'invalid-field' as keyof Example, operator: '==', value: 'Example 1' },
        ]);
        expect(result.length).toBe(0);
    });

    test('Invalid value type for string filters', () => {
        const result = data.where([
            { field: 'name', operator: 'startswith', value: { notAString: true } },
        ]);
        expect(result.length).toBe(0);
    });
});

describe('Array.orWhere filters', () => {
    test('<', () => {
        const result = data.orWhere([
            {field: 'id', operator: '<', value: 2},
            {field: 'id', operator: '<', value: 3},
        ]);
        expect(result.length).toBe(2);
    });

    test('<=', () => {
        const result = data.orWhere([
            {field: 'id', operator: '<=', value: 1},
            {field: 'id', operator: '<=', value: 2},
        ]);
        expect(result.length).toBe(2);
    });

    test('==', () => {
        const result = data.orWhere([
            {field: 'name', operator: '==', value: 'Example 1'},
            {field: 'name', operator: '==', value: 'Example 2'},
        ]);
        expect(result.length).toBe(2);
    });
    test('>', () => {
        const result = data.orWhere([
            { field: 'id', operator: '>', value: 1 },
            { field: 'id', operator: '>', value: 2 },
        ]);
        expect(result.length).toBe(3);
    });

    test('>=', () => {
        const result = data.orWhere([
            { field: 'id', operator: '>=', value: 2 },
            { field: 'id', operator: '>=', value: 3 },
        ]);
        expect(result.length).toBe(3);
    });

    test('!=', () => {
        const result = data.orWhere([
            { field: 'name', operator: '!=', value: 'Example 1' },
            { field: 'name', operator: '!=', value: 'Example 2' },
        ]);
        expect(result.length).toBe(4);
    });

    test('array-contains', () => {
        const result = data.orWhere([
            { field: 'tags', operator: 'array-contains', value: 'tag1' },
            { field: 'tags', operator: 'array-contains', value: 'tag2' },
        ]);
        expect(result.length).toBe(3);
    });

    test('array-contains-any', () => {
        const result = data.orWhere([
            { field: 'tags', operator: 'array-contains-any', value: ['tag1', 'tag3'] },
            { field: 'tags', operator: 'array-contains-any', value: ['tag1', 'tag2'] },
        ]);
        expect(result.length).toBe(3);
    });

    test('in', () => {
        const result = data.orWhere([
            { field: 'id', operator: 'in', value: [1, 3] },
            { field: 'id', operator: 'in', value: [1, 2] },
        ]);
        expect(result.length).toBe(3);
    });

    test('not-in', () => {
        const result = data.orWhere([
            { field: 'id', operator: 'not-in', value: [1, 3] },
            { field: 'id', operator: 'not-in', value: [1, 2] },
        ]);
        expect(result.length).toBe(3);
    });


    test('startswith', () => {
        const result = data.orWhere([
            { field: 'name', operator: 'startswith', value: 'Example 2' },
            { field: 'name', operator: 'startswith', value: 'Example 1' },
        ]);
        expect(result.length).toBe(2);
    });

    test('endswith', () => {
        const result = data.orWhere([
            { field: 'name', operator: 'endswith', value: '3' },
            { field: 'name', operator: 'endswith', value: '2' },
        ]);
        expect(result.length).toBe(2);
    });

    test('contains', () => {
        const result = data.orWhere([
            { field: 'name', operator: 'contains', value: 'ple 1' },
            { field: 'name', operator: 'contains', value: 'Ex' },
        ]);
        expect(result.length).toBe(4);
    });

    test('regex', () => {
        const result = data.orWhere([
            { field: 'name', operator: 'regex', value: /^Example\s\d$/ },
            { field: 'name', operator: 'regex', value: /^example\s\d$/ },
        ]);
        expect(result.length).toBe(4);
    });

    test('null', () => {
        const result = data.orWhere([
            { field: 'optional', operator: 'null' },
        ]);
        expect(result.length).toBe(1);
    });

    test('not-null', () => {
        const result = data.orWhere([
            { field: 'optional', operator: 'not-null' },
        ]);
        expect(result.length).toBe(3);
    });

    test('true', () => {
        const result = data.orWhere([
            { field: 'active', operator: 'true' },
            { field: 'active', operator: 'false' },
        ]);
        expect(result.length).toBe(4);
    });

    test('false', () => {
        const result = data.orWhere([
            { field: 'active', operator: 'false' },
            { field: 'active', operator: 'true' },
        ]);
        expect(result.length).toBe(4);
    });

    test('exists', () => {
        const result = data.orWhere([
            { field: 'optional', operator: 'exists' },
        ]);
        expect(result.length).toBe(2);
    });

    test('not-exists', () => {
        const result = data.orWhere([
            { field: 'optional', operator: 'not-exists' },
        ]);
        expect(result.length).toBe(2);
    });
});


describe('Array.orWhere filters with safeguards', () => {

    test('invalid number comparison', () => {
        const result = data.orWhere([
            { field: 'name', operator: '<', value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('array-contains-any with non-array filter value', () => {
        const result = data.orWhere([
            { field: 'tags', operator: 'array-contains-any', value: 'tag1' },
        ]);
        expect(result.length).toBe(0);
    });

    test('in with non-array filter value', () => {
        const result = data.orWhere([
            { field: 'id', operator: 'in', value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('not-in with non-array filter value', () => {
        const result = data.orWhere([
            { field: 'id', operator: 'not-in', value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('optional field with undefined value', () => {
        const result = data.orWhere([
            { field: 'optional', operator: '==', value: undefined },
        ]);
        expect(result.length).toBe(2);
    });

    test('Invalid operator', () => {
        const result = data.orWhere([
            { field: 'id', operator: 'invalid-operator' as FilterOperator, value: 1 },
        ]);
        expect(result.length).toBe(0);
    });

    test('Invalid field', () => {
        const result = data.orWhere([
            { field: 'invalid-field' as keyof Example, operator: '==', value: 'Example 1' },
        ]);
        expect(result.length).toBe(0);
    });

    test('Invalid value type for string filters', () => {
        const result = data.orWhere([
            { field: 'name', operator: 'startswith', value: { notAString: true } },
        ]);
        expect(result.length).toBe(0);
    });
});