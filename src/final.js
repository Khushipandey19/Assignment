import React, { useState } from 'react';

import './InputForm.css';

function InputForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    technologies: [],
    resume: null
  });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'technologies') {
      const selectedTechnologies = [...formData.technologies];
      if (e.target.checked) {
        selectedTechnologies.push(value);
      } else {
        const index = selectedTechnologies.indexOf(value);
        if (index !== -1) {
          selectedTechnologies.splice(index, 1);
        }
      }
      setFormData({ ...formData, technologies: selectedTechnologies });
    } else if (name === 'resume') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform additional validation or data processing here before displaying the data

    // Adding the submitted data to the array
    const newSubmittedData = {
      ...formData,
      resumeURL: URL.createObjectURL(formData.resume),
      showResume: false
    };
    setSubmittedData([...submittedData, newSubmittedData]);

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      technologies: [],
      resume: null
    });
  };

  const handleToggleResume = (index) => {
    const updatedData = [...submittedData];
    updatedData[index].showResume = !updatedData[index].showResume;
    setSubmittedData(updatedData);
  };

  return (
    <div className="input-form-container">
      <h1 className="form-heading">Input Form</h1>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="firstName">First Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lastName">Last Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Technologies:</label>
              </td>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="html"
                    name="technologies"
                    value="HTML"
                    checked={formData.technologies.includes('HTML')}
                    onChange={handleChange}
                  />
                  <label htmlFor="html">HTML</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="css"
                    name="technologies"
                    value="CSS"
                    checked={formData.technologies.includes('CSS')}
                    onChange={handleChange}
                  />
                  <label htmlFor="css">CSS</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="javascript"
                    name="technologies"
                    value="JavaScript"
                    checked={formData.technologies.includes('JavaScript')}
                    onChange={handleChange}
                  />
                  <label htmlFor="javascript">JavaScript</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="resume">Resume:</label>
              </td>
              <td>
                <input type="file" id="resume" name="resume" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {/* Display submitted data */}
      {submittedData.map((data, index) => (
        <div key={index} className="submitted-data-container">
          <h2 className="data-heading">Submitted Data:</h2>
          <table className="submitted-data-table">
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{data.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{data.lastName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>Technologies:</td>
                <td>
                  <ul>
                    {data.technologies.map((technology, i) => (
                      <li key={i}>{technology}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Resume:</td>
                <td>
                  <button onClick={() => handleToggleResume(index)}>
                    {data.showResume ? 'Hide Resume' : 'Show Resume'}
                  </button>
                  {data.showResume && (
                    <iframe src={data.resumeURL} width="100%" height="500px" title="Resume Preview"></iframe>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default InputForm;