function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('main');
  const header = document.querySelector('header');
  
  sidebar.classList.toggle('active'); // Toggle the sidebar
  
  if (sidebar.classList.contains('active')) {
    mainContent.style.marginLeft = "250px"; // Adjust main content
    header.style.marginLeft = "280px"; // Adjust header margin
  } else {
    mainContent.style.marginLeft = "0"; // Reset main content margin
    header.style.marginLeft = "50px"; // Reset header margin
  }
}

let lastScrollY = window.scrollY; // Track the last scroll position
let scrollTimeout; // Timeout to detect when scrolling stops

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  // Hide the navbar while scrolling
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    navbar.style.top = "0"; // Adjust based on the navbar height
  } else if (window.scrollY < lastScrollY) {
    // Scrolling up
    navbar.style.top = "0"; // Keep it hidden while scrolling
  }

  // Clear the previous timeout
  clearTimeout(scrollTimeout);

  // Set a timeout to show the navbar after scrolling stops
  scrollTimeout = setTimeout(() => {
    navbar.style.top = "0"; // Show the navbar when scrolling stops
  }, 200); // Adjust the delay (200ms works well for most cases)

  lastScrollY = window.scrollY; // Update the last scroll position
});

document.querySelector('.hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
});


const educationQuotes = [
  "Education is the most powerful weapon which you can use to change the world.",
  "The education is to teach one to think intensively and to think critically.",
  "Education is not the filling of a pail, but the lighting of a fire.",
  "The roots of education are bitter, but the fruit is sweet.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "An investment in knowledge pays the best interest.",
  "The Education prepares tomorrow's leaders.",
  "The only person who is educated is the one who has learned how to learn and change.",
  "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
  "Education is what remains after one has forgotten what one has learned in school."
];


const header = document.querySelector('header');
header.style.fontSize = "2.3rem";

function changeQuote() {
  const randomIndex = Math.floor(Math.random() * educationQuotes.length);
  header.textContent = educationQuotes[randomIndex];
}

setInterval(changeQuote,3000); // Change the quote every 5 seconds