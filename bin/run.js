const app = require('../app')

const http = require('http');

const server = http.createServer(app);

io = module.exports = require('socket.io')(server);

require('../socket/socket').__init__();
require('../socket/soc-test1')

// server.listen(CONFIG.PORT,CONFIG.HOST,() => {
//     console.log(`Server Running on ${CONFIG.HOST}:${CONFIG.PORT}`)
// })

server.listen(process.env.PORT || 5000,() => {
    console.log(`Server Running on ${CONFIG.HOST}:${CONFIG.PORT}`)
})