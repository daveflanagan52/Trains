import { faTrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Column from '../Column';
import Container from '../Container';
import FormCheckSwitch from '../FormCheckSwitch';
import Row from '../Row';
import Time from '../Time';

interface HeaderProps {
  numTrains: number,
  showOnlyPassenger: boolean,
  setShowOnlyPassenger: Function,
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const location = useLocation();
  const showWelcome = location.pathname === '/';
  return (
    <header className="home">
      <div className="divider-shape">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="shape-waves">
          <path className="shape-fill shape-fill-1" d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z" />
        </svg>
      </div>
      <Container>
        <Row className="g-0">
          <Column md={6}>
            <Link to="/" className="navbar-brand">
              <FontAwesomeIcon className="me-2 text-primary" icon={faTrain} />
              Junat
            </Link>
          </Column>
          {!showWelcome && (
            <Column md={6}>
              <Row>
                <Column className="text-md-center" md={6}>
                  <p className="mb-0">Aktiiviset Junat</p>
                  <h2>{props.numTrains}</h2>
                </Column>
                <Column className="text-md-center" md={6}>
                  <p className="mb-0">Nykyinen Aika</p>
                  <h2><Time /></h2>
                </Column>
              </Row>
            </Column>
          )}
        </Row>
        {showWelcome && (
          <>
            <h2 className="my-2">Tervetuloa</h2>
            <Row>
              <Column md={6}>
                <p>
                  Täältä voit katsoa jokaisen suomalaisen juna-aseman lähtevien sekä saapuvien junien aikataulun, tai nähdä kaikki rautatieverkostolla olevat aktiiviset junat.
                  <br />
                  Huomaa, että joillakin junilla on GPS pois käytöstä, joten emme pysty näyttämään sijaintia.
                  <br />
                  Tiedot päivitetään automaattisesti 15 sekunnin välein.
                </p>
              </Column>
              <Column md={6}>
                <Row>
                  <Column md={6}>
                    <p className="mb-0 text-center">Aktiiviset Junat</p>
                    <h2 className="text-center">{props.numTrains}</h2>
                  </Column>
                  <Column md={6}>
                    <p className="mb-0 text-center">Nykyinen Aika</p>
                    <h2 className="text-center"><Time /></h2>
                  </Column>
                </Row>
              </Column>
            </Row>
          </>
        )}
        <FormCheckSwitch id="cargo" name="cargo" value onChange={() => props.setShowOnlyPassenger(!props.showOnlyPassenger)} checked={props.showOnlyPassenger} text="Näytä vain matkustajajunat" />
      </Container>
    </header>
  );
};

export default Header;
