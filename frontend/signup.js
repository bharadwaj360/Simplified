document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        Phonenumber: document.getElementById('Phonenumber').value
    };

    try {
        const response = await fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json(); // Parse JSON if needed
            alert('Signup successful!');
            console.log('User saved:', result);
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            const error = await response.json(); // Parse error message if available
            alert(`Signup failed: ${error.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing up.');
    }
});