import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css';

import { useState, useEffect } from 'react';

const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();


  //console.log('dani - Register - useAuthentication'+ useAuthentication());


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmPassword) {
      setError("Passwords must be the same!");
      return;
    }

    const res = await createUser(user);

    console.log(user);

  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h2>Register to share</h2>
      <p>Create your username and share your stories</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input type="text" name='displayName' required placeholder='Name'
            value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>

        <label>
          <span>E-mail</span>
          <input type="email" name='email' required placeholder='E-mail'
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Password</span>
          <input type="password" name='password' required placeholder='Password'
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          <span>Confirm the Password</span>
          <input type="password" name='confirmPassword' required placeholder='Confirm the Password'
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        {!loading && <button className='btn'>Register</button>}
        {loading && <button className='btn' disabled>Register</button>}

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register