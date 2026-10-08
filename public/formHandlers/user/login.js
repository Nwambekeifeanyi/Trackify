const appNotify = {
    el: document.getElementById('formToast'),
    iconBg: document.getElementById('toastIconBg'),
    icon: document.getElementById('toastIcon'),
    title: document.getElementById('toastTitle'),
    message: document.getElementById('toastMessage'),

    success: function(msg) {
        this.show(msg, "#10b981", "fa-check-circle", "Success");
    },

    error: function(msg) {
        this.show(msg, "#ef4444", "fa-exclamation-circle", "Error Detected");
    },

    info: function(msg) {
        this.show(msg, "#3b82f6", "fa-info-circle", "Requirement");
    },

    show: function(msg, color, iconClass, titleText) {
        this.message.innerText = msg;
        this.title.innerText = titleText;
        this.iconBg.style.backgroundColor = color;
        this.el.querySelector('.border-l-4').style.borderColor = color;
        this.icon.className = `fas ${iconClass} text-white`;

        this.el.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => this.hide(), 5000);
    },

    hide: function() {
        this.el.classList.add('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.remove('translate-y-0', 'opacity-100');
    }
};

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submit_btn = document.getElementById('submit_btn');

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Regular Expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;
    
    // 1. Validation Guard Clauses
    if (!emailRegex.test(email)) {
        appNotify.error("Please enter a valid email address");
        return;
    }

    if (!passRegex.test(password)) {
        appNotify.error("Password does not meet system security requirements");
        return;
    }

    const formData = { email, password };

    // 2. Immediate UI Lock
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-2 tracking-widest">Authorizing...</span>';
    submit_btn.disabled = true; // ✅ FIXED: Patched DOM layout property target mapping

    try {
        // 3. Network Request Pipeline
        const response = await fetch("/auth/user-login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // 4. Handle Success Lifecycle
        if (data.success) {
            appNotify.success(data.message || "Authentication verified. Access granted.");

            setTimeout(() => {
                window.location.href = '/account/dashboard';
            }, 2000);
            return;
        }

        // 5. Handle Logical/Validation Pipeline Rejections
        if (data.error) {

            setTimeout(() => {
                
                appNotify.error(data.error);
                
                submit_btn.innerHTML = `Login <i class="fa-solid fa-arrow-right-to-bracket ml-1.5"></i>`;
                submit_btn.disabled = false;
            }, 3000);
        }

    } catch (networkError) {
        console.error("Infrastructure authentication failure:", networkError);


        setTimeout(() => {
            
            appNotify.error("Network connection failure. Unable to reach application router node.");
            
            submit_btn.innerHTML = `<span>Login <i class="fa-solid fa-arrow-right-to-bracket ml-1.5"></i></span>
                <i class="fas fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform ml-2"></i>`;
            submit_btn.disabled = false;
        }, 3000);
    }
});