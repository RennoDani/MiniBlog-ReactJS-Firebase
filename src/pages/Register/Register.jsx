import styles from './Register.module.css';

import { useState, useEffect } from 'react';

const Register = () => {
  return (
    <div className={styles.register}>
        <h2>Register to share</h2>
        <p>Create your username and share your stories</p>
        <form action="">
          <label>
            <span>Name</span>
            <input type="text" name='displayName' required placeholder='Name'/>
          </label>

          <label>
            <span>E-mail</span>
            <input type="email" name='email' required placeholder='E-mail'/>
          </label>

          <label>
            <span>Password</span>
            <input type="password" name='password' required placeholder='Password'/>
          </label>

          <label>
            <span>Confirm the Password</span>
            <input type="password" name='confirmPassword' required placeholder='Confirm the Password'/>
          </label>

          <button className='btn'>Register</button>
        </form>
    </div>
  )
}

export default Register