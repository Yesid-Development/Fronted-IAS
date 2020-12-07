import React, { useState, useEffect, useReducer } from 'react';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = () => {
  // States
  const [startDate, setStartDate] = useState(new Date());
  const [initHour, setInitHour] = useState('8:00');
  const [finalHour, setFinalHour] = useState('10:00');
  const [service, setService] = useState({
    idTechnician: '',
    idService: '',
    date: startDate,
    initialHour: initHour,
    finalHour: finalHour,
  });
  const [error, setError] = useState({
    errTechnician: '',
    errService: '',
    errDate: '',
    errHour: '',
    errGlobal: '',
  });

  // Variables
  const [success, setSuccess] = useState('');
  const { idTechnician, idService } = service;
  const { errTechnician, errService, errDate, errHour, errGlobal } = error;

  // Methods
  const sendForm = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    };
    await fetch(
      'http://localhost:4000/api/add',
      requestOptions
    ).then((response) => response.json());
  };

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pattern = new RegExp('^[a-zA-Z ]+$');

    // TODO: Validations
    sendForm();
  };

  const globalErrorsValidation = () => {
    if (success && errGlobal === '') {
      return <p className="success text-center">{success}</p>;
    } else if (errGlobal) {
      return <p className="error text-center">{errGlobal}</p>;
    } else return null;
  };

  return (
    <div className="container-form">
      <form
        className="p-5 mt-5 form-contacto needs-validation"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="form-group">
          <label htmlFor="idTechnician">ID Técnico</label>
          <input
            type="number"
            className="form-control"
            id="idTechnician"
            name="idTechnician"
            placeholder="Solo numeros"
            value={idTechnician}
            onChange={handleChange}
          />
          {errTechnician ? (
            <p className="error text-center">{errTechnician}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="idService">ID Servicio</label>
          <input
            type="number"
            className="form-control"
            id="idService"
            name="idService"
            placeholder="Solo numeros"
            value={idService}
            onChange={handleChange}
          />
          {errService ? (
            <p className="error text-center">{errService}</p>
          ) : null}
        </div>
        <div className="form-group d-flex flex-column">
          <label htmlFor="date">Dia</label>
          <DatePicker
            className="form-control"
            id="date"
            name="date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {errDate ? <p className="error text-center">{errDate}</p> : null}
        </div>
        <div className="form-group">
          <label htmlFor="initialHour">Hora inicial (hora militar)</label>

          <TimePicker
            className="form-control"
            id="initialHour"
            name="initialHour"
            disableClock="true"
            onChange={setInitHour}
            value={initHour}
          />
          {errHour ? <p className="error text-center">{errHour}</p> : null}
        </div>
        <div className="form-group">
          <label htmlFor="finalHour">Hora final (hora militar)</label>
          <TimePicker
            className="form-control"
            id="finalHour"
            name="finalHour"
            disableClock="true"
            onChange={setFinalHour}
            value={finalHour}
          />
          {errHour ? <p className="error text-center">{errHour}</p> : null}
        </div>
        {(() => {
          globalErrorsValidation();
        })()}
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-uppercase">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
