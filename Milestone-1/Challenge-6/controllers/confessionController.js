const service = require('../services/confessionService')

exports.createConfession = (req, res) => {
  const result = service.createConfession(req.body)
  res.status(result.status).json(result.data)
}

exports.getAllConfessions = (req, res) => {
  const result = service.getAllConfessions()
  res.json(result)
}

exports.getOneConfession = (req, res) => {
  const result = service.getOneConfession(parseInt(req.params.id))
  res.status(result.status).json(result.data)
}

exports.getByCategory = (req, res) => {
  const result = service.getByCategory(req.params.cat)
  res.status(result.status).json(result.data)
}

exports.deleteConfession = (req, res) => {
  const token = req.headers['x-delete-token']
  const result = service.deleteConfession(parseInt(req.params.id), token)
  res.status(result.status).json(result.data)
}