const appNotify = {
    el: document.getElementById('formToast'),
    iconBg: document.getElementById('toastIconBg'),
    icon: document.getElementById('toastIcon'),
    title: document.getElementById('toastTitle'),
    message: document.getElementById('toastMessage'),

    success: function (msg) {
        this.show(msg, "#10b981", "fa-check-circle", "Success");
    },

    error: function (msg) {
        this.show(msg, "#ef4444", "fa-exclamation-circle", "Error Detected");
    },

    show: function (msg, color, iconClass, titleText) {
        this.message.innerText = msg;
        this.title.innerText = titleText;
        this.iconBg.style.backgroundColor = color;
        this.el.querySelector('.border-l-4').style.borderColor = color;
        this.icon.className = `fas ${iconClass} text-white`;

        this.el.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => this.hide(), 5000);
    },

    hide: function () {
        this.el.classList.add('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.remove('translate-y-0', 'opacity-100');
    }
};

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submit_btn = document.getElementById('submit_btn');
    
    // 1. Gather input field parameters cleanly
    const first_name = form.first_name.value.trim();
    const last_name = form.last_name.value.trim();
    const email = form.email.value.toLowerCase().trim();
    const password = form.password.value.trim();

    // 2. Pattern Regex Configurations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^.{5,}$/; // Minimum 5 characters long

    // 3. Validation Guard Clauses
    if (!first_name) {
        appNotify.error("First name cannot be empty");
        return;
    }

    if (!last_name) {
        appNotify.error("Last name cannot be empty");
        return;
    }

    if (!emailRegex.test(email)) {
        appNotify.error("Enter a valid email address");
        return;
    }

    if (!passRegex.test(password)) {
        appNotify.error("Password must be at least 5 characters long");
        return;
    }

    // 4. Construct Data Payload
    const formData = {
        first_name,
        last_name,
        email,
        password,
    };

    // 5. IMMEDIATE UI LOCK: Trigger state updates BEFORE fetch starts
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-2 tracking-widest">Processing...</span>';
    submit_btn.disabled = true;
    
    try {
        // 6. Execute Network Request Pipeline
        const response = await fetch("/auth/registration", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // 7. HANDLE SUCCESS LIFECYCLE
        if (data.success) {
            
            // Hold user briefly on screen before routing to authentication portal
            setTimeout(() => {
                appNotify.success("Account registration successfully!");
            }, 3000);

            setTimeout(() => {
                window.location.href = '/login';
            }, 6000);
            return;
        }

        // 8. HANDLE APPLICATION SEMANTIC ERRORS (e.g., Email already exists)
        if (data.error) {

            setTimeout(() => {
                
                appNotify.error(data.error);
                
                // Re-enable interactive system buttons for input correction
                submit_btn.innerHTML = `Register <i class="fa-solid fa-arrow-right text-xs ml-1.5"></i>`;
                submit_btn.disabled = false;
            }, 3000);
        }

    } catch (networkError) {
        // 9. COLD CATCH PIPELINE DISRUPTIONS (Server offline, no gateway access)
        // console.error("Infrastructure route failure:", networkError);

        setTimeout(() => {
            
            appNotify.error("Network connection failure. Unable to reach application server.");
            
            submit_btn.innerHTML = `Register <i class="fa-solid fa-arrow-right text-xs ml-1.5"></i>`;
            submit_btn.disabled = false;
        }, 3000);
    }
});