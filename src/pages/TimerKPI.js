import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const TimerKpi = ({ targetTime }) => {
  // Parse the target time string into a Date object
  const targetDate = new Date(targetTime);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const hours = String(Math.floor(difference / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Stop the timer once the countdown reaches zero
      if (newTimeLeft.hours === '00' && newTimeLeft.minutes === '00' && newTimeLeft.seconds === '00') {
        clearInterval(timer);
      }
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <Typography variant="h5" sx={{ textAlign: 'center' }}>
      {`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
    </Typography>
  );
};

export default TimerKpi;