function handleProfileClick() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        window.location.href = '/profile.html';
        
    } else {
        window.location.href = '/login.html';
    }
}

function handleLogoutClick(e) {
    console.log("Logout clicked");
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}