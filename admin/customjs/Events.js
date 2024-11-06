$(document).ready(function () {

   // <!-- Searchbox functionality -->
      // Predefined search items related to Leave Application Management
      const searchItems = [
        "New  Application Form",
        "Pending Leave Requests",
        "Approved Leave Applications",
        "Rejected Leave Applications",
        "Apply for Leave",
        "Leave History",
        "All Employees",
        "Manage user Roles",
        "Manage User Actions"
    ];


    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');
    // Function to display search results dynamically
    function displayResults() {
        resultsList.innerHTML = '';
        const query = searchInput.value.toLowerCase();
        const filteredItems = searchItems.filter(item => item.toLowerCase().includes(query));
        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            resultsList.appendChild(li);
            li.addEventListener('click', () => {
                alert(`You selected: ${item}`);
            });
        });
        if (query === '') {
            resultsList.innerHTML = '';
        }
    }
    
        searchInput.addEventListener('input', displayResults);



});

 

    




//logout 
$("#btn-logout").click(() => {
    LeaveApplicationManager.Logout();
})


// Get the button
let mybutton = document.getElementById("scrollTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
if(window.location.href.endsWith("admin.html")){
  window.onscroll = function() {scrollFunction()};
}


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
