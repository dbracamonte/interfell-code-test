// Lightbox
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Highlight
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});

(function() {
  // Initialize Firebase
  const config = {
    apiKey: "....",                                 // Auth / General Use
    authDomain: "YOUR_APP.firebaseapp.com",         // Auth with popup/redirect
    databaseURL: "https://YOUR_APP.firebaseio.com", // Realtime Database
    storageBucket: "YOUR_APP.appspot.com",          // Storage
    messagingSenderId: "123456789"                  // Cloud Messaging
  };
  firebase.initializeApp(config);
  
  // Login form elements
  const txtEmail = document.getElementById('inputEmail');
  const txtPassword = document.getElementById('inputPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnNavLogin = document.getElementById('btnNavLogin');

  btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise
      .then($('#loginModal').modal('hide'))
      .then(e => iziToast.info({
        icon: false,
        message: `Bienvenido ${email}`
      }))
      .catch(e => iziToast.warning({
        icon: false,
        message: `${e.message}`
      }))
  })

  btnSignUp.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then($('#loginModal').modal('hide'))
      .then(e => iziToast.info({
        icon: false,
        message: `Bienvenido ${email}`
      }))
      .catch(e => iziToast.warning({
        icon: false,
        message: `${e.message}`
      }))
  })

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  })

  // RealTime listener
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      btnNavLogin.classList.add('d-none');
      btnLogout.classList.remove('d-none');
      // User is signed in.
      const displayName = user.displayName;
      const photoURL = user.photoURL;
    } else {
      btnNavLogin.classList.remove('d-none');
      btnLogout.classList.add('d-none');
    }
  });

}());
