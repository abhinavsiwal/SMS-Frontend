/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState,useEffect } from "react";
// nodejs library that concatenates classes
import { Redirect,useHistory } from "react-router-dom";
import classnames from "classnames";
import "./styles.css";
// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import { adminLogin, staffLogin, studentLogin } from "api/login";
import validator from "validator";
import { useDispatch,useSelector } from "react-redux";
import {login} from '../../../store/reducers/auth'
// // core components
// import AuthHeader from "components/Headers/AuthHeader.js";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errormsg, setErrormsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [focusedEmail, setfocusedEmail] = useState(false);
  const [focusedPassword, setfocusedPassword] = useState(false);

  const {loading,error,token} = useSelector(state=>state.authReducer);


  useEffect(() => {
    
  if(token){
    setRedirect(true);
    
  }
  if(error){
    console.log(error);
    setErrormsg(error.message)
  }

  }, [token])
  

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (username && password) {
  //     if (validator.isEmail(username)) {
  //       adminLogin(username, password)
  //         .then((res) => {
  //           console.log("user", res);
  //           localStorage.setItem("jwt", JSON.stringify(res));
  //           setRedirect(true);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setErrormsg("Invalid Credentials");
  //         });
  //     } else {
  //       const role = username.substring(3, 6);
  //       console.log(role);
  //       if (role === "STF") {
  //         staffLogin(username, password)
  //           .then((res) => {
  //             localStorage.setItem("jwt", res.token);
  //             setRedirect(true);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             setErrormsg("Invalid Credentials");
  //           });
  //       } else if (role === "STD") {
  //         studentLogin(username, password)
  //           .then((res) => {
  //             localStorage.setItem("jwt", res.token);
  //             setRedirect(true);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             setErrormsg("Invalid Credentials");
  //           });
  //       } else {
  //         alert("Invalid username");
  //       }
  //     }
  //   } else {
  //     alert("Please fill all fields");
  //   }
  // }

const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(username,password);
  dispatch(login({username,password}))
}
  
  return (
    <>
      {redirect ? <Redirect to="/admin/dashboard" /> : null}
      <div className="login-container">
        <Row className="login-page-container">
          <Col lg="5" md="7" className="login-form-container">
            <Card
              className="border-0 mb-0"
              style={{ backgroundColor: "transparent", color: "black" }}
            >
              <CardTitle className="d-flex justify-content-center h1">
                Log In
              </CardTitle>
              <CardBody className="">
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email or Username"
                        type="text"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  {errormsg ? <Alert color="danger">{errormsg}</Alert> : null}
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="h4">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="info" type="submit">
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </Col>
          <Col className="login-pic-container">
            <div className="pic-card">
              <img
                className="login-picture"
                src={require("../../../assets/img/theme/login-pic.jpg").default}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
