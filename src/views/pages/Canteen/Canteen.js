import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  CardGroup,
  CardImg,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import "./Canteen.css";
import Loader from "components/Loader/Loader";

function Canteen() {
  const [images, setImages] = useState([
    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "french fries",
      price: 15,
    },
    {
      img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "DDD",
      price: 20,
    },
    {
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
    {
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
    {
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
    {
      img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
  ]);
  const [count, setCount] = React.useState(0);
  console.log("count", count);

  const handleChange = (e, steps) => {
    setCount(steps);
  };
  return (
    <>
      {/* <SimpleHeader name="Canteen" /> */}
      <Card>
        <CardBody>
          <img
            className="Header-Image"
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          />
          <div className="Canteen-Name">
            <h1>Canteen Name</h1>
            <h3>
              <span>
                <i className="ni ni-watch-time"></i>
              </span>{" "}
              10:30AM - 11:30AM
            </h3>
          </div>
          <div className="canteen-button">
            <button onClick={() => setCount(0)}>POPULAR</button>
            <button onClick={() => setCount(1)}>BREAKFAST</button>
            <button onClick={() => setCount(2)}>SOUPS</button>
            <button onClick={() => setCount(3)}>SNACKS</button>
            <button onClick={() => setCount(4)}>CHINESE</button>
            <button onClick={() => setCount(5)}>SOUTHINDIAN</button>
            <button onClick={() => setCount(6)}>DESSERTS</button>
          </div>

          {count === 0 && (
            <div className="items">
              {images.map((images) => {
                return (
                  <>
                    <div>
                      <img className="imgs" src={images.img} />
                      <div className="Name-Price">
                        <p className="Name">{images.name}</p>
                        <p className="Price">{images.price}₹</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {count === 1 && (
            <div>
              <Loader />
            </div>
          )}
          {count === 2 && <div>dkjcdndn</div>}
          {count === 3 && <div>nc nmd dv</div>}
          {count === 4 && <div>,mv, mf v</div>}
          {count === 5 && <div>mdnckdn</div>}
          {count === 6 && <div>kcdncn</div>}
        </CardBody>
      </Card>
    </>
  );
}

export default Canteen;
