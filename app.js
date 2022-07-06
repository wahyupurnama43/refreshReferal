const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true
});
const axios = require('axios')


// ketika diakses maka ambil index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// setInterval(function() {
//     io.emit("get-data", 'da');
// }, 1000);

// serve side
io.on('connection', socket => {

    socket.on('get-data', () => {
        // socket.emit('data', 'ada')
        var datalama = '';
        setInterval(function() {
            axios
                .get('https://seal-seiya.com/web/redeemcode.php')
                .then(res => {
                    if (res.data == "<div style='width:325px;height:350px;padding:355px 145px 0px 330px;'><marquee behavior='alternate' style='font-family:Trebuchet MS;font-size:40px;padding-top:20px;width:429px;'><span>Belum Tersedia</span></marquee></div>") {
                        datalama = res.data;
                        socket.emit('data', "<div style='width:325px;height:350px;padding:355px 145px 0px 330px;'><marquee behavior='alternate' style='font-family:Trebuchet MS;font-size:40px;padding-top:20px;width:429px;'><span>Belum Tersedia</span></marquee></div>")
                    } else if (datalama !== res.data) {
                        datalama = res.data;
                        socket.emit('data', datalama)
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }, 1000);
    });

})


server.listen(3000)