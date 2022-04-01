import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Container, NavLink } from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { isAuthenticated } from "api/auth";
import "./Styles.css";
import Loader from "components/Loader/Loader";
import { toast } from "react-toastify";

import {
  canteenAdd,
  allCanteens,
  canteenDelete,
} from "../../../api/canteen/index";

function ViewAllCanteen() {
  const [viewCanteen, setViewCanteen] = React.useState([]);
  const [allCanteen, setAllCanteen] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCanteenId, setSelectedCanteenId] = useState();
  const [checked, setChecked] = useState(false);
  const [selectedCanteen, setSelectedCanteen] = useState({});
  const { user, token } = isAuthenticated();

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
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
    {
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
    {
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      name: "ghgvgh",
      price: 35,
    },
  ]);

  const [count, setCount] = React.useState(0);
  console.log("count", count);

  const [canteenName, setCanteenName] = React.useState([
    {
      name: "Canteen Name",
    },
    {
      name: "Canteen Name",
    },
    {
      name: "Canteen Name",
    },
    {
      name: "Canteen Name",
    },
    {
      name: "Canteen Name",
    },
    {
      name: "Canteen Name",
    },
    {
      name: "Canteen Name jdkjnvjfjbvjfnjvbfvfjnvnfkjnvnfknvn",
    },
  ]);

  // const handleChange = (e, steps) => {
  //   setCount(steps);
  // };

  React.useEffect(() => {
    fetchStaff();
  }, [checked]);
  const fetchStaff = async () => {
    const res = await allCanteens(user._id, user.school); // Call your function here
    console.log(res);
    await setAllCanteen(res);
    await setSelectedCanteenId(res[0]._id);

    setLoading(true);
  };

  const selectedStaff = (canteenId) => {
    console.log(canteenId);
    setCheck(true);

    const canteen = allCanteen.find((canteen) => canteen._id === canteenId);
    console.log(canteen);
    setSelectedCanteen(canteen);
  };

  const [check, setCheck] = React.useState(false);
  return (
    <>
      <SimpleHeader name="Canteen" parentName="View All Canteen" />
      {check === false && (
        <div className="mt--6 items">
          {allCanteen &&
            allCanteen.map((canteen) => {
              return (
                <NavLink fluid onClick={() => selectedStaff(canteen._id)}>
                  <Card className="h-100 w-100">
                    <CardBody>
                      <p className="d-flex justify-content-around">
                        {canteen.name}
                      </p>
                    </CardBody>
                  </Card>
                </NavLink>
              );
            })}
        </div>
      )}
      {check && (
        <>
          <Card className="mt--6">
            <CardBody>
              <img
                className="Header-Image"
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              />
              <div className="Canteen-Name">
                <h1>{selectedCanteen.name}</h1>
                <h3>
                  <span>
                    <i className="ni ni-watch-time"></i>
                  </span>{" "}
                  10:30AM - 11:30AM
                </h3>
              </div>

              <div className="items">
                {selectedCanteen.menu.length === 0 ? (
                  <h3>No items found</h3>
                ) : (
                  selectedCanteen.menu.map((item) => {
                    if (item.publish.toString() === "Yes") {
                      return (
                        <>
                          <div>
                            <img className="imgs" src={item.img} />
                            <div className="Name-Price">
                              <p className="Name">{item.item}</p>
                              <p className="Price">{item.price}₹</p>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })
                )}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default ViewAllCanteen;
