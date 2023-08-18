# TS Array Filter

A TypeScript library that provides a simple and intuitive .where(...) method for filtering arrays based on specified filters. It includes a generic filter interface for better type checking and autocompletion. Version 1.1.0 introduces new filters for enhanced functionality.

## Installation

Install the package using npm:

```
npm install ts-array-filter
```

## Usage

Import the library in your TypeScript project:

```typescript
import 'ts-array-filter';
```

Declare an interface for your data:

```typescript
interface Example {
id: number;
name: string;
tags: string[];
}
```

Create a sample data array:

```typescript
const data: Example[] = [
{ id: 1, name: 'Example 1', tags: ['tag1', 'tag2'] },
{ id: 2, name: 'Example 2', tags: ['tag2', 'tag3'] },
{ id: 3, name: 'Example 3', tags: ['tag1', 'tag3'] },
];
```

Apply filters using the .where(...) method:

```typescript
const result = data.where([
    { field: 'id', operator: '>', value: 1 },
    { field: 'tags', operator: 'array-contains', value: 'tag3' },
]);
// Expected output:  [
//    { id: 1, name: 'Example 1', tags: ['tag1', 'tag2'] },
//    { id: 2, name: 'Example 2', tags: ['tag2', 'tag3'] },
//    { id: 3, name: 'Example 3', tags: ['tag1', 'tag3'] },
// ]
```

Apply filters using the .orWhere(...) method:

```typescript
const result = data.orWhere([
    { field: 'id', operator: '==', value: 1 },
    { field: 'id', operator: '==', value: 2 },
]);
// Expected output:  [
//    { id: 1, name: 'Example 1', tags: ['tag1', 'tag2'] },
//    { id: 2, name: 'Example 2', tags: ['tag2', 'tag3'] },
// ]
```

## Supported Filters

1. < less than
2. <= less than or equal to
3. == equal to
4. ">" greater than
5. ">=" greater than or equal to
6. != not equal to
7. array-contains
8. array-contains-any
9. in
10. not-in
11. startswith 
12. endswith 
13. contains 
14. regex 
15. null 
16. not-null 
17. true 
18. false 
19. exists 
20. not-exists

## Contributing

If you would like to contribute to the development of this library, please follow these steps:

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Make your changes and commit them to your forked repository.
4. Create a Pull Request from your fork to the original repository.

Please ensure that your changes are well-tested and documented. We appreciate your help in improving this library!

## License

This library is released under the MIT License. See the LICENSE file for more information.
