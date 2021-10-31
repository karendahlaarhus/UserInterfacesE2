const navbar_signedout = document.getElementById("navbar_signedout");
const navbar_signedin = document.getElementById("navbar_signedin");
const navbar_username = document.getElementById("username_field");
const changeButton = document.getElementById("change_button");
const profile_popup = document.getElementById("profile_popup");
const change_popup = document.getElementById("change_popup");



//validate password
const validate_password = (password) => {
  const re = /^[a-zA-Z0-9]{0,9}$/;
  return re.test(String(password).toLowerCase());
};

//check if user key exists in localstorage
const check_if_localstorage_exists = (key) => {
  return localStorage.getItem(key) !== null;
};

//check if username exists
const check_if_username_exists = (username) => {
  if (check_if_localstorage_exists("registered_users")) {
    const registered_users = JSON.parse(
      localStorage.getItem("registered_users")
    );
    for (i in registered_users) {
      if (registered_users[i].username === username) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
};

//check if email is in use
const check_if_email_exists = (email) => {
  if (check_if_localstorage_exists("registered_users")) {
    const registered_users = JSON.parse(
      localStorage.getItem("registered_users")
    );
    for (i in registered_users) {
      if (registered_users[i].email === email) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
};

const fillUserProfile = (user) => {
  const uname = document.getElementById("user_username");
  const name = document.getElementById("user_name");
  const email = document.getElementById("user_email");
  const birthday = document.getElementById("user_birthday");
  const profileImage = document.getElementById("profile_image");

  uname.value = user.username;
  name.value = user.firstname + " " + user.surname;
  email.value = user.email;
  birthday.value = user.birthdate;
  profileImage.value = user.profileimg;
};



const signup = () => {
  //get all input data from user
  const username_input = document.getElementById("username_input").value;
  const password_input = document.getElementById("password_input").value;
  const firstname_input = document.getElementById("firstname_input").value;
  const surname_input = document.getElementById("surname_input").value;
  const email_input = document.getElementById("email_input").value;
  const birthdate_input = document.getElementById("birthdate_input").value;
  const profileimg_input = document.getElementById("profileimg_input").value;
  const terms = document.getElementById("terms").checked;
  const output_signup = document.getElementById("output_signup");

  //Validate password
  if (!validate_password(password_input)) {
    output_signup.innerHTML = "Password can only contain letters and numbers";
    return;
  }

  //Check if user has agreed to terms
  if (!terms) {
    output_signup.innerHTML = "Terms and conditions need to be accepted";
    return;
  }

  //Check if username has been used previously
  if (check_if_username_exists(username_input)) {
    output_signup.innerHTML = "This username is already in use.";
    return;
  }

  //Check that required fields are not empty
  if (
    username_input == "" ||
    password_input == "" ||
    firstname_input == "" ||
    surname_input == "" ||
    birthdate_input == ""
  ) {
    output_signup.innerHTML = "None of the required fields can be left empty.";
    return;
  }
  //Check if e-mail has been used previously
  if (check_if_email_exists(email_input)) {
    output_signup.innerHTML = "This e-mail is already in use.";
    return;
  }

  //If all validators are passed, create new user
  const new_user = {
    username: username_input,
    password: password_input,
    firstname: firstname_input,
    surname: surname_input,
    email: email_input,
    birthdate: birthdate_input,
    profileimg: profileimg_input,
  };

  //Checks if localstorage contains a list of registered users, if so adds new user to list and set the list in localstorage again.
  //If not, create list with the first user.
  if (check_if_localstorage_exists("registered_users")) {
    const registered_users = JSON.parse(
      localStorage.getItem("registered_users")
    );
    registered_users.push(new_user);
    localStorage.setItem("registered_users", JSON.stringify(registered_users));
  } else {
    localStorage.setItem("registered_users", JSON.stringify([new_user]));
  }

  //Changes header based on logged in state
  navbar_signedout.style.display = "none";
  navbar_signedin.style.display = "block";
  navbar_username.innerHTML = username_input;
  togglePopup("signup_popup");
  fillUserProfile(new_user);
  clear_signup();
};

const login = () => {
  //Get user input
  const username_input = document.getElementById("username_login").value;
  const password_input = document.getElementById("password_login").value;
  const output_login = document.getElementById("output_login");

  //Check if user exists
  if (!check_if_username_exists(username_input)) {
    output_login.innerHTML = "No user with that username exist";
    return;
  }

  //Get userdata with matching username
  const registered_users = JSON.parse(localStorage.getItem("registered_users"));
  const user = registered_users.filter((registered_user) => {
    if (registered_user.username === username_input) {
      return registered_user;
    }
  });

  //Check if password is correct
  if (user[0].password == password_input) {
    localStorage.setItem("current_user", username_input);
  } else {
    output_login.innerHTML = "Wrong password";
  }

  //reset header style
  navbar_signedout.style.display = "none";
  navbar_signedin.style.display = "block";
  navbar_username.innerHTML = user[0].username;

  //close popup
  togglePopup("login_popup");

  //fill user profile fields
  fillUserProfile(user[0]);

  //clear fields
  clear_login();
};

const logout = () => {
  if (confirm("You sure you want to log out?")) {
    //set currentuser to empty string
    localStorage.setItem("current_user", "");

    //reset header style
    navbar_signedout.style.display = "block";
    navbar_signedin.style.display = "none";
  } else {
    return;
  }
};

const clear_signup = () => {
  //sett all field-values to empty strings to make form ready for next user
  document.getElementById("username_input").value = "";
  document.getElementById("password_input").value = "";
  document.getElementById("email_input").value = "";
  document.getElementById("surname_input").value = "";
  document.getElementById("firstname_input").value = "";
  document.getElementById("birthdate_input").value = "";
  document.getElementById("profileimg_input").value = "";
  document.getElementById("terms").value = "";
  document.getElementById("output_signup").value = "";
};

const clear_login = () => {
  //sett all field-values to empty strings to make form ready for next user
  document.getElementById("username_login").value = "";
  document.getElementById("password_login").value = "";
};

const saveUser = () => {
  const currentUser = localStorage.getItem('current_user');
  const username = document.getElementById("user_username").value;
  const email = document.getElementById("user_email").value;
  const birthdate = document.getElementById("user_birthday").value;
  const profileimg = document.getElementById("profile_image").value;

  const users = JSON.parse(localStorage.getItem('registered_users'));
  const userToUpdate = users.find(user => user.username === currentUser);
  navbar_username.innerHTML = username;

  if(userToUpdate) {
    const updatedUser = {
      ...userToUpdate,
      username,
      email,
      birthdate,
      profileimg
    };

    const updated = users.map(user => {
      if(user.username === userToUpdate.username) {
        return updatedUser;
      }

      return user
    });

    localStorage.setItem('registered_users', JSON.stringify(updated));
    document.getElementById('profile_popup').classList.remove('show_popup');
  }
};

changeButton.addEventListener("click", saveUser);