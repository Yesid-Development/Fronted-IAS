import React from 'react';
import Form from './Form';
import CalculatorTable from './Table';

const App = () => {
  return (
    <main className="container mb-5 pb-5">
      <div className="row mb-5 pb-4 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-5">
          <Form />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CalculatorTable />
        </div>
      </div>
    </main>
  );
};

export default App;
