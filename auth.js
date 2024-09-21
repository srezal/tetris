function storeUsername() {
    const inputUsername = document.getElementById('username');
    localStorage["tetris.username"] = inputUsername.value;
}
   