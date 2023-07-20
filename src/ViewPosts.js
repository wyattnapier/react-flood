import React, { useState, useEffect } from "react";
// import { people } from "./data.js";
// import { floodData } from "./data.js";
import stateConverter from "us-state-converter";
import { State, City } from "country-state-city";
import { getStatesOfCountry } from "country-state-city/lib/state.js";

export default function ViewPosts() {
  //state selection
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [townOptions, setTownOptions] = useState([]);
  
  // handleStateChange will change all of these
  function handleStateChange(e) {
    setSelectedState(e.target.value);
    let abbr = stateConverter.abbr(e.target.value);
    setSelectedStateCode(abbr);
    console.log("selected state " + e.target.value);
    console.log("selected state code: " + abbr);

    // get town list IN state change
    setTownOptions(City.getCitiesOfState('US', abbr));
  }

  const [town, setTown] = useState("Town name");
  function handleTownChange(e) {
    setTown(e.target.value);
  }

  const fiftyStates = stateConverter.only50();
  const stateOptions = fiftyStates.map((state) => ({
    value: state.stateCode,
    name: state.name,
  }));

  // posts from api
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log("posts from API 👇");
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <div>
      {/* header */}
      <h1>Let's filter this out:</h1>

      {/* state selection button */}
      <h3>State:</h3>
      <select value={selectedState} onChange={handleStateChange}>
        <option value=""> -- Select -- </option>
        {stateOptions.map((state) => (
          <option key={state.stateCode} value={state.value}>
            {state.name}
          </option>
        ))}
      </select>

      {/* town selection button */}
      {selectedState ? (
        <div>
          <h3>Town:</h3>
          <select value={town} onChange={handleTownChange}>
            <option value=""> -- Select -- </option>
            {townOptions.map((town) => (
              <option key={town.name} value={town.name}>
                {town.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <br></br>
      )}

      {/* posts from API */}
      <hr />
      <ul>
        {posts.map((entry) => (
          <li key={entry._id}>
            <h1>{entry.title}</h1>
            <p>
              <b>{entry.name} </b>
              {" has some problems: " + entry.issue + "."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}