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

    info: function (msg) {
        this.show(msg, "#3b82f6", "fa-info-circle", "Requirement");
    },

    show: function (msg, color, iconClass, titleText) {
        // Configure styles
        this.message.innerText = msg;
        this.title.innerText = titleText;
        this.iconBg.style.backgroundColor = color;
        this.el.querySelector('.border-l-4').style.borderColor = color;
        this.icon.className = `fas ${iconClass} text-white`;

        // Animation: Slide Down & Fade In
        this.el.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.add('translate-y-0', 'opacity-100');

        // Auto-hide after 5 seconds
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

   
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // 2. Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/; // Basic international phone validation

   

    

    if (!emailRegex.test(email)) {
        appNotify.error("Enter a valid email address");
        return;
    }

   

    if (password.length < 6) {
        appNotify.error("Enter a valid password");
        return;
    }



    // 4. Prepare Data
    const formData = {
        email,
        password,
    };

    // 5. UI Loading State
    // Using your brand colors and spinner
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-2">Authorizing......</span>';
    submit_btn.disabled = true;

    // throw new Error()
    try {
        const response = await fetch("/auth/seller-login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
            // Show the "OPay style" success loader

            setTimeout(() => {
                // appLoader.success("Welcome to the Harvest!");
                appNotify.success("Welcome back! Login successful.");
            }, 1500);

            // Redirect to dashboard or onboarding
            setTimeout(() => {
                window.location.href = '/seller/dashboard';
            }, 5000);

        } else {
            throw new Error(data.error || "Registration failed");
        }

    } catch (err) {
        // Handle Error
        setTimeout(() => {
            submit_btn.innerHTML = `Login`;
            appNotify.error(err.message);
            submit_btn.disabled = false;
            // Re-init lucide icons if button content changed
            lucide.createIcons();
        }, 1000);
    }
});