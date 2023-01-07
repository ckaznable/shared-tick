type Timer = {
  pool: Map<symbol, (t: number) => void>
  interval: any
}

type TickPool = Record<number | string, Timer>
type TickPoolIterable = Iterable<Timer>
const tickPool: TickPool = {}
const pausedPool: Set<symbol> = new Set

type RunParameter = {
  tick?: number|string,
  id?: symbol,
  onTick: (t: number) => void
}

export function runTick({tick=1000, id=Symbol(), onTick}: RunParameter) {
  if(!tickPool[tick]) {
    addTickPool(tick)
  }

  const { pool, interval } = tickPool[tick]
  pool.set(id, onTick)

  if (!interval) {
    tickPool[tick].interval = setInterval(() => {
      const now = Date.now()
      pool.forEach((fn, id) => !pausedPool.has(id) && fn(now))
    }, +tick)
  }

  return id
}

export function addTickPool(tick: number|string) {
  if (!tickPool[tick]) {
    tickPool[tick] = {
      pool: new Map,
      interval: null
    }
  }
}

export function getTickWithId(id: symbol) {
  for (const tick in tickPool as unknown as TickPoolIterable) {
    const { pool } = tickPool[tick]
    for (const k of pool.keys()) {
      if(id === k) {
        return tick
      }
    }
  }

  return undefined
}

export function removeTick(tick: number) {
  stopTick(tick)

  for (const k of tickPool[tick].pool.keys()) {
    pausedPool.delete(k)
  }

  delete tickPool[tick]
}

export function removeTickRunner(id: symbol) {
  const tick = getTickWithId(id)
  if (!tick) {
    return
  }

  const { pool, interval } = tickPool[tick]
  pool.delete(id)
  if (pool.size === 0) {
    clearInterval(interval)
    tickPool[tick].interval = null
  }
}

export function stopTickRunner(id: symbol) {
  pausedPool.add(id)
}

export function stopTick(tick: string|number) {
  const { interval } = tickPool[tick]
  clearInterval(interval)
  tickPool[tick].interval = null
}

export function stopAll() {
  for (const tick in tickPool as unknown as TickPoolIterable) {
    stopTick(tick)
  }
}

export function startTickRunner(id: symbol) {
  pausedPool.delete(id)
}

export function startTick(tick: string|number) {
  const { pool } = tickPool[tick]
  pool.forEach((onTick, id) => runTick({ tick, id, onTick }))
}

export function startAll() {
  for (const tick in tickPool as unknown as TickPoolIterable) {
    startTick(tick)
  }
}