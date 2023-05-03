document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('log-in-btn');
    signUpBtn.addEventListener('click', login);
  });


function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === '' || password === '') {
        alert('Please fill all the fields');
        return;
    }
  
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        
        if (data.token) {
          // user is logged in, save token to localStorage or cookie
          localStorage.setItem("username", data.user.email);
          localStorage.setItem("token", data.token);
          console.log(data.token)
          document.querySelector('form').reset();
          console.log(data.user.userType);
          console.log(data.user.email);
          alert("Logged in successfully");
          if(data.user.userType==="student"){
            window.location.href = "student.html";
          }
          if(data.user.userType==="employer"){
            window.location.href = "employee.html";
          }
          
        //   window.location.href = "/signup.html"; // redirect to dashboard page
        //   console.log(data.token)
        } else {
          // display error message
          alert(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while logging in. Please try again later.");
      });
  }
  
  document.getElementById("log-in-btn").addEventListener("click", login);
  



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