import React,{useState} from "react";

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
  Table,
  CardImg,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//import CSS
import "./Ecommerce.css";

import {useDispatch,useSelector} from 'react-redux';
import {addItemsToCart} from '../../../store/reducers/cart'

function Ecommerce() {
  const [qty, setQty] = useState(1);
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
    {
      key: 3,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
    {
      key: 4,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
    {
      key: 5,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
    {
      key: 6,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
    {
      key: 7,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
    {
      key: 8,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1+5aIrAiYL.jpg",
      name: "ghgvgh",
      price: 35,
    },
  ]);

  const increaseQty = () => {
    // if (qty >= product.stock) {
    //   return;
    // }
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty <= 1) {
      return;
    }
    setQty(qty - 1);
  };

  const Add_To_Cart = (e) => {
    console.log("ind", e.target.value);
  };

  return (
    <div>
      <SimpleHeader name="Student" parentName="Time Table" />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="mt-4 ">
            <Button className="float-right" color="success">
              <i className="ni ni-cart">Cart</i>
            </Button>
          </Col>
        </Row>

        <div className="items ">
          {cardItems.map((cardItems, index) => {
            return (
              <Card className="mt-4">
                <CardBody>
                  <CardImg
                    alt="..."
                    src={cardItems.img}
                    top
                    className="p-4"
                    style={{ width: "100%", height: "100%" }}
                  />
                </CardBody>
                <div className="pb-4">
                  <h2 className="ml-3">{cardItems.name}</h2>
                </div>
                <div className="mb-3 ml-2 d-flex justify-content-between">
                  <div>
                    <button className="Add_Value_Button" onClick={decreaseQty} >-</button>
                    <span className="ml-2 mr-2 Span_Value">{qty}</span>
                    <button className="Add_Value_Button" onClick={increaseQty} >+</button>
                  </div>
                  <div>
                    <h3 className="mr-3">{cardItems.price} Rs</h3>
                  </div>
                </div>

                <Button
                  value={cardItems.key}
                  color="success"
                  onClick={Add_To_Cart}
                >
                  Add Cart
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Ecommerce;
