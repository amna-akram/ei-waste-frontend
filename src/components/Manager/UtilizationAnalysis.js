// src/components/UtilizationAnalysis.js

import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';

const utilizationData = [
    { date: '2024-01-01', product: 'hope', employees: 50, predictedWorkload: 500, actualWorkload: 480, efficiency: 96 },
    { date: '2024-01-02', product: 'hope', employees: 48, predictedWorkload: 480, actualWorkload: 470, efficiency: 97.9 },
    { date: '2024-01-03', product: 'faith', employees: 52, predictedWorkload: 520, actualWorkload: 510, efficiency: 98.1 },
    { date: '2024-01-04', product: 'faith', employees: 49, predictedWorkload: 490, actualWorkload: 480, efficiency: 97.9 },
    { date: '2024-01-05', product: 'hope', employees: 47, predictedWorkload: 470, actualWorkload: 460, efficiency: 97.8 },
];

const UtilizationAnalysis = ({ department }) => {
    const [selectedProduct, setSelectedProduct] = useState('hope');
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-05'));

    const filteredData = useMemo(() => {
        return utilizationData
            .filter(
                (entry) =>
                    entry.product === selectedProduct &&
                    new Date(entry.date) >= startDate &&
                    new Date(entry.date) <= endDate
            )
            .map((entry) => ({
                ...entry,
                formattedDate: format(new Date(entry.date), 'MMM dd'),
            }));
    }, [selectedProduct, startDate, endDate]);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Utilization Analysis
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Box>
                    <Typography variant="subtitle1">Select Date Range</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </Box>
                </Box>
                <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                    <InputLabel>Select Product</InputLabel>
                    <Select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        label="Select Product"
                    >
                        <MenuItem value="hope">Hope</MenuItem>
                        <MenuItem value="faith">Faith</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Predicted vs Actual Workload (kg)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="formattedDate" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="predictedWorkload" stroke="#82ca9d" name="Predicted Workload" />
                        <Line type="monotone" dataKey="actualWorkload" stroke="#8884d8" name="Actual Workload" />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Employee Efficiency (%)</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="formattedDate" />
                        <YAxis domain={[90, 100]} /> {/* Focus Y-axis on high efficiency range */}
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="efficiency" stroke="#FF6347" name="Efficiency (%)" />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Number of Employees</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="formattedDate" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="employees" fill="#8884d8" name="Employees" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default UtilizationAnalysis;
