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
        <Row>
          <Column md={6}>
            <Link to="/">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUYAAAGnCAYAAADLz/7XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNGOTk3QUM3MUEyNzExRTk4QzA0QjUwQkFDMDY0NDQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNGOTk3QUM4MUEyNzExRTk4QzA0QjUwQkFDMDY0NDQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0Y5OTdBQzUxQTI3MTFFOThDMDRCNTBCQUMwNjQ0NDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0Y5OTdBQzYxQTI3MTFFOThDMDRCNTBCQUMwNjQ0NDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6v0WXVAAALHklEQVR42uzd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" alt="Junat" />
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
            <h2 className="mb-2">Tervetuloa</h2>
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
