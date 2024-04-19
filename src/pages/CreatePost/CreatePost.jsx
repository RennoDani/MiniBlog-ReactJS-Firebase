import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("The image must be a URL");
    }

    //create tags array 
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //check all values
    if(!title || !image || !tags || !body){
      setFormError("Please fill in all fields!")
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    //redirect home page
    navigate("/");

  };


  return (
    <div className="styles.create_post">
      <h2>CreatePost</h2>
      <p>Share your knowledge</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Add title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Image URL</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Add a image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Content</span>
          <textarea
            name="body"
            required
            placeholder="Add post content"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Add tags followed by commas"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {/* <button className='btn'>Register</button> */}

        {!response.loading && <button className='btn'>Register</button>}
        {response.loading && <button className='btn' disabled>Register</button>}

        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost