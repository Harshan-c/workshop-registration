// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTx8bvN2mqg1GVobs0Oi0-nbvaSBsP04s",
  authDomain: "webstart-learn.firebaseapp.com",
  databaseURL: "https://webstart-learn-default-rtdb.firebaseio.com",
  projectId: "webstart-learn",
  storageBucket: "webstart-learn.appspot.com",
  messagingSenderId: "430159672741",
  appId: "1:430159672741:web:4d91d1ab1d436252d2244c",
  measurementId: "G-PN2MFTVNH8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var webstartDB = firebase.database().ref('webstart-learn');

// Get modal element
var modal = document.getElementById("thankYouModal");

// Get close button element for Thank You modal
var span = document.getElementsByClassName("close")[0];

// Get thank you message element
var thankYouMessage = document.getElementById("thankYouMessage");

document.getElementById('webstart').addEventListener("submit", async function (e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var mobile = getElementVal("mobile");
  var classoptions = getElementVal("class-options");
  var sectionoptions = getElementVal("section-options");
  var termsCheckbox = document.getElementById("termsCheckbox").checked;

  // Clear previous error messages and styles
  document.querySelectorAll(".error-message").forEach(element => {
    element.textContent = "";
  });
  
  document.querySelectorAll(".input-error").forEach(element => {
    element.classList.remove("input-error");
  });

  var isValid = true;

  // Form validation
  if (!name) {
    document.getElementById("name").classList.add("input-error");
    document.getElementById("NameError").textContent = "Name is required.";
    isValid = false;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    document.getElementById("email").classList.add("input-error");
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  var mobilePattern = /^\d{10}$/; // 10-digit mobile number pattern
  if (!mobile || !mobilePattern.test(mobile)) {
    document.getElementById("mobile").classList.add("input-error");
    document.getElementById("mobileError").textContent = "Please enter a valid 10-digit mobile number.";
    isValid = false;
  }

  if (!classoptions) {
    document.getElementById("class-options").classList.add("input-error");
    isValid = false;
  }

  if (!sectionoptions) {
    document.getElementById("section-options").classList.add("input-error");
    isValid = false;
  }

  if (!termsCheckbox) {
    document.getElementById("termsCheckbox").classList.add("input-error");
    document.getElementById("termsError").textContent = "Please agree to the Terms and Conditions.";
    isValid = false;
  }

  if (!isValid) {
    return; // Stop form submission if there are validation errors
  }

  try {
    // Save data to Firebase
    await saveMessages(name, email, mobile, classoptions, sectionoptions);

    // Show thank you modal
    thankYouMessage.innerHTML = `
      Thank you for registering!<br>
      Join our WhatsApp group for more updates: <a href="#" target="_blank">Join WhatsApp Group</a>
    `;
    modal.style.display = "block";

  } catch (error) {
    console.error("Error registering: ", error);
    alert("Error registering. Please try again.");
  }
});

// Function to save messages to Firebase
const saveMessages = (name, email, mobile, classoptions, sectionoptions) => {
  var newWebstart = webstartDB.push();

  newWebstart.set({
    name: name,
    email: email,
    number: mobile,
    class: classoptions,
    section: sectionoptions
  });
};

// Function to get form values by element ID
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Close the thank you modal when the close button is clicked
span.onclick = function () {
  modal.style.display = "none";
}

// Close the thank you modal when the user clicks outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var termsModal = document.getElementById("termsModal");

// Get the link to open the terms modal
var openTermsModal = document.getElementById("openTermsModal");

// When the user clicks on the link, open the terms modal
openTermsModal.onclick = function () {
  termsModal.style.display = "block";
}

// Close the terms modal when the close button is clicked
var termsClose = document.querySelectorAll("#termsModal .close")[0];
termsClose.onclick = function () {
  termsModal.style.display = "none";
}

// Close the terms modal when the user clicks outside of it
window.onclick = function (event) {
  if (event.target == termsModal) {
    termsModal.style.display = "none";
  }
}
