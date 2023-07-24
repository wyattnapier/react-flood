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
  const [statePosts, setStatePosts] = useState([]);
  const [townPosts, setTownPosts] = useState([]);

  // handleStateChange will change all of these
  function handleStateChange(e) {
    setSelectedState(e.target.value);
    let abbr = stateConverter.abbr(e.target.value);
    setSelectedStateCode(abbr);
    let tempFilter = posts.filter((entry) => entry.state === abbr);
    setStatePosts(tempFilter);

    // get town list IN state change
    setSelectedTown(""); 
    setTownOptions(City.getCitiesOfState('US', abbr));
  }

  const [selectedTown, setSelectedTown] = useState("Town name");
  function handleTownChange(e) {
    setSelectedTown(e.target.value);
    console.log("statePosts to be filtered: " + statePosts)
    let tempFilter = statePosts.filter((entry) => entry.state === e.target.value);
    console.log("tempfilter (which is also town posts): " + tempFilter)
    setTownPosts(tempFilter)
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
        // console.log("posts from API 👇");
        // console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  /* 
  // first need to filter the posts so they're just from one state:
  // might need to use state for these variables since they change
  // can probably put this in the handleStateChange() function!!!


  // stack overflow suggestion for sorting in descending order:
  // need to swap out variables still once connected to mongoDB
    var sorted_meetings = meetings.sort((a,b) => {
    return new Date(a.scheduled_for).getTime() - 
        new Date(b.scheduled_for).getTime()
    }).reverse();
  */

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
          <select value={selectedTown} onChange={handleTownChange}>
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
      <h1>Testing conditional</h1>
      {console.log("selected town value: " + selectedTown)}
      {/* {console.log("posts: " + posts)} */}
      {console.log("statePosts: " + statePosts)}
      {console.log("townPosts: " + townPosts)}
      <ul>
        {selectedState ? (
          statePosts.map((entry) => (
          <li className="postEntry" key={entry._id}>
            <h1 className="postTitle">{entry.title}</h1>
            <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
            <p className="postContent">
              <b>{entry.name} </b>
              {entry.issue}
            </p>
            <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
          </li>
        ))
        ) : ( selectedTown ? (
          townPosts.map((entry) => (
            <li className="postEntry" key={entry._id}>
              <h1 className="postTitle">{entry.title}</h1>
              <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
              <p className="postContent">
                <b>{entry.name} </b>
                {entry.issue}
              </p>
              <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
            </li>
        ))) : (
          posts.map((entry) => (
          <li className="postEntry" key={entry._id}>
            <h1 className="postTitle">{entry.title}</h1>
            <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
            <p className="postContent">
              <b>{entry.name} </b>
              {entry.issue}
            </p>
            <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
          </li>
        )))
        )}
      </ul>
     
      <ul>
        <h1>TOWN POSTS</h1>
        {townPosts.map((entry) => (
          <li className="postEntry" key={entry._id}>
            <h1 className="postTitle">{entry.title}</h1>
            <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
            <p className="postContent">
              <b>{entry.name} </b>
              {entry.issue}
            </p>
            <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}