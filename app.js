const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
const axios = require('axios')


// ketika diakses maka ambil index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


// serve side
io.on('connection', socket => {
    socket.on('get-data', () => {
        setInterval(function() {
            axios
                .get('https://seal-seiya.com/web/redeemcode.php')
                .then(res => {
                    console.log(res);
                    socket.emit('data', res.data)
                })
                .catch(error => {
                    console.error(error)
                })
        }, 1000);
    });
})


server.listen(3000)