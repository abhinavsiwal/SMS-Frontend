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
import { useDispatch,useSelector } from "react-redux";
import {addItemsToCart} from '../../../store/reducers/cart'
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { cartItems } from "./productList";
//import CSS
import "./Ecommerce.css";

//Add to cart
import Addtocart from "./Addtocart";

function Viewproduct() {
  const [checked, setChecked] = React.useState(false);
 const dispatch = useDispatch();
const {cartTotalQuantity} = useSelector(state=>state.cartReducer);

  const addToCart = (product) => {
    console.log("clicked");
    let item={
      id:product._id,
      name:product.name,
      price:product.price,
      image:product.img,
      quantity:1,
      stock:100, 
    }
    console.log(product);
    console.log(item);
    dispatch(addItemsToCart(item));
  };

  const Cart = (e) => {
    setChecked(true);
  };

  return (
    <div>
      {checked ? (
        <Addtocart />
      ) : (
        <>
          <SimpleHeader name="Student" parentName="Time Table" />
          <Container className="mt--6" fluid>
            <Row>
              <Col className="mt--3 ">
                <Button className="float-right" color="success" onClick={Cart}>
                  <i className="ni ni-cart">Cart</i>
                  <span>{cartTotalQuantity}</span>
                </Button>
              </Col>
            </Row>

            <div className="items ">
              {cartItems.map((product, index) => {
                return (
                  <Card className="mt-4">
                    <CardBody>
                      <CardImg
                        alt="..."
                        src={product.img}
                        top
                        className="p-4"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </CardBody>
                    <div className="mb-3 ml-2 d-flex justify-content-between">
                      <div>
                        <h2 className="ml-3">{product.name}</h2>
                      </div>
                      <div>
                        <h3 className="mr-3">{product.price} Rs</h3>
                      </div>
                    </div>

                    <Button
                      // value={cardItems.key}
                      color="success"
                      onClick={()=>addToCart(product)}
                    >
                      Add Cart
                    </Button>
                  </Card>
                );
              })}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default Viewproduct;
