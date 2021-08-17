/**
Counts the occurrences of a value in an array
@param {Array} arr
@param {any} val

@example
```
import {countOccurrences} from 'pnxdxt-helpers-js';

countOccurrences(['pear', 'apple', 'orange'], 'apple');
//=> 1

countOccurrences(['pear', 'apple', 'apple'], 'apple');
//=> 2
```
*/
export function countOccurrences(arr: Array): Number;

/**
Removes false values from an array
@param {Array} arr

@example
```
import {compact} from 'pnxdxt-helpers-js';

compact(['pear', apple', 'orange']);
//=> ['pear', apple', 'orange']

compact(['pear', apple', false]);
//=> ['pear', apple']
```
*/
export function compact(arr: Array): Number;
