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
  Table,
  CardImg,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

function Addtocart() {
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

  return (
    <div>
      <SimpleHeader name="Student" parentName="Time Table" />
      <Container className="mt--6" fluid>
        {/* <Row>
          <Col className="mt-4 ">
            <Button className="float-right" color="success" onClick={Cart}>
              <i className="ni ni-cart">Cart</i>
            </Button>
          </Col>
        </Row> */}

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
                    <button className="Add_Value_Button">-</button>
                    <span className="ml-2 mr-2 Span_Value">2</span>
                    <button className="Add_Value_Button">+</button>
                  </div>
                  <div>
                    <h3 className="mr-3">{cardItems.price} Rs</h3>
                  </div>
                </div>

                <Button value={cardItems.key} color="success">
                  Remove
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Addtocart;
