const message = document.getElementById("message");
const uploadBtn = document.getElementById('uploadBtn')
const toggleOpen = document.getElementById('toggleOpen')
const toggleClose = document.getElementById('toggleClose')
const profilePanel = document.getElementById('profilePanel')
const navBar = document.getElementById('navBar')

// alert('hi')


function alter_components(id, component, action) {

  // const component_id = id

  // alert('question_id')
  // throw new Error()

  if (id == null || id ==undefined || id == '' || component == '' || action == '') {
    message.hidden = false
    message.classList.add("error-message");
    message.innerHTML = 'something went wrong, try again'

    setTimeout(() => {
      message.hidden = true
      message.classList.remove("error-message");
    }, 3000);
    throw Error('something went wrong, try again')

  }

  // throw new Error()


  formData = {
    id,
    component,
    action
  }


  fetch("/admin/alter_components", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // alert(data.success)
       
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");
        
       
        setInterval(() => {


          if (component == 'user') {
            if (data.is_deleted) {
              window.location.href = `/admin/users`
              
            }else{

              message.classList.remove("success-message");
              window.location.reload()
            }
            
          }
          if (component == 'product') {
            if (data.is_deleted) {
              window.location.href = `/admin/products`
              
            }else{

              message.classList.remove("success-message");
              window.location.reload()
            }
            
          }
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
    })
    .catch((err) => {});

}



function manage_cart(product_id, this_customer_id, action) {

  let quantity;
  if (action == 'add') quantity = document.getElementById(product_id).value
console.log('quantity',quantity);
console.log('pppppppppp',product_id);
console.log('ccccccccccccccc',this_customer_id);
console.log(action);

  // alert('question_id')
  // throw new Error()

  if (
    product_id == null || product_id ==undefined || product_id == '' || 
    this_customer_id == null || this_customer_id ==undefined || this_customer_id == '' || 
    action == '') 
    {
    message.hidden = false
    message.classList.add("error-message");
    message.innerHTML = 'something went wrong, try again'

    setTimeout(() => {
      message.hidden = true
      message.classList.remove("error-message");
    }, 3000);
    throw Error('something went wrong, try again')

  }


  if (action == 'add'){

    if (!quantity || quantity < 0) 
      {
      message.hidden = false
      message.classList.add("error-message");
      message.innerHTML = 'please enter product quantity'
  
      setTimeout(() => {
        message.hidden = true
        message.classList.remove("error-message");
      }, 3000);
      throw Error('please enter product quantity')
  
    }
  }

  // throw new Error()


  formData = {
    quantity,
product_id,
this_customer_id,
action,
  }


  fetch("/account/manage_cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // alert(data.success)
       
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");
        
       
        setInterval(() => {
              window.location.reload()
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
    })
    .catch((err) => {

       message.hidden = false;
        message.innerHTML = err;

        message.classList.add("error-message");

        setTimeout(() => {
          message.classList.remove("error-message");
          message.hidden = true;
        }, 3000);
    });

}


function sort_table(component) {
  let parameter = document.getElementById('parameter');

  let sort_value = parameter.value

  if (component == 'user') {
    setInterval(() => {
       window.location.href = `users?q=${sort_value}`
    }, 2000);
    
  }
}


 








