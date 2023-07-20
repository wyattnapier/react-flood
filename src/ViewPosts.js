import React, { useState, useEffect } from "react";
// import { people } from "./data.js";
// import { floodData } from "./data.js";
import stateConverter from "us-state-converter";
import { Country, State, City } from "country-state-city";
import { getStatesOfCountry } from "country-state-city/lib/state.js";

export default function ViewPosts() {
  //state selection
  //is there a way that I can use a library to grab all towns from each state?
  //also can I autogenerate a list of states instead?
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [townOptions, setTownOptions] = useState([]);
  // handleStateChange will handle both of these
  function handleStateChange(e) {
    setSelectedState(e.target.value);
    let abbr = stateConverter.abbr(e.target.value);
    setSelectedStateCode(abbr);
    console.log("selected state " + e.target.value);
    console.log("selected state code: " + abbr);

    // get town list IN state change
    setTownOptions(City.getCitiesOfState('US', abbr));
    console.log("town options: " + townOptions)
    console.log(City.getCitiesOfState('US', abbr))
  }

  //is there a way to use a library to autogenerate main towns from states?
  const [town, setTown] = useState("Town name");
  function handleTownChange(e) {
    setTown(e.target.value);
  }

  const stateOptions = getStatesOfCountry("US").map((state) => ({
    value: state.stateCode,
    label: state.name,
  }));
  
  //   //imported data from data.js
  //   const vtpeeps = people.filter((person) => person.state === "Vermont");

  //   //flood data from data.js
  //   const stateFloodData = floodData.filter(
  //     (entry) =>
  //       //console.log("selected state code: " + selectedStateCode + " // entry's state: " + entry.state)
  //       entry.state === "VT" // only likes strings, not variables
  //     // selectedStateCode.equals(entry.state)
  //   );
  //   console.log("all flood data: " + floodData[0].state);
  //   console.log("cut down flood data: ", stateFloodData);

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
      <h1>Let's filter this out:</h1>

      <h3>State:</h3>
      <select value={selectedState} onChange={handleStateChange}>
        <option value=""> -- Select -- </option>
        {State.getStatesOfCountry("US").map((state) => (
          <option key={state.stateCode} value={state.stateCode}>
            {state.name}
          </option>
        ))}
      </select>

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
      
      {/* <p>Everyone:</p>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <p>
              <b>{person.name}:</b>
              {" is a " + person.profession + "."}
            </p>
          </li>
        ))}
      </ul> */}
      {/* <p>Now just the Vermonters!</p>
      <ul>
        {vtpeeps.map((person) => (
          <li key={person.id}>
            <p>
              <b>{person.name}:</b>
              {" is a " + person.profession + "."}
            </p>
          </li>
        ))}
      </ul>
      <p>Disaster victims: </p>
      <ul>
        {stateFloodData.map((entry) => (
          <li key={entry.id}>
            <p>
              <b>{entry.name}:</b>
              {" has some problems: " + entry.issue + "."}
            </p>
          </li>
        ))}
      </ul> */}
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