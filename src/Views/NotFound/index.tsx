import React from 'react';
import { Helmet } from 'react-helmet';
import Button, { ButtonType } from '../../Components/Button';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Junat | 404</title>
      </Helmet>
      <div className="text-center">
        <h2>
          404: Sivua ei löydetty
        </h2>
        <p>Emme löydä etsimääsi sivua.</p>
        <Button type={ButtonType.Primary} link="/" text="Takaisin kotiin" icon={faUndo} />
      </div>
    </>
  );
};

export default NotFound;
