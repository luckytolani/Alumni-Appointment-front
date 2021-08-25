import './Student.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Student() {
  const [user ,setuser] = useState(null);
  const options = [
    { value: 1, label: '1 pm - 2 pm' },
    { value: 2, label: '4 pm - 5 pm' },
    { value: 3, label: '6 pm to 7 pm' }
  ]
  var date = new Date();
  date.setDate(date.getDate() + 7)
  const [startDate, setStartDate] = useState(new Date());
  const [slot, setslot] = useState(null)
  async function click(){
    // setuser(1)
    let data = {
      user:1,
      slot:slot,
      date:startDate
    }
    if(startDate < date){
      alert("you can only book after 7 days from now")
    }
    else{
      await axios({
        method: "post",
        url: "http://localhost:5000/appointuser",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          alert(res)         
        })
        .catch((err) => {
          alert("Error occured" + err);
          
        });

    }
  }
  return (
    <div className="Student">
      <h1>Book Appointment</h1>
      <div>
        <label>Pick the Date for Appointment</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div>
        <label>Pick the Slot</label>
        <Select options={options} onChange={(e) => 
          {setslot(e.value)}} />
      </div>
      <button style={{width:"100px" , height:"100%"}} onClick={click}>Book Appointment</button>
    </div>
  );
}

export default Student;
