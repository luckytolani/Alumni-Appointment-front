import React, { useState } from 'react'


function Appointment(props) {
    const [pending, setpending] = useState(props.pending)
    var date = new Date(props.date)
    var temp = date.getDate() + "/" + date.getMonth()

    return (
        <div className="Appointment" style={{ textAlign: "center" }}>
            <center>
                <table style={{ border: "1px black solid" }}>
                    <tr>
                        <td style={{ border: "1px black solid", margin: "1px", width: "100px" }}>{props.user}</td>
                        <td style={{ border: "1px black solid", margin: "1px", width: "100px" }}>{temp}</td>

                        <td style={{ border: "1px black solid", margin: "1px", width: "100px" }}>{props.slot}</td>
                        <td style={{ border: "1px black solid", margin: "1px", width: "100px" }}>
                            {!pending ? <button>Accept</button> : null}
                            <button>reject</button>
                        </td>
                    </tr>

                </table>
            </center>
        </div>
    )
}

export default Appointment