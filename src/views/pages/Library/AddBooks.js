import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  // CardHeader,
  // Table,
  Button,
  Modal,
  Card,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Input,
  Form,
  CardBody,
} from "reactstrap";
import { Table } from "ant-table-extensions";
// import { FaEdit } from "react-icons/fa";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "api/auth";
import { Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AntTable from "../tables/AntTable";
import Loader from "components/Loader/Loader";
const AddBooks = () => {
  const { user, token } = isAuthenticated();
  const [addLoading, setAddLoading] = useState(false);

  return (
    <>
      <SimpleHeader name="Add Books" parentName="Library Management" />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container className="mt--6" fluid>
        <Row>
          {addLoading ? (
            <Loader />
          ) : (
            <Col lg="4">
              <div className="card-wrapper">
                <Card>
                  <CardBody>
                    <Form className="mb-4">
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Book Name
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Book Name"
                            type="text"
                            // onChange={(e) => setBookName(e.target.value)}
                            // value={bookName}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Quantity
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Book Quantity"
                            type="number"
                            // onChange={(e) => setBookQty(e.target.value)}
                            // value={bookQty}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Section
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Book Section"
                            type="select"
                            // onChange={(e) => setBookSection(e.target.value)}
                            // value={bookSection}
                            required
                          >
                              <option value="" > Select Section</option>
                          </Input>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Shelf
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Book Shelf"
                            type="select"
                            // onChange={(e) => setBookSection(e.target.value)}
                            // value={bookSection}
                            required
                          >
                              <option value="" >Select Shelf</option>
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mt-4 float-right">
                          <Col>
                            <Button
                              color="primary"
                              type="submit"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AddBooks;
