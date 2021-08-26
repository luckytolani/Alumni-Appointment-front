import './Alumni.css';
import Appointment from '../Appointment/Appointment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from '../Logout/Logout';
import Preloader from '../Preloader/Preloader'

function Alumni() {
    const uservalue = sessionStorage.getItem('value');
    const [data, setdata] = useState(null)
    useEffect(() => {
        if(!sessionStorage.getItem('value')){
          window.location.href = '/#'
        }
      }, [uservalue])
    //getting all the Appointments for display on ALumni DashBoard

    useEffect(() => {
        async function fetchData() {
            await axios.get('https://alumnibook.herokuapp.com/getList').then((res) => {
                setdata(res.data)
            })
        }
        fetchData();
    }, [data])
    return (
        <div className="Alumni">
            <h1>Alumni DashBoard</h1>
            <h2>upcoming appointments</h2>
            <Logout />
            <center>
                <h3 style={{ color: "red" }}>
                    Slot 1 =  <strong>1pm - 2pm</strong>
                    <br></br>
                    Slot 2 =  <strong>4pm - 5pm</strong>
                    <br></br>
                    Slot 3 =  <strong>6pm - 7pm</strong>
                </h3>
                
                {/* table for displaying appointments */}

                <table style={{ border: "1px black solid" }}>
                    <tr>
                        <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>user</th>
                        <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>date</th>
                        <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>slot</th>
                        <th style={{ border: "1px black solid", margin: "2px", width: "200px" }}>choice</th>
                    </tr>
                </table>
            </center>
            {data ? data.map((e) => {
                return (
                    <Appointment user={e.user} date={e.date} slot={e.slot} pending={e.pending} id={e._id} />
                );
            }) : <Preloader/>}


        </div>
    )
}

export default Alumni