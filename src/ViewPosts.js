import React, { useState, useEffect } from "react";
import { people } from "./data.js";
import { Country, State, City } from "country-state-city";
import { getStatesOfCountry } from "country-state-city/lib/state.js";

export default function ViewPosts() {
  //state selection
  //is there a way that I can use a library to grab all towns from each state?
  //also can I autogenerate a list of states instead?
  let selectedStateCode = "VT";
  const [selectedState, setSelectedState] = useState("");
  function handleStateChange(e) {
    setSelectedState(e.target.value);
    console.log("selected state " + selectedState);
    // selectedStateCode = selectedState.stateCode
    selectedStateCode = "VT";
    console.log("selected state code: " + selectedStateCode);
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

  //imported data from data.js
  const vtpeeps = people.filter((person) => person.state === "Vermont");

  // flood data from api
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log("all flood data: " + posts);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // flood data from data.js
  //   const stateFloodData = floodData.filter(
  //     (entry) =>
  //       //console.log("selected state code: " + selectedStateCode + " // entry's state: " + entry.state)
  //       entry.state === "VT" // only likes strings, not variables
  //     // selectedStateCode.equals(entry.state)
  //   );
  //   console.log("all flood data: " + floodData[0].state);
  //   console.log("cut down flood data: " + stateFloodData);

  return (
    <div>
      <p>AHEM! I'm trying to view a post here :/</p>
      <h1>Let's filter this out:</h1>
      <h3>State:</h3>
      <select value={selectedState} onChange={handleStateChange}>
        <option value=""> -- Select -- </option>
        {State.getStatesOfCountry("US").map((state) => (
          <option value={state.stateCode}>{state.name}</option>
        ))}
        <option value="VT">Vermont</option>
        <option value="NH">New Hampshire</option>
      </select>
      {selectedState ? (
        <div>
          <h3>Town:</h3>
          <select value={town} onChange={handleTownChange}>
            <option value=""> -- Select -- </option>
            {console.log(
              "right before execution this is the code: " + selectedStateCode
            )}
            {City.getCitiesOfState("US", { selectedStateCode }).map((town) => (
              <option value={town.name}>{town.name}</option>
            ))}
          </select>
        </div>
      ) : (
        <br></br>
      )}
      <p>Everyone:</p>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <p>
              <b>{person.name}:</b>
              {" is a " + person.profession + "."}
            </p>
          </li>
        ))}
      </ul>
      <p>Now just the Vermonters!</p>
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
        {posts.map((entry) => (
          <li key={entry.id}>
            <p>
              <b>{entry.name}:</b>
              {" has some problems: " + entry.issue + "."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
