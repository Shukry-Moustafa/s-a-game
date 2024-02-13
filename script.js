let currentPlayer = null;

document.getElementById('select-shukry').addEventListener('click', function() {
    selectPlayer('shukry');
});

document.getElementById('select-avin').addEventListener('click', function() {
    selectPlayer('avin');
});

function selectPlayer(player) {
    currentPlayer = player;
    document.getElementById('player-selection').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    // Start the game
    startGame();
}

function startGame() {
    document.addEventListener('keydown', function(event) {
        if (currentPlayer === 'shukry') {
            handlePlayerMovement('shukry', event);
        } else if (currentPlayer === 'avin') {
            handlePlayerMovement('avin', event);
        }
    });
}

function handlePlayerMovement(playerId, event) {
    switch(event.key) {
        case 'ArrowLeft':
            movePlayer(playerId, -10, 0);
            break;
        case 'ArrowRight':
            movePlayer(playerId, 10, 0);
            break;
        case 'ArrowUp':
            movePlayer(playerId, 0, -10);
            break;
        case 'ArrowDown':
            movePlayer(playerId, 0, 10);
            break;
        case ' ':
            throwTomato(playerId);
            break;
        default:
            break;
    }
}



function movePlayer(playerId, deltaX, deltaY) {
    const player = document.getElementById(playerId);
    const playerPosition = player.getBoundingClientRect();
    const newLeft = playerPosition.left + deltaX;
    const newTop = playerPosition.top + deltaY;

    if (
        newLeft >= 0 &&
        newLeft <= window.innerWidth - player.offsetWidth &&
        newTop >= 0 &&
        newTop <= window.innerHeight - player.offsetHeight
    ) {
        player.style.left = newLeft + 'px';
        player.style.top = newTop + 'px';
    }
}

function throwTomato(playerId) {
    // Implement throwTomato function as per your game's logic
    console.log(playerId + ' throws tomato.');
}


function throwTomato(playerId) {
    const player = document.getElementById(playerId);
    const tomato = document.createElement('div');
    tomato.classList.add('tomato');
    const playerPosition = player.getBoundingClientRect();
    const opponentId = playerId === 'shukry' ? 'avin' : 'shukry';
    const opponent = document.getElementById(opponentId);
    const opponentPosition = opponent.getBoundingClientRect();
    tomato.style.left = playerId === 'shukry' ? (playerPosition.left + playerPosition.width) + 'px' : (playerPosition.left - 20) + 'px';
    tomato.style.top = (playerPosition.top + playerPosition.height / 2) + 'px';
    document.body.appendChild(tomato);

    const tomatoAnimation = setInterval(function() {
        const currentPosition = parseInt(tomato.style.left);
        const moveDirection = playerId === 'shukry' ? 10 : -10;

        if (
            (playerId === 'shukry' && currentPosition >= opponentPosition.left) ||
            (playerId === 'avin' && currentPosition <= opponentPosition.right)
        ) {
            // Tomato hits the opponent
            clearInterval(tomatoAnimation);
            tomato.remove();
            damageOpponent(opponentId);
        } else if (
            (playerId === 'shukry' && currentPosition >= window.innerWidth) ||
            (playerId === 'avin' && currentPosition <= 0)
        ) {
            // Tomato missed the opponent
            clearInterval(tomatoAnimation);
            tomato.remove();
        } else {
            tomato.style.left = (currentPosition + moveDirection) + 'px';
        }
    }, 50);
}

function damageOpponent(playerId) {
    const player = document.getElementById(playerId);
    let health = parseInt(player.getAttribute('data-health'));

    // Reduce health by 1
    health -= 1;

    // Update player health
    player.setAttribute('data-health', health);

    // Check if player health is 0 or less
    if (health <= 0) {
        endGame(playerId);
    }
}

function endGame(winnerId) {
    const winnerName = winnerId === 'shukry' ? 'Shukry' : 'Avin';
    alert('Game Over! ' + winnerName + ' wins!');
    location.reload(); // Reload the page to start a new game
}


function throwTomato(playerId) {
    const player = document.getElementById(playerId);
    const tomato = document.createElement('div');
    tomato.classList.add('tomato');
    const playerPosition = player.getBoundingClientRect();
    const opponentId = playerId === 'shukry' ? 'avin' : 'shukry';
    const opponent = document.getElementById(opponentId);
    const opponentPosition = opponent.getBoundingClientRect();
    tomato.style.left = playerId === 'shukry' ? (playerPosition.left + playerPosition.width) + 'px' : (playerPosition.left - 20) + 'px';
    tomato.style.top = (playerPosition.top + playerPosition.height / 2) + 'px';
    document.body.appendChild(tomato);

    const tomatoAnimation = setInterval(function() {
        const currentPosition = parseInt(tomato.style.left);
        const moveDirection = playerId === 'shukry' ? 10 : -10;

        if (
            (playerId === 'shukry' && currentPosition >= opponentPosition.left) ||
            (playerId === 'avin' && currentPosition <= opponentPosition.right)
        ) {
            // Tomato hits the opponent
            clearInterval(tomatoAnimation);
            tomato.remove();
            damageOpponent(opponentId);
        } else if (
            (playerId === 'shukry' && currentPosition >= window.innerWidth) ||
            (playerId === 'avin' && currentPosition <= 0)
        ) {
            // Tomato missed the opponent
            clearInterval(tomatoAnimation);
            tomato.remove();
        } else {
            tomato.style.left = (currentPosition + moveDirection) + 'px';
        }
    }, 50);
}

function damageOpponent(playerId) {
    const player = document.getElementById(playerId);
    let health = parseInt(player.getAttribute('data-health'));

    // Reduce health by 10
    health -= 10;

    // Update player health
    player.setAttribute('data-health', health);

    // Update health bar width
    const healthBar = document.getElementById(playerId + '-health');
    healthBar.style.width = health + '%';

    // Check if player health is 0 or less
    if (health <= 0) {
        endGame(playerId);
    }
}

function endGame(winnerId) {
    const winnerName = winnerId === 'shukry' ? 'Shukry' : 'Avin';
    alert('Game Over! ' + winnerName + ' wins!');
    location.reload(); // Reload the page to start a new game
}


function damageOpponent(playerId) {
    const player = document.getElementById(playerId);
    let health = parseInt(player.getAttribute('data-health'));

    // Minska hälsan med 10 när spelaren blir träffad
    health -= 10;

    // Uppdatera spelarens hälsa
    player.setAttribute('data-health', health);

    // Uppdatera bredden på hälsobar
    const healthBar = document.getElementById(playerId + '-health');
    healthBar.style.width = health + '%';

    // Kontrollera om spelarens hälsa är 0 eller mindre
    if (health <= 0) {
        endGame(playerId);
    }
}

function damageOpponent(playerId) {
    const player = document.getElementById(playerId);
    let health = parseInt(player.getAttribute('data-health'));

    // Minska hälsan med 10 när spelaren blir träffad
    health -= 10;

    // Uppdatera spelarens hälsa
    player.setAttribute('data-health', health);

    // Uppdatera bredden på hälsobar
    const healthBar = document.getElementById(playerId + '-health');
    healthBar.style.width = health + '%';

    // Kontrollera om spelarens hälsa är 0 eller mindre
    if (health <= 0) {
        endGame(playerId);
    }
}
