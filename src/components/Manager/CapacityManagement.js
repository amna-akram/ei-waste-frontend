import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

// Dummy batch data
const dummyBatches = [
    { id: 1, status: 'in-progress', batch_weight: 20 },
    { id: 2, status: 'completed', batch_weight: 15 },
    { id: 3, status: 'in-progress', batch_weight: 30 },
    { id: 4, status: 'rejected', batch_weight: 10 },
    { id: 5, status: 'in-progress', batch_weight: 25 }
];

// Capacity data for each department
const capacities = {
    packaging: { currentCapacity: 120, totalCapacity: 200 },
    storage: { currentCapacity: 150, totalCapacity: 250 },
    cooking: { currentCapacity: 100, totalCapacity: 180 }  // Changed 'production' to 'cooking'
};

const CapacityManagement = ({ department }) => {
    const [currentCapacity, setCurrentCapacity] = useState(capacities[department]?.currentCapacity || 0);
    const totalCapacity = capacities[department]?.totalCapacity || 0;

    const handleAutomationScript = () => {
        const inProgressBatches = dummyBatches.filter(batch => batch.status === 'in-progress');
        const totalInProgressWeight = inProgressBatches.reduce((sum, batch) => sum + batch.batch_weight, 0);
        const newCurrentCapacity = currentCapacity - totalInProgressWeight;

        // Store in localStorage and update state
        localStorage.setItem(`${department}AutomationStarted`, 'true');
        localStorage.setItem(`${department}CurrentCapacity`, newCurrentCapacity);
        setCurrentCapacity(newCurrentCapacity);

        console.log(`Automation started in ${department}. New Current Capacity: ${newCurrentCapacity}`);
        alert(`Automation started. New Current Capacity for ${department} after processing in-progress batches: ${newCurrentCapacity}`);
    };

    useEffect(() => {
        // Load saved capacity from localStorage if available
        const savedCurrentCapacity = parseInt(localStorage.getItem(`${department}CurrentCapacity`), 10);
        if (!isNaN(savedCurrentCapacity)) {
            setCurrentCapacity(savedCurrentCapacity);
        }

        // Handle storage events for capacity updates from other tabs
        const handleStorageChange = (event) => {
            if (event.key === 'packagingCurrentCapacity' && department === 'storage') {
                const packagingCurrentCapacity = parseInt(event.newValue, 10);
                console.log(`Received storage event in ${department}: Packaging current capacity is now ${packagingCurrentCapacity}`);
                
                if (!isNaN(packagingCurrentCapacity)) {
                    alert(`Packaging has ${packagingCurrentCapacity} current capacity left.`);
                    
                    if (currentCapacity < packagingCurrentCapacity) {
                        alert(`Storage has less capacity than packaging. You have ${packagingCurrentCapacity - currentCapacity} less capacity, consider not storing more.`);
                    }
                }
            }
        };

        // Listen for storage events
        window.addEventListener('storage', handleStorageChange);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [department, currentCapacity]);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Capacity Management for {department}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Current Capacity: {currentCapacity}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Total Capacity: {totalCapacity}
            </Typography>
            <Typography variant="body1" paragraph>
                Here you can monitor and manage the capacity levels for the {department} department.
            </Typography>

            {department === 'packaging' && (
                <Button variant="contained" color="primary" onClick={handleAutomationScript}>
                    Start Automating Script
                </Button>
            )}
        </Box>
    );
};

export default CapacityManagement;
