const form = document.getElementById("form");
// const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
  let full_name = form.full_name.value;
  let email = form.email.value.toLowerCase();
  let contact = form.contact.value;
  let gender = form.gender.value;
  let role = form.role.value;
  let id = form.id.value;
  let action = form.action.value;

  // =================== Regex definition ======================
  const nameRegex = /^[a-zA-Z0-9]+(?:[-_'(),\s][a-zA-Z0-9]+)*$/;
  const usernameRegex = /^[a-zA-Z0-9'-]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;

  let contactRegex = /^(070|080|081|090|091)\d{8}$/;

  let x = "1121b";
  let y = x.slice(0, 3);
  // console.log(y); // Output: "112"

  // alert(action)
  
  // throw Error();

  if (!full_name) {
    message.hidden = false;
    message.innerHTML = "enter the user's fullname";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter the user's fullname");
  }

  if (!emailRegex.test(email)) {
    message.hidden = false;
    message.innerHTML = "enter a valid email address";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid email address");
  }

  if (!contactRegex.test(contact)) {
    message.hidden = false;
    message.innerHTML = "enter a valid contact";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid contact");
  }
  if (!gender) {
    message.hidden = false;
    message.innerHTML = "select the user's gender";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("select the user's gender");
  }


  if (action == 'add') {
    
    if (!role) {
      message.hidden = false;
      message.innerHTML = "select the user's role";
      message.classList.add("error-message");
  
      setTimeout(() => {
        message.classList.remove("error-message");
        message.hidden = true;
      }, 3000);
      throw Error("select the user's role");
    }
  }




  if (action == 'update') {
      if (id == null || id ==undefined || id == '' ) {
    message.hidden = false
    message.classList.add("error-message");
    message.innerHTML = 'something went wrong, try again'

    setTimeout(() => {
      message.hidden = true
      message.classList.remove("error-message");
    }, 3000);
    throw Error('something went wrong, try again')

  }

  }
  // const formData = new FormData(form)
  const formData = {
    full_name,
    email,
    contact,
    gender,
    role,
    id,
    action,
  };

  console.log(formData);

  // throw Error();

  fetch("/admin/add_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");

          setTimeout(() => {
            window.location.href = `users`;
          }, 3000);
        }

      if (data.error) {
        message.hidden = false;
        message.innerHTML = data.error;

        message.classList.add("error-message");

        setTimeout(() => {
          message.classList.remove("error-message");
          message.hidden = true;
        }, 3000);
      }

      setTimeout(() => {
        message.hidden = true;
        message.innerHTML = "";
        // message.style.backgroundColor ='white'
      }, 3000);
    });
});
