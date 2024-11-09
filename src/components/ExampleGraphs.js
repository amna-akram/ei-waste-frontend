import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Batch 1', before: 200, after: 190 },
    { name: 'Batch 2', before: 210, after: 195 },
    { name: 'Batch 3', before: 215, after: 205 },
    { name: 'Batch 4', before: 230, after: 220 },
];

const ExampleGraphs = () => {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2>Line Chart Example</h2>
            <ResponsiveContainer width="100%" height="50%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="before" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="after" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

            <h2>Bar Chart Example</h2>
            <ResponsiveContainer width="100%" height="50%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="before" fill="#8884d8" />
                    <Bar dataKey="after" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExampleGraphs;
