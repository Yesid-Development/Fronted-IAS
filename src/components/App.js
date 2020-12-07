import React from 'react';
import Form from './Form';

const App = () => {
  return (
    <main className="container">
      <div className="row mb-5 pb-4 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-5">
          <Form />
        </div>
        <div className="col-12 col-md-6 col-lg-5">
          <img src="img/image.png" className="img-fluid" alt="sigma-image" />
        </div>
      </div>
    </main>
  );
};

export default App;
