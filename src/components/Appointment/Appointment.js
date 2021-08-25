import axios from 'axios'
import React, { useState } from 'react'


function Appointment(props) {
    const [pending, setpending] = useState(props.pending)
    var date = new Date(props.date)
    date.setMonth(date.getMonth() + 1)
    var temp = date.getDate() + " / " + date.getMonth() + " / " + date.getFullYear()

    return (
        <div className="Appointment" style={{ textAlign: "center" }}>
            <center>
                <table style={{ border: "1px black solid", textAlign: "center" }}>
                    <tr>
                        <td style={{ border: "1px black solid", margin: "1px", width: "200px" }}>{props.user}</td>
                        <td style={{ border: "1px black solid", margin: "1px", width: "200px" }}>{temp}</td>

                        <td style={{ border: "1px black solid", margin: "1px", width: "200px" }}>{props.slot}</td>
                        <td style={{ border: "1px black solid", margin: "1px", width: "200px" }}>
                            {props.pending ? <button
                                style={{ backgroundColor: "red" }}
                                onClick={async () => {
                                    await axios.patch(`https://alumnibook.herokuapp.com/accept/${props.id}`).then((res) => {
                                        alert("Accepted Successfully")
                                        setpending(false)
                                    })
                                }}
                            >Accept</button> : null}
                            <button onClick={async () => {
                                await axios.delete(`https://alumnibook.herokuapp.com/deleteapp/${props.id}`).then((res) => {
                                    alert("deleted successfully")
                                    window.location.href='/'
                                })
                            }}>reject</button>
                        </td>
                    </tr>

                </table>
            </center>
        </div>
    )
}

export default Appointment