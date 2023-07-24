import { useState } from "react";
import stateConverter from "us-state-converter";
import { State, City } from "country-state-city";

export default function NewPost() {
  // submit button
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e) {
    // timeout is a bit of extra work but makes things nicer imo
    e.preventDefault();

    const newPost = {
      name: name,
      state: selectedState,
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
        setSelectedState("");
        setSelectedTown("");
        setTitle("");
        setIssue("");
        setContactInfo("");
        setSubmitted(true);
      })
      .catch((error) => alert("Error:" + error));
  }

  //state selection
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [townOptions, setTownOptions] = useState([]);

  function handleStateChange(e) {
    console.log("e.target.value: " + e.target.value)
    setSelectedState(e.target.value);
    let abbr = stateConverter.abbr(e.target.value);
    setSelectedStateCode(abbr);

    // get town list IN state change
    setSelectedTown(""); 
    setTownOptions(City.getCitiesOfState('US', abbr));
  }
  // limit state options to just the 50
  const fiftyStates = stateConverter.only50();
  console.log(fiftyStates.length)
  // this isn't doing the same thing as value=fiftyStates[i].usps and name=fiftyStates[i].name
  const stateOptions = fiftyStates.map((state) => ({
    stateCode: state.usps,
    name: state.name,
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
  if (submitted) {
    return (
      <div>
        <h2>Thank you for submitting a request!</h2>
      </div>
      //could add a button to "submit another request"
    );
  } else {
    return (
      <div>
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

          {/* <h3>State:</h3>
          <select value={selectedState} onChange={handleStateChange}>
            <option value=""> -- Select --</option>
            <option value="VT">Vermont</option>
            <option value="NH">New Hampshire</option>
          </select>
          <h3>Town:</h3>
          <textarea
            placeholder="town"
            value={town}
            onChange={handleTownChange}
          /> */}



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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
