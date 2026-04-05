import { useState } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

function PostJob() {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    try {
      await addDoc(collection(db, "jobs"), {
        title,
        skills: skills.split(","), // convert to array
        description,
        createdAt: new Date()
      });

      alert("Job Posted Successfully!");
      setTitle("");
      setSkills("");
      setDescription("");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>

      <input 
        placeholder="Job Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input 
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e)=>setSkills(e.target.value)}
      />

      <textarea 
        placeholder="Job Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button onClick={handlePost}>Post Job</button>
    </div>
  );
}

export default PostJob;