let leaderboard = new Map(JSON.parse(localStorage["tetris.leaderboard"]));
leaderboard = new Map(Array.from(leaderboard).sort((a, b) => b[1] - a[1]));


if (leaderboard !== null) {
    let table = document.getElementById('table_body');
    let cnt = 1;
    for (let [key, value] of leaderboard) {
        const newRow = document.createElement("tr");
        const placeCell = document.createElement("td");
        placeCell.innerText = cnt;
        const nameCell = document.createElement("td");
        nameCell.innerText = key;
        const recordCell = document.createElement("td");
        recordCell.innerText = value;
        newRow.appendChild(placeCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(recordCell);
        table.appendChild(newRow);
        cnt++;
    }
}