import React from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import {
  MapContainer, TileLayer, Marker, useMap,
} from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import { useParams } from 'react-router';
import { ITrain, IStation, IDelayCode } from '../../Types';
import Card from '../../Components/Card';
import { useGetTrainLocationQuery } from '../../Services/Data';
import Alert, { AlertType } from '../../Components/Alert';
import img from '../../Resources/train.png';

const trainIcon = new L.Icon({
  iconUrl: img,
  iconAnchor: [16, 37],
  popupAnchor: [16, -37],
  iconSize: [32, 37],
});

interface TrainProps {
  delayCauses: IDelayCode[],
  trains: ITrain[],
  stations: IStation[],
}

interface FollowCenterProps {
  center: LatLngTuple,
}

interface TrainParams {
  id: string,
}

const FollowCenter: React.FC<FollowCenterProps> = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Train: React.FC<TrainProps> = ({ trains, stations, delayCauses }) => {
  const { id } = useParams<TrainParams>();
  const train = (trains || []).find((train) => train.trainNumber === parseInt(id));
  const now = moment();
  const location = useGetTrainLocationQuery(id, {
    pollingInterval: 15 * 1000,
  });
  const loc = location?.data?.at(0)?.location?.coordinates || [24.938379, 60.169857];
  return (
    <>
      <Helmet>
        <title>Junat | {train?.commuterLineID || train?.trainType || ""}{train?.trainNumber.toString() || ""}</title>
      </Helmet>
      <h2 className="mb-3">
        {train?.commuterLineID || train?.trainType || ''}
        {train?.trainNumber || ''}
      </h2>
      {location?.data && location?.data.length > 0 && (
        <Card className="mb-4" bodyClassName="p-0">
          <MapContainer style={{ height: '400px' }} center={[loc[1], loc[0]]} zoom={13} scrollWheelZoom={false}>
            <FollowCenter center={[loc[1], loc[0]]} />
            <TileLayer
              maxZoom={20}
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[loc[1], loc[0]]} icon={trainIcon} />
          </MapContainer>
        </Card>
      )}
      {!location.isLoading && (!location?.data || location.data.length === 0) && <Alert type={AlertType.Info} icon={faQuestion} message="Tämä juna näyttää olevan poissa käytöstä." />}
      <Card bodyClassName="p-0">
        <ul className="timeline">
          {(train?.timeTableRows?.filter((row) => row.commercialStop) || []).map((row, index) => {
            const estimateActual = moment(row.liveEstimateTime || row.actualTime);
            const isLate = moment(row.scheduledTime).isBefore(estimateActual);
            return (
              <li key={index} className={[estimateActual.isBefore(now) ? 'passed' : ''].join(' ')}>
                <div className="d-flex">
                  {!isLate && <span className="time">{moment(row.scheduledTime).format('HH:mm')}</span>}
                  {isLate && (
                  <span className="time">
                    <span className="delay me-2">{moment(row.scheduledTime).format('HH:mm')}</span>
                    {estimateActual.format('HH:mm')}
                  </span>
                  )}
                  {row.type === 'DEPARTURE' ? 'Lähtee: ' : 'Saapuu: '}
                  {(stations || []).find((station) => station.stationShortCode === row.stationShortCode)?.stationName || 'Unknown'}
                  <span className="text-muted ms-auto">
                    Raide&nbsp;
                    {row.commercialTrack}
                  </span>
                </div>
                {(row.causes || []).map((cause) => {
                  const c = delayCauses.find((c) => c.id === cause.detailedCategoryCodeId);
                  return <span className="me-2">{c?.passengerTerm?.fi || c?.detailedCategoryName}</span>;
                })}
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
};

export default Train;
