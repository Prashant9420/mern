// import Email from '@mui/icons-material/Email';
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import style from './forgetpass.module.css'
// import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Forgetpass = () => {
    const [email, setEmail] = useState("");
    const [emailCopy, setEmailCopy] = useState("");
    const navigate = useNavigate();
    const [otpVisible, setOtpVisible] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [pass, setPass] = useState("");
    const [newPassVisible, setNewPassVisible] = useState(false);
    const handleVerify = () => {
        console.log(enteredOtp)
        console.log(generatedOtp)
        if (enteredOtp == generatedOtp) {
            setOtpVisible(false);
            setNewPassVisible(true);
            toast("OTP verified!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success",
                theme: "colored",
            });

            // alert("enter new password");
        } else {
            toast("Wrong OTP!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
                theme: "colored",
            });
        }
    }
    const handleUpdatePass = async () => {
        const res = await fetch('https://compiler-mern-app.onrender.com/update',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({emailCopy,pass})
        })
        await res.json();
        if(res.status===200){
            toast("Password Updated Successfully!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success",
                theme: "colored",
            });
        navigate("/signin");
        }
        else if(res.status===400){
            toast("Email not Found!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
                theme: "colored",
            });
        }
        else{
            toast("Network Issue!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
                theme: "colored",
            });
        }
    }
    const handleOtp = async (e) => {
        let otp = Math.floor(1000 + Math.random() * 9000);
        setGeneratedOtp(otp);
        const res = await fetch('https://compiler-mern-app.onrender.com/sendmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { name: '', email, phone: '', message: 'your OTP for password recovery\n' + otp, mode: 'OTP' }
            )
        })
        if (res.status === 200) {
            setOtpVisible(true);
            setEnteredOtp("")
            setEmail("");
            toast("OTP sent!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success",
                theme: "colored",
            });

        }
        else if(res.status===400){
            toast("Invalid Email or doesn't have an account", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "info",
                theme: "colored",
            });
        }
        else{
            toast("Network Issue!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
                theme: "colored",
            });
        }
    }
    return (
        <div className={style.demo}>
            <div className={style.container}>
                <label>Password Recovery</label>
                {(otpVisible) ? <div className={style.block}>
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Enter OTP"
                            multiline
                            maxRows={4}
                            value={enteredOtp}
                            name="otp"
                            onChange={(e) => setEnteredOtp(e.target.value)}
                        />
                    </div>
                    {/* </Box> */}
                    <Button variant="contained" className={style.btn} onClick={handleVerify}>Verify OTP</Button>
                </div> : (!newPassVisible) ? <div className={style.block}>
                    {/* <label>Password Recovery</label> */}
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Enter your Email"
                            multiline
                            maxRows={4}
                            value={email}
                            name="email"
                            onChange={(e) => {setEmailCopy(e.target.value);setEmail(e.target.value)}}
                        />
                    </div>
                    {/* </Box> */}
                    <Button variant="contained" className={style.btn} onClick={handleOtp}>Get OTP</Button>
                </div> : <div className={style.block}><div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Create New Password"
                        multiline
                        maxRows={4}
                        value={pass}
                        name="pass"
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                    <Button variant="contained" className={style.btn} onClick={handleUpdatePass}>Update Password</Button>
                </div>
                }
            </div>
        </div>
    )
}

export default Forgetpass