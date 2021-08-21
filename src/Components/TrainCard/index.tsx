import React, { ReactNode } from 'react';
import Card from '../Card';
import { Train, Station } from '../../Types';
import TimetableTime from '../TimetableTime';
import { Link } from 'react-router-dom';

interface TrainCardProps {
  train?: Train,
  stations: Station[],
}

const TrainCard: React.FC<TrainCardProps> = ({ train, stations }: TrainCardProps) => (
  <Link to={'/train/' + train?.trainNumber}>
    <Card bodyClassName="p-2" className="mb-4">
      <div className="d-flex align-items-center">
        <div className="badge bg-primary me-2">{train?.commuterLineID || train?.trainType}{train?.trainNumber}</div>
        <span className="ms-auto">
          <TimetableTime row={train?.timeTableRows.find(row => row.type === 'DEPARTURE')} />
          -
          <TimetableTime row={train?.timeTableRows.slice().reverse().find(row => row.type === 'ARRIVAL')} />
        </span>
      </div>
      <p className="text-muted m-0">
        {(stations || []).find(station => station.stationShortCode ===  (train?.timeTableRows || []).find(row => row.type === 'DEPARTURE')?.stationShortCode || '')?.stationName || 'Unknown'}
        &nbsp;&gt;&nbsp;
        {(stations || []).find(station => station.stationShortCode === (train?.timeTableRows || []).slice().reverse().find(row => row.type === 'ARRIVAL')?.stationShortCode || '')?.stationName || 'Unknown'}
      </p>
    </Card>
  </Link>
);

export default TrainCard;