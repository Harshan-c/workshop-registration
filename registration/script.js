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

  //initilize firebase
  firebase.initializeApp(firebaseConfig);

  //reference your database
  var webstartDB = firebase.database().ref('webstart-learn');

  document.getElementById('webstart').addEventListener("submit", submitform);

  function submitform(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var email = getElementVal("email");
    var mobile = getElementVal("mobile");
    var classoptions = getElementVal("class-options");
    
    saveMessages(name, email, mobile, classoptions);

    //enable alert
     document.querySelector(".alert").Style.display= "block";
  }

  const saveMessages = (name, email, mobile, classoptions) => {
    var newWebstart = webstartDB.push();

    newWebstart.set({
        name: name,
        email: email,
        number: mobile,
        class: classoptions,
    });
  };

  const getElementVal = (id) => {
    return document.getElementById(id).value;

  };