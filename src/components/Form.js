import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = () => {
  // States
  const [service, setService] = useState({
    idTechnician: '',
    idService: '',
    initialDate: new Date(),
    finalDate: new Date(),
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
          <label htmlFor="initialDate">Dia</label>
          <DatePicker
            showTimeSelect
            className="form-control"
            name="initialDate"
            selected={service.initialDate}
            onChange={(date) =>
              setService({
                ...service,
                initialDate: date,
              })
            }
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          {errDate ? <p className="error text-center">{errDate}</p> : null}
        </div>

        <div className="form-group d-flex flex-column">
          <label htmlFor="finalDate">Dia</label>
          <DatePicker
            showTimeSelect
            className="form-control"
            name="finalDate"
            selected={service.finalDate}
            onChange={(date) =>
              setService({
                ...service,
                finalDate: date,
              })
            }
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          {errDate ? <p className="error text-center">{errDate}</p> : null}
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
