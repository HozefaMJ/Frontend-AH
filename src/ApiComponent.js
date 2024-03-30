import React, { useState,useEffect } from "react";
import "./App.css"; // Import your CSS file
import ApiResponse from "./ApiResponse";

const Countdown = ({ age, minLifeExpectancy }) => {
    const calculateRemainingTime = () => {
      const currentYear = new Date().getFullYear();
      const remainingYears = minLifeExpectancy - age;
      const targetYear = currentYear + remainingYears;
      const targetDate = new Date(targetYear, 0, 1); // Assuming birthday is at the beginning of the year
      const difference = targetDate.getTime() - Date.now();
      return difference > 0 ? difference : 0;
    };
  
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [age, minLifeExpectancy]);
  
    const years = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((remainingTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
    return (
      <div className="countdown">
        <h2 style={{
            
            fontSize:22,
        }}>Countdown to Minimum Life Expectancy</h2>
        <p style={{
            color:'red',
            fontSize:46
        }}>{years} years {days} days  </p>
        <p style={{
            color:'red',
            fontSize:46
        }}>{hours} hours {minutes} minutes {seconds} seconds</p>
      </div>
    );
  };
const ApiComponent = () => {
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
      Name: "",
      age: "",
      agreement: "",
      diet: "",
      familyHistory: "",
      gender: "",
      height: "",
      lifestyle: "",
      occupation: "",
      proteinInTake: "",
      waterIntake: "",
      weight: "",
    });
    const [loading, setLoading] = useState(false); // New state for loading
    const [submitted, setSubmitted] = useState(false); // New state for form submission status
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true); // Set loading state to true
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
  
      fetch("https://1ecd-203-192-241-94.ngrok-free.app/api/endpoint", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setResponse(result);
          setLoading(false); // Set loading state to false after receiving response
          setSubmitted(true); // Set submitted state to true
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading state to false if there's an error
        });
    };

  return (
    <div className="form-container">
        {!submitted && (
      <form onSubmit={handleSubmit} className="form" style={{
        padding:'100px'
      }}>
        <h3 style={{
            fontSize:24,
            color:'#23408e'
        }}>Disease Prediction and Wellness Enhancement Tool</h3>
        <label className="form-label">
          Name:
          <br></br>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" className="form-input" />
        </label>
        <label className="form-label">
          Age:
          <br></br>
          <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="form-input" />
        </label>
       
        <label className="form-label">
          Diet:
          <br></br>
          <input type="text" name="diet" value={formData.diet} onChange={handleChange} placeholder="Diet" className="form-input" />
        </label>
        <label className="form-label">
          Family History:
          <br></br>
          <input type="text" name="familyHistory" value={formData.familyHistory} onChange={handleChange} placeholder="Family History" className="form-input" />
        </label>
        <label className="form-label">
          Gender:
          <br></br>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="form-input" />
        </label>
        <label className="form-label">
          Height:
          <br></br>
          <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="Height" className="form-input" />
        </label>
        <label className="form-label">
          Lifestyle:
          <br></br>
          <input type="text" name="lifestyle" value={formData.lifestyle} onChange={handleChange} placeholder="Lifestyle" className="form-input" />
        </label>
        <label className="form-label">
          Occupation:
          <br></br>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" className="form-input" />
        </label>
        <label className="form-label">
          Protein Intake:
          <br></br>
          <input type="text" name="proteinInTake" value={formData.proteinInTake} onChange={handleChange} placeholder="Protein Intake" className="form-input" />
        </label>
        <label className="form-label">
          Water Intake:
          <br></br>
          <input type="text" name="waterIntake" value={formData.waterIntake} onChange={handleChange} placeholder="Water Intake" className="form-input" />
        </label>
        <label className="form-label">
          Weight:
          <br></br>
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" className="form-input" />
        </label>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>)}
      {submitted && response && (
        <div className="response-container">
          <h2 className="response-heading">Response:</h2>
          
          {/* <pre className="response-body">{JSON.stringify(response, null, 2)}</pre> */}
          <div className="response-container">
          <h2 className="response-heading">Lifestyle Improvisations</h2>
          <ul className="response-list">
            {Object.entries(response.lifestyle_improvisations).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          <h2 className="response-heading">Food Chart</h2>
          <ul className="response-list">
            {Object.entries(response.food_chart).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          <h2 className="response-heading">Possible Diseases</h2>
          <ul className="response-list">
            {Object.entries(response.possible_diseases).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          <h2 className="response-heading">Scores</h2>
          <ul className="response-list">
            {Object.entries(response.scores).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          <h2 className="response-heading">Life Expectancy Range</h2>
          <p>
            <strong>Age:</strong> {response.life_expectancy_range.age} <br />
            <strong>Min:</strong> {response.life_expectancy_range.min} <br />
            <strong>Max:</strong> {response.life_expectancy_range.max}
          </p>

          <h2 className="response-heading">Supplements</h2>
          <ul className="response-list">
            {response.supplements.map((supplement, index) => (
              <li key={index}>
                <strong>{supplement.supplement_name}:</strong> {supplement.price}
              </li>
            ))}
          </ul>
        </div>
        <Countdown age={response.life_expectancy_range.age} minLifeExpectancy={response.life_expectancy_range.min} />
        {/* <Countdown age={response.life_expectancy_range.age} minLifeExpectancy={response.life_expectancy_range.min} /> */}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
