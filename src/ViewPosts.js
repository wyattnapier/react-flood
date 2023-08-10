import React, { useState, useEffect } from "react";
import './ViewPosts.css';
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
    // value = stateCode;
    // text = name;
    setSelectedStateCode(e.target.value);
    console.log("viewPost value: " + e.target.value)
    console.log("full name of selected state w/ selection text: " + e.target.options[e.target.selectedIndex].text)
    setSelectedState(e.target.options[e.target.selectedIndex].text);
    let tempFilter = posts.filter((entry) => entry.state === e.target.value); // change back to e.target.value after messing
    setStatePosts(tempFilter);

    // get town list IN state change
    setSelectedTown(""); 
    setTownOptions(City.getCitiesOfState('US', e.target.value));
  }

  const [selectedTown, setSelectedTown] = useState("Town name");
  function handleTownChange(e) {
    setSelectedTown(e.target.value);
    console.log("statePosts to be filtered: " + statePosts)
    let tempFilter = statePosts.filter((entry) => entry.town === e.target.value);
    console.log("tempfilter (which is also town posts): " + tempFilter)
    setTownPosts(tempFilter)
  }

  const fiftyStates = stateConverter.only50();
  const stateOptions = fiftyStates.map((state) => ({
    stateCode: state.usps,
    name: state.name
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

  const [sortedPosts, setSortedPosts] = useState([]);
  function filterPosts(posts) {
    console.log("filtering things")
    var temp_sorted_posts = posts.sort((a,b) => {
      return new Date(a.scheduled_for).getTime() - 
          new Date(b.scheduled_for).getTime()
      }).reverse();
    setPosts(temp_sorted_posts);
  }

  function noPosts(level) {
    var empty = false;
    if((level == "town" && townPosts.length === 0) || (level == "state" && statePosts.length === 0) || (level == "all" && posts.length === 0)) { 
      console.log("number of all posts is: "  + posts.length)
      console.log("number of state posts is: "  + statePosts.length)
      console.log("number of town posts is: "  + townPosts.length)
      empty = true;
    }
    if(empty) {
      return (
        <div>
          <ul>
              <li className="PostEntry">
                <p className="postContent">
                  <b>There are currently no posts.</b> <br />
                  Consider changing your filters. <br />
                  Otherwise, feel free to make one by clicking the button above!
                </p>
              </li>
            </ul>
        </div>
      )
    }
  }

  function displayPosts () {
    if(selectedState) {
      if(selectedTown) {
        // state and town selected --> townPosts
        return (
          <div className="Posts">
            <h1>Town Posts</h1>
            {townPosts.map((entry) => (
              <ul>
                <li className="PostEntry" key={entry._id}>
                  <h1 className="postTitle">{entry.title}</h1>
                  <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
                  <p className="postContent">
                    <b>{entry.name} </b>
                    {entry.issue}
                  </p>
                  <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
                </li>
              </ul>
          ))}
          {noPosts("town")}
        </div>
        ) 
      } else {
        // state selected, but not town --> statePosts
        return (
          <div className="Posts">
            <h1>State Posts</h1>
            {statePosts.map((entry) => (
              <ul>
                <li className="PostEntry" key={entry._id}>
                  <h1 className="postTitle">{entry.title}</h1>
                  <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
                  <p className="postContent">
                    <b>{entry.name} </b>
                    {entry.issue}
                  </p>
                  <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
                </li>
              </ul>
          ))} 
          {noPosts("state")}
        </div>
        )
      }
    } else {
      // no state selected
      return (
        <div className="Posts">
          <h1>All Posts</h1>
          {posts.map((entry) => (
            <ul>
              <li className="PostEntry" key={entry._id}>
                <h1 className="PostTitle">{entry.title}</h1>
                <h3 className="PostLocation">{entry.town + ", " + entry.state}</h3>
                <p className="PostContent">
                  <b>{entry.name} </b>
                  {entry.issue}
                </p>
                <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
              </li>
            </ul>
          ))}
          {noPosts("all")}
        </div>
      )
    }
  }
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
      <div className="PostFilter">
      {/* header */}
      <h2>Let's filter this out:</h2>

      {/* state selection button */}
      <h3>State:</h3>
      {console.log("val of selected state right before dropdown: " + selectedState)}
      <select value={selectedState} onChange={handleStateChange}>
        <option value={selectedState}> -- Select -- </option> {/** only difference between this and town dropdown is the value is null for towns */}
        {stateOptions.map((state, index) => (
          <option key={index} value={state.stateCode}>
            {state.name}
          </option>
        ))}
      </select>
      <p>This is my state choice brudda: {selectedState}</p>

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
        <div></div>
      )}
      </div>
      
      {/* posts from API */}
      {console.log("selected town value: " + selectedTown)}
      {/* {console.log("posts: " + posts)} */}
      {console.log("statePosts: " + statePosts)}
      {console.log("townPosts: " + townPosts)}
      {/* if (selectedState) is true then do first thing, else : do other thing*/}
      {displayPosts()}
      {/* <div className="Posts">
        {selectedState ? 
          (selectedTown ? (
          <div>
          <h1>Town Posts</h1>
          {townPosts.map((entry) => (
            <ul>
              <li className="PostEntry" key={entry._id}>
                <h1 className="postTitle">{entry.title}</h1>
                <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
                <p className="postContent">
                  <b>{entry.name} </b>
                  {entry.issue}
                </p>
                <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
              </li>
            </ul>
        ))}
        {noPosts("town")}
        </div>) : (
          <div>
          <h1>State Posts</h1>
          {statePosts.map((entry) => (
            <ul>
              <li className="PostEntry" key={entry._id}>
                <h1 className="postTitle">{entry.title}</h1>
                <h3 className="postLocation">{entry.town + ", " + entry.state}</h3>
                <p className="postContent">
                  <b>{entry.name} </b>
                  {entry.issue}
                </p>
                <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
              </li>
            </ul>
        ))} 
        {noPosts("state")}
        </div>)) : (
          <div>
          <h1>All Posts</h1>
          {posts.map((entry) => (
            <ul>
              <li className="PostEntry" key={entry._id}>
                <h1 className="PostTitle">{entry.title}</h1>
                <h3 className="PostLocation">{entry.town + ", " + entry.state}</h3>
                <p className="PostContent">
                  <b>{entry.name} </b>
                  {entry.issue}
                </p>
                <p className="postContactInfo">Contact me at: {entry.contactInfo}</p>
              </li>
            </ul>
          ))}
          {noPosts("all")}
          </div>)}
        </div> */}
    </div>
  );
}