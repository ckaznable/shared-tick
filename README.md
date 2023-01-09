# SharedTick.js

Run function in same `setInterval`

## Installation

use npm
```
npm install shared-tick --save
```

use yarn
```
yarn add shared-tick
```

use pnpm
```
pnpm install shared-tick
```

## Framework

|Framework|Repository|
|:---|:---:|
| Vue 3 | [vue-use-shared-tick](https://github.com/ckaznable/vue-use-shared-tick) |
| React | [react-use-shared-tick](https://github.com/ckaznable/react-use-shared-tick) |

## Usage

run function per second

```js
import { runTick } from 'shared-tick'

const onTick = () => {
  // do something per second
}

runTick({onTick})
```

run function per 3 second

```js
import { runTick } from 'shared-tick'

const onTick = () => {
  // do something per second
}

runTick({onTick, tick: 3000})
```

stop runner

```js
import { stopTickRunner, runTick } from "shared-tick"

const id = runTick({...})
stopTickRunner(id)
```

restart runner

```js
import { stopTickRunner, startTickRunner, runTick } from "shared-tick"

const id = runTick({...})
stopTickRunner(id)

// restart runner after 5sec
setTimeout(() => startTickRunner(id), 5000)
```

## API

### runTick

```js
runTick(config)
```

### Parameter

| Field | Type | Default | Requirement |Description |
|---|:---:|---|---|---|
| tick | `number` | `1000` | `No` | Running interval time |
| id |`symbol`| `Symbol()` | `No` | Identifying objects |
| onTick | `(t: number) => void` | `No` | `Yes` | Runner function, The first parameter is the current timestamp |

### stopTickRunner

```js
stopTickRunner(id: symbol)
```

### stopTickRunner

```js
startTickRunner(id: symbol)
```


## License
The files included in this repository are licensed under the MIT license.