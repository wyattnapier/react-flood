import React, { useState } from "react";
import DeletePostButton from "./DeletePostButton";

export default function DeletePost () {
    const [titleChosen, setTitleChosen] = useState(false);
    const [deleteDate, setDeleteDate] = useState("");
    const [deleted, setDeleted] = useState(false);
    
    const handleTitleChange = (e) => {
        setDeleteDate(e.target.value)
    }

    const handleSubmit = () => {
        setTitleChosen(!titleChosen)
        setDeleted(false)
    }

    const handleDeletion = () => {
        {setDeleteDate("")}
        {setDeleted(true)}
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
            deleted 

            ? <div>
                <p>Your request was submitted</p>
                <button onClick={handleSubmit}>Delete another post</button>
            </div>

            : <div>
                <p>Trying to delete a post real quick</p>
                {/* <button onClick={handleDeletion}>midget button</button> */}
                <DeletePostButton postDate={deleteDate} onDelete={handleDeletion} />
            </div>
        )
    }
}