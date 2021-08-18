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

_Array
_Crypto
_Css
_Curry 
_Date
_Device
_Dom
_Error 
_Fetch
_Func
_Is 
_LazyLoad 
_Number
_Object
_Promise
_Store 
_String
_Url
_Watchdog 

List of functions :

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
decryptAes256
encryptAes256
hashSha256
uniqueId
addClass
addClassAll
getCurrentMediaQuery 
getMetaContentByName 
getStyle
hasClass
removeClass
removeClassAll 
toggleClass
addDate 
cloneDate 
getCalendar 
getMonthEnd 
getMonthStart 
isIsoFormat 
parseISO 
getBrowser 
getMobile 
getOS 
getUserAgent 
isAndroid 
isMobile 
isPad 
isPhone 
isiOS 
isiPad 
isiPhone 
isiPod 
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
getResponse 
processJSON 
writeServer 
asyncRetry 
debounce 
delay 
mock 
mockFactory 
negate 
overArgs 
retry 
safelyRun 
times 
waitFor 
waitTime 
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
Timeout 
chain 
executeGetters 
tryC 
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
getParams 
getQueryString 
queryFromObject 
queryToObject 
queryupdateParameter