import JSONCrush from 'jsoncrush'

let listeners = []
function onChange(key, newValue) {
  const event = { key, newValue }
  for (const i of listeners) i(event)
}

function load() {
  if (typeof window === "undefined")
    return Object.create(null) // server-side

  try {
    const hash = window.location.hash.slice(1)
    const decoded = decodeURIComponent(hash)
    const uncrushed = JSONCrush.uncrush(decoded)
    const parsed = JSON.parse(uncrushed)
    return parsed
  } catch (e) {
    console.error("Unable to load choices from URI", e)
    return Object.create(null)
  }
}

function save(state) {
  if (typeof window === "undefined")
    return // server-side, no-op

  const json = JSON.stringify(state)
  const crushed = JSONCrush.crush(json)
  window.location.hash = encodeURIComponent(crushed)
}

let initial = load()

export const storage = new Proxy(initial, {
  set(store, name, value) {
    store[name] = value
    save(store)
    onChange(name, value)
    return true
  },
  deleteProperty(store, name) {
    delete store[name]
    save(store)
    onChange(name, undefined)
    return true
  },
  get(store, name) {
    return store[name]
  },
})

// Must implement addEventListener and removeEventListener
export const events = {
  addEventListener (key, callback) {
    listeners.push(callback)
  },
  removeEventListener (key, callback) {
    listeners = listeners.filter(i => i !== callback)
  },
  // window dispatches "storage" events for any key change
  // => One listener for all map keys is enough
  perKey: false
}