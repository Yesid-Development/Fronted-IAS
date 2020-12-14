import React, { useState } from 'react';
import moment from 'moment';
import Form from './Form';
import CalculatorTable from './Table';
import _ from 'lodash';

const App = () => {
  const [state, setState] = useState({
    data: [],
  });

  const [search, setSearch] = useState({
    search: '',
    data: [],
  });

  const receiveData = async () => {
    let resp = await fetch('http://localhost:4000/api/findAll');
    const data = await resp.json();
    validData(data);
  };

  const validData = (data) => {
    const finalData = _.chain(data)
      .map((technician) => {
        let countH = {};
        const groupWeek = _.chain(technician.items)
          .map(
            (item) =>
              (item = _.assign(item, { week: moment(item.initialDate).week() }))
          )
          .groupBy('week')
          .map((array, key) => {
            if (_.isEmpty(countH[key])) {
              countH[key] = 0;
            }

            const data = array.map((item) => {
              const initDate = moment(item.initialDate);
              const endDate = moment(item.finalDate);
              const workHours = endDate.diff(initDate, 'hours');
              const finalObject = {};

              if (
                initDate.day() >= 1 &&
                initDate.day() <= 6 &&
                endDate.day() >= 1 &&
                endDate.day() <= 6
              ) {
                if (workHours <= 13 && initDate.hour() <= 20) {
                  if (countH[key] >= 48) {
                    finalObject['normalHoursEx'] = endDate.diff(
                      initDate,
                      'hours'
                    );
                  } else {
                    const aux = endDate.diff(initDate, 'hours');

                    if (countH[key] + aux >= 48) {
                      const auxEx = 48 - countH[key];
                      finalObject['normalHoursEx'] = auxEx;
                      finalObject['normalHours'] = aux - auxEx;
                      countH[key] = 48;
                    } else {
                      countH[key] += endDate.diff(initDate, 'hours');
                      finalObject['normalHours'] = endDate.diff(
                        initDate,
                        'hours'
                      );
                    }
                  }
                } else {
                  if (initDate.hour() >= 20) {
                    if (countH[key] >= 48) {
                      finalObject['nightHoursEx'] = endDate.diff(
                        initDate,
                        'hours'
                      );
                    } else {
                      const aux = endDate.diff(initDate, 'hours');

                      if (countH[key] + aux >= 48) {
                        const auxEx = 48 - countH[key];
                        finalObject['nightHoursEx'] = auxEx;
                        finalObject['nightHours'] = aux - auxEx;
                        countH[key] = 48;
                      } else {
                        countH[key] += endDate.diff(initDate, 'hours');
                        finalObject['nightHours'] = endDate.diff(
                          initDate,
                          'hours'
                        );
                      }
                    }
                  }
                }
              } else {
                if (initDate.day() === 0) {
                  if (countH[key] >= 48) {
                    finalObject['sundayHoursEx'] = endDate.diff(
                      initDate,
                      'hours'
                    );
                  } else {
                    finalObject['sundayHours'] = endDate.diff(
                      initDate,
                      'hours'
                    );
                    countH[key] += endDate.diff(initDate, 'hours');
                  }
                }
              }
              finalObject['week'] = initDate.week();
              item = _.assign(item, finalObject);

              return item;
            });
            return data;
          })
          .map((item) => {
            const aux = {};
            aux['normalHours'] = _.sumBy(item, 'normalHours');
            aux['normalHoursEx'] = _.sumBy(item, 'normalHoursEx');
            aux['nightHours'] = _.sumBy(item, 'nightHours');
            aux['nightHoursEx'] = _.sumBy(item, 'nightHoursEx');
            aux['sundayHours'] = _.sumBy(item, 'sundayHours');
            aux['sundayHoursEx'] = _.sumBy(item, 'sundayHoursEx');
            aux['idTechnician'] = item[0].idTechnician;
            aux['week'] = item[0].week;
            return aux;
          })
          .value();
        countH = {};
        return groupWeek;
      })
      .flatten()
      .value();

    setState({
      ...state,
      data: finalData,
    });
    setSearch({
      ...search,
      data: finalData,
    });
    console.log('-----Data table: ', finalData);
  };

  return (
    <main className="container mb-5 pb-5">
      <div className="row mb-5 pb-4 justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <Form receiveData={receiveData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CalculatorTable receiveData={receiveData} state={state} search={search} setSearch={setSearch} />
        </div>
      </div>
    </main>
  );
};

export default App;
