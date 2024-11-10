// src/menuItems.js

export const menuItemsByRole = {
    manager: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Reports", path: "/reports" },
    ],
    employee: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Tasks", path: "/tasks" },
    ],
    supervisor: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Reports", path: "/reports" },
    ],
};

export const API_ENDPOINT = "https://ei-waste-api.onrender.com/"
