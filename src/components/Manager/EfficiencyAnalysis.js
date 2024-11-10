import React, { useState, useMemo } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const timeSeriesData = {
    hope: [
        { date: '2024-01-01', actualYield: 75, predictiveYield: 70, actualETA: 6, predictiveETA: 5, actualBatches: 50, plannedBatches: 55 },
        { date: '2024-02-01', actualYield: 78, predictiveYield: 72, actualETA: 5.5, predictiveETA: 5, actualBatches: 52, plannedBatches: 56 },
        { date: '2024-03-01', actualYield: 80, predictiveYield: 77, actualETA: 5, predictiveETA: 4.8, actualBatches: 54, plannedBatches: 56 },
        { date: '2024-04-01', actualYield: 82, predictiveYield: 80, actualETA: 5.2, predictiveETA: 5, actualBatches: 53, plannedBatches: 56 },
        { date: '2024-05-01', actualYield: 84, predictiveYield: 81, actualETA: 5, predictiveETA: 4.9, actualBatches: 55, plannedBatches: 55 },
        { date: '2024-06-01', actualYield: 88, predictiveYield: 85, actualETA: 4.8, predictiveETA: 4.7, actualBatches: 56, plannedBatches: 55 },
        { date: '2024-07-01', actualYield: 86, predictiveYield: 84, actualETA: 4.7, predictiveETA: 4.6, actualBatches: 57, plannedBatches: 57 },
        { date: '2024-08-01', actualYield: 90, predictiveYield: 88, actualETA: 4.6, predictiveETA: 4.5, actualBatches: 58, plannedBatches: 57 },
        { date: '2024-09-01', actualYield: 89, predictiveYield: 87, actualETA: 4.5, predictiveETA: 4.4, actualBatches: 56, plannedBatches: 56 },
        { date: '2024-10-01', actualYield: 92, predictiveYield: 90, actualETA: 4.4, predictiveETA: 4.3, actualBatches: 60, plannedBatches: 58 },
        { date: '2024-11-01', actualYield: 91, predictiveYield: 89, actualETA: 4.3, predictiveETA: 4.2, actualBatches: 59, plannedBatches: 57 },
        { date: '2024-12-01', actualYield: 94, predictiveYield: 91, actualETA: 4.2, predictiveETA: 4.1, actualBatches: 61, plannedBatches: 58 },
    ],
    faith: [
        { date: '2024-01-01', actualYield: 68, predictiveYield: 70, actualETA: 8, predictiveETA: 7.8, actualBatches: 48, plannedBatches: 50 },
        { date: '2024-02-01', actualYield: 70, predictiveYield: 71, actualETA: 7.7, predictiveETA: 7.5, actualBatches: 49, plannedBatches: 50 },
        { date: '2024-03-01', actualYield: 73, predictiveYield: 72, actualETA: 7.5, predictiveETA: 7.3, actualBatches: 51, plannedBatches: 52 },
        { date: '2024-04-01', actualYield: 75, predictiveYield: 74, actualETA: 7.4, predictiveETA: 7.2, actualBatches: 52, plannedBatches: 52 },
        { date: '2024-05-01', actualYield: 78, predictiveYield: 76, actualETA: 7.2, predictiveETA: 7.1, actualBatches: 53, plannedBatches: 54 },
        { date: '2024-06-01', actualYield: 80, predictiveYield: 78, actualETA: 7, predictiveETA: 6.9, actualBatches: 54, plannedBatches: 55 },
        { date: '2024-07-01', actualYield: 82, predictiveYield: 80, actualETA: 6.8, predictiveETA: 6.7, actualBatches: 55, plannedBatches: 55 },
        { date: '2024-08-01', actualYield: 85, predictiveYield: 83, actualETA: 6.7, predictiveETA: 6.6, actualBatches: 57, plannedBatches: 57 },
        { date: '2024-09-01', actualYield: 83, predictiveYield: 82, actualETA: 6.6, predictiveETA: 6.5, actualBatches: 56, plannedBatches: 56 },
        { date: '2024-10-01', actualYield: 87, predictiveYield: 85, actualETA: 6.5, predictiveETA: 6.4, actualBatches: 59, plannedBatches: 58 },
        { date: '2024-11-01', actualYield: 86, predictiveYield: 84, actualETA: 6.4, predictiveETA: 6.3, actualBatches: 58, plannedBatches: 57 },
        { date: '2024-12-01', actualYield: 89, predictiveYield: 87, actualETA: 6.3, predictiveETA: 6.2, actualBatches: 60, plannedBatches: 58 },
    ]
};



