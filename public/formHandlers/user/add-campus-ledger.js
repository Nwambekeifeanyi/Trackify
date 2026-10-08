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

    // 1. Gather Campus Input Parameters Cleanly
    const source = form.payment.value.trim(); 
    const amount = parseFloat(form.amount.value);
    const session = form.session.value; // ✅ FIXED: Correctly tracking the session drop-down selection
    const status = form.status.value;
    const date = form.date.value;
    const description = form.description.value.trim();

    // 2. Validation Guard Clauses
    if (!source) {
        appNotify.error("Please provide valid payment type.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        appNotify.error("Invoice sum must be a positive numeric value greater than zero.");
        return;
    }

    if (!session || session === "") {
        appNotify.error("Please select a target academic session calendar.");
        return;
    }

    if (!status || status==='') {
        appNotify.error("Please pick a tracking state status (Pending/Cleared).");
        return;
    }

    if (!date) {
        appNotify.error("A valid billing or record entry date is required.");
        return;
    }

    // 3. Construct Campus Payload Data
    const formData = {
        source,
        amount,
        session, // ✅ FIXED: Injected target session instead of the old category field
        status,
        date,
        description
    };

    // 4. IMMEDIATE UI LOCK: Toggle loader states
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-1.5">Committing Bill...</span>';
    submit_btn.disabled = true;

    try {
        // 5. Execute Network Request Pipeline
        const response = await fetch("/account/add-campus-ledger", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // 6. Handle Success Lifecycle
        if (data.success) {
            appNotify.success(data.message || "Campus billing record successfully appended to ledger.");

            // Short timeout delay to confirm visual toast acknowledgement before routing
            setTimeout(() => {
                window.location.href = '/account/campus-ledger';
            }, 3000);
            return;
        }

        // 7. Handle Logical / Validation Pipeline Rejections
        if (data.error) {
            setTimeout(() => {
                appNotify.error(data.error);
                
                // Re-enable and match original markup structure
                submit_btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Commit Bill';
                submit_btn.disabled = false;
            }, 3000);
        }

    } catch (networkError) {
        console.error("Infrastructure campus logging route failure:", networkError);

        setTimeout(() => {
            appNotify.error("Connection lost. Please check your internet.");
            
            submit_btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Commit Bill';
            submit_btn.disabled = false;
        }, 3000);
    }
});