const jobPostingsContainer = document.getElementById("job-postings-container");
const token = localStorage.getItem("token");
const jwtArray = token.split(".");

// Event listener for Apply button
function handleApply(event) {
  console.log("apply button clicked");
  const username = localStorage.getItem("username");
  console.log(username);
  const jobId = event.target.dataset.jobId;
  console.log(jobId);
  const url = `applyJob.html?jobId=${jobId}&email=${username}`;
  console.log(url);
  window.location.href = url;
}

// Fetch job postings from the backend
fetch("http://localhost:5000/viewjobs", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((jobPostings) => {
    // Dynamically render each job card
    jobPostings.forEach((jobPosting) => {
      const jobPostingCard = `
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4 ">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden font-serif">
          <div class="bg-gray-200 px-4 py-2 text-center">
            <h2 class="text-blue-800 font-bold text-xl">Job Id : ${
              jobPosting.jobId
            }</h2>
          </div>
          <div class="bg-gray-200 px-4 py-2">
            <h2 class="text-gray-600 font-bold text-xl text-center">Job Title : ${
              jobPosting.jobTitle
            }</h2>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700">Job Description : ${
              jobPosting.jobDescription
            }</p>
          </div>
          <div class="px-4 py-2">
            <p class="text-gray-700">Job Tags : ${jobPosting.jobTags.join(
              ", "
            )}</p>
          </div>
          <div class="px-4 py-2 flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded apply-btn" data-job-id="${
              jobPosting.jobId
            }">
              Apply
            </button>
          </div>
        </div>
      </div>
    `;
      jobPostingsContainer.insertAdjacentHTML("beforeend", jobPostingCard);
    });

    // Add event listener to Apply button
    const applyButtons = document.querySelectorAll(".apply-btn");
    applyButtons.forEach((applyButton) => {
      applyButton.addEventListener("click", handleApply);
    });
  })
  .catch((error) => console.error(error));

function searchJobs(inputElement) {
  const keyword = inputElement.value;
  console.log(keyword);
  // Clear the job postings container before rendering search results
  jobPostingsContainer.innerHTML = "";

  // Fetch job postings from the backend
  fetch(`http://localhost:5000/searchjob/${keyword}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((jobPostings) => {
      // Dynamically render the job cards
      jobPostings.forEach((jobPosting) => {
        const jobPostingCard = `
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="bg-gray-200 px-4 py-2">
              <h2 class="text-gray-800 font-bold text-xl">${
                jobPosting.jobId
              }</h2>
            </div>
            <div class="bg-gray-200 px-4 py-2">
              <h2 class="text-gray-800 font-bold text-xl">${
                jobPosting.jobTitle
              }</h2>
            </div>
            <div class="px-4 py-2">
              <p class="text-gray-700">${jobPosting.jobDescription}</p>
            </div>
            <div class="px-4 py-2">
              <p class="text-gray-700">${
                jobPosting.jobTags ? jobPosting.jobTags.join(", ") : ""
              }</p>
            </div>
            <div class="px-4 py-2 flex">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                Apply
              </button>
            </div>
          </div>
        </div>
      `;
        jobPostingsContainer.insertAdjacentHTML("beforeend", jobPostingCard);
      });
    })
    .catch((error) => console.error(error));
}
