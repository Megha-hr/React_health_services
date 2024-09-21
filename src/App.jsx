import { useState } from "react";
import "./App.css";

function App() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Nursing care",
      description:
        "The most common form of home health care is some type of nursing care depending on the person's needs. In consultation with the doctor, a registered nurse will set up a plan of care.",
      price: "Rs.3000",
    },
    {
      id: 2,
      title: "Nutritional support",
      description:
        "Dietitians can come to a patient's home to provide dietary assessments and guidance to support the treatment plan.",
      price: "Rs.3000",
    },
  ]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
  });
  //state for add operation
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);

  //state for updating
  const [updateService, setUpdateService] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };
  //add services button
  const handleAdd = () => {
    setShowForm(true);
    setInput({ title: "", description: "", price: "" });
    setUpdateService(null);
  };

  //add title description and price to service list by submitting form
  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {};
    if (input.title.length < 10) {
      newData.title = "title  required";
    }
    if (input.description === "") {
      newData.description = "description  required";
    }
    if (input.price === "") {
      newData.price = "price  required";
    }

    if (Object.keys(newData).length > 0) {
      setErrors(newData);
    } else {
      setErrors({});
      setFormSubmit(true);
      if (updateService != null) {
        // Update existing service
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === updateService
              ? {
                  ...service,
                  title: input.title,
                  description: input.description,
                  price: input.price,
                }
              : service
          )
        );
      } else {
        setServices((prevServices) => [
          ...prevServices,
          { ...input, id: services.length + 1 },
        ]);
      }

      // Clear the input fields after submission
      setInput({ title: "", description: "", price: "" });
      setShowForm(false);
    }
  };

  //update services
  const handleUpdate = (id) => {
    const serviceToUpdate = services.find((service) => service.id === id);
    setInput({
      title: serviceToUpdate.title,
      description: serviceToUpdate.description,
      price: serviceToUpdate.price,
    });
    setShowForm(true);
    setUpdateService(id);
  };

  const handleDelete = (id) => {
    setServices((prevServices) => prevServices.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <p>Add services</p>
      <button className="add_button" onClick={handleAdd}>
        Add
      </button>

      {showForm && (
        <div className="form_container">
          <label htmlFor="title">title </label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={handleChange}
          />
          {errors.title && <span>{errors.title}</span>}

          <label htmlFor="description">Description </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && <span>{errors.description}</span>}

          <label htmlFor="price">price</label>
          <input
            type="text"
            value={input.price}
            name="price"
            onChange={handleChange}
          />
          {errors.price && <span>{errors.price}</span>}
          <button className="card_button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      <h1>Types of health care services</h1>
      <div className="card_container">
        {services.map((service) => (
          <div className="card" key={service.id}>
            <div className="button_container">
              <button
                className="update_button "
                onClick={() => handleUpdate(service.id)}
              >
                {updateService !== null ? "Submit" : "Update"}
              </button>
              <button
                className="delete_button"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </button>
            </div>

            <h3>{service.title}</h3>
            <div className="card_detail">
              <p>{service.description}</p>
              <h3>{service.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
