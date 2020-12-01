import React, { useState,useEffect } from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Axios from "axios"
import Header from './components/Header'
import Footer from './components/Footer'
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserContext from "./context/UserContext";
import Home from './views/Home'
import Feed from "./views/Feed";
import Post from "./views/Post";

import "./App.css"

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
      });
    
      useEffect(() => {
        const checkLoggedIn = async () => {
          let token = localStorage.getItem("auth-token");
          if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
          }
          const tokenRes = await Axios.post(
            "/users/tokenIsValid",
            null,
            { headers: { "x-auth-token": token } }
          );
          if (tokenRes.data) {
            const userRes = await Axios.get("/users/", {
              headers: { "x-auth-token": token },
            });
            setUserData({
              token,
              user: userRes.data,
            });
          }
        };
    
        checkLoggedIn();
      }, []);
    

    return (
        <>
        <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/feed" component={Feed} />
                <Route path="/post" component={Post} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
            <Footer />
            </UserContext.Provider>
        </BrowserRouter>
        </>
    )
}

// import './App.css';
// import { BrowserRouter as Router, Route} from "react-router-dom";
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './views/Home'
// import Feed from "./views/Feed";
// import Post from "./views/Post";
// import Signup from "./views/Signup";
// import Login from "./views/login";

// function App() {
//   return (
//     <Router>

//        <div className="App">
//         <Header />
//         <div className="container-fluid">
//           {/* <Route path="/Pantry" component={Pantry} /> */}
//           <Route path="/post" component={Post} />
//           <Route path="/Login" component={Login} />
//           <Route path="/feed" component={Feed}/>
//           <Route exact path="/" component={Home} />
//           </div>
//         <Footer />
//        </div>

//     </Router>

//   );
// }

// export default App;

