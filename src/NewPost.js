import { useState } from "react";

export default function NewPost() {
  // submit button
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e) {
    // timeout is a bit of extra work but makes things nicer imo
    e.preventDefault();

    const newPost = {
      name: name,
      state: selectedState,
      town: town,
      title: title,
      issue: issue,
      contactInfo: contactInfo,
    };
    fetch("http://localhost:5000/api/addPost", {
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
        setTown("");
        setTitle("");
        setIssue("");
        setContactInfo("");
        setSubmitted(true);
      })
      .catch((error) => alert("Error:" + error));

    //can get rid of the alert if I want to now
    return setTimeout(() => {
      alert("Thank you for submitting a request.");
    }, 100);
  }

  //state selection
  //is there a way that I can use a library to grab all towns from each state?
  //also can I autogenerate a list of states instead?
  const [selectedState, setSelectedState] = useState("");
  function handleStateChange(e) {
    setSelectedState(e.target.value);
  }

  //is there a way to use a library to autogenerate main towns from states?
  const [town, setTown] = useState("Town name");
  function handleTownChange(e) {
    setTown(e.target.value);
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
          <h3>State:</h3>
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
          />
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
