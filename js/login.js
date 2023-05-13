const REACT_APP_AWS_API_URL = 'http://ec2-54-159-17-173.compute-1.amazonaws.com:3000/api'
const REACT_APP_AWS_AUTH_API_URL = 'http://ec2-54-159-17-173.compute-1.amazonaws.com:4000/api'

/**
 * Logs in the user with the given username and password.
 * @param {string} username - The username to use for authentication.
 * @param {string} password - The password to use for authentication.
 * @throws {Error} - If the network response is not ok.
 */
const Login = async (username, password) => {
    try {
        const response = await fetch(`${REACT_APP_AWS_AUTH_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        sessionStorage.setItem('user', JSON.stringify(jsonResponse))
        window.location.href = 'index.html';

    } catch (error) {
        alert('Incorrect username or password')

        console.error('There was a problem with the network request:', error);
    }
}






const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    Login(username, password)
    loginForm.reset();
});

