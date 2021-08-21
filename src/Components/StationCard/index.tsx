import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Card from '../Card';
import { IStation } from '../../Types';

interface StationCardProps {
  station: IStation,
}

const typeTranslations = {
  STATION: 'Asema',
  STOPPING_POINT: 'Pysähdyskohta',
  TURNOUT_IN_THE_OPEN_LINE: 'Haaralinja',
};

const StationCard: React.FC<StationCardProps> = ({ station }: StationCardProps) => (
  <Link to={`/stations/${station?.stationShortCode}`}>
    <Card bodyClassName="p-2" className="mb-4">
      <div className="d-flex align-items-center">
        <div className="badge bg-primary me-2">{station?.stationShortCode}</div>
        {station?.stationName}
      </div>
      <p className="text-muted m-0">
        {typeTranslations[station.type]}
      </p>
    </Card>
  </Link>
);

export default StationCard;
