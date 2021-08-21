import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import './App.scss';

import Container from './Components/Container';
import Header from './Components/Header';
import Loader from './Components/Loader';
import ScrollToTop from './Components/ScrollToTop';

import Home from './Views/Home';
import Privacy from './Views/Privacy';
import NotFound from './Views/NotFound';
import Trains from './Views/Trains';
import Train from './Views/Train';
import Stations from './Views/Stations';

import { useGetDetailedCauseCategoryCodesQuery, useGetLiveTrainsQuery, useGetStationsQuery } from './Services/Data';

const App: React.FC = () => {
  const trains = useGetLiveTrainsQuery(undefined, {
    pollingInterval: 15 * 1000,
  });
  const stations = useGetStationsQuery(undefined);
  const delayCauses = useGetDetailedCauseCategoryCodesQuery(undefined);
  const [showOnlyPassenger, setShowOnlyPassenger] = useState(true);
  return (
    <Router>
      <Loader show={trains.isLoading || stations.isLoading || delayCauses.isLoading} />
      <ScrollToTop />
      <Header setShowOnlyPassenger={(value: boolean) => setShowOnlyPassenger(value)} showOnlyPassenger={showOnlyPassenger} numTrains={trains?.data?.length || 0} />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home showOnlyPassenger={showOnlyPassenger} trains={trains.data || []} stations={stations.data || []} />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/trains">
            <Trains showOnlyPassenger={showOnlyPassenger} trains={trains.data || []} stations={stations.data || []} />
          </Route>
          <Route path="/train/:id">
            <Train delayCauses={delayCauses.data || []} trains={trains.data || []} stations={stations.data || []} />
          </Route>
          <Route path="/stations">
            <Stations showOnlyPassenger={showOnlyPassenger} stations={stations.data || []} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <footer className=" d-flex">
          &copy; Copyright 2021 Dave Flanagan
          <Link className="ms-auto" to="/privacy">Tietosuojakäytäntö</Link>
        </footer>
      </Container>
    </Router>
  )
};

export default App;
