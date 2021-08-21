import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Row from '../../Components/Row';
import Column from '../../Components/Column';
import FormInput, { FormInputType } from '../../Components/FormInput';
import InputGroup from '../../Components/InputGroup';
import { ITrain, IStation } from '../../Types';
import TrainCard from '../../Components/TrainCard';
import InputGroupIcon from '../../Components/InputGroupIcon';

interface TrainsProps {
  trains: ITrain[],
  stations: IStation[],
  showOnlyPassenger: boolean,
}

const Trains: React.FC<TrainsProps> = (props) => {
  const [search, setSearch] = useState('');
  const passengerTrains = ['Long-distance', 'Commuter'];
  const showTrains = (props.trains || [])
    .filter((train) => (!props.showOnlyPassenger || passengerTrains.includes(train.trainCategory)) && (search.length === 0 || `${train.commuterLineID || train.trainType}${train.trainNumber}`.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <Helmet>
        <title>Junat | Junat</title>
      </Helmet>
      <InputGroup className="mb-3">
        <InputGroupIcon icon={faFilter} className="bg-primary text-white" />
        <FormInput onChange={(e) => setSearch(e.target.value)} type={FormInputType.Text} name="search" id="search" value={search} placeHolder="Hae..." />
      </InputGroup>
      <Row>
        {showTrains.map((train) => <Column md={4} key={train.trainNumber}><TrainCard stations={props.stations} train={train} /></Column>)}
      </Row>
    </>
  );
};

export default Trains;
