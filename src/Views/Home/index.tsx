import React from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { faSchool, faSearch, faTrain } from '@fortawesome/free-solid-svg-icons';

import Row from '../../Components/Row';
import Column from '../../Components/Column';
import Button, { ButtonType } from '../../Components/Button';
import FormLabel from '../../Components/FormLabel';
import FormInput, { FormInputType } from '../../Components/FormikInput/FormInput';
import InputGroup from '../../Components/InputGroup';
import { Train, Station } from '../../Types';
import TrainCard from '../../Components/TrainCard';

interface HomeProps {
  trains: Train[],
  stations: Station[],
  showOnlyPassenger: boolean,
}

const Home: React.FC<HomeProps> = (props) => {
  const passengerTrains = ['Long-distance', 'Commuter'];
  const lateTrains = (props.trains || [])
    .filter(train => !props.showOnlyPassenger || passengerTrains.includes(train.trainCategory))
    .filter(train => train.timeTableRows.find(row => moment(row.liveEstimateTime).isAfter(row.scheduledTime)));
  return (
    <>
      <Helmet>
        <title>Junat</title>
      </Helmet>
      <Row>
        <Column md={6}>
          <p>Tätä sovellusta jatkuvasti päivitetään, jos sinulla on ideoita tai pyyntöjä ota yhteyttä.</p>
          <p className="mb-5">Kaikki tiedot on saatu Liikenneviraston <a href="https://rata.digitraffic.fi/api/v1/doc/index.html" target="_blank">Digitraffic API</a>:lta. Tämä API on lisensoitu <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>.</p>
        </Column>
        <Column md={6} className='search'>
          <p className="handwritten">Valitse jokin näistä kahdesta vaihtoehdosta.</p>
          <div className="d-flex mb-2">
            <Button className='flex-fill me-2 text-white' type={ButtonType.Primary} link="/trains" text='Näytä Junat' icon={faTrain} />
            <Button className='flex-fill ms-2 text-white' type={ButtonType.Primary} link="/stations" text='Näytä Asemat' icon={faSchool} />
          </div>
          <FormLabel text='Tai Hae' htmlFor='search' />
          <InputGroup>
            <FormInput type={FormInputType.Text} name='search' id='search' value='' placeHolder='Juna numero/Asema nimi' />
            <Button type={ButtonType.Primary} className="text-white" icon={faSearch} />
          </InputGroup>
        </Column>
      </Row>
      <h2 className="mb-3">Viivästyneet junat</h2>
      <Row>
        {lateTrains.map(train => <Column md={4} key={train.trainNumber}><TrainCard stations={props.stations} train={train} /></Column>)}
      </Row>
    </>
  );
};

export default Home;