import React, { useState } from "react";
import axios from "axios";
import "./form.css";

function Form() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate({ ...form, [name]: value });  
  };

  const validate = (formData) => {
    let tempErrors = {};
    if (!formData.name) {
      tempErrors.name = "Name is required.";
    }
    if (!formData.employeeId || formData.employeeId.length > 10) {
      tempErrors.employeeId = "Valid Employee ID is required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Valid Email is required.";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Valid 10-digit phone number is required.";
    }
    if (!formData.department) {
      tempErrors.department = "Department is required.";
    }
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) {
      tempErrors.dateOfJoining = "Valid date is required.";
    }
    if (!formData.role) {
      tempErrors.role = "Role is required.";
    }

    setErrors(tempErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;  

    try {
      const res = await axios.post("http://localhost:3002/emp", form);
      alert(res.data.message);
      setForm({
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Submission failed!";
      alert(errorMessage);
    }
  };

  return (
    <div>
      <h1>Give your Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
        />
        {errors.employeeId && <p className="error">{errors.employeeId}</p>}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="CSBS">CSBS</option>
          <option value="AIDS">AIDS</option>
          <option value="AIML">AIML</option>
          <option value="ECE">ECE</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MECH">MECH</option>
          <option value="ACT">ACT</option>
          <option value="VLSI">VLSI</option>
          <option value="MECHATRO">MECHATRONICS</option>
        </select>
        {errors.department && <p className="error">{errors.department}</p>}

        <input
          name="dateOfJoining"
          type="date"
          value={form.dateOfJoining}
          onChange={handleChange}
        />
        {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
        />
        {errors.role && <p className="error">{errors.role}</p>}

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
        <button type="reset" onClick={() => setForm({})}>Reset</button>
      </form>
    </div>
  );
}

export default Form;
