document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const email = form.email.value.trim();

    const userData = {
      username,
      password,
      email
    };

    try {
      // Fetch existing users
      const usersResponse = await fetch('http://localhost:3000/users');
      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
      }
      const users = await usersResponse.json();

      // Check if the user already exists
      const userExists = users.some(user => user.username === username || user.email === email);
      if (userExists) {
        messageDiv.textContent = 'User already exists. Please try with a different username or email.';
        messageDiv.style.color = 'red';
        return;
      }

      // Proceed to register the new user
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        messageDiv.textContent = 'User successfully registered. You can proceed to login.';
        messageDiv.style.color = 'green';
        form.reset();

        // Redirect to the login page after a short delay
        setTimeout(() => {
          window.location.href = '/templates/login.html';
        }, 2000);
      } else {
        throw new Error('Failed to register user');
      }

    } catch (error) {
      messageDiv.textContent = 'There was an error. Please try again.';
      messageDiv.style.color = 'red';
      console.error('Error:', error);
    }
  });
});
