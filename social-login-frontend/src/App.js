import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  // States for the component:
  const [state, setState] = useState({
    name: "",
    email: "",
    picture: "",
    profile_loaded: false,
    confetti: false,
  });

  // On Failur of google login we get the reason for failur in an alert:
  const onFailure = (error) => {
    alert(error);
  };

  // If successfull return of data from google we run this function:
  const googleResponse = async (response) => {
    // Check if a token was recieved and send it to our API:
    if (response.tokenId) {
      const googleResponse = await axios.post(
        "http://localhost:3001/api/v1/user-auth",
        { token: response.tokenId }
      );
      // Check if we have some result:
      if (Object.keys(googleResponse.data.payload).length !== 0) {
        /*
          Get the following user details from our API and set them in the state:
          User Account Name
          User Email
          User Profile Picture for Google
        */
        const { name, email, picture } = googleResponse.data.payload;
        setState({
          ...state,
          name,
          email,
          picture,
          profile_loaded: true,
          confetti: true,
        });
        // Show a toast to the user letting them know that thelogin was successfull:
        toast.success("You have logged into your google account!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // This will turn off the confetti raining down on the screen after 5 seconds of successfull login:
  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        confetti: false,
      });
    }, 5000);
  }, [state.profile_loaded]);

  return (
    <div className="app">
      {/* The Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      {/* Show login button when user not logged in */}
      {!state.profile_loaded ? (
        <div>
          <GoogleLogin
            clientId="CLIENT-IDXXXXXXXXXXXXXXXXXXXX"
            buttonText="Login"
            onSuccess={googleResponse}
            onFailure={onFailure}
          />
        </div>
      ) : (
        // Show User details when logged in:
        <div className="user-details">
          {state.confetti ? (
            // Confetti Component:
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          ) : null}
          <img
            src={state.picture}
            alt="profilePicture"
            className="profile-picture"
          />
          <h3>{state.name}</h3>
          <h3>{state.email}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
