const form = document.getElementById("form");
const selectCategory = document.getElementById("selectCategory");
const formAction = document.getElementById("formAction").value;
if (formAction == 'update') {
      const priceInput = document.getElementById("priceInput");
      const updateQuantity = document.getElementById("updateQuantity");


      updateQuantity.onchange = ()=>{
            if (updateQuantity.value == 'true') {
                  priceInput.disabled = false
                  // alert(updateQuantity.value)
            }else{
                  
                  priceInput.disabled = true
                  // alert(updateQuantity.value)
            }
      }
}

// const message = document.getElementById("message");

const productCategories = [
  "electronics",
  "cosmetics boutique",
  "clothing",
  "fashion",
  "bookshop",
  "jewelry",
  "groceries",
  "wine",
  "phone accessory",
  "Health & Wellness",
  "Industrial",
  "Books",
];

for (let i = 0; i < productCategories.sort().length; i++) {
  let option = document.createElement("option");

  option.value = productCategories[i];
  option.innerHTML = productCategories[i];

  selectCategory.appendChild(option);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
  let name = form.name.value;
  let category = form.category.value;
  let quantity = form.quantity.value;
  let purchased_price = form.purchased_price.value;
  let price = form.price.value;
  let image = form.image;
  let id = form.id.value;
  let action = form.action.value;
  let update_quantity = form.update_quantity.value;

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

  if (!name) {
    message.hidden = false;
    message.innerHTML = "enter the product name";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter the product name");
  }

  if (action == 'add') {
        if (!category) {
          message.hidden = false;
          message.innerHTML = "select the product category";
          message.classList.add("error-message");
      
          setTimeout(() => {
            message.classList.remove("error-message");
            message.hidden = true;
          }, 3000);
          throw Error("select the product category");
        }
      
  }

  if (!quantity || quantity<1) {
    message.hidden = false;
    message.innerHTML = "enter a valid product quantity";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid product quantity");
  }

  if (!purchased_price || purchased_price<1) {
    message.hidden = false;
    message.innerHTML = "enter a valid product purchased price";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid product purchased price");
  }
  
  if (!price || price<1) {
    message.hidden = false;
    message.innerHTML = "enter a valid product price";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid product price");
  }
  
  

  if (action == "update") {
    if (id == null || id == undefined || id == "") {
      message.hidden = false;
      message.classList.add("error-message");
      message.innerHTML = "something went wrong, try again";

      setTimeout(() => {
        message.hidden = true;
        message.classList.remove("error-message");
      }, 3000);
      throw Error("something went wrong, try again");
    }
  }
  // const formData = new FormData(form)
 

  // throw Error();
const formData = new FormData(form);
console.log(formData);

  fetch("/admin/add_product", {
    method: "POST",

    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");

        setTimeout(() => {
          window.location.href = `/admin/products`;
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
