const express = require('express')
const app = express()

const confessionRoutes = require('./routes/confessionRoutes')

app.use(express.json())

app.use('/api/v1', confessionRoutes)

app.listen(3000, () => {
  console.log('running on 3000')
})