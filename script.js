// Total number of participants
const totalParticipants = 100000; 

// Number of winners
const numberOfWinners = 7; 

function startLuckyDraw() {
    // Generate participant numbers from 1 to totalParticipants
    const participants = Array.from({ length: totalParticipants }, (_, i) => i + 1);

    // Shuffle participants and select winners
    const shuffledParticipants = shuffleArray(participants);
    const winners = shuffledParticipants.slice(0, numberOfWinners);

    // Disable the start button
    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.textContent = "กำลังสุ่ม...";

    // Display winners
    displayWinners(winners);

    // Re-enable the button after animation
    setTimeout(() => {
        startButton.textContent = "เริ่มจับรางวัล";
        startButton.disabled = false;
    }, 5000);
}

function displayWinners(winners) {
    const winnerList = document.getElementById('winnerList');
    winnerList.innerHTML = '';

    winners.forEach((winner, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = '...';
        winnerList.appendChild(listItem);

        let animationInterval = setInterval(() => {
            const randomParticipant = Math.floor(Math.random() * totalParticipants) + 1;
            listItem.innerHTML = `<div>ผู้โชคดีหมายเลข ${randomParticipant}</div>`;
        }, 50);

        setTimeout(() => {
            clearInterval(animationInterval);
            listItem.innerHTML = `<div>ผู้โชคดีหมายเลข ${winner}</div>`;
        }, 5000);
    });
}

function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function exportAsImage() {
    const element = document.querySelector('.container');
    html2canvas(element, { useCORS: true, scale: 2 }).then(canvas => {
        const dataURL = canvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'lucky_draw.jpg';
        link.click();
    });
}
