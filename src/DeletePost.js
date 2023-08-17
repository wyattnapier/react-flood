import React, { useState } from "react";
import DeletePostButton from "./DeletePostButton";

export default function DeletePost () {
    const [titleChosen, setTitleChosen] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState("");
    
    const handleTitleChange = (e) => {
        setDeleteTitle(e.target.value)
    }

    const handleSubmit = () => {
        setTitleChosen(!titleChosen)
    }

    const handleDeletion = () => {
        return (
            <div>
                {setDeleteTitle("")}
                <p>Your request was submitted</p>
                <button onClick={handleSubmit}>Delete another post</button>
            </div>
        )
    }
    
    if (!titleChosen) {
        return (
            <form onSubmit={handleSubmit}>
                <textarea placeholder="--Post title--" value={deleteTitle} onChange={handleTitleChange}/>
                <button type="submit" onClick={handleSubmit}>Submit!</button>
            </form>
        )
    } else {
        return (
            <div>
                <p>Trying to delete a post real quick</p>
                <DeletePostButton postTitle={deleteTitle} onDelete={handleDeletion} />
            </div>
        )
    }
}