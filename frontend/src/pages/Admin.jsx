import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "../styles/admin.css";

const Admin = () => {
  const [tour, setTour] = useState([]);
  const [tourName, setTourName] = useState("");
  const [cityName, setCityName] = useState("");
  const [addressName, setAddressName] = useState("");
  const [distanceName, setDistanceName] = useState("");
  const [price, setPrice] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [tourDesc, setTourDesc] = useState("");
  const [featured, setFeatured] = useState("");

  // Function to fetch the list of tours from the backend
  const fetchTours = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tours`);
      const data = await response.json();
      setTour(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  // Function to handle form submission for adding a tour
  const handleAddTour = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: tourName,
          city: cityName,
          address: addressName,
          distance: distanceName,
          photo: "/tour-images/tour-img02.jpg",
          desc: tourDesc,
          price: price,
          maxGroupSize: maxGroupSize,
          featured: "true",
        }),
      });

      if (response.ok) {
        const newTour = await response.json();
        setTour([...tour, newTour]);
        setTourName("");
        setCityName("");
        setAddressName("");
        setDistanceName("");
        setTourDesc("");
        setPrice("");
        setMaxGroupSize("");
        setFeatured("");
        // setTourDescription('');
      }
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  // const handleDeleteTour = async (tourId) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       const updatedTours = tours.filter((tour) => tour.id !== tourId);
  //       setTours(updatedTours);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting tour:', error);
  //   }
  // };

  // const handleUpdateTour = async (tourId, updatedTour) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedTour),
  //     });

  //     if (response.ok) {
  //       const updatedTours = tours.map((tour) =>
  //         tour.id === tourId ? updatedTour : tour
  //       );
  //       setTours(updatedTours);
  //     }
  //   } catch (error) {
  //     console.error('Error updating tour:', error);
  //   }
  // };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div>
      <section class="get-in-touch">
        <h1 class="title">Create Tour</h1>
        <form class="contact-form row">
          <div class="form-field col-lg-6">
            <input id="name" class="input-text js-input" type="text" required />
            <label class="label" for="name">
              Name
            </label>
          </div>
          <div class="form-field col-lg-6 ">
            <input
              id="tourName"
              class="input-text js-input"
              type="email"
              value={tourName}
              onsubmit={(event)=>setTour(event.target.value)}
              required
            />
            <label class="label" for="email">
              E-mail
            </label>
          </div>
          <div class="form-field col-lg-6 ">
            <input
              id="company"
              class="input-text js-input"
              type="text"
              required
            />
            <label class="label" for="company">
              Company Name
            </label>
          </div>
          <div class="form-field col-lg-6 ">
            <input
              id="phone"
              class="input-text js-input"
              type="text"
              required
            />
            <label class="label" for="phone">
              Contact Number
            </label>
          </div>
          <div class="form-field col-lg-12">
            <input
              id="message"
              class="input-text js-input"
              type="text"
              required
            />
            <label class="label" for="message">
              Message
            </label>
          </div>
          <div class="form-field col-lg-12">
            <input class="submit-btn" type="submit" value="Submit" />
          </div>
        </form>
      </section>

      {/* <ul>
        {tours.map((tour) => (
          <li key={tour.id}>
            <h3>{tour.name}</h3>
            <p>{tour.description}</p>
            <button onClick={() => handleDeleteTour(tour.id)}>Delete</button>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleUpdateTour(tour.id, {
                  name: event.target.name.value,
                  description: event.target.description.value,
                });
              }}
            >
              <input
                type="text"
                placeholder="Tour Name"
                defaultValue={tour.name}
                name="name"
              />
              <input
                type="text"
                placeholder="Tour Description"
                defaultValue={tour.description}
                name="description"
              />
              <button type="submit">Update</button>
            </form>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Admin;
