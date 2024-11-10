// src/components/Report.js

import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const Report = ({ userRole, department }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    // Conditionally import components based on userRole
    const components = userRole === "manager"
        ? {
            EfficiencyAnalysis: require('../components/Manager/EfficiencyAnalysis').default,
            UtilizationAnalysis: require('../components/Manager/UtilizationAnalysis').default,
            QualityAndWasteAnalysis: require('../components/Manager/WasteAnalysis').default,
        }
        : {
            EfficiencyAnalysis: require('../components/Master/EfficiencyAnalysis').default,
            UtilizationAnalysis: require('../components/Master/UtilizationAnalysis').default,
            QualityAndWasteAnalysis: require('../components/Master/WasteAnalysis').default,
        };

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <components.EfficiencyAnalysis department={department} />;
            case 1:
                return <components.UtilizationAnalysis department={department} />;
            case 2:
                return <components.QualityAndWasteAnalysis department={department} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Tabs */}
            <Tabs
                value={selectedTab}
                onChange={handleChange}
                centered
                sx={{
                    '& .MuiTab-root': {
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        transition: 'color 0.3s ease',
                    },
                    '& .MuiTab-root:hover': {
                        color: '#1976d2',
                    },
                    '& .Mui-selected': {
                        color: '#1976d2',
                    },
                }}
            >
                <Tab label="Efficiency Analysis" />
                <Tab label="Utilization Analysis" />
                <Tab label="Waste Analysis" />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
                {renderTabContent()}
            </Box>
        </Box>
    );
};

export default Report;
