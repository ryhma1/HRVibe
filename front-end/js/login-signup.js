document.addEventListener('DOMContentLoaded', () => {
  // USER CREATION / LOGIN
  document.getElementById('showSignup').addEventListener('click', () => {
    const signupSection = document.getElementById('signupSection');
    const loginForm = document.getElementById('login_form');
    if (signupSection && loginForm) {
      signupSection.style.display = 'block';
      loginForm.style.display = 'none';
    }
  });

  document.getElementById('showLogin').addEventListener('click', () => {
    const loginForm = document.getElementById('login_form');
    const signupSection = document.getElementById('signupSection');

    if (loginForm && signupSection) {
      loginForm.style.display = 'block';
      signupSection.style.display = 'none';
    }
  });

  // CREATE USER
  const createUser = document.querySelector('.createuser');

  if (createUser) {
    createUser.addEventListener('click', async (evt) => {
      evt.preventDefault();
      console.log('Creating user');

      const url = 'http://127.0.0.1:3000/api/users';

      const form = document.querySelector('#signupForm');
      const email = form.querySelector('input[name=email]').value;
      const password = form.querySelector('input[name=password]').value;
      const confirmPassword = form.querySelector(
        'input[name=password-confirm]'
      ).value;

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const data = {
        email: email,
        password: password,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      console.log(data);

      try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (response.ok) {
          alert('User created successfully!');
          window.location.href = 'https://analysis.kubioscloud.com/v2/portal/documentation/index.html';
        } else {
          // Handle other status codes (e.g., server error)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert(
          'Failed to create user. Check your user information and please try again.'
        );
      }
    });
  }

  // LOG IN USER
  const loginUser = document.querySelector('.loginuser');

  if (loginUser) {
    loginUser.addEventListener('click', async (evt) => {
      evt.preventDefault();
      console.log('Logging in user');

      const url = 'http://127.0.0.1:3000/api/auth/login';

      const form = document.querySelector('#login_form');

      const data = {
        email: form.querySelector('input[name=email]').value,
        password: form.querySelector('input[name=password]').value,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (response.ok) {
          // Store the token in localStorage
          localStorage.setItem('token', responseData.token);

          console.log(responseData);

          window.location.href = 'logged-index.html'; // Redirect to logged-in page
        } else {
          // Handle login failure
          console.error('Login failed:', responseData.error);
          alert('Unauthorized: email or password incorrect!');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again later.');
      }
    });
  }
});
