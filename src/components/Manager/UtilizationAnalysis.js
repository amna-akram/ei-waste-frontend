import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';

const utilizationData = [
    { date: '2024-01-01', product: 'hope', employees: 50, predictedWorkload: 450, actualWorkload: 430, efficiency: 95.5 },
    { date: '2024-01-05', product: 'hope', employees: 50, predictedWorkload: 460, actualWorkload: 450, efficiency: 97.8 },
    { date: '2024-01-10', product: 'hope', employees: 51, predictedWorkload: 480, actualWorkload: 460, efficiency: 95.8 },
    { date: '2024-01-15', product: 'hope', employees: 52, predictedWorkload: 500, actualWorkload: 480, efficiency: 96.0 },
    { date: '2024-01-20', product: 'hope', employees: 52, predictedWorkload: 520, actualWorkload: 500, efficiency: 96.2 },
    { date: '2024-01-25', product: 'hope', employees: 53, predictedWorkload: 540, actualWorkload: 530, efficiency: 98.1 },
    { date: '2024-01-30', product: 'hope', employees: 54, predictedWorkload: 560, actualWorkload: 550, efficiency: 98.2 },
    { date: '2024-01-01', product: 'faith', employees: 49, predictedWorkload: 500, actualWorkload: 495, efficiency: 99 },
    { date: '2024-01-05', product: 'faith', employees: 49, predictedWorkload: 505, actualWorkload: 500, efficiency: 98.8 },
    { date: '2024-01-10', product: 'faith', employees: 50, predictedWorkload: 510, actualWorkload: 500, efficiency: 98.0 },
    { date: '2024-01-15', product: 'faith', employees: 50, predictedWorkload: 520, actualWorkload: 510, efficiency: 98.2 },
    { date: '2024-01-20', product: 'faith', employees: 51, predictedWorkload: 530, actualWorkload: 520, efficiency: 98.5 },
    { date: '2024-01-25', product: 'faith', employees: 51, predictedWorkload: 535, actualWorkload: 530, efficiency: 99.0 },
    { date: '2024-01-30', product: 'faith', employees: 52, predictedWorkload: 540, actualWorkload: 535, efficiency: 98.8 },
    { date: '2024-02-01', product: 'hope', employees: 54, predictedWorkload: 550, actualWorkload: 530, efficiency: 96.4 },
    { date: '2024-02-05', product: 'hope', employees: 53, predictedWorkload: 540, actualWorkload: 520, efficiency: 96.3 },
    { date: '2024-02-10', product: 'hope', employees: 52, predictedWorkload: 530, actualWorkload: 510, efficiency: 96.2 },
    { date: '2024-02-15', product: 'hope', employees: 51, predictedWorkload: 520, actualWorkload: 500, efficiency: 96.1 },
    { date: '2024-02-20', product: 'hope', employees: 50, predictedWorkload: 510, actualWorkload: 490, efficiency: 96.0 },
    { date: '2024-02-25', product: 'hope', employees: 49, predictedWorkload: 500, actualWorkload: 480, efficiency: 95.8 },
    { date: '2024-02-01', product: 'faith', employees: 52, predictedWorkload: 540, actualWorkload: 530, efficiency: 98.0 },
    { date: '2024-02-05', product: 'faith', employees: 53, predictedWorkload: 550, actualWorkload: 540, efficiency: 98.2 },
    { date: '2024-02-10', product: 'faith', employees: 54, predictedWorkload: 560, actualWorkload: 550, efficiency: 98.4 },
    { date: '2024-02-15', product: 'faith', employees: 54, predictedWorkload: 570, actualWorkload: 560, efficiency: 98.6 },
    { date: '2024-02-20', product: 'faith', employees: 55, predictedWorkload: 580, actualWorkload: 570, efficiency: 98.8 },
    { date: '2024-02-25', product: 'faith', employees: 56, predictedWorkload: 590, actualWorkload: 580, efficiency: 99.0 },
    { date: '2024-03-01', product: 'hope', employees: 50, predictedWorkload: 480, actualWorkload: 470, efficiency: 97.9 },
    { date: '2024-03-05', product: 'hope', employees: 49, predictedWorkload: 470, actualWorkload: 460, efficiency: 97.8 },
    { date: '2024-03-10', product: 'hope', employees: 48, predictedWorkload: 460, actualWorkload: 450, efficiency: 97.5 },
    { date: '2024-03-15', product: 'hope', employees: 47, predictedWorkload: 450, actualWorkload: 440, efficiency: 97.0 },
    { date: '2024-03-20', product: 'hope', employees: 46, predictedWorkload: 440, actualWorkload: 430, efficiency: 96.5 },
    { date: '2024-03-25', product: 'hope', employees: 45, predictedWorkload: 430, actualWorkload: 420, efficiency: 96.0 },
    { date: '2024-03-01', product: 'faith', employees: 52, predictedWorkload: 550, actualWorkload: 540, efficiency: 98.2 },
    { date: '2024-03-05', product: 'faith', employees: 53, predictedWorkload: 560, actualWorkload: 550, efficiency: 98.4 },
    { date: '2024-03-10', product: 'faith', employees: 54, predictedWorkload: 570, actualWorkload: 565, efficiency: 99.1 },
    { date: '2024-03-15', product: 'faith', employees: 54, predictedWorkload: 575, actualWorkload: 570, efficiency: 99.2 },
    { date: '2024-03-20', product: 'faith', employees: 55, predictedWorkload: 580, actualWorkload: 570, efficiency: 98.8 },
    { date: '2024-03-25', product: 'faith', employees: 55, predictedWorkload: 585, actualWorkload: 575, efficiency: 98.5 },
];

const UtilizationAnalysis = ({ department }) => {
    const [selectedProduct, setSelectedProduct] = useState('overall');
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-05'));

    const filteredData = useMemo(() => {
        return utilizationData
            .filter(
                (entry) =>
                    (selectedProduct === 'overall' || entry.product === selectedProduct) &&
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
                        <MenuItem value="overall">Overall</MenuItem>
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
