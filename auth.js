let username = localStorage.getItem("tetris.username");
let inputUsername = document.getElementById('username');


if(username !== null) inputUsername.setAttribute("value", username);


function storeUsername() {
    localStorage["tetris.username"] = inputUsername.value;
}
   