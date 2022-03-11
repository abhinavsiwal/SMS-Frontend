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

function Ecommerce() {
  const [cardItems, setCardItems] = React.useState([
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

  return (
    <div>
      <SimpleHeader name="Student" parentName="Time Table" />
      <Container className="mt--6" fluid>
        <Col className="mt-4">
          <Button color="primary">Add</Button>
        </Col>
        <div className="items ">
          {cardItems.map((cardItems) => {
            return (
              <Card>
                <CardBody>
                  <CardImg
                    alt="..."
                    src={cardItems.img}
                    top
                    className="p-4"
                    style={{ width: "100%", height: "100%" }}
                  />
                </CardBody>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Ecommerce;
