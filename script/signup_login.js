//validate email
const validate_email = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

//validate password
const validate_password = (password) => {
  const re = /^[a-zA-Z0-9]{0,9}$/;
  return re.test(String(password).toLowerCase());
};

//check if key exists
const checkIfLocalstorageKeyExists = (key) => {
  return localStorage.getItem(key) !== null;
};

//check if user exists
const checkIfUserExists = (username) => {
  if (checkIfLocalstorageKeyExists("registered_users")) {
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

const signup = () => {
  const username_input = document.getElementById("username_input").value;
  const password_input = document.getElementById("password_input").value;
  const firstname_input = document.getElementById("email_input").value;
  const surname_input = document.getElementById("surname_input").value;
  const email_input = document.getElementById("username_input").value;
  const birthdate_input = document.getElementById("birthdate_input").value;
  const profileimg_input = document.getElementById("profileimg_input").value;
  const terms = document.getElementById("terms").checked;
  const output_signup = document.getElementById("output_signup");

  //Validate: password, email

  //terms
  if (!terms) {
    output_signup.innerHTML = "Terms and conditions need to be accepted";
    return;
  }

  if (checkIfUserExists(username_input)) {
    output_signup.innerHTML = "The username already exists.";
    return;
  }

  const new_user = {
    username: username_input,
    password: password_input,
    firstname: firstname_input,
    surname: surname_input,
    email: email_input,
    birthdate: birthdate_input,
    profileimg: profileimg_input,
  };

  //Add user to local storage
  if (checkIfLocalstorageKeyExists("registered_users")) {
    const registered_users = JSON.parse(
      localStorage.getItem("registered_users")
    );
    registered_users.push(new_user);
    localStorage.setItem("registered_users", JSON.stringify(registered_users));
  } else {
    localStorage.setItem("registered_users", JSON.stringify([new_user]));
  }

  //fix header, clear form and close modal
};

const login = () => {
  //get user input
  const username_input = document.getElementById("username_login").value;
  const password_input = document.getElementById("password_login").value;
  const output_login = document.getElementById("output_login");

  //check if user exists
  if (!checkIfUserExists(username_input)) {
    output_signup.innerHTML = "No user with that username exist";
    return;
  }

  //get userdata with matching username
  const registered_users = JSON.parse(localStorage.getItem("registered_users"));
  const user = registered_users.filter((registered_user) => {
    if (registered_user.username === username_input) {
      return registered_user;
    }
  });

  //check if password is correct
  if (user[0].password == password_input) {
    localStorage.setItem("current_user", username_input);
    output_login.innerHTML = "Logged in";
  } else {
    output_login.innerHTML = "Wrong password";
  }

  //update header, hide modal
};

const logout = () => {
  //confirm
  //update localstorage
  //update header
};
