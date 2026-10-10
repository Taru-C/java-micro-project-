const http = require("http");
const { exec } = require("child_process");

const server = http.createServer((req, res) => {

    // Minesweeper
    if (req.url === "/mine") {

        exec('java -cp bin App', {
            cwd: 'C:\\Users\\Rakshita\\OneDrive\\Desktop\\JAVA MICROPROJECT\\Minesweeper'
        });

        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
        });

        res.end("Minesweeper started!");
    }

    // Space Invaders
    else if (req.url === "/space") {

        exec('java -cp bin App', {
            cwd: 'C:\\Users\\Rakshita\\OneDrive\\Desktop\\JAVA MICROPROJECT\\SpaceInvaders\\SpaceInvaders'
        });

        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
        });

        res.end("Space Invaders started!");
    }

    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Game Hub launcher running on http://localhost:3000");
});