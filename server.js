const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbconnection')
const port = process.env.PORT || 6000
connectDb()
app.use(express.json())
app.use('/api/contact', require('./Routes/contactroutes'))
app.use('/api/user', require('./Routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))