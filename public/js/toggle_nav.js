document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("mobile-close-btn");
    const sidebar = document.getElementById("sidebar-container");
    const overlay = document.getElementById("sidebar-overlay");

    function toggleSidebar() {
        sidebar.classList.toggle("-translate-x-full");
        overlay.classList.toggle("hidden");
    }

    // Event listeners capturing actions
    menuBtn.addEventListener("click", toggleSidebar);
    closeBtn.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
});