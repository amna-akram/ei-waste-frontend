// src/pages/YieldTimeSeriesAnalysisPage.js

import React, { useState, useMemo } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { timeSeriesData } from '../../data/data';
import { format } from 'date-fns';

const calculateMetrics = (data) => {
    return data.map((entry, index, array) => {
        const actualYield = entry.actualYield;
        const predictiveYield = entry.predictiveYield;
        const errorMargin = actualYield - predictiveYield;
        const growthRate = index > 0 ? ((actualYield - array[index - 1].actualYield) / array[index - 1].actualYield) * 100 : 0;

        return { ...entry, errorMargin, growthRate };
    });
};

const EfficiencyAnalysis = ({ department }) => {
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-05-01'));
    const [product, setProduct] = useState('hope');

    const handleProductChange = (event) => setProduct(event.target.value);

    const filteredData = useMemo(() => {
        const data = timeSeriesData[product].filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        });
        return calculateMetrics(data);
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
                Efficiency Metrics Report
            </Typography>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
                <Box sx={{ minWidth: 250, position: 'relative' }}>
                    <Typography variant="subtitle1">Select Date Range</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Box sx={{ position: 'relative' }}>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                wrapperClassName="datepicker-wrapper"
                                popperProps={{
                                    strategy: 'fixed'
                                }}
                            />
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                wrapperClassName="datepicker-wrapper"
                                popperProps={{
                                    strategy: 'fixed'
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <FormControl variant="outlined" sx={{ minWidth: 150, marginLeft: 5, marginTop: 1 }}>
                    <InputLabel>Select Product</InputLabel>
                    <Select
                        value={product}
                        onChange={handleProductChange}
                        label="Select Product"
                    >
                        <MenuItem value="hope">Hope</MenuItem>
                        <MenuItem value="faith">Faith</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Overall Chart */}
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
                    <Line type="monotone" dataKey="errorMargin" stroke="#FF6347" name="Error Margin" />
                    <Line type="monotone" dataKey="growthRate" stroke="#20B2AA" name="Growth Rate (%)" />
                </LineChart>
            </ResponsiveContainer>

            {/* Cooking Chart */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 4 }}>
                <Typography variant="h6">Yield Efficiency</Typography>
                <Tooltip title="This graph provides a detailed view of cooking yield analysis.">
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
                    <Line type="monotone" dataKey="errorMargin" stroke="#FF6347" name="Error Margin" />
                    <Line type="monotone" dataKey="growthRate" stroke="#20B2AA" name="Growth Rate (%)" />
                </LineChart>
            </ResponsiveContainer>

            {/* Storage Chart */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 4 }}>
                <Typography variant="h6">Production Yield</Typography>
                <Tooltip title="This graph shows the storage yield analysis.">
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
                    <Line type="monotone" dataKey="errorMargin" stroke="#FF6347" name="Error Margin" />
                    <Line type="monotone" dataKey="growthRate" stroke="#20B2AA" name="Growth Rate (%)" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default EfficiencyAnalysis;
