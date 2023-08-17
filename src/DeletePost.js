import React, { useState } from "react";
import DeletePostButton from "./DeletePostButton";

export default function DeletePost () {
    const [titleChosen, setTitleChosen] = useState(false);
    const [deleteDate, setDeleteDate] = useState("");
    
    const handleTitleChange = (e) => {
        setDeleteDate(e.target.value)
    }

    const handleSubmit = () => {
        setTitleChosen(!titleChosen)
    }

    const handleDeletion = () => {
        return (
            <div>
                {setDeleteDate("")}
                <p>Your request was submitted</p>
                <button onClick={handleSubmit}>Delete another post</button>
            </div>
        )
    }
    
    if (!titleChosen) {
        return (
            <form onSubmit={handleSubmit}>
                <textarea placeholder="--Date post was created--" value={deleteDate} onChange={handleTitleChange}/>
                <button type="submit" onClick={handleSubmit}>Submit!</button>
            </form>
        )
    } else {
        return (
            <div>
                <p>Trying to delete a post real quick</p>
                <DeletePostButton postDate={deleteDate} onDelete={handleDeletion} />
            </div>
        )
    }
}