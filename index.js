const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.status(202).send('<h1>Selamat Datang di API Ujian JC 11!</h1>')
})

const { 
    categoryRouter, 
    productRouter,
    productcatRouter 
} = require('./routers')

app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/productcat', productcatRouter)

app.listen(PORT, () => console.log(`API berhasil aktif di PORT ${PORT}`))
