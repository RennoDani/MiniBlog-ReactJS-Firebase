import { useAuthentication } from '../../hooks/useAuthentication';
import { useState, useEffect } from 'react';
import styles from './Login.module.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();


  //console.log('dani - Register - useAuthentication'+ useAuthentication());


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password
    }

    const res = await login(user);

    console.log(user);

  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);


  return (
    <div className={styles.login}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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


        {!loading && <button className='btn'>Login</button>}
        {loading && <button className='btn' disabled>Register</button>}

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login