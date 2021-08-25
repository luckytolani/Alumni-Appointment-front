import { useState } from 'react'
import axios from 'axios'
import Student from '../Student/Student'
import Alumni from '../Alumni/Alumni'
import './LoginPage.css'
export default function LoginPage() {
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)
    const [user, setuser] = useState(null)
    const [log, setlog] = useState(false)
    const [alumni, setalumni] = useState(false)
    async function handleClick(e) {
        e.preventDefault()
        let data = {
            user: username,
            password: password
        }
        await axios({
            method: "post",
            url: "https://alumnibook.herokuapp.com/login",
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                setlog(true)
                setuser(res.data)
                sessionStorage.setItem('key', res.data)
                if (res.data.user === 'alumni') {
                    setalumni(true)
                }
                console.log(res.data);
            })
            .catch((err) => {
                alert("Error occured" + err);

            });
        console.log(username);
        console.log(password);
    }
    return (
        <div style={{textAlign:"center"}}>
            {!log ? <div> 
                <h1>Welcome to Alumni Appointment App</h1>
                <h1>Login Page</h1>
                <form>
                    <div className="container">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required onChange={(e) => {
                            setusername(e.target.value)
                        }} />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => {
                            setpassword(e.target.value)
                        }} />

                        <button type="submit" onClick={handleClick}>Login</button>
                    </div>
                </form></div> : !alumni ? <Student data={user?user:{}} /> : <Alumni />}

        </div>
    )
}