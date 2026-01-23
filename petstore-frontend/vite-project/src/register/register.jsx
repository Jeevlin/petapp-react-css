import './register.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../component/firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify"




function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const[ username,setUsername]=useState("")
  const[ number, setNumber]= useState("")

  
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
   
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        username:username,
        PhoneNumber:number,
        approved: false,
        createdAt: new Date().toISOString() ,// Current timestamp
        password:password
      });
    }
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
    setUsername("");
    setNumber("");
    
    toast.success("User Registered Successfully!!", {
      position: "top-center",
    });
   
  } catch (error) {
    toast.error(error.message, {
      position: "bottom-center",
    });
  }
};
  return (
   
    <div className="register">
        <h1>Register New User</h1>
         <form onSubmit= {handleRegister}>
          <div className="registerBox" >
          
            <div className="box1">
               
                  
                  <input
                   type="text"
                   placeholder="First Name"
                   value={fname}
                   onChange={(e) => setFname(e.target.value)} required>
                  </input>

                  <input type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}required>
                  </input>

                  <input type="text"
                  value={number}
                  placeholder="Phone Number"
                  onChange={(e) => setNumber(e.target.value)} required>
                  </input>
                  
                </div>
             
            
              <div className="box2">
                 
                  <input type="text"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}required >
                  </input>
                  <input type="text"
                  value={email}
                  placeholder="Email Address"
                   onChange={(e) => setEmail(e.target.value)}required >
                  </input>
                  <input type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required>
                  </input>
                  
               
              
               </div>
        </div>
        <button className="registerbtn"type='submit'>Create User</button>
      </form>
        

      
    </div>
  );
}

export default Register;