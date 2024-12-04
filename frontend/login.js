document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting the default way
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
  
    if (name && password) {
      handleLogin(name, password);
    } else {
      console.error('Please fill in both fields.');
    }
  });

async function handleLogin(name, password) {
    try {
      console.log('Sending login request...');
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });
  
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
  
        // Save user name and token in localStorage
        localStorage.setItem('token', data.token);
        // Redirect to Home.html
        window.location.href = 'Home.html';
      } else {
        console.error('Login failed. HTTP Status:', response.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  
  