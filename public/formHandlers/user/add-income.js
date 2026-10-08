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
    const submit_btn = form.querySelector('button[type="submit"]');

    // 1. Gather Input Field Parameters Cleanly
    const source = form.source.value.trim();
    const amount = parseFloat(form.amount.value);
    const category = form.category.value;
    const date = form.date.value;
    const description = form.description.value.trim();

    // 2. Validation Guard Clauses
    if (!source) {
        appNotify.error("Please provide a valid source or issuing entity.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        appNotify.error("Gross transaction value must be a positive number greater than zero.");
        return;
    }

    if (category ==='') {
        appNotify.error("Please select a valid classification category pool.");
        return;
    }

    if (!date) {
        appNotify.error("A valid transactional posting date is required.");
        return;
    }

    // 3. Construct Data Payload
    const formData = {
        source,
        amount,
        category,
        date,
        description
    };

    // 4. IMMEDIATE UI LOCK: Trigger state updates BEFORE network fetch transit
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-1.5">Committing...</span>';
    submit_btn.disabled = true;

    try {
        // 5. Execute Network Request Pipeline
        const response = await fetch("/account/add-income", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // 6. Handle Success Lifecycle
        if (data.success) {
            appNotify.success(data.message || "Financial transaction successfully committed to ledger records.");

            // Hold briefly to allow toast message acknowledgment before routing back to log panel
            setTimeout(() => {
                window.location.href = '/account/income-logs';
            }, 2000);
            return;
        }

        // 7. Handle Logical / Validation Pipeline Rejections
        if (data.error) {

            setTimeout(() => {
                
                appNotify.error(data.error);
                
                // Re-enable interactive submit action button state
                submit_btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Commit Transaction';
                submit_btn.disabled = false;
            }, 3000);
        }

    } catch (networkError) {
        console.error("Infrastructure financial logging route failure:", networkError);

        setTimeout(() => {
            appNotify.error("Connection lost. Please check your internet.");
            
            submit_btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Commit Transaction';
            submit_btn.disabled = false;
            
        }, 3000);
    }
});