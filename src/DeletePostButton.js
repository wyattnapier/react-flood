import React from "react";

const DeletePostButton = ({ postTitle, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/posts/${postTitle}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post deleted:", data.message);
        onDelete(); // Notify parent component about the deletion
      } else {
        const errorData = await response.json();
        console.error("Error deleting post:", errorData.message);
        // Handle error and update UI if needed
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error and update UI if needed
    }
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
};

export default DeletePostButton;