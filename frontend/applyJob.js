const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('jobId');
const email = urlParams.get('email');
const jobIdField = document.getElementById('jobId');
const emailField = document.getElementById('email');
jobIdField.value = jobId;
emailField.value = email;

console.log(jobId);
console.log(email);
const token = localStorage.getItem('token');

const applyJob = async (event) => {
    event.preventDefault();
    const form = document.getElementById('applyForm');
    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:5000/applyjob', {
        method: 'POST',
        body: formData,
        headers: {
            
            'Authorization': `Bearer ${token}`,
        }
        
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);
      // You can redirect the user to another page here
      window.location.href = "student.html";
    } catch (error) {
      console.error(error);
      alert('Unable to create job application');
    }
  };
  
  const applyForm = document.getElementById('applyForm');
  applyForm.addEventListener('submit', applyJob);
  
