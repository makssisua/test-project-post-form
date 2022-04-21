import React, { useState } from "react";
import "./postForm.scss";

export const PostForm = ({data, setData}) => {
  const [dateCombine, setDateCombine] = useState({
    name: "",
    firstValue: "",
    secondValue: ""
  });

  const [schedule , setSchedule] = useState('');

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handelCombineData = (e) => {
    const newDateCombine = {...dateCombine };
    const newData = { ...data };

    newDateCombine[e.target.id] = e.target.value;
    newDateCombine.name = e.target.name;
    let combine = `${newDateCombine.name} ${newDateCombine.firstValue} at ${newDateCombine.secondValue}`;

    if (newDateCombine.secondValue === "") {
      combine = `${newDateCombine.name} ${newDateCombine.firstValue}`;
    };

    setDateCombine(newDateCombine);

    newData.date = combine;
    setData(newData);
  }

  const handleSchedule = (e) => {
    const dateDefault = {
      name: "",
      firstValue: "",
      secondValue: ""
    }
    const dataDateDefault = {...data};
    dataDateDefault.date = "";

    setSchedule(e.target.value);
    setDateCombine(dateDefault);
    setData(dataDateDefault);
  }

 const renderSwitch = () => {
    switch(schedule) {
      case 'Specific date':
        return (
          <div>
            <label className="labelName">Date</label>
            <input
              id="firstValue"
              name="Date"
              type="date"
              value={dateCombine.firstValue}
              onChange={(e) => handelCombineData(e)}
            />
            <span className="separator">at</span>
            <input
              id="secondValue"
              name="Date"
              type="time"
              value={dateCombine.secondValue}
              onChange={(e) => handelCombineData(e)}
            />
          </div>
        ) ;

      case 'Daily':
        return (
          <div>
            <label className="labelName">Everyday at</label>
            <input
              id="firstValue"
              name="Everyday at"
              type="time"
              value={dateCombine.firstValue}
              onChange={(e) => handelCombineData(e)}
            />
          </div>
        ) ;

      case 'Weekly':
        return (
          <div>
            <label className="labelName">Every</label>
            <select name="Every" id="firstValue" onChange={(e) => handelCombineData(e)}>
              <option>Select</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday </option>
              <option value="Friday">Friday </option>
              <option value="Saturday">Saturday </option>
              <option value="Sunday">Sunday </option>
            </select>
            <span className="separator">at</span>
            <input
              id="secondValue"
              name="Every"
              type="time"
              value={dateCombine.secondValue}
              onChange={(e) => handelCombineData(e)}
            />
          </div>
        ) ;
      default:
        return null;
    }
  }

  return (
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
            <label className="labelName" htmlFor="ReportName">Report name</label>
            <input
              className="inputField"
              placeholder="Shareable Report"
              id="ReportName"
              name="name"
              type="text"
              value={data.name}
              onChange={(e) => handle(e)}
            />
          </div>

          <div>
            <span className="labelName">
              Format
            </span>
            <input
              type="radio"
              id="FormatChoice1"
              name="format"
              value="Excel"
              onClick={(e => handle(e))}
            />
            <label className="radioName" htmlFor="FormatChoice1">Excel</label>
              <input
                type="radio"
                id="FormatChoice2"
                name="format"
                value="CSV"
                onClick={(e => handle(e))}
              />
            <label className="radioName" htmlFor="FormatChoice2">CSV</label>
          </div>

          <div>
            <label className="labelName" htmlFor="EmailTo">E-mail to</label>
            <input
              className="inputField"
              placeholder="client@company.com"
              id="EmailTo"
              name="email"
              type="text"
              value={data.email}
              onChange={(e) => handle(e)}
            />
          </div>

          <div>
            <span className="labelName">Schedule</span>
            <input
              type="radio"
              id="ScheduleChoice1"
              name="Schedule"
              value="No repeat"
              onClick={(e) => handleSchedule(e)}
            />
            <label className="radioName" htmlFor="ScheduleChoice1">No Repeat</label>
            <input
              type="radio"
              id="ScheduleChoice2"
              name="Schedule"
              value="Specific date"
              onClick={(e) => handleSchedule(e)}
            />
            <label className="radioName" htmlFor="ScheduleChoice2">Specific date</label>
            <input
              type="radio"
              id="ScheduleChoice3"
              name="Schedule"
              value="Daily"
              onClick={(e) => handleSchedule(e)}
            />
            <label className="radioName" htmlFor="ScheduleChoice3">Daily</label>
            <input
              type="radio"
              id="ScheduleChoice4"
              name="Schedule"
              value="Weekly"
              onClick={(e) => handleSchedule(e)}
            />
            <label className="radioName" htmlFor="ScheduleChoice4">Weekly</label>
          </div>
          <div>
            {renderSwitch()}
          </div>
        </form>
      </div>
  );
}
