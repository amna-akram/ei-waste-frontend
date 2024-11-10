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
    { date: '2024-01-06', product: 'hope', totalOutput: 125, rejectedBatches: 10 },
    { date: '2024-01-07', product: 'faith', totalOutput: 140, rejectedBatches: 6 },
    { date: '2024-01-08', product: 'faith', totalOutput: 160, rejectedBatches: 9 },
    { date: '2024-01-09', product: 'hope', totalOutput: 135, rejectedBatches: 7 },
    { date: '2024-01-10', product: 'hope', totalOutput: 115, rejectedBatches: 5 },
    { date: '2024-01-11', product: 'faith', totalOutput: 145, rejectedBatches: 8 },
    { date: '2024-01-12', product: 'hope', totalOutput: 120, rejectedBatches: 4 },
    { date: '2024-01-13', product: 'hope', totalOutput: 130, rejectedBatches: 11 },
    { date: '2024-01-14', product: 'faith', totalOutput: 155, rejectedBatches: 5 },
    { date: '2024-01-15', product: 'faith', totalOutput: 140, rejectedBatches: 10 },
    { date: '2024-01-16', product: 'hope', totalOutput: 125, rejectedBatches: 6 },
    { date: '2024-01-17', product: 'hope', totalOutput: 135, rejectedBatches: 9 },
    { date: '2024-01-18', product: 'faith', totalOutput: 150, rejectedBatches: 3 },
    { date: '2024-01-19', product: 'faith', totalOutput: 160, rejectedBatches: 7 },
    { date: '2024-01-20', product: 'hope', totalOutput: 140, rejectedBatches: 5 },
    { date: '2024-01-21', product: 'hope', totalOutput: 130, rejectedBatches: 8 },
    { date: '2024-01-22', product: 'faith', totalOutput: 155, rejectedBatches: 6 },
    { date: '2024-01-23', product: 'faith', totalOutput: 145, rejectedBatches: 4 },
    { date: '2024-01-24', product: 'hope', totalOutput: 120, rejectedBatches: 7 },
    { date: '2024-01-25', product: 'hope', totalOutput: 110, rejectedBatches: 5 },
    { date: '2024-01-26', product: 'faith', totalOutput: 160, rejectedBatches: 9 },
    { date: '2024-01-27', product: 'faith', totalOutput: 150, rejectedBatches: 6 },
    { date: '2024-01-28', product: 'hope', totalOutput: 135, rejectedBatches: 8 },
    { date: '2024-01-29', product: 'hope', totalOutput: 125, rejectedBatches: 7 },
    { date: '2024-01-30', product: 'faith', totalOutput: 145, rejectedBatches: 5 },
    { date: '2024-01-31', product: 'faith', totalOutput: 140, rejectedBatches: 10 },
];


const CookingRejectionReasons = [
    { reason: 'Contamination', count: 15, product: 'hope', department: 'Cooking' },
    { reason: 'Size Variation', count: 10, product: 'hope', department: 'Cooking' },
    { reason: 'Underweight', count: 5, product: 'faith', department: 'Cooking' },
    { reason: 'Overweight', count: 3, product: 'faith', department: 'Cooking' },
    { reason: 'Bad Quality', count: 4, product: 'hope', department: 'Cooking' },
];

const StorageRejectionReasons = [
    { reason: 'Expired', count: 8, product: 'faith', department: 'Storage' },
    { reason: 'Humidity', count: 5, product: 'hope', department: 'Storage' },
    { reason: 'Handling', count: 6, product: 'hope', department: 'Storage' },
    { reason: 'Temperature Error', count: 7, product: 'faith', department: 'Storage' },
    { reason: 'Other', count: 2, product: 'hope', department: 'Storage' },
];

const COLORS = ['#FF8042', '#FFBB28', '#0088FE', '#00C49F', '#FF6361'];

const QualityAndWasteAnalysis = ({ department }) => {
    const [selectedProduct, setSelectedProduct] = useState('Overall');
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-05'));
    let rejectionReasonsData;

    if (department === 'cooking') {
        rejectionReasonsData = CookingRejectionReasons;
    } else {
        rejectionReasonsData = StorageRejectionReasons;
    }

    const filteredQualityData = useMemo(() => {
        return qualityData
            .filter(
                (entry) =>
                    (selectedProduct === 'Overall' || entry.product === selectedProduct) &&
                    new Date(entry.date) >= startDate &&
                    new Date(entry.date) <= endDate
            )
            .map((entry) => ({
                ...entry,
                rejectionRate: ((entry.rejectedBatches / entry.totalOutput) * 100).toFixed(2),
            }));
    }, [selectedProduct, startDate, endDate]);

    const filteredRejectionReasonsData = useMemo(() => {
        if (selectedProduct === 'Overall') {
            return rejectionReasonsData;
        }
        return rejectionReasonsData.filter((reason) => reason.product === selectedProduct);
    }, [selectedProduct, rejectionReasonsData]);

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
                        <MenuItem value="Overall">Overall</MenuItem>
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
                <Typography variant="h6" gutterBottom>All Reasons for Rejection</Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={filteredRejectionReasonsData}
                            dataKey="count"
                            nameKey="reason"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
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
