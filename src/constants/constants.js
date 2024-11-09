// src/menuItems.js

export const menuItemsByRole = {
    manager: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Reports", path: "/reports" },
        { name: "Team", path: "/team" },
    ],
    employee: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Tasks", path: "/tasks" },
    ],
    master: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "User Management", path: "/users" },
        { name: "Settings", path: "/settings" },
    ],
};
