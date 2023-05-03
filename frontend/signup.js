document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('sign-up-btn');
    signUpBtn.addEventListener('click', registerUser);
  });


function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    const contactDetails = document.getElementById('contactDetails').value;
  
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, userType, contactDetails })
    })
    .then(response => {
      if (response.ok) {
        alert('User registered successfully');
        document.querySelector('form').reset();

      }
      if(response.status === 401) {
        alert('Please fill all the fields');
      }
      if(response.status === 402) {
        document.getElementById('email').value = '';
        alert('Email already exists. Please enter a new one');
      }
   
    })
    .catch(error => {
      console.log(error);
      alert('Error ');
    });
  }
  
  const signUpBtn = document.getElementById('sign-up-btn');
  signUpBtn.addEventListener('click', registerUser);



  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var showHideIcon = document.getElementById("show-hide-icon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showHideIcon.classList.remove("fa-eye");
      showHideIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      showHideIcon.classList.remove("fa-eye-slash");
      showHideIcon.classList.add("fa-eye");
    }
  }
  