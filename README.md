# helpers-js
Useful helper methods for `javaScript` projects.

## Installation

Using npm:
```
npm i --save pnxdxt-helpers-js
```

In order to optimize the size of your code, you can import methods as needed using object destructuring. 

In Node.js:

```
// Load entire build
const _Help = require('pnxdxt-helpers-js');
// Load by method
const { _Crypto, _Dom, _Url } = require('pnxdxt-helpers-js');
```

For web (ES6):

```
// Load entire build
import _Help from 'pnxdxt-helpers-js';

// Load by method
import { _Crypto, _Dom, _Url } from 'pnxdxt-helpers-js';

```

List of modules :

### _Array

Various functions to handle arrays


all : Returns true if the predicate function returns true for all elements in a collection and false otherwise

allEqual : Checks whether all elements of the array are equal

append

average

cast

compact

countOccurrences

deepFlatten

flatten

fromEntries

group : Group items by common key and return an array of groups.

groupMap : Group items by common key and return an object of items grouped by key.

head

last

map

prepend

random

remove

sample

shuffle : Randomly shuffle an array

similarity

slice

sortBy

tail

toCSV

toChunks

unDuplicate

### _Crypto

https://attacomsian.com/blog/nodejs-encrypt-decrypt-data

decryptAes256

encryptAes256

hashSha256

uniqueId

### _Css

hasClass : Checks whether an element has a particular class\
toggleClass : Toggle a class for an element

addClass : Add a class for an element\
addClassAll : Add a class to all elements of a NodeList

removeClass : Remove a class for an element\
removeClassAll : Remove a class to all elements of a NodeList

getStyle : Get the value of a CSS rule for an element

getCurrentMediaQuery : Returns the current media query in use

getMetaContentByName : Returns a metatag content by name

### _Curry

Makes ```f(a,b,c)``` callable as ```f(a)(b)(c)```

### _Date


addDate : Add x to a date and returns a Date object

cloneDate : returns a new similar Date object

getCalendar : Returns an object with various properties like year, currentMonth, prevMonth, nextMonth

getMonthEnd 

getMonthStart 

isIsoFormat : returns Boolean

parseISO : timestamp eg: 2018-09-07T03:38:37.888Z


### _Device

getBrowser : retrieve browser type

getMobile : retrieve mobile type

getOS : retrieve os type

getUserAgent : returns basic user agent

isAndroid : test user agent, returns boolean

isMobile, isiPhone, isAndroid, isiOS... : test user agent, returns boolean

### _Dom

allElements 

appendTo 

attsToString 

classPresentIf 

createElement 

createElementsArray 

getAttributes 

getBoundingClientRect 

getCookie 

getImageSizeByUrl 

getIndex 

getLocalStorage2 

getOffset 

getOffsetParent 

getParentByData 

getParentById 

getPosition 

getPositionFromOffset 

getScroll 

getSessionStorage2 

getUserLanguage 

getViewportPosition 

glb 

id 

insertAfter 

insertBefore 

isWebComponent 

makeStorageHelper 

nextChild 

objectifyForm 

offDOM 

onDOM 

onDOMMany 

prependTo 

removeElements 

serialize 

setCaretPosition 

setContent 

store 

tag 

toClipboard 

toClipboardFromElement 

windowLoaded 

### _Error

Create a better looking error object

### _Fetch

getResponse\
processJSON\
writeServer 

```
fetch('http://example.com')
   .then(_Fetch.getResponse)
   .then(_Fetch.processJSON);
```

### _Func

asyncRetry : a method that encapsulates a retry logic for an asynchronous request. Time between retries is defined by a function with customizable parameters for now. In the future this will be updated in order to provide a custom function.

debounce : Returns a function that will only run N milliseconds after it stops being called. Or optionally will only run once during multiple calls, and won't run again until N milliseconds after the last call.

delay : Invokes `func` after `wait` milliseconds. Any additional arguments are provided to `func` when it's invoked.

mock : Mock promise, Useful for testing asynchronous functions.

mockFactory : mAsyncRequestFactory stands for mock asynchronous request factory. It returns a function that returns promises upon execution. If countdownToSuccess is larger than 0 it will throw executing/returning onFailure. When countdownToSuccess reaches zero it will resolve promise successfully returning onSuccess.

negate : Creates a function that negates the result of the predicate `func`. The `func` predicate is invoked with the `this` binding and arguments of the created function.

overArgs : Creates a function that invokes `func` with its arguments transformed.

retry : Retry `n` times to run a function

safelyRun : run `func` if type is function

times : Invokes the iteratee `n` times, returning an array of the results of each invocation. The iteratee is invoked with one argument: (index).

waitFor : wait for `n` time for the promise to resolve, else reject

waitTime : improved setTimeout

### _Is

Test if argument is ... returns boolean

```
_Is.null(null)
//=> true

_Is.function(() => {})
//=> true

```

### _LazyLoad

A straight forward lazy loader using IntersectionObserver if available and if not, it uses a requestAnimationFrame loop if available.

From http://lazyload.dev.area17.com/

### _Number

base64 

between 

coinFlip 

getRandomIntInclusive 

getUUID 

notGreaterThan 

notLessThan 

rarely 

safe64 

toFinite 

toInteger 

toLength 

toSafeInteger 

veryRarely 

### _Object

forEachEntry 

functions 

has 

invert 

invertBy 

keysIn 

mapKey 

mapObj 

mapValue 

toPlainObject 

### _Promise

timeout 

chain 

executeGetters 

tryC 

### _Store


Store is a helper method used to share information accross integration tests.

If set up as a sinlgeton it can share information across different files.

### _String

endsWith 

indexOf 

isEmpty 

isImageUrl 

isMail 

isPhone 

isUrl 

random 

repeat 

replace 

sliceText 

startsWith 

### _Url

getParams : Get the URL parameters

getQueryString : Get the value of a query string from a URL

queryFromObject : Get the value of a query string from an object

queryToObject : Takes the passed URL, or the current browser URL and returns an object of query string parameters.

queryupdateParameter : Updates a specified key's value in a query string.

### _Watchdog

This class works like a watchdog timer, if it's not reset before timer finishes it'll trigger a function.