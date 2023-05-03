document.addEventListener('DOMContentLoaded', () => {
    const jobPostbtn = document.getElementById('job-post-btn');
    jobPostbtn.addEventListener('click', jobPost);
  });


  const postJob = async (event) => {
    event.preventDefault();
  
    // Get form data
    const jobId = document.getElementById('jobId').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const jobTags = document.getElementById('jobTags').value;
    const jobDescription = document.getElementById('jobDescription').value;
  
    // Get token from local storage
    const token = localStorage.getItem('token');
  
    try {
      // Send form data and token to backend
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId,
          jobTitle,
          jobTags,
          jobDescription,
        }),
      });
  
      const data = await response.json();
  
      // Handle response
      if (response.ok) {
        alert('Job posted successfully');
        console.log('Job posted successfully');
      } else {
        alert(data.message);
        console.error(data.message);
      }
    } catch (error) {
        alert('Error posting job');
      console.error(error);
    }
  }
  
  // Attach click event listener to post job button
  const postJobButton = document.getElementById('job-post-btn');
  postJobButton.addEventListener('click', postJob);
  