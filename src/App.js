import { useState } from "react";
import "./styles.css";
import { tasks } from "./tasks";
import { sortItems } from "./sort";

export default function App() {
  const [tasksData, setTasks] = useState(tasks);
  let sortedTasks = tasksData.sort((a, b) => a.dueDate - b.dueDate);
  const today = new Date();

  const categorizedData = {
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    thisMonth: [],
    nextMonth: []
  };

  sortedTasks.forEach(function (item) {
    const itemDate = new Date(item.dueDate);
    const diffDays = Math.ceil((itemDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      categorizedData.today.push(item);
    } else if (diffDays === 1) {
      categorizedData.tomorrow.push(item);
    } else if (diffDays <= 7) {
      categorizedData.thisWeek.push(item);
    } else if (diffDays <= 14) {
      categorizedData.nextWeek.push(item);
    } else if (itemDate.getMonth() === today.getMonth()) {
      categorizedData.thisMonth.push(item);
    } else if (itemDate.getMonth() === today.getMonth() + 1) {
      categorizedData.nextMonth.push(item);
    }
  });

  function addClass(priority) {
    if (priority === "High") {
      return "high";
    } else if (priority === "Low") {
      return "low";
    } else if (priority === "Medium") {
      return "medium";
    } else if (priority === "Urgent") {
      return "urgent";
    }
  }

  const todayElements = categorizedData.today.map(function (item, index) {
    return (
      <div key={index.toString()} className="task-container">
        <span className="title"> {item.title} </span>
        <span className={addClass(item.priority)}> {item.priority} </span>
        <span> {item.status} </span>
        <span> {new Date(item.dueDate).toLocaleString()} </span>
      </div>
    );
  });

  const tomorrowElements = categorizedData.tomorrow.map(function (item, index) {
    return (
      <div key={index.toString()} className="task-container">
        <span className="title"> {item.title} </span>
        <span className={addClass(item.priority)}> {item.priority} </span>
        <span> {item.status} </span>
        <span> {new Date(item.dueDate).toLocaleString()} </span>
      </div>
    );
  });

  const thisWeekElements = categorizedData.thisWeek.map(function (item, index) {
    return (
      <div key={index.toString()} className="task-container">
        <span className="title"> {item.title} </span>
        <span className={addClass(item.priority)}> {item.priority} </span>
        <span> {item.status} </span>
        <span> {new Date(item.dueDate).toLocaleString()} </span>
      </div>
    );
  });

  const NextWeekElements = categorizedData.nextWeek.map(function (item, index) {
    return (
      <div key={index.toString()} className="task-container">
        <span className="title"> {item.title} </span>
        <span className={addClass(item.priority)}> {item.priority} </span>
        <span> {item.status} </span>
        <span> {new Date(item.dueDate).toLocaleString()} </span>
      </div>
    );
  });

  const thisMonthElements = categorizedData.thisMonth.map(function (
    item,
    index
  ) {
    return (
      <div key={index.toString()} className="task-container">
        <span className="title"> {item.title} </span>
        <span className={addClass(item.priority)}> {item.priority} </span>
        <span> {item.status} </span>
        <span> {new Date(item.dueDate).toLocaleString()} </span>
      </div>
    );
  });

  const nextMonthElements = categorizedData.nextMonth.map(function (
    item,
    index
  ) {
    return (
      <div key={index.toString()} className="task-container">
        <span className="title"> {item.title} </span>
        <span className={addClass(item.priority)}> {item.priority} </span>
        <span> {item.status} </span>
        <span> {new Date(item.dueDate).toLocaleString()} </span>
      </div>
    );
  });

  return (
    <div className="App">
      <div>
        <h5> Today </h5>
        {todayElements}
        <h5> Tomorrow </h5>
        {tomorrowElements}
        <h5> This week </h5>
        {thisWeekElements}
        <h5> Next week </h5>
        {NextWeekElements}

        <h5> This month </h5>
        {thisMonthElements}

        <h5> Next month </h5>
        {nextMonthElements}
      </div>
    </div>
  );
}
