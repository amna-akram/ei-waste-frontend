import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import TimerKpi from './TimerKPI'; // Assuming TimerKpi is a separate component

// Dashboard Navigation Tabs Component
const DashboardTabs = ({ selectedTab, handleTabChange }) => (
  <Box
    sx={{
      position: 'sticky',
      top: '70px',
      zIndex: 1000,
      backgroundColor: '#ffffff',
      padding: '10px 0',
      marginTop: '20px',
    }}
  >
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      centered
      sx={{
        borderBottom: 'none', // Remove the bottom gradient line
        boxShadow: 'none', // Remove the box shadow
      }}
    >
      <Tab
        label={<Typography sx={{ fontSize: '1.1rem' }}>Cooking</Typography>}
      />
      <Tab
        label={<Typography sx={{ fontSize: '1.1rem' }}>Storage</Typography>}
      />
      <Tab
        label={<Typography sx={{ fontSize: '1.1rem' }}>Packaging</Typography>}
      />
    </Tabs>
  </Box>
);

// KPI Card Component
const KpiCard = ({ title, data, gradient, isTimer = false }) => (
  <Card
    sx={{
      background: gradient,
      color: 'white',
      width: '24%',
      margin: '5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '12px',
    }}
  >
    <CardContent sx={{ width: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'left',
          marginBottom: '10px',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isTimer ? data : <Typography variant="h5">{data}</Typography>}
      </Box>
    </CardContent>
  </Card>
);

// Dashboard KPIs for Cooking
const DashboardKPIs = () => {
  const processingTime = "2024-11-10 13:30:00";  // Common processing time for both dashboards

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <KpiCard
        title="Work in Process Inventory"
        data="7 Batches"
        gradient="linear-gradient(135deg, #56ab2f, #a8e063)"
      />
      <KpiCard
        title="ETA - Upcoming Inventory"
        data="11:45:00 10/11/2024"
        gradient="linear-gradient(135deg, #8e2de2, #4a00e0)"
      />
      <KpiCard
        title="Expected Time to Process WIP Inventory"
        data={processingTime}
        gradient="linear-gradient(135deg, #2193b0, #6dd5ed)"
      />
      <KpiCard
        title="Time Left to Process Current Inventory"
        data={<TimerKpi targetTime={processingTime} />}
        gradient="linear-gradient(135deg, #fc4a1a, #f7b733)"
        isTimer={true}
      />
    </Box>
  );
};

// Dashboard KPI Table for Cooking
const DashboardKPI = () => {
  const [topN, setTopN] = useState(3);
  const rejectionReasons = [
    'Contamination',
    'Off Flavors',
    'Incorrect Weight',
    'Equipment Malfunction',
    'Damaged Packaging',
  ];

  const handleTopNChange = (event) => {
    setTopN(event.target.value);
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Leading Reasons for Rejection - Production
        </Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Show Top</InputLabel>
          <Select value={topN} onChange={handleTopNChange} label="Show Top">
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableBody>
            {rejectionReasons.slice(0, topN).map((reason, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff' }}>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>{index + 1}.</TableCell>
                <TableCell>{reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Dashboard KPIs for Storage
const DashboardStorageKPIs = ({ processingTime }) => (
  <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',  // Centering the KPI cards
      gap: '15px',  // Reducing the gap between the cards
      marginTop: '20px',
      width: '100%'  // Ensuring full width
    }}>
    <KpiCard
      title="Work in Process Inventory"
      data="600 items"
      gradient="linear-gradient(135deg, #56ab2f, #a8e063)"
    />
    <KpiCard
      title="ETA - Upcoming Production"
      data={<TimerKpi targetTime={processingTime} />}
      gradient="linear-gradient(135deg, #8e2de2, #4a00e0)"
    />
    <KpiCard
      title="Expected Time of Stay"
      data="12:00:00 PM 11/10/2024"
      gradient="linear-gradient(135deg, #2193b0, #6dd5ed)"
    />
  </Box>
);

// Dashboard KPIs for Packaging
const DashboardPackagingKPIs = ({ processingTime }) => (
  <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',  // Centering the KPI cards
      gap: '15px',  // Reducing the gap between the cards
      marginTop: '20px',
      width: '100%'  // Ensuring full width
    }}>
    <KpiCard
      title="Work in Process Inventory"
      data="50 items"
      gradient="linear-gradient(135deg, #56ab2f, #a8e063)"
    />
    <KpiCard
      title="ETA - Upcoming Storage"
      data={<TimerKpi targetTime={processingTime} />}
      gradient="linear-gradient(135deg, #8e2de2, #4a00e0)"
    />
    <KpiCard
      title="Expected Time to Process WIP Inventory"
      data="2:00:00 PM 11/10/2024"
      gradient="linear-gradient(135deg, #2193b0, #6dd5ed)"
    />
    <KpiCard
      title="Time Left to Process Current Inventory"
      data={<TimerKpi targetTime="2024-11-10 14:00:00"></TimerKpi>}
      gradient="linear-gradient(135deg, #fc4a1a, #f7b733)"
      isTimer={true}
    />
  </Box>
);

// Dashboard KPI Table for Packaging
const DashboardPackagingTable = () => {
  const [topN, setTopN] = useState(3);
  const rejectionReasons = [
    'Contamination',
    'Off Flavors',
    'Incorrect Weight',
    'Equipment Malfunction',
    'Damaged Packaging',
  ];

  const handleTopNChange = (event) => {
    setTopN(event.target.value);
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Leading Reasons for Rejection - Packaging
        </Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Show Top</InputLabel>
          <Select value={topN} onChange={handleTopNChange} label="Show Top">
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableBody>
            {rejectionReasons.slice(0, topN).map((reason, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff' }}>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>{index + 1}.</TableCell>
                <TableCell>{reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Main Worker Dashboard Component
const Worker = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderDashboard = () => {
    const processingTime = "2024-11-10 13:30:00";  // Common processing time for both dashboards
    switch (selectedTab) {
      case 0:
        return (
          <>
            <DashboardKPIs />
            <DashboardKPI />
          </>
        );
      case 1:
        return <DashboardStorageKPIs processingTime={processingTime} />;
      case 2:
        return (
          <>
            <DashboardPackagingKPIs processingTime={processingTime} />
            <DashboardPackagingTable />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <DashboardTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <Box sx={{ padding: '20px', marginTop: '80px' }}>
        {renderDashboard()}
      </Box>
    </Box>
  );
};

export default Worker;
