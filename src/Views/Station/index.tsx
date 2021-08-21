import React from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import {
  MapContainer, TileLayer, Marker, useMap,
} from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';

import { useParams } from 'react-router';
import { ITrain, IStation } from '../../Types';
import Card from '../../Components/Card';
import img from '../../Resources/station.png';

const stationIcon = new L.Icon({
  iconUrl: img,
  iconAnchor: [16, 37],
  popupAnchor: [16, -37],
  iconSize: [32, 37],
});

interface StationProps {
  trains: ITrain[],
  stations: IStation[],
  showOnlyPassenger: boolean,
}

interface FollowCenterProps {
  center: LatLngTuple,
}

interface StationParams {
  id: string,
}

const FollowCenter: React.FC<FollowCenterProps> = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Station: React.FC<StationProps> = ({ showOnlyPassenger, trains, stations }) => {
  const { id } = useParams<StationParams>();
  const passengerTrains = ['Long-distance', 'Commuter'];
  const now = moment();
  const station = (stations || []).find((station) => station.stationShortCode === id);
  const loc = [station?.longitude || 24.938379, station?.latitude || 60.169857];
  const passingTrains = trains.filter((train) => (!showOnlyPassenger || passengerTrains.includes(train.trainCategory)) && train.timeTableRows.find(row => row.trainStopping && row.stationShortCode === id)).sort((a, b) => {
    const aStop = a.timeTableRows.find(row => row.trainStopping && row.stationShortCode === id);
    const bStop = b.timeTableRows.find(row => row.trainStopping && row.stationShortCode === id);
    if (!aStop) {
      return -1;
    }
    if (!bStop) {
      return 1;
    }
    const aDate = aStop.actualTime || aStop.liveEstimateTime || aStop.scheduledTime;
    const bDate = bStop.actualTime || bStop.liveEstimateTime || bStop.scheduledTime;
    return new Date(aDate).getTime() - new Date(bDate).getTime();
  });
  return (
    <>
      <Helmet>
        <title>Junat | {station?.stationName || 'Asema'}</title>
      </Helmet>
      <h2 className="mb-3">
        {station?.stationName || 'Asema'}
      </h2>
      <Card className="mb-4" bodyClassName="p-0">
        <MapContainer style={{ height: '400px' }} center={[loc[1], loc[0]]} zoom={13} scrollWheelZoom={false}>
          <FollowCenter center={[loc[1], loc[0]]} />
          <TileLayer
            maxZoom={20}
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          <Marker position={[loc[1], loc[0]]} icon={stationIcon} />
        </MapContainer>
      </Card>
      <Card bodyClassName="p-0">
        <ul className="timeline">
          {passingTrains.map(train => {
            const stops = train.timeTableRows.filter(row => row.stationShortCode === id);
            return stops.map((row, index) => {
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
                    {train.commuterLineID || train.trainType}{train.trainNumber}
                    {row.type === 'DEPARTURE' && ' lähtee asemalta ' + (stations.find(station => station.stationShortCode === train.timeTableRows[train.timeTableRows.length - 1].stationShortCode)?.stationName.replace(' asema', '') || 'unknown')}
                    {row.type === 'ARRIVAL' && ' saapuu asemalta ' + (stations.find(station => station.stationShortCode === train.timeTableRows[0].stationShortCode)?.stationName.replace(' asema', '') || 'unknown')}
                    <span className="text-muted ms-auto">
                      Raide&nbsp;
                      {row.commercialTrack}
                    </span>
                  </div>
                </li>
              );
            })
          })}
        </ul>
      </Card>
    </>
  );
};

export default Station;
