const express = require('express')
const app = express()
const port = 3324


// 处理跨域
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})


app.post('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // 流式数据
  let i = 0
  const interval = setInterval(() => {
    res.write(`data: ${i++}\n\n`)
    if (i > 10) {
      clearInterval(interval)
      res.end()
    }
  }, 1000)

  req.on('close', () => {
    clearInterval(interval)
  })
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