const calculateMetrics = (data) => {
    return data.map((entry, index, array) => {
        const actualYield = entry.actualYield;
        const predictiveYield = entry.predictiveYield;
        const actualETA = entry.actualETA;
        const predictiveETA = entry.predictiveETA;
        const actualBatches = entry.actualBatches;
        const plannedBatches = entry.plannedBatches;

        const yieldErrorMargin = actualYield - predictiveYield;
        const etaErrorMargin = actualETA - predictiveETA;
        const batchErrorMargin = actualBatches - plannedBatches;

        const yieldGrowthRate = index > 0 ? ((actualYield - array[index - 1].actualYield) / array[index - 1].actualYield) * 100 : 0;
        const etaGrowthRate = index > 0 ? ((actualETA - array[index - 1].actualETA) / array[index - 1].actualETA) * 100 : 0;
        const batchGrowthRate = index > 0 ? ((actualBatches - array[index - 1].actualBatches) / array[index - 1].actualBatches) * 100 : 0;

        return { ...entry, yieldErrorMargin, etaErrorMargin, batchErrorMargin, yieldGrowthRate, etaGrowthRate, batchGrowthRate };
    });
};

const EfficiencyAnalysis = ({ department }) => {
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-06-01'));
    const [product, setProduct] = useState('overall');

    const handleProductChange = (event) => setProduct(event.target.value);

    const filteredData = useMemo(() => {
        let data = [];
        if (product === 'hope' || product === 'faith') {
            data = timeSeriesData[product];
        } else if (product === 'overall') {
            data = [...timeSeriesData.hope, ...timeSeriesData.faith];
        }

        return calculateMetrics(data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        }));
    }, [product, startDate, endDate]);

    const renderCustomAxisTicks = (tickProps) => {
        const { x, y, payload, index } = tickProps;
        const targetTicks = 10;
        const dataLength = filteredData.length;
        const shouldDisplayTick = dataLength <= targetTicks || index % Math.ceil(dataLength / targetTicks) === 0;

        if (shouldDisplayTick) {
            return (
                <text x={x} y={y + 10} textAnchor="middle" fill="#666">
                    {format(new Date(payload.value), 'MMM yyyy')}
                </text>
            );
        }
        return null;
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
            Efficiency Metrics Report for {department}
            </Typography>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
                <Box sx={{ minWidth: 250, position: 'relative' }}>
                    <Typography variant="subtitle1">Select Date Range</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </Box>
                </Box>

                <FormControl variant="outlined" sx={{ minWidth: 150, marginLeft: 5, marginTop: 1 }}>
                    <InputLabel>Select Product</InputLabel>
                    <Select
                        value={product}
                        onChange={handleProductChange}
                        label="Select Product"
                    >
                        <MenuItem value="overall">Overall</MenuItem>
                        <MenuItem value="hope">Hope</MenuItem>
                        <MenuItem value="faith">Faith</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Processing Efficiency Graph */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h6">Processing Efficiency</Typography>
                <Tooltip title="This graph shows the overall yield efficiency analysis.">
                    <IconButton>
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={renderCustomAxisTicks} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actualYield" stroke="#8884d8" name="Actual Yield" />
                    <Line type="monotone" dataKey="predictiveYield" stroke="#82ca9d" name="Predictive Yield" />
                    <Line type="monotone" dataKey="yieldErrorMargin" stroke="#FF6347" name="Yield Error Margin" />
                    <Line type="monotone" dataKey="yieldGrowthRate" stroke="#20B2AA" name="Yield Growth Rate (%)" />
                </LineChart>
            </ResponsiveContainer>

            {/* Production Yield (Number of Batches) Graph */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 4 }}>
                <Typography variant="h6">Production Yield (Batches Produced)</Typography>
                <Tooltip title="This graph shows the actual vs planned number of batches produced in a day.">
                    <IconButton>
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={renderCustomAxisTicks} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actualBatches" stroke="#8884d8" name="Actual Batches" />
                    <Line type="monotone" dataKey="plannedBatches" stroke="#82ca9d" name="Planned Batches" />
                    <Line type="monotone" dataKey="batchErrorMargin" stroke="#FF6347" name="Batch Error Margin" />
                    <Line type="monotone" dataKey="batchGrowthRate" stroke="#20B2AA" name="Batch Growth Rate (%)" />
                </LineChart>
            </ResponsiveContainer>

            {/* ETA Efficiency Graph */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 4 }}>
                <Typography variant="h6">ETA Efficiency</Typography>
                <Tooltip title="This graph shows the processing ETA analysis.">
                    <IconButton>
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={renderCustomAxisTicks} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actualETA" stroke="#8884d8" name="Actual ETA" />
                    <Line type="monotone" dataKey="predictiveETA" stroke="#82ca9d" name="Predictive ETA" />
                    <Line type="monotone" dataKey="etaErrorMargin" stroke="#FF6347" name="ETA Error Margin" />
                    <Line type="monotone" dataKey="etaGrowthRate" stroke="#20B2AA" name="ETA Growth Rate (%)" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default EfficiencyAnalysis;
