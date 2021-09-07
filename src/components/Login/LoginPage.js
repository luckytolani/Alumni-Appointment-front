import { useState } from 'react'
import axios from 'axios'
import './LoginPage.css'
import Preloader from '../Preloader/Preloader'

export default function LoginPage() {
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)
    const [loading, setloading] = useState(false)
    async function handleClick(e) {
        setloading(true)
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
            .then((res) => {
                setloading(false)
                sessionStorage.setItem('value', res.data.user);

                //if user is alumni render alumni dashboard otherwise student dashboard  through conditional rendering

                if (res.data.user === 'alumni') {
                    window.location.href = "/#/alumni"
                }
                else {
                    window.location.href = "/#/student"
                }
            })
            .catch((err) => {
                setloading(false)
                alert("username or password not match");
            });
    }
    return (
         <div style={{ textAlign: "center" }}>
            { loading?<Preloader/>:<div>
                <h1>Welcome to Appointment App</h1>
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
                </form></div>
}
        </div>
    )
}