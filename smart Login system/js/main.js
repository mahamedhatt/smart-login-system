var loginName = document.getElementById('loginName');
var loginPassword = document.getElementById('loginPassword');

var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');

var isFormValid = false;

function isEmpty() {
  if (
    signupName.value === '' ||
    signupEmail.value === '' ||
    signupPassword.value === '' ||
    !isFormValid
  ) {
    document.getElementById('exist').innerHTML =
      '<small class="text-danger m-3">All inputs are required</small>';
  } else {
    // Check if email already exists
    if (isEmailExists(signupEmail.value)) {
      document.getElementById('exist').innerHTML =
        '<small class="text-danger m-3">Email already exists</small>';
    } else {
      // Save user data
      saveUserData();

      // Redirect to home page
      window.location.href = './home.html';

      document.getElementById('exist').innerHTML =
        '<small class="text-success m-3">Success</small>';
    }
  }
}

function validation(elem) {
  var regex = {
    signupName: /^[a-z]{3,5}$/,
    signupEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    signupPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  };
  var isValid = regex[elem.id].test(elem.value);
  console.log(regex[elem.id].test(elem.value));

  if (isValid) {
    elem.classList.add('is-valid');
    elem.classList.remove('is-invalid');
    elem.nextElementSibling.classList.replace('d-block', 'd-none');
  } else {
    elem.classList.remove('is-valid');
    elem.classList.add('is-invalid');
    elem.nextElementSibling.classList.replace('d-none', 'd-block');
  }
  isFormValid = isValid;
  return isValid;
}

// Save user data to local storage
function saveUserData() {
  var newUser = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  var signUpArray = JSON.parse(localStorage.getItem('users')) || [];
  signUpArray.push(newUser);
  localStorage.setItem('users', JSON.stringify(signUpArray));

  // Save the current user's name for welcome message
  localStorage.setItem('currentUser', signupName.value);
}

// Check if email already exists in local storage
function isEmailExists(email) {
  var users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(function (user) {
    return user.email === email;
  });
}

function isLoginEmpty() {
  return !(loginPassword.value === '' || loginEmail.value === '');
}

var username = localStorage.getItem('currentUser');
if (username) {
  document.getElementById('username').innerHTML = 'Welcome ' + username;
}

function login() {
  var loginEmail = document.getElementById('loginEmail').value;
  var loginPassword = document.getElementById('loginPassword').value;
  var existMessage = document.getElementById('exist');

  var users = JSON.parse(localStorage.getItem('users')) || [];

  var user = users.find(function (user) {
    return user.email === loginEmail && user.password === loginPassword;
  });

  if (user) {
    localStorage.setItem('currentUser', user.name);

    window.location.href = './home.html';
  } else {
    existMessage.innerHTML =
      '<small class="text-danger m-3">Invalid email or password</small>';
  }
}
