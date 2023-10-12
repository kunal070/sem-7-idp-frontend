import React,{useState} from 'react';
// import ReactTooltip from 'react-tooltip';
import ActivityCalendar from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



function Booking() {

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setStartDate(null);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedOption1(null)
  };

  const handleSelectChange1 = (event) =>{
  }
    function generateTooltipText(item) {
        return `Count: ${item.count} on ${item.date}`;
      }
      const [startDate, setStartDate] = useState(null); // Initialize startDate as null

      const isDateSelected = startDate !== null; // Check if a date is selected

  const data = [
        {
          count: 0,
          date: "2021-01-01",
          level: 0
        },
        {
          count: 0,
          date: "2021-01-02",
          level: 0
        },
        {
          count: 3,
          date: "2021-01-03",
          level: 2
        },
        {
          count: 1,
          date: "2021-01-04",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-05",
          level: 0
        },
        {
          count: 3,
          date: "2021-01-06",
          level: 2
        },
        {
          count: 0,
          date: "2021-01-07",
          level: 0
        },
        {
          count: 1,
          date: "2021-01-08",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-09",
          level: 0
        },
        {
          count: 2,
          date: "2021-01-10",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-11",
          level: 0
        },
        {
          count: 0,
          date: "2021-01-12",
          level: 0
        },
        {
          count: 0,
          date: "2021-01-13",
          level: 0
        },
        {
          count: 3,
          date: "2021-01-14",
          level: 2
        },
        {
          count: 1,
          date: "2021-01-15",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-16",
          level: 0
        },
        {
          count: 6,
          date: "2021-01-17",
          level: 3
        },
        {
          count: 0,
          date: "2021-01-18",
          level: 0
        },
        {
          count: 5,
          date: "2021-01-19",
          level: 2
        },
        {
          count: 1,
          date: "2021-01-20",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-21",
          level: 0
        },
        {
          count: 3,
          date: "2021-01-22",
          level: 2
        },
        {
          count: 1,
          date: "2021-01-23",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-24",
          level: 0
        },
        {
          count: 0,
          date: "2021-01-25",
          level: 0
        },
        {
          count: 0,
          date: "2021-01-26",
          level: 0
        },
        {
          count: 2,
          date: "2021-01-27",
          level: 1
        },
        {
          count: 0,
          date: "2021-01-28",
          level: 0
        },
        {
          count: 5,
          date: "2021-01-29",
          level: 2
        },
        {
          count: 4,
          date: "2021-01-30",
          level: 2
        },
        {
          count: 1,
          date: "2021-01-31",
          level: 1
        },
        {
          count: 4,
          date: "2021-02-01",
          level: 2
        },
        {
          count: 0,
          date: "2021-02-02",
          level: 0
        },
        {
          count: 2,
          date: "2021-02-03",
          level: 1
        },
        {
          count: 1,
          date: "2021-02-04",
          level: 1
        },
        {
          count: 0,
          date: "2021-02-05",
          level: 0
        },
        {
          count: 3,
          date: "2021-02-06",
          level: 2
        },
        {
          count: 4,
          date: "2021-02-07",
          level: 2
        },
        {
          count: 6,
          date: "2021-02-08",
          level: 3
        },
        {
          count: 1,
          date: "2021-02-09",
          level: 1
        },
        {
          count: 0,
          date: "2021-02-10",
          level: 0
        },
        {
          count: 7,
          date: "2021-02-11",
          level: 3
        },
        {
          count: 1,
          date: "2021-02-12",
          level: 1
        },
        {
          count: 0,
          date: "2021-02-13",
          level: 0
        },
        {
          count: 0,
          date: "2021-02-14",
          level: 0
        },
        {
          count: 1,
          date: "2021-02-15",
          level: 1
        },
        {
          count: 0,
          date: "2021-02-16",
          level: 0
        },
        {
          count: 2,
          date: "2021-02-17",
          level: 1
        },
        {
          count: 0,
          date: "2021-02-18",
          level: 0
        },
        {
          count: 6,
          date: "2021-02-19",
          level: 3
        },
        {
          count: 4,
          date: "2021-02-20",
          level: 2
        },
        {
          count: 1,
          date: "2021-02-21",
          level: 1
        },
        {
          count: 0,
          date: "2021-02-22",
          level: 0
        },
        {
          count: 3,
          date: "2021-02-23",
          level: 2
        },
        {
          count: 2,
          date: "2021-02-24",
          level: 1
        },
        {
          count: 1,
          date: "2021-02-25",
          level: 1
        },
        {
          count: 4,
          date: "2021-02-26",
          level: 2
        },
        {
          count: 0,
          date: "2021-02-27",
          level: 0
        },
        {
          count: 4,
          date: "2021-02-28",
          level: 2
        },
        {
          count: 4,
          date: "2021-03-01",
          level: 2
        },
        {
          count: 0,
          date: "2021-03-02",
          level: 0
        },
        {
          count: 2,
          date: "2021-03-03",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-04",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-05",
          level: 0
        },
        {
          count: 1,
          date: "2021-03-06",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-07",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-08",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-09",
          level: 0
        },
        {
          count: 1,
          date: "2021-03-10",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-11",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-12",
          level: 0
        },
        {
          count: 2,
          date: "2021-03-13",
          level: 1
        },
        {
          count: 5,
          date: "2021-03-14",
          level: 2
        },
        {
          count: 1,
          date: "2021-03-15",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-16",
          level: 0
        },
        {
          count: 3,
          date: "2021-03-17",
          level: 2
        },
        {
          count: 1,
          date: "2021-03-18",
          level: 1
        },
        {
          count: 1,
          date: "2021-03-19",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-20",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-21",
          level: 0
        },
        {
          count: 1,
          date: "2021-03-22",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-23",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-24",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-25",
          level: 0
        },
        {
          count: 1,
          date: "2021-03-26",
          level: 1
        },
        {
          count: 0,
          date: "2021-03-27",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-28",
          level: 0
        },
        {
          count: 7,
          date: "2021-03-29",
          level: 3
        },
        {
          count: 0,
          date: "2021-03-30",
          level: 0
        },
        {
          count: 0,
          date: "2021-03-31",
          level: 0
        },
        {
          count: 7,
          date: "2021-04-01",
          level: 3
        },
        {
          count: 1,
          date: "2021-04-02",
          level: 1
        },
        {
          count: 0,
          date: "2021-04-03",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-04",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-05",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-06",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-07",
          level: 0
        },
        {
          count: 1,
          date: "2021-04-08",
          level: 1
        },
        {
          count: 4,
          date: "2021-04-09",
          level: 2
        },
        {
          count: 0,
          date: "2021-04-10",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-11",
          level: 0
        },
        {
          count: 7,
          date: "2021-04-12",
          level: 3
        },
        {
          count: 0,
          date: "2021-04-13",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-14",
          level: 0
        },
        {
          count: 3,
          date: "2021-04-15",
          level: 2
        },
        {
          count: 3,
          date: "2021-04-16",
          level: 2
        },
        {
          count: 3,
          date: "2021-04-17",
          level: 2
        },
        {
          count: 6,
          date: "2021-04-18",
          level: 3
        },
        {
          count: 2,
          date: "2021-04-19",
          level: 1
        },
        {
          count: 7,
          date: "2021-04-20",
          level: 3
        },
        {
          count: 3,
          date: "2021-04-21",
          level: 2
        },
        {
          count: 3,
          date: "2021-04-22",
          level: 2
        },
        {
          count: 3,
          date: "2021-04-23",
          level: 2
        },
        {
          count: 0,
          date: "2021-04-24",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-25",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-26",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-27",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-28",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-29",
          level: 0
        },
        {
          count: 0,
          date: "2021-04-30",
          level: 0
        },
        {
          count: 6,
          date: "2021-05-01",
          level: 3
        },
        {
          count: 1,
          date: "2021-05-02",
          level: 1
        },
        {
          count: 7,
          date: "2021-05-03",
          level: 3
        },
        {
          count: 3,
          date: "2021-05-04",
          level: 2
        },
        {
          count: 0,
          date: "2021-05-05",
          level: 0
        },
        {
          count: 1,
          date: "2021-05-06",
          level: 1
        },
        {
          count: 1,
          date: "2021-05-07",
          level: 1
        },
        {
          count: 6,
          date: "2021-05-08",
          level: 3
        },
        {
          count: 5,
          date: "2021-05-09",
          level: 2
        },
        {
          count: 0,
          date: "2021-05-10",
          level: 0
        },
        {
          count: 0,
          date: "2021-05-11",
          level: 0
        },
        {
          count: 5,
          date: "2021-05-12",
          level: 2
        },
        {
          count: 4,
          date: "2021-05-13",
          level: 2
        },
        {
          count: 0,
          date: "2021-05-14",
          level: 0
        },
        {
          count: 1,
          date: "2021-05-15",
          level: 1
        },
        {
          count: 0,
          date: "2021-05-16",
          level: 0
        },
        {
          count: 0,
          date: "2021-05-17",
          level: 0
        },
        {
          count: 0,
          date: "2021-05-18",
          level: 0
        },
        {
          count: 0,
          date: "2021-05-19",
          level: 0
        },
        {
          count: 0,
          date: "2021-05-20",
          level: 0
        },
        {
          count: 2,
          date: "2021-05-21",
          level: 1
        },
        {
          count: 2,
          date: "2021-05-22",
          level: 1
        },
        {
          count: 1,
          date: "2021-05-23",
          level: 1
        },
        {
          count: 1,
          date: "2021-05-24",
          level: 1
        },
        {
          count: 2,
          date: "2021-05-25",
          level: 1
        },
        {
          count: 6,
          date: "2021-05-26",
          level: 3
        },
        {
          count: 5,
          date: "2021-05-27",
          level: 2
        },
        {
          count: 0,
          date: "2021-05-28",
          level: 0
        },
        {
          count: 1,
          date: "2021-05-29",
          level: 1
        },
        {
          count: 5,
          date: "2021-05-30",
          level: 2
        },
        {
          count: 0,
          date: "2021-05-31",
          level: 0
        },
        {
          count: 4,
          date: "2021-06-01",
          level: 2
        },
        {
          count: 3,
          date: "2021-06-02",
          level: 2
        },
        {
          count: 0,
          date: "2021-06-03",
          level: 0
        },
        {
          count: 4,
          date: "2021-06-04",
          level: 2
        },
        {
          count: 0,
          date: "2021-06-05",
          level: 0
        },
        {
          count: 1,
          date: "2021-06-06",
          level: 1
        },
        {
          count: 0,
          date: "2021-06-07",
          level: 0
        },
        {
          count: 2,
          date: "2021-06-08",
          level: 1
        },
        {
          count: 2,
          date: "2021-06-09",
          level: 1
        },
        {
          count: 2,
          date: "2021-06-10",
          level: 1
        },
        {
          count: 1,
          date: "2021-06-11",
          level: 1
        },
        {
          count: 7,
          date: "2021-06-12",
          level: 3
        },
        {
          count: 0,
          date: "2021-06-13",
          level: 0
        },
        {
          count: 2,
          date: "2021-06-14",
          level: 1
        },
        {
          count: 4,
          date: "2021-06-15",
          level: 2
        },
        {
          count: 5,
          date: "2021-06-16",
          level: 2
        },
        {
          count: 4,
          date: "2021-06-17",
          level: 2
        },
        {
          count: 1,
          date: "2021-06-18",
          level: 1
        },
        {
          count: 6,
          date: "2021-06-19",
          level: 3
        },
        {
          count: 0,
          date: "2021-06-20",
          level: 0
        },
        {
          count: 0,
          date: "2021-06-21",
          level: 0
        },
        {
          count: 1,
          date: "2021-06-22",
          level: 1
        },
        {
          count: 7,
          date: "2021-06-23",
          level: 3
        },
        {
          count: 5,
          date: "2021-06-24",
          level: 2
        },
        {
          count: 3,
          date: "2021-06-25",
          level: 2
        },
        {
          count: 0,
          date: "2021-06-26",
          level: 0
        },
        {
          count: 1,
          date: "2021-06-27",
          level: 1
        },
        {
          count: 1,
          date: "2021-06-28",
          level: 1
        },
        {
          count: 0,
          date: "2021-06-29",
          level: 0
        },
        {
          count: 1,
          date: "2021-06-30",
          level: 1
        },
        {
          count: 8,
          date: "2021-07-01",
          level: 4
        },
        {
          count: 0,
          date: "2021-07-02",
          level: 0
        },
        {
          count: 2,
          date: "2021-07-03",
          level: 1
        },
        {
          count: 4,
          date: "2021-07-04",
          level: 2
        },
        {
          count: 0,
          date: "2021-07-05",
          level: 0
        },
        {
          count: 2,
          date: "2021-07-06",
          level: 1
        },
        {
          count: 8,
          date: "2021-07-07",
          level: 4
        },
        {
          count: 0,
          date: "2021-07-08",
          level: 0
        },
        {
          count: 5,
          date: "2021-07-09",
          level: 2
        },
        {
          count: 0,
          date: "2021-07-10",
          level: 0
        },
        {
          count: 5,
          date: "2021-07-11",
          level: 2
        },
        {
          count: 1,
          date: "2021-07-12",
          level: 1
        },
        {
          count: 6,
          date: "2021-07-13",
          level: 3
        },
        {
          count: 0,
          date: "2021-07-14",
          level: 0
        },
        {
          count: 4,
          date: "2021-07-15",
          level: 2
        },
        {
          count: 4,
          date: "2021-07-16",
          level: 2
        },
        {
          count: 0,
          date: "2021-07-17",
          level: 0
        },
        {
          count: 0,
          date: "2021-07-18",
          level: 0
        },
        {
          count: 0,
          date: "2021-07-19",
          level: 0
        },
        {
          count: 0,
          date: "2021-07-20",
          level: 0
        },
        {
          count: 2,
          date: "2021-07-21",
          level: 1
        },
        {
          count: 1,
          date: "2021-07-22",
          level: 1
        },
        {
          count: 2,
          date: "2021-07-23",
          level: 1
        },
        {
          count: 1,
          date: "2021-07-24",
          level: 1
        },
        {
          count: 5,
          date: "2021-07-25",
          level: 2
        },
        {
          count: 2,
          date: "2021-07-26",
          level: 1
        },
        {
          count: 1,
          date: "2021-07-27",
          level: 1
        },
        {
          count: 1,
          date: "2021-07-28",
          level: 1
        },
        {
          count: 0,
          date: "2021-07-29",
          level: 0
        },
        {
          count: 0,
          date: "2021-07-30",
          level: 0
        },
        {
          count: 0,
          date: "2021-07-31",
          level: 0
        },
        {
          count: 10,
          date: "2021-08-01",
          level: 4
        },
        {
          count: 1,
          date: "2021-08-02",
          level: 1
        },
        {
          count: 2,
          date: "2021-08-03",
          level: 1
        },
        {
          count: 0,
          date: "2021-08-04",
          level: 0
        },
        {
          count: 0,
          date: "2021-08-05",
          level: 0
        },
        {
          count: 4,
          date: "2021-08-06",
          level: 2
        },
        {
          count: 0,
          date: "2021-08-07",
          level: 0
        },
        {
          count: 1,
          date: "2021-08-08",
          level: 1
        },
        {
          count: 0,
          date: "2021-08-09",
          level: 0
        },
        {
          count: 0,
          date: "2021-08-10",
          level: 0
        },
        {
          count: 3,
          date: "2021-08-11",
          level: 2
        },
        {
          count: 6,
          date: "2021-08-12",
          level: 3
        },
        {
          count: 3,
          date: "2021-08-13",
          level: 2
        },
        {
          count: 4,
          date: "2021-08-14",
          level: 2
        },
        {
          count: 6,
          date: "2021-08-15",
          level: 3
        },
        {
          count: 0,
          date: "2021-08-16",
          level: 0
        },
        {
          count: 0,
          date: "2021-08-17",
          level: 0
        },
        {
          count: 0,
          date: "2021-08-18",
          level: 0
        },
        {
          count: 1,
          date: "2021-08-19",
          level: 1
        },
        {
          count: 0,
          date: "2021-08-20",
          level: 0
        },
        {
          count: 0,
          date: "2021-08-21",
          level: 0
        },
        {
          count: 2,
          date: "2021-08-22",
          level: 1
        },
        {
          count: 6,
          date: "2021-08-23",
          level: 3
        },
        {
          count: 6,
          date: "2021-08-24",
          level: 3
        },
        {
          count: 1,
          date: "2021-08-25",
          level: 1
        },
        {
          count: 4,
          date: "2021-08-26",
          level: 2
        },
        {
          count: 4,
          date: "2021-08-27",
          level: 2
        },
        {
          count: 1,
          date: "2021-08-28",
          level: 1
        },
        {
          count: 0,
          date: "2021-08-29",
          level: 0
        },
        {
          count: 0,
          date: "2021-08-30",
          level: 0
        },
        {
          count: 5,
          date: "2021-08-31",
          level: 2
        },
        {
          count: 5,
          date: "2021-09-01",
          level: 2
        },
        {
          count: 6,
          date: "2021-09-02",
          level: 3
        },
        {
          count: 5,
          date: "2021-09-03",
          level: 2
        },
        {
          count: 0,
          date: "2021-09-04",
          level: 0
        },
        {
          count: 1,
          date: "2021-09-05",
          level: 1
        },
        {
          count: 3,
          date: "2021-09-06",
          level: 2
        },
        {
          count: 7,
          date: "2021-09-07",
          level: 3
        },
        {
          count: 4,
          date: "2021-09-08",
          level: 2
        },
        {
          count: 0,
          date: "2021-09-09",
          level: 0
        },
        {
          count: 3,
          date: "2021-09-10",
          level: 2
        },
        {
          count: 1,
          date: "2021-09-11",
          level: 1
        },
        {
          count: 0,
          date: "2021-09-12",
          level: 0
        },
        {
          count: 0,
          date: "2021-09-13",
          level: 0
        },
        {
          count: 4,
          date: "2021-09-14",
          level: 2
        },
        {
          count: 4,
          date: "2021-09-15",
          level: 2
        },
        {
          count: 5,
          date: "2021-09-16",
          level: 2
        },
        {
          count: 3,
          date: "2021-09-17",
          level: 2
        },
        {
          count: 0,
          date: "2021-09-18",
          level: 0
        },
        {
          count: 0,
          date: "2021-09-19",
          level: 0
        },
        {
          count: 5,
          date: "2021-09-20",
          level: 2
        },
        {
          count: 4,
          date: "2021-09-21",
          level: 2
        },
        {
          count: 8,
          date: "2021-09-22",
          level: 4
        },
        {
          count: 0,
          date: "2021-09-23",
          level: 0
        },
        {
          count: 3,
          date: "2021-09-24",
          level: 2
        },
        {
          count: 9,
          date: "2021-09-25",
          level: 4
        },
        {
          count: 7,
          date: "2021-09-26",
          level: 3
        },
        {
          count: 1,
          date: "2021-09-27",
          level: 1
        },
        {
          count: 8,
          date: "2021-09-28",
          level: 4
        },
        {
          count: 2,
          date: "2021-09-29",
          level: 1
        },
        {
          count: 1,
          date: "2021-09-30",
          level: 1
        },
        {
          count: 1,
          date: "2021-10-01",
          level: 1
        },
        {
          count: 8,
          date: "2021-10-02",
          level: 4
        },
        {
          count: 1,
          date: "2021-10-03",
          level: 1
        },
        {
          count: 2,
          date: "2021-10-04",
          level: 1
        },
        {
          count: 1,
          date: "2021-10-05",
          level: 1
        },
        {
          count: 0,
          date: "2021-10-06",
          level: 0
        },
        {
          count: 4,
          date: "2021-10-07",
          level: 2
        },
        {
          count: 0,
          date: "2021-10-08",
          level: 0
        },
        {
          count: 3,
          date: "2021-10-09",
          level: 2
        },
        {
          count: 0,
          date: "2021-10-10",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-11",
          level: 0
        },
        {
          count: 1,
          date: "2021-10-12",
          level: 1
        },
        {
          count: 0,
          date: "2021-10-13",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-14",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-15",
          level: 0
        },
        {
          count: 6,
          date: "2021-10-16",
          level: 3
        },
        {
          count: 0,
          date: "2021-10-17",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-18",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-19",
          level: 0
        },
        {
          count: 1,
          date: "2021-10-20",
          level: 1
        },
        {
          count: 0,
          date: "2021-10-21",
          level: 0
        },
        {
          count: 4,
          date: "2021-10-22",
          level: 2
        },
        {
          count: 5,
          date: "2021-10-23",
          level: 2
        },
        {
          count: 0,
          date: "2021-10-24",
          level: 0
        },
        {
          count: 5,
          date: "2021-10-25",
          level: 2
        },
        {
          count: 0,
          date: "2021-10-26",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-27",
          level: 0
        },
        {
          count: 0,
          date: "2021-10-28",
          level: 0
        },
        {
          count: 1,
          date: "2021-10-29",
          level: 1
        },
        {
          count: 2,
          date: "2021-10-30",
          level: 1
        },
        {
          count: 3,
          date: "2021-10-31",
          level: 2
        },
        {
          count: 0,
          date: "2021-11-01",
          level: 0
        },
        {
          count: 5,
          date: "2021-11-02",
          level: 2
        },
        {
          count: 0,
          date: "2021-11-03",
          level: 0
        },
        {
          count: 0,
          date: "2021-11-04",
          level: 0
        },
        {
          count: 0,
          date: "2021-11-05",
          level: 0
        },
        {
          count: 1,
          date: "2021-11-06",
          level: 1
        },
        {
          count: 0,
          date: "2021-11-07",
          level: 0
        },
        {
          count: 7,
          date: "2021-11-08",
          level: 3
        },
        {
          count: 0,
          date: "2021-11-09",
          level: 0
        },
        {
          count: 0,
          date: "2021-11-10",
          level: 0
        },
        {
          count: 3,
          date: "2021-11-11",
          level: 2
        },
        {
          count: 6,
          date: "2021-11-12",
          level: 3
        },
        {
          count: 2,
          date: "2021-11-13",
          level: 1
        },
        {
          count: 7,
          date: "2021-11-14",
          level: 3
        },
        {
          count: 0,
          date: "2021-11-15",
          level: 0
        },
        {
          count: 0,
          date: "2021-11-16",
          level: 0
        },
        {
          count: 5,
          date: "2021-11-17",
          level: 2
        },
        {
          count: 0,
          date: "2021-11-18",
          level: 0
        },
        {
          count: 9,
          date: "2021-11-19",
          level: 4
        },
        {
          count: 1,
          date: "2021-11-20",
          level: 1
        },
        {
          count: 6,
          date: "2021-11-21",
          level: 3
        },
        {
          count: 0,
          date: "2021-11-22",
          level: 0
        },
        {
          count: 3,
          date: "2021-11-23",
          level: 2
        },
        {
          count: 0,
          date: "2021-11-24",
          level: 0
        },
        {
          count: 5,
          date: "2021-11-25",
          level: 2
        },
        {
          count: 2,
          date: "2021-11-26",
          level: 1
        },
        {
          count: 2,
          date: "2021-11-27",
          level: 1
        },
        {
          count: 0,
          date: "2021-11-28",
          level: 0
        },
        {
          count: 0,
          date: "2021-11-29",
          level: 0
        },
        {
          count: 0,
          date: "2021-11-30",
          level: 0
        },
        {
          count: 0,
          date: "2021-12-01",
          level: 0
        },
        {
          count: 3,
          date: "2021-12-02",
          level: 2
        },
        {
          count: 0,
          date: "2021-12-03",
          level: 0
        },
        {
          count: 4,
          date: "2021-12-04",
          level: 2
        },
        {
          count: 2,
          date: "2021-12-05",
          level: 1
        },
        {
          count: 0,
          date: "2021-12-06",
          level: 0
        },
        {
          count: 0,
          date: "2021-12-07",
          level: 0
        },
        {
          count: 5,
          date: "2021-12-08",
          level: 2
        },
        {
          count: 0,
          date: "2021-12-09",
          level: 0
        },
        {
          count: 0,
          date: "2021-12-10",
          level: 0
        },
        {
          count: 7,
          date: "2021-12-11",
          level: 3
        },
        {
          count: 4,
          date: "2021-12-12",
          level: 2
        },
        {
          count: 7,
          date: "2021-12-13",
          level: 3
        },
        {
          count: 0,
          date: "2021-12-14",
          level: 0
        },
        {
          count: 1,
          date: "2021-12-15",
          level: 1
        },
        {
          count: 2,
          date: "2021-12-16",
          level: 1
        },
        {
          count: 0,
          date: "2021-12-17",
          level: 0
        },
        {
          count: 3,
          date: "2021-12-18",
          level: 2
        },
        {
          count: 5,
          date: "2021-12-19",
          level: 2
        },
        {
          count: 0,
          date: "2021-12-20",
          level: 0
        },
        {
          count: 0,
          date: "2021-12-21",
          level: 0
        },
        {
          count: 0,
          date: "2021-12-22",
          level: 0
        },
        {
          count: 0,
          date: "2021-12-23",
          level: 0
        },
        {
          count: 6,
          date: "2021-12-24",
          level: 3
        },
        {
          count: 7,
          date: "2021-12-25",
          level: 3
        },
        {
          count: 2,
          date: "2021-12-26",
          level: 1
        },
        {
          count: 0,
          date: "2021-12-27",
          level: 0
        },
        {
          count: 1,
          date: "2021-12-28",
          level: 1
        },
        {
          count: 1,
          date: "2021-12-29",
          level: 1
        },
        {
          count: 0,
          date: "2021-12-30",
          level: 0
        },
        {
          count: 1,
          date: "2021-12-31",
          level: 1
        }
  ];
  const explicitTheme = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['rgba(15, 60, 105, 0.1)', 'rgba(15, 60, 105, 0.3)', 'rgba(15, 60, 105, 0.5)', 'rgba(15, 60, 105, 0.8)', 'rgb(15, 60, 105)'],
  };
  const calendarItems = data.map((item, index) => (
    <div
      key={index}
      data-tip={generateTooltipText(item)}
      data-for={`tooltip-${index}`}
    >
    </div>
  ));
  
  return (
    <>
    <div style={{ marginLeft: '350px',marginTop : '50px', color: 'black' }}>
      <ActivityCalendar
        theme={explicitTheme}
        blockMargin={4}
        color="#0F3C69"
        data={data}        
        labels={{
            legend: {
              less: "💩",
              more: "🥇"
            },
            months: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            totalCount: "{{count}} Booking in {{year}}",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          }}
          showWeekdayLabels="true"
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
            })
          }
           />
          </div>
           {calendarItems}
           <ReactTooltip id="react-tooltip" />
           <div style={{ marginLeft: '0px', padding: '100px 100px 30px 630px',color :'black' }}>
      <select
        name="companyType"
        value={selectedOption}
        onChange={handleSelectChange}
        required
        style={{
          backgroundColor: '#eee',
          fontSize: '100%',
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 38,
          paddingLeft: 15,
          marginRight: 2,
          borderRadius: 3,
          marginBottom: 2,
        }}
        >
        <option value="" disabled selected>Select LAB</option>
        <option value="power electronic">Power Electronic Lab</option>
        <option value="advance materials">Advance Materials Lab</option>
        <option value="cable">Cable Lab</option>
        <option value="high voltage">High Voltage Lab</option>
        <option value="magnetic material">Magnetic Material Lab</option>
        <option value="calibration">Calibration Lab</option>
      </select>
        </div>
      < div style={{padding : '10px 10px 0px 530px',color : 'black'}}>
      {selectedOption && (
      <DatePicker selected={startDate} onChange={handleDateChange} />
      )}
      {startDate && (<select
        name="companyType"
        value={selectedOption1}
        onChange={handleSelectChange1}
        required
        style={{
          backgroundColor: '#eee',
          fontSize: '100%',
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 90,
          paddingLeft: 20,
          marginRight: 2,
          borderRadius: 3,
          marginBottom: 2,
          marginLeft : 50
        }}
      >
          <option value="" disabled selected>Select Time  </option>
        <option value="private">8-11 AM</option>
        <option value="public">1-4 PM</option>
        <option value="corporate">5-8pm</option>
      </select>)}
      </div>
</>
  );
}

export default Booking;
