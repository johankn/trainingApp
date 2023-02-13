import '../resources/login.css';
import Navbar from '../components/Navbar';

function LoginBody(){
  return(
    <form>
      <label> Username </label>
      <input></input>
      <label> Password </label>
      <input></input>
      <input type="submit" value="Login"></input>
    </form>
  );
}

function Login() {
  return (
    <div className="login">
      <Navbar/>
      <LoginBody/>
    </div>
  );
}

export default Login;
