// import { useState } from 'react'
// import './App.css'

function SignUp() {

    return (
        <>
            <h1>Sign up</h1>
            <form>
                <label><br />
                    Name<br />
                    <input className='blank-space'
                        type="text"
                    />
                </label>
                <label><br />
                    Username<br />
                    <input className='blank-space'
                        type="text"
                    />
                </label>
                <label><br />
                    Email<br />
                    <input className='blank-space'
                        type="email"
                    />
                </label>
                <label> <br />
                    Password <br />
                    <input className='blank-space'
                        type="password"
                    />
                </label><br /><br />
                <button className='signin-button' type="button">Create Account</button>
            </form>
            <p>
                Already have an account? <a href="/signin">Sign in</a>
            </p>
        </>
    )
}

export default SignUp;