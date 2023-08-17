import { useState } from "react";
import './NewPost.css';
import stateConverter from "us-state-converter";
import { State, City } from "country-state-city";
import DeletePost from "./DeletePost.js";

export default function NewPost() {
  // submit button
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e) {
    // timeout is a bit of extra work but makes things nicer imo
    e.preventDefault();

    const newPost = {
      name: name,
      state: selectedStateCode, // should this be selectedStateCode instead?
      town: selectedTown,
      title: title,
      issue: issue,
      contactInfo: contactInfo,
    };
    fetch("http://localhost:5001/api/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setName("");
        setSelectedStateCode("");
        setSelectedTown("");
        setTitle("");
        setIssue("");
        setContactInfo("");
        setSubmitted(true);
      })
      .catch((error) => alert("Error:" + error));
  }

  function Button ({type, text}) {
    return (
      <button type={type} >
        <h3>{text}</h3>
      </button>
    );
  }

  //state selection
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [townOptions, setTownOptions] = useState([]);
  const [deletePostTab, setDeletePostTab] = useState(false);

  function handleStateChange(e) {
    // value = statecode; 
    // text = name;
    console.log("e.target.value: " + e.target.value)
    setSelectedState(e.target.options[e.target.selectedIndex].text);
    setSelectedStateCode(e.target.value);

    // get town list IN state change
    setSelectedTown(""); 
    setTownOptions(City.getCitiesOfState('US', e.target.value));
  }
  // limit state options to just the 50 (nebraska is doubled)
  const fiftyStates = stateConverter.only50();
  // this isn't doing the same thing as value=fiftyStates[i].usps and name=fiftyStates[i].name
  const stateOptions = fiftyStates.map((state) => ({
    name: state.name,
    stateCode: state.usps,
  }));
  for( let i = 0;  i < stateOptions.length; i++ ) {
    console.log(fiftyStates[i].name)
  }
  //town selection
  const [selectedTown, setSelectedTown] = useState("Town name");
  function handleTownChange(e) {
    setSelectedTown(e.target.value);
  }

  const [name, setName] = useState("Name (first, last)");
  function handleNameChange(e) {
    setName(e.target.value);
  }

  //title of post
  const [title, setTitle] = useState("Placeholder Title");
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  //main content of post
  const [issue, setIssue] = useState("Lorem ipsum");
  function handleIssueChange(e) {
    setIssue(e.target.value);
  }

  //contact info for post (email and phone number hopefully)
  const [contactInfo, setContactInfo] = useState(
    "8023456789 example@gmail.com"
  );
  function handleContactInfoChange(e) {
    setContactInfo(e.target.value);
  }
  function handleTabChange() {
    setDeletePostTab(true);
  }
  if (deletePostTab) {
    return (
      <DeletePost />
    )
  }
  if (submitted) {
    return (
      <div className="Confirmation">
        <h2>Thank you for submitting a request!</h2>
        <img src="https://www.crownconnect.com/assets/ThankYou.jpg" alt="Thank you message"/>
      </div>
      //could add a button to "submit another request"
    );
  } else {
    return (
      <div>
      <h3 className="Header">Fill out the form below to request help. Please make sure to include contact information!</h3>
      <div className="SelectionZone">
        {/** name selection field */}
        <form onSubmit={handleSubmit}>
          <h3>Name: </h3>
          <textarea
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />

          {/* state selection button */}
          <h3>State:</h3>
          <select value={selectedState} onChange={handleStateChange}>
            <option value=""> -- Select -- </option>
            {stateOptions.map((state) => (
              <option key={state.name} value={state.stateCode}>
                {state.name}
              </option>
            ))}
          </select>

          {/* town selection button */}
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

          <h3>Title:</h3>
          <textarea
            placeholder="title"
            value={title}
            onChange={handleTitleChange}
          />
          <h3>Issue:</h3>
          <textarea
            placeholder="issue"
            value={issue}
            onChange={handleIssueChange}
          />
          <h3>Contact Info:</h3>
          <textarea
            placeholder="contact info"
            value={contactInfo}
            onChange={handleContactInfoChange}
          />
          <div>
            <Button type="submit" text="Submit"/>
          </div>
        </form>
      </div>
      <button onClick={handleTabChange}>Let's delete a post!</button>
      </div>
    );
  }
}
