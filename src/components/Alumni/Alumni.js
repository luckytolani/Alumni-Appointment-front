import './Alumni.css';
import Appointment from '../Appointment/Appointment';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Alumni() {
    const [data, setdata] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/getList').then((res) => {
            setdata(res.data)
        })
    },[data])
    return (
        <div className="Alumni">
            <h1>Alumni DashBoard</h1>
            <h2>upcoming appointments</h2>
            <center>
            <table style={{border:"1px black solid"}}>
                <tr>
                    <th style={{border:"1px black solid" , margin:"2px" , width:"100px"}}>user</th>
                    <th style={{border:"1px black solid", margin:"2px", width:"100px"}}>date</th>

                    <th style={{border:"1px black solid", margin:"2px", width:"100px"}}>slot</th>
                    <th style={{border:"1px black solid", margin:"2px", width:"100px"}}>
                        {/* {!pending ? <button>select</button>:null}
                        <button>reject</button> */}
                        choice
                    </th>
                </tr>
            </table>
            </center>
            {data ? data.map((e) => {
                return (
                    <Appointment user={`student ${e.user}`} date={e.date} slot={e.slot} pending = {e.pending}/>
                );
            }) : 'not'}
            

        </div>
    )
}

export default Alumni