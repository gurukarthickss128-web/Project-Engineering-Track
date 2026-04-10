const store = require('../data/memoryStore')

const CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"]

exports.createConfession = (body) => {
  if (!body || !body.text) {
    return { status: 400, data: { msg: "need text" } }
  }

  if (body.text.length > 500) {
    return { status: 400, data: { msg: "text too big" } }
  }

  if (body.text.length === 0) {
    return { status: 400, data: { msg: "too short" } }
  }

  if (!CATEGORIES.includes(body.category)) {
    return { status: 400, data: { msg: "invalid category" } }
  }

  const tmp = {
    id: ++store.nextId,
    text: body.text,
    category: body.category,
    created_at: new Date()
  }

  store.confessions.push(tmp)

  return { status: 201, data: tmp }
}

exports.getAllConfessions = () => {
  const sorted = [...store.confessions].sort(
    (a, b) => b.created_at - a.created_at
  )

  return {
    data: sorted,
    count: sorted.length
  }
}

exports.getOneConfession = (id) => {
  const found = store.confessions.find(c => c.id === id)

  if (!found) {
    return { status: 404, data: { msg: "not found" } }
  }

  return { status: 200, data: found }
}

exports.getByCategory = (cat) => {
  if (!CATEGORIES.includes(cat)) {
    return { status: 400, data: { msg: "invalid category" } }
  }

  const filtered = store.confessions.filter(c => c.category === cat)

  return { status: 200, data: filtered }
}

exports.deleteConfession = (id, token) => {
  if (token !== 'supersecret123') {
    return { status: 403, data: { msg: "no permission" } }
  }

  const index = store.confessions.findIndex(c => c.id === id)

  if (index === -1) {
    return { status: 404, data: { msg: "not found" } }
  }

  const removed = store.confessions.splice(index, 1)

  return { status: 200, data: { msg: "deleted", item: removed[0] } }
}