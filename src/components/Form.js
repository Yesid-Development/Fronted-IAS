import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import schema from '../utils/form_schema';

const Form = ({ receiveData }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [service, setService] = useState({
    idTechnician: '',
    idService: '',
    initialDate: '',
    finalDate: '',
  });

  const [dateErrors, setDateErrors] = useState({
    errInitialDate: '',
    errFinalDate: '',
  });

  const [success, setSuccess] = useState('');
  const { idTechnician, idService } = service;

  const sendForm = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    };
    await fetch('http://localhost:4000/api/add', requestOptions).then(
      (response) => {
        receiveData();
        response.json();
      }
    );
  };

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    sendForm();
    setSuccess('Registro exitoso');
  };

  return (
    <div className="container-form">
      <form
        className="p-5 mt-5 form-contacto needs-validation"
        onSubmit={handleSubmit(onSubmit)}
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
            ref={register}
          />
          {errors.idTechnician ? (
            <p className="error text-center">{errors.idTechnician?.message}</p>
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
            ref={register}
          />
          {errors.idService && (
            <p className="error text-center">{errors.idService?.message}</p>
          )}
        </div>

        <div className="form-group d-flex flex-column">
          <label htmlFor="initialDate">Dia/Hora Inicial</label>
          <DatePicker
            showTimeSelect
            className="form-control"
            name="initialDate"
            selected={service.initialDate}
            onChange={(date) => {
              if (Date.parse(date) >= Date.parse(service.finalDate)) {
                setDateErrors({
                  ...dateErrors,
                  errInitialDate:
                    'La fecha/hora inicial debe ser menor a la final',
                });
              } else {
                setDateErrors({
                  ...dateErrors,
                  errInitialDate: '',
                });
                setService({
                  ...service,
                  initialDate: date,
                });
              }
            }}
            ref={register}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          {service.initialDate === '' ? (
            <p className="error text-center">Este campo es obligatorio</p>
          ) : (
            dateErrors.errInitialDate && (
              <p className="error text-center">{dateErrors.errInitialDate}</p>
            )
          )}
        </div>

        <div className="form-group d-flex flex-column">
          <label htmlFor="finalDate">Dia/Hora Final</label>
          <DatePicker
            showTimeSelect
            className="form-control"
            name="finalDate"
            selected={service.finalDate}
            onChange={(date) => {
              if (Date.parse(date) <= Date.parse(service.initialDate)) {
                setDateErrors({
                  ...dateErrors,
                  errFinalDate:
                    'La fecha/hora final debe ser mayor a la inicial',
                });
              } else {
                setDateErrors({
                  ...dateErrors,
                  errFinalDate: '',
                });
                setService({
                  ...service,
                  finalDate: date,
                });
              }
            }}
            ref={register}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          {service.finalDate === '' ? (
            <p className="error text-center">Este campo es obligatorio</p>
          ) : (
            dateErrors.errFinalDate && (
              <p className="error text-center">{dateErrors.errFinalDate}</p>
            )
          )}
        </div>
        {success && <p className="success text-center">{success}</p>}
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
