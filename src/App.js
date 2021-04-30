
import './App.css';
import { useState, useEffect } from 'react';

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [sDate, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("date");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstYear, setFirstYear] = useState(new Date().getFullYear() - 12);
  const [lastYear, setLastYear] = useState(new Date().getFullYear() + 12);
  useEffect(() => {
    
  }, [])
  function getYears() {
    let yearItems = [];
    for(let i = firstYear; i <= lastYear; i++) {
      yearItems.push(<div key={i} onClick={() => onSelectYear(i)} className={i === sDate.getFullYear() ? 'today' : ''}>{i}</div>)
    }
    return yearItems;

  }
  function getDays() {
    const lastDay = new Date(
      sDate.getFullYear(),
      sDate.getMonth() + 1,
      0
    ).getDate();
  
    const prevLastDay = new Date(
      sDate.getFullYear(),
      sDate.getMonth(),
      0
    ).getDate();
    const firstDayIndex = sDate.getDay();
    const lastDayIndex = new Date(
      sDate.getFullYear(),
      sDate.getMonth() + 1,
      0
    ).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    let days = [];
    
    for (let x = firstDayIndex; x > 0; x--) {
      days.push(<div key={x - 31} className="prev-date">{prevLastDay - x + 1}</div>);
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        (i === new Date().getDate() &&
        sDate.getMonth() === new Date().getMonth() && i === selectedDate.getDate()) || (i === selectedDate.getDate())
      ) {
        days.push(<div key={i + 31} onClick={() => onSelectDate(i)} className="today">{i}</div>);
      } else {
        days.push(<div key={i + 31} onClick={() =>  onSelectDate(i)}>{i}</div>);
      }
    }
    for (let j = 1; j <= nextDays; j++) {
      days.push(<div key={j} className="next-date">{j}</div>)
    }
    return days;
  }
  function getMonths() {
    let monthItems = [];
    for(let i = 0; i < months.length; i++) {
      monthItems.push(<div key={i} onClick={() => onSelectMonth(i)}>{months[i]}</div>)
    }
    return monthItems
  }
  async function onSelectYear(year) {
    await setDate(new Date(
      year,
      sDate.getMonth(),
      sDate.getDate()
    ))
    setCurrentView("date")
    resetYear(year)
  }
  function resetYear(year) {
      setFirstYear(year - 12);
      setLastYear(year + 12);
  }
  function onSelectMonth(month) {
    setDate(new Date(
      sDate.getFullYear(),
      month,
      sDate.getDate()
    ))
    setCurrentView("date")
  }
  function goBack() {
    if(currentView === "year") {
      setLastYear(firstYear - 1);
      setFirstYear(firstYear - 25);
    } else {
      setDate(new Date(
        sDate.getFullYear(),
        sDate.getMonth() - 1,
        sDate.getDate()
      ))
    }
  }
  function goForward() {
    if(currentView === "year") {
      setFirstYear(lastYear + 1);
      setLastYear(lastYear + 25);
    } else {
    setDate(new Date(
      sDate.getFullYear(),
      sDate.getMonth() + 1,
      sDate.getDate()
    ))
    }
  }
  function onSelectDate(day) {
    setSelectedDate(new Date(
      sDate.getFullYear(),
      sDate.getMonth() + 1,
      day
    ))
  }

  return (
    <div className="container">
      <div className="calendar">
        <div className="month">
          <div>{ currentView !== "month" && <i onClick={() => goBack()} className="prev">&#60;</i> }</div>
          <div className="date">
          { currentView !== "month" && <h1 onClick={() => setCurrentView("year")}>{sDate.getFullYear()}</h1> }
            { currentView !== "year" && <h1 onClick={() => setCurrentView("month")}>{months[sDate.getMonth()]}</h1> }
            <p>{sDate.toDateString()}</p>
          </div>
          <div>{ currentView !== "month" && <i onClick={() => goForward()} className="next">&#62;</i> }</div>
        </div>
        { currentView === "date" && <div className="weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div> }
        { currentView === "date" && <div className="days">{getDays()}</div>}
        { currentView === "month" && <div className="months">{getMonths()}</div> }
        { currentView === "year" && <div className="years">{getYears()}</div> }
      </div>
    </div>
  );
}

export default App;
