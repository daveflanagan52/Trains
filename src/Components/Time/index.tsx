import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  });
  return (
    <>{moment(time).format('HH:mm')}</>
  );
};

export default Time;
