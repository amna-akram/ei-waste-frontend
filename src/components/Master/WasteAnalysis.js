// src/components/QualityAndWasteAnalysis.js

import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Mock Data for Quality and Waste Analysis
const qualityData = [
    { date: '2024-01-01', product: 'hope', department: 'cooking', totalOutput: 100, rejectedBatches: 5 },
    { date: '2024-01-02', product: 'hope', department: 'packaging', totalOutput: 120, rejectedBatches: 8 },
    { date: '2024-01-03', product: 'faith', department: 'cooking', totalOutput: 150, rejectedBatches: 4 },
    { date: '2024-01-04', product: 'faith', department: 'packaging', totalOutput: 130, rejectedBatches: 7 },
    { date: '2024-01-05', product: 'hope', department: 'cooking', totalOutput: 110, rejectedBatches: 6 },
];

// Mock Data for Leading Reasons for Rejection with Departments
const rejectionReasonsData = [
    { reason: 'Contamination', count: 15, department: 'cooking' },
    { reason: 'Size Variation', count: 10, department: 'packaging' },
    { reason: 'Packaging Defect', count: 8, department: 'packaging' },
    { reason: 'Labeling Error', count: 5, department: 'cooking' },
    { reason: 'Moisture Content', count: 7, department: 'cooking' },
];

const COLORS = ['#FF8042', '#FFBB28', '#0088FE', '#00C49F', '#FF6361'];

const QualityAndWasteAnalysis = () => {
    const [selectedProduct, setSelectedProduct] = useState('Overall');
    const [selectedDepartment, setSelectedDepartment] = useState('Overall');
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-05'));

    // Filtered quality data based on selected filters
    const filteredQualityData = useMemo(() => {
        return qualityData
            .filter((entry) =>
                (selectedProduct === 'Overall' || entry.product === selectedProduct) &&
                (selectedDepartment === 'Overall' || entry.department === selectedDepartment) &&
                new Date(entry.date) >= startDate &&
                new Date(entry.date) <= endDate
            )
            .map((entry) => ({
                ...entry,
                rejectionRate: ((entry.rejectedBatches / entry.totalOutput) * 100).toFixed(2), // Rejection rate as percentage
            }));
    }, [selectedProduct, selectedDepartment, startDate, endDate]);

    // Filter rejection reasons data based on selected department
    const filteredRejectionReasonsData = useMemo(() => {
        return rejectionReasonsData.filter(
            (entry) => selectedDepartment === 'Overall' || entry.department === selectedDepartment
        );
    }, [selectedDepartment]);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Quality and Waste Analysis
            </Typography>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                {/* Date Range Filter */}
                <Box>
                    <Typography variant="subtitle1">Select Date Range</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </Box>
                </Box>

                {/* Product Filter */}
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Select Product</InputLabel>
                    <Select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        label="Select Product"
                    >
                        <MenuItem value="Overall">Overall</MenuItem>
                        <MenuItem value="hope">Hope</MenuItem>
                        <MenuItem value="faith">Faith</MenuItem>
                    </Select>
                </FormControl>

                {/* Department Filter */}
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Select Department</InputLabel>
                    <Select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        label="Select Department"
                    >
                        <MenuItem value="Overall">Overall</MenuItem>
                        <MenuItem value="cooking">Cooking</MenuItem>
                        <MenuItem value="packaging">Packaging</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Batches Rejection Rate Chart */}
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Batches Rejection Rate (%)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredQualityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rejectionRate" fill="#FF8042" name="Rejection Rate (%)" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>

            {/* Leading Reasons for Rejection */}
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Leading Reasons for Rejection</Typography>
                <ResponsiveContainer width="100%" height={400}> {/* Increased height for larger pie chart */}
                    <PieChart>
                        <Pie
                            data={filteredRejectionReasonsData}
                            dataKey="count"
                            nameKey="reason"
                            cx="50%"
                            cy="50%"
                            outerRadius={150} // Increased radius for larger pie
                            label
                        >
                            {filteredRejectionReasonsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default QualityAndWasteAnalysis;
