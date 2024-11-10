// src/components/QualityAndWasteAnalysis.js

import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const qualityData = [
    { date: '2024-01-01', product: 'hope', totalOutput: 100, rejectedBatches: 5 },
    { date: '2024-01-02', product: 'hope', totalOutput: 120, rejectedBatches: 8 },
    { date: '2024-01-03', product: 'faith', totalOutput: 150, rejectedBatches: 4 },
    { date: '2024-01-04', product: 'faith', totalOutput: 130, rejectedBatches: 7 },
    { date: '2024-01-05', product: 'hope', totalOutput: 110, rejectedBatches: 6 },
];

const rejectionReasonsData = [
    { reason: 'Contamination', count: 15 },
    { reason: 'Size Variation', count: 10 },
    { reason: 'Packaging Defect', count: 8 },
    { reason: 'Labeling Error', count: 5 },
    { reason: 'Moisture Content', count: 7 },
];

const COLORS = ['#FF8042', '#FFBB28', '#0088FE', '#00C49F', '#FF6361'];

const QualityAndWasteAnalysis = () => {
    const [selectedProduct, setSelectedProduct] = useState('hope');
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-05'));

    const filteredQualityData = useMemo(() => {
        return qualityData
            .filter(
                (entry) =>
                    entry.product === selectedProduct &&
                    new Date(entry.date) >= startDate &&
                    new Date(entry.date) <= endDate
            )
            .map((entry) => ({
                ...entry,
                rejectionRate: ((entry.rejectedBatches / entry.totalOutput) * 100).toFixed(2),
            }));
    }, [selectedProduct, startDate, endDate]);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Quality and Waste Analysis
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

            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Leading Reasons for Rejection</Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={rejectionReasonsData}
                            dataKey="count"
                            nameKey="reason"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {rejectionReasonsData.map((entry, index) => (
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
