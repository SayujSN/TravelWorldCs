import React, { useState, useRef, useEffect } from "react";
import "../styles/tour-details.css";

import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";

import avatarImg from "../assets/images/avatar.jpg";
import Booking from "../components/booking/booking";
import Newsletter from "../shared/NewsLetter";

import useFetch from '../hooks/useFetch'
import {BASE_URL} from '../utils/config'

const TourDetails = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
   },[tourData])
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  // const tour = tours.find((tour) => tour.id === id); //later backend

  const {data:tourData} = useFetch(`${BASE_URL}/tours/${id}`)

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tourData; //destructuring of objects

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = (e) => {
    e.preventDefault();
    const ratingText = reviewMsgRef.current.value;
    alert(`${ratingText},${tourRating}`);
  };

  return (
    <>
      <section>
        <Container>
          { <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        class="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not yet Reviewed"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i class="ri-map-pin-fill"></i>
                      {address}
                    </span>
                  </div>

                  <div className="tour__extra__details">
                    <span>
                      <i class="ri-map-pin-2-line"></i>
                      {city}
                    </span>
                    <span>
                      <i class="ri-price-tag-3-fill"></i>
                      Rs.{price}/ Per Person
                    </span>
                    <span>
                      <i class="ri-map-pin-line"></i>
                      {distance} km
                    </span>
                    <span>
                      <i class="ri-group-fill"></i>
                      {maxGroupSize}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                <div className="tour__reviews mt-4">
                  <h4>Reviews({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4<i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5<i class="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn  text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item">
                        <img src={avatarImg} alt="profile" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>User</h5>
                              <p>
                                {new Date("05-12-2023").toLocaleDateString(
                                  "en-IN",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              5<i class="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h5>Amazing Tour</h5>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tourData} avgRating={avgRating} />
            </Col>
          </Row>
          }
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
