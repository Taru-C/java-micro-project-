const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const UI = path.join(ROOT, "GameHub-UI");
const PORT = 3000;

function startGame(folder, mainClass) {
    const gameDir = path.join(ROOT, folder);
    const game = spawn("java", ["-cp", "bin", mainClass], {
        cwd: gameDir,
        detached: true,
        stdio: "ignore"
    });
    game.unref();
}

function send(res, code, message) {
    res.writeHead(code, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain; charset=utf-8"
    });
    res.end(message);
}

const server = http.createServer((req, res) => {
    if (req.url === "/mine") {
        try {
            startGame("Minesweeper", "Minesweeper");
            send(res, 200, "Minesweeper started!");
        } catch (error) {
            send(res, 500, "Could not start Minesweeper.");
        }
        return;
    }

    if (req.url === "/pacman") {
        try {
            startGame("PacMan", "App");
            send(res, 200, "Pac-Man started!");
        } catch (error) {
            send(res, 500, "Could not start Pac-Man.");
        }
        return;
    }

    if (req.url === "/space") {
        try {
            startGame("SpaceInvaders", "App");
            send(res, 200, "Space Invaders started!");
        } catch (error) {
            send(res, 500, "Could not start Space Invaders.");
        }
        return;
    }

    let requested = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.normalize(path.join(UI, requested));

    if (!filePath.startsWith(UI + path.sep)) {
        send(res, 403, "Forbidden");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            send(res, 404, "File not found");
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const types = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css; charset=utf-8",
            ".js": "application/javascript; charset=utf-8",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png"
        };

        res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Game Hub running at http://localhost:${PORT}`);
    console.log("Open that address in your browser.");
});
