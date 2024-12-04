// import authContext from './authContext.js';
let currentSlide = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle("active", i === index);
    });
}

document.querySelector(".prev-slide").addEventListener("click", () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : testimonials.length - 1;
    showSlide(currentSlide);
});

document.querySelector(".next-slide").addEventListener("click", () => {
    currentSlide = (currentSlide < testimonials.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
});

showSlide(currentSlide);

// // document.addEventListener('DOMContentLoaded', function () {
// //     const loginForm = document.getElementById('loginForm');
// //     const authSection = document.getElementById('authSection');
// //     let dropdownOpen = false; // Track dropdown state

//     async function handleLogin(name, password) {
//         try {
//           const response = await fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, password }),
//           });
      
//           if (response.ok) {
//             const data = await response.json();
//             const token = data.token;
//             console.log('Login successful, token:', token);
//             localStorage.setItem('token', token);
//               alert('Login successful!');
//               window.location.href = '/frontend/Home.html'; // Redirect to home
            
//           } else {
//             alert('Login failed. Please check your credentials.');
//           }
//         } catch (error) {
//           console.error('Error during login:', error);
//           alert('An error occurred. Please try again.');
//         }
//       }
// //     // Update the navbar based on login state
// //     function updateNavbar() {
// //         const token = localStorage.getItem('token');
// //         console.log('Token from localStorage:', token); // Debug: Check the token
        
// //         const navbar = document.getElementById('navbar'); // Assuming the navbar has an id 'navbar'
// //         const loginRegisterButtons = document.getElementById('authSection'); // Assuming buttons have this id

// //         if (token) {
// //             try {
// //                 const payload = JSON.parse(atob(token.split('.')[1])); // Decode token
// //                 const username = payload.name || 'User'; // Get the username from the token

// //                 // Create and display the username element
// //                 const userMenu = document.createElement('div');
// //                 userMenu.classList.add('userMenu');

// //                 const usernameElement = document.createElement('span');
// //                 usernameElement.classList.add('username');
// //                 usernameElement.textContent = username;
// //                 usernameElement.addEventListener('click', toggleDropdown);

// //                 userMenu.appendChild(usernameElement);

// //                 // Replace login/register buttons with the username
// //                 navbar.replaceChild(userMenu, loginRegisterButtons);

// //             } catch (error) {
// //                 console.error('Invalid token:', error);
// //                 handleLogout(); // Clear invalid token and re-render navbar
// //             }
// //         } else {
// //             // Show login/register buttons if no token
// //             navbar.replaceChild(loginRegisterButtons, navbar.firstChild);
// //         }
// //     }

// //     // Handle logout function
// //     function handleLogout() {
// //         localStorage.removeItem('token');
// //         dropdownOpen = false; // Close dropdown on logout
// //         updateNavbar(); // Re-render navbar to show login/register buttons
// //     }

// //     // Toggle dropdown visibility
// //     function toggleDropdown() {
// //         dropdownOpen = !dropdownOpen;
// //         updateNavbar(); // Re-render to reflect dropdown state
// //     }

// //     // If the user is on the login page, attach the submit handler
// //     if (loginForm) {
// //         loginForm.addEventListener('submit', function (event) {
// //             event.preventDefault(); // Prevent the default form submission

// //             const name = document.getElementById('name').value;
// //             const password = document.getElementById('password').value;

// //             if (name && password) {
// //                 handleLogin(name, password); // Call handleLogin function
// //             } else {
// //                 alert('Please enter both username and password.');
// //             }
// //         });
// //     }

// //     // Initial render of the navbar
// //     updateNavbar();
// // });


document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const authSection = document.getElementById('authSection');

    if (token) {
        // Decode token (assuming it contains the user's name)
        const payload = JSON.parse(atob(token.split('.')[1])); // Base64 decode JWT payload
        const userName = payload.name;

        // Update navigation to display user's name as a button with a dropdown for logout
        authSection.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    ${userName}
                </button>
                <ul class="dropdown-menu" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" id="logoutButton" href="#">Logout</a></li>
                </ul>
            </div>
        `;

        // Add logout functionality
        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.removeItem('token');
            location.reload(); // Reload to reset UI
        });
    }
});
