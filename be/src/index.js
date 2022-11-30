const http = require('http')
const server = http.createServer((request, respond)=>{
    respond.write("Helloo Oto")
    respond.end()
})
server.listen(3000)