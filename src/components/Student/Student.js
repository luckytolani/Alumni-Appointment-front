import './Student.css';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Logout from '../Logout/Logout';
import Appointment from '../Appointment/Appointment';

function Student(props) {
  const [data, setdata] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [slot, setslot] = useState(null)
  console.log(props.data.user + "  saved by me");
  const [maxapp, setmaxapp] = useState(false);
  const [previous, setprevious] = useState(false);
  useEffect( () => {
    async function fetchData(){
      await axios.get(`https://alumnibook.herokuapp.com/checkstudent/${props.data.user}`).then((res) => {
       if (res.data) {
         setmaxapp(true)
       }
     })
    }
    fetchData();
  }, [props.data.user, previous])
  useEffect( () => {
    async function fetchData(){
     await axios.get("https://alumnibook.herokuapp.com/checkavailable").then((res) => {
      if (res.data.length > 0) {
        setprevious(true)
      }
    })
  }
  fetchData();
  }, [data,previous,props.data.user])


  useEffect( () => {
    async function fetchData(){
     await axios.get(`https://alumnibook.herokuapp.com/getList/${props.data.user}`).then((res) => {
      setdata(res.data)
    })
  }
  fetchData();
  }, [data, previous, props.data.user])

  const options = [
    { value: 1, label: '1 pm - 2 pm' },
    { value: 2, label: '4 pm - 5 pm' },
    { value: 3, label: '6 pm to 7 pm' }
  ]
  var date = new Date();
  date.setDate(date.getDate() + 7)

  async function click() {
    if (startDate < date) {
      alert("you can only book after 7 days from now")
    }
    else if (!slot) {
      alert("select slot")
    }
    else {
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      startDate.setMilliseconds(0)
      console.log(startDate);
      let data = {
        user: props.data.user,
        slot: slot,
        date: startDate
      }
      await axios.get(`https://alumnibook.herokuapp.com/checkslot/${startDate}/${slot}`).then(async (res) => {
        console.log(res.data + "luckytolani");
        alert("no slot available on particular date try different")

      }).catch(async () => {
        await axios({
          method: "post",
          url: "https://alumnibook.herokuapp.com/appointuser",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(async (res) => {
            setprevious(true)
            alert("Congratulations Slot Booked")
          })
          .catch((err) => {
            alert("Error occured" + err);

          });
      })
    }
  }
  return (
    <div className="Student" style={{width:"70%", marginLeft:"auto", marginRight:"auto"}} >
      <h2>Book Appointment</h2>
      <h2>Welcome <strong style={{ color: "red" }}>{props.data.user}</strong></h2>
      {/* <h1>Welcome {props.data._id}</h1> */}
      <Logout></Logout>
      <div>
        <label>Pick the Date for Appointment</label>
        <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div>
        <label>Pick the Slot</label>
        <Select options={options} onChange={(e) => { setslot(e.value) }} />
      </div>
      {!previous ? null : <p>Note :-  Not allowed because Alumni has not seen <strong style={{ color: "red" }}>Previous Appointment</strong></p>}
      {!maxapp ? null : <p>Note :-  Not allowed because maximum Booking  allowed per user is <strong style={{ color: "red" }}>2</strong></p>}
      <button disabled={(maxapp || previous)} style={{ width: "200px", height: "100%" }} onClick={click}>Book Appointment</button>
      <center>
        <h6 style={{ color: "red" }}>
          Slot 1 =  <strong>1pm - 2pm</strong> || Slot 2 =  <strong>4pm - 5pm</strong> || Slot 3 =  <strong>6pm - 7pm</strong>
        </h6>
        <h4>Accepted Slots For {props.data.user}</h4>
        <table style={{ border: "1px black solid" }}>
          <tr>
            <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>user</th>
            <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>date</th>

            <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>slot</th>
            <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>
              choice
            </th>
          </tr>
        </table>
      </center>




      {data ? data.map((e) => {
        return (
          <Appointment user={e.user} date={e.date} slot={e.slot} pending={e.pending} id={e._id} />
        );
      }) : null}
    </div>
  );
}

export default Student;
