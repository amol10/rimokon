const { exec } = require('child_process');
const path= require('path');

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  "/index.html"));
})

app.get('/volume/get/', (req, res) => {
    console.log(req.params.level);
    //res.send("100");

    var cmd = "pactl list sinks | grep -P \"Volume|Name\""
    exec(cmd, (error, stdout, stderr) => {
        console.log("test");
        if (error) {
            console.log(error.message);
        }
        if (stderr) {
            console.log(stderr);
        }
        //console.log(stdout);
        var lines = stdout.split(/\r?\n/);
        console.log(lines);
        var sinks = [];
        var sink = { name: null, volume: null };
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
            var rx =    /Name: (.*)/;
            var name = rx.exec(lines[i])
            if (name !== null) {
                console.log(name[1]);
                sink.name = name[1];
            }
            var r2 = /^\s+Volume:.*?(\d+%)/
            var volume = r2.exec(lines[i]);
            if (volume !== null) {
                console.log(volume[1]);
                sink.volume = volume[1];
                sinks.push(sink);
                sink = { name: null, volume: null };
            }
        }
        console.log(sinks);
        res.send(sinks)
    });
})

app.listen(port, () => {
    console.log("listening...")
})

console.log("in");
exec('echo test22');

