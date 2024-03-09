import JSONCrush from 'jsoncrush'

let listeners = []
function onChange(key, newValue) {
  const event = { key, newValue }
  for (const i of listeners) i(event)
}

function hash() {
  if (typeof window === "undefined") return ""
  return window.location.hash.slice(1)
}

function load(data = hash()) {
  if (data === "") return Object.create(null);

  try {
    const decoded = decodeURIComponent(data)
    const uncrushed = JSONCrush.uncrush(decoded)
    const parsed = JSON.parse(uncrushed)
    return parsed
  } catch (e) {
    console.error("Unable to load choices from URI", e)
    return Object.create(null)
  }
}

function dump(state) {
  if (typeof window === "undefined") return;

  const json = JSON.stringify(state)
  const crushed = JSONCrush.crush(json)
  const encoded = encodeURIComponent(crushed)
  const currentUrl = new URL(window.location.toString())
  const newUrl = new URL(window.location.toString())
  newUrl.hash = encoded

  if (currentUrl.toString() === newUrl.toString()) return;

  if (window.location.hash === "") {
    window.history.replaceState({}, "", newUrl.toString())
  } else {
    window.history.pushState({}, "", newUrl.toString())
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", ({ newURL, oldURL }) => {
    const oldValue = load(new URL(oldURL).hash.slice(1))
    const newValue = load(new URL(newURL).hash.slice(1))

    const keys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)])

    keys.forEach(k => {
      if (k in newValue === false) return onChange(k, undefined); // removed
      if (k in oldValue === false) return onChange(k, newValue[k]); // added
      if (oldValue[k] !== newValue[k]) return onChange(k, newValue[k]); // changed
    })
  })
}

let store = load()

let saveQueued = false

function scheduleDumpStore() {
  if (typeof window === "undefined") return;
  saveQueued || window.queueMicrotask(() => {
    dump(store)
    saveQueued = false
  })
  saveQueued = true
}

export const storage = new Proxy(store, {
  set(target, name, value) {
    target[name] = value
    scheduleDumpStore()
    onChange(name, value)
    return true
  },
  deleteProperty(target, name) {
    delete target[name]
    scheduleDumpStore()
    onChange(name, undefined)
    return true
  },
  get(target, name) {
    return target[name]
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