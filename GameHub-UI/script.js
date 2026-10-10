function playGame(gameName) {
    const routes = {
        "Minesweeper": "/mine",
        "Pac-Man": "/pacman",
        "Space Invaders": "/space"
    };

    const route = routes[gameName];
    if (!route) return;

    fetch(route)
        .then(response => response.text())
        .then(message => {
            console.log(message);
        })
        .catch(error => {
            console.error(error);
            alert("Game launcher is not running. Please start the server first.");
        });
}
