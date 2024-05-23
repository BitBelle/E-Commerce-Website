document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                alert('Login successful!');
                window.location.href = '/templates/products.html';
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});
