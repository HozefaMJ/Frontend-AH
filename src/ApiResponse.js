import React from "react";
import "./App.css"; // Import your CSS file

const ApiResponse = ({ response }) => {
  return (
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
  );
};

export default ApiResponse;
