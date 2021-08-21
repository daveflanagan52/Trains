import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Row from '../../Components/Row';
import Column from '../../Components/Column';
import FormInput, { FormInputType } from '../../Components/FormInput';
import InputGroup from '../../Components/InputGroup';
import InputGroupIcon from '../../Components/InputGroupIcon';
import StationCard from '../../Components/StationCard';
import { IStation } from '../../Types';

interface StationsProps {
  stations: IStation[],
  showOnlyPassenger: boolean,
}

const Stations: React.FC<StationsProps> = (props) => {
  const [search, setSearch] = useState('');
  const showStations = (props.stations || [])
    .filter((station) => (!props.showOnlyPassenger || station.passengerTraffic) && (search.length === 0 || station.stationName.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <Helmet>
        <title>Junat | Asemat</title>
      </Helmet>
      <InputGroup className="mb-3">
        <InputGroupIcon icon={faFilter} className="bg-primary text-white" />
        <FormInput onChange={(e) => setSearch(e.target.value)} type={FormInputType.Text} name="search" id="search" value={search} placeHolder="Hae..." />
      </InputGroup>
      <Row>
        {showStations.map((station) => <Column md={4} key={station.stationShortCode}><StationCard station={station} /></Column>)}
      </Row>
    </>
  );
};

export default Stations;
