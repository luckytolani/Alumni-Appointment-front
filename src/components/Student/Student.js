import './Student.css';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Logout from '../Logout/Logout';
import Appointment from '../Appointment/Appointment';
import Preloader from '../Preloader/Preloader'

//student Dashboard page

function Student() {
  const uservalue = sessionStorage.getItem('value');
  const [loading,setloading] = useState(false)
  const [data , setdata] = useState(null)
  const [startDate, setStartDate] = useState(new Date());
  const [slot, setslot] = useState(null)
  const [maxapp, setmaxapp] = useState(false);
  const [previous, setprevious] = useState(false);

  useEffect(() => {
    if(!sessionStorage.getItem('value')){
      window.location.href = '/#'
    }
  }, [uservalue])

  //checking that user cannot book more than two appointments
  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://alumnibook.herokuapp.com/checkstudent/${uservalue}`).then((res) => {
        if (res.data) {
          setmaxapp(true)
        }
      })
    }
    fetchData();
  }, [uservalue, previous])


  //checking that alumni has checked previous appointment or not if not then no one can book
  useEffect(() => {
    async function fetchData() {
      await axios.get("https://alumnibook.herokuapp.com/checkavailable").then((res) => {
        if (res.data.length > 0) {
          setprevious(true)
        }
      })
    }
    fetchData();
  }, [data, previous, uservalue])


  //get list of previous appointments of particular user

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://alumnibook.herokuapp.com/getList/${uservalue}`).then((res) => {
        setdata(res.data)
      })
    }
    fetchData();
  }, [data, previous, uservalue])
  //Definig slots and their timings
  const options = [
    { value: 1, label: '1 pm - 2 pm' },
    { value: 2, label: '4 pm - 5 pm' },
    { value: 3, label: '6 pm to 7 pm' }
  ]

  //logic for allowance of booking to user only after 7 days of current date

  var date = new Date();
  date.setDate(date.getDate() + 7)

  async function click() {
    setloading(true)
    if (startDate < date) {
      setloading(false)
      alert("you can only book after 7 days from now")
    }
    else if (!slot) {
      setloading(false)
      alert("select slot")
    }
    else {
      //setting same time of booking for the ease of comparison
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      startDate.setMilliseconds(0)
      let data = {
        user: uservalue,
        slot: slot,
        date: startDate
      }

      //API call checks that slot on particular date is booked or not 

      await axios.get(`https://alumnibook.herokuapp.com/checkslot/${startDate}/${slot}`).then(async (res) => {
        setloading(false)
        alert("no slot available on particular date try different")          //return true means slot is not available

      }).catch(async () => {

        //booking slot logic after getting confirmation that slot is free, this logic is working in a opposite direction, as we are catching error from backend which tells
        //that slot is available

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
            setloading(false)
            alert("Congratulations Slot Booked")
          })
          .catch((err) => {
            setloading(false)
            alert("Slot cant booked some error");

          });
      })
    }
  }
  return (
    <div className="Student" style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }} >
      {loading?<Preloader/>:null}
      <h2>Book Appointment</h2>
      <h2>Welcome <strong style={{ color: "red" }}>{uservalue}</strong></h2>
      <Logout></Logout>
      <div>

        {/* used datepicker component for taking appointment date */}

        <label>Pick the Date for Appointment</label>

        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div>
        <label>Pick the Slot</label>
        <Select options={options} onChange={(e) => { setslot(e.value) }} />
      </div>

      {/* if alumni has not seen previous booking no one can book appointment */}
      
      {!previous ? null : <p>Note :-  you can't Book because Alumni has not seen <strong style={{ color: "red" }}>Previous Appointment</strong></p>}
      
      {/* showing message for maximum booking */}

      {!maxapp ? null : <p>Note :-  you can't Book because maximum Booking  allowed per user is <strong style={{ color: "red" }}>2</strong></p>}
      <button disabled={(maxapp || previous)} style={{ width: "200px", height: "100%" }} onClick={click}>Book Appointment</button>
      <center>
        <h6 style={{ color: "red" }}>
          Slot 1 =  <strong>1pm - 2pm</strong> || Slot 2 =  <strong>4pm - 5pm</strong> || Slot 3 =  <strong>6pm - 7pm</strong>
        </h6>
        <h4>Accepted Slots For {uservalue}</h4>
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
    // </Link>
  );
}

export default Student;
