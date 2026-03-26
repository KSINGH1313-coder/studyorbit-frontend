import { useState } from "react";
import { studentSignup } from "../../services/authService";

function StudentSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    instituteCode: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await studentSignup(form);
      alert("Student Registered Successfully");
    } catch (err) {
      console.log(err);
      alert("Error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Signup</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="instituteCode"
          placeholder="Enter Institute Code"
          value={form.instituteCode}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default StudentSignup;