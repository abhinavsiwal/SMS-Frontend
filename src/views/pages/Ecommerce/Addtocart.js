import React from "react";

//React-Strap
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
  CardHeader,
  CardImg,
  CardFooter,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import Viewproduct from "./Viewproduct";

function Addtocart() {
  const [checked, setChecked] = React.useState(false);
  const [cardItems, setCardItems] = React.useState([
    {
      key: 0,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "french fries",
      price: 15,
    },
    {
      key: 1,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "DDD",
      price: 20,
    },
    {
      key: 2,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
  ]);

  const Cart_Back = () => {
    setChecked(true);
  };

  return (
    <div>
      {checked ? (
        <Viewproduct />
      ) : (
        <>
          <SimpleHeader name="Student" parentName="Time Table" />
          <Container className="mt--6" fluid>
            <Row>
              <Col className="mt--3 ">
                <Button
                  className="float-left mb-2"
                  color="dark"
                  onClick={Cart_Back}
                >
                  <i className="ni ni-bold-left"></i>
                </Button>
              </Col>
            </Row>

            <div className="cart_items">
              {cardItems.map((cardItems, index) => {
                return (
                  <Card>
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <h3>Shopping Cart</h3>
                        <h5>Price</h5>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="d-flex">
                        <div className="p-2">
                          <img
                            className="Shopping_Cart_Img"
                            src={cardItems.img}
                          />
                        </div>
                        <div className="p-2">
                          <h4>{cardItems.name}</h4>
                        </div>
                        <div className="ml-auto p-2">
                          {" "}
                          <h3>{cardItems.price} Rs</h3>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="ml-2">
                          <button className="Add_Value_Button">-</button>
                          <span className="ml-2 mr-2 Span_Value">2</span>
                          <button className="Add_Value_Button">+</button>
                        </div>
                        <Button color="danger" className="float-right">
                          Remove
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <Button color="warning">Checkout&Proceed</Button>
                  <div className="d-flex justify-content-between">
                    <h2 className="mr-2">Sub Total:</h2>
                    <h3 className="mt-1">300Rs</h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Container>
        </>
      )}
    </div>
  );
}

export default Addtocart;
