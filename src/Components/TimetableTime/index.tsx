import React, { ReactNode } from 'react';
import moment from 'moment';

import { ITimetableRow } from '../../Types';

interface TimetableTimeProps {
  row?: ITimetableRow,
}

const TimetableTime: React.FC<TimetableTimeProps> = ({ row }: TimetableTimeProps) => {
  const actualEstimate = moment(row?.actualTime || row?.liveEstimateTime);
  const scheduled = moment(row?.scheduledTime);
  if (actualEstimate.isAfter(scheduled)) {
    return (
      <>
        <span className="text-muted delay me-1">{scheduled.format('HH:mm')}</span>
        {actualEstimate.format('HH:mm')}
      </>
    );
  }
  return <>{scheduled.format('HH:mm')}</>;
};

export default TimetableTime;
