import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

function Addproduct() {
  //Value for image
  const [categoryLoading, setCategoryLoading] = useState(false);
  const handleFileChange = (name) => (event) => {
    // formData.set(name, event.target.files[0]);
    // setAddMenu({ ...addMenu, [name]: event.target.files[0].name });
  };

  return (
    <>
      <SimpleHeader name="Ecomme" parentName="Add Product" />
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
      <Container className="mt-6 mb-6" fluid>
        <Row>
          <Col lg="4">
            {categoryLoading ? (
              <Loader />
            ) : (
              <div className="card-wrapper">
                <Card>
                  <CardHeader>
                    <h3>Add Category</h3>
                  </CardHeader>
                  <CardBody>
                    <Form className="mb-4">
                      <Row>
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Category
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Category"
                            type="text"
                            // onChange={handleChange("name")}
                            // value={classData.name}
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
                            Category Abbreviation
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Category Abbreviation"
                            type="text"
                            // onChange={handleChange("name")}
                            // value={classData.name}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="8">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Product</h3>
                </CardHeader>
                <Form className="mb-4">
                  <CardBody>
                    <Row md="4" className="d-flex justify-content-center mb-4">
                      <Col md="8">
                        <label
                          className="form-control-label"
                          htmlFor="example3cols2Input"
                        >
                          Upload Image
                        </label>
                        <div className="custom-file">
                          <input
                            className="custom-file-input"
                            id="customFileLang"
                            lang="en"
                            type="file"
                            // onChange={handleFileChange("image")}
                            accept="image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileLang"
                          >
                            Select file
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Items Name
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="text"
                          // onChange={handleChangeMenu("items")}
                          // value={addMenu.items}
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Add
                        </Label>
                        <Input
                          id="exampleFormControlSelect3"
                          type="select"
                          // onChange={handleChangeMenu("addCanteen")}
                          // value={addMenu.addCanteen}
                          required
                        >
                          <option value="" disabled selected>
                            Add
                          </option>
                          <option>Sam</option>
                          <option>David</option>
                          <option>Sam</option>
                          <option>David</option>
                          <option>Sam</option>
                          <option>David</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Prize
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="Number"
                          // onChange={handleChangeMenu("prize")}
                          // value={addMenu.prize}
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Publish
                        </Label>
                        <Input
                          id="exampleFormControlSelect3"
                          type="select"
                          // onChange={handleChangeMenu("publish")}
                          // value={addMenu.publish}
                          required
                        >
                          <option value="" disabled selected>
                            Publish
                          </option>
                          <option>Yes</option>
                          <option>No</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      {/* <Col md="3">
                        <Label
                          className="form-control-label"
                          htmlFor="xample-date-input"
                        >
                          From
                        </Label>
                        <DatePicker
                          id="exampleFormControlSelect3"
                          className="Period-Time"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          required
                        />
                      </Col> */}
                      {/* <Col md="3">
                        <Label
                          className="form-control-label"
                          htmlFor="example-date-input"
                        >
                          To
                        </Label>
                        <DatePicker
                          id="exampleFormControlSelect3"
                          className="Period-Time"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          required
                        />
                      </Col> */}
                      {/* <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Description
                        </Label>
                        <TextArea
                          id="example4cols2Input"
                          placeholder="Class"
                          type="Number"
                          onChange={handleChangeMenu("description")}
                          value={addMenu.description}
                        />
                      </Col> */}
                    </Row>
                    <Row className="mt-4 float-right">
                      <Col>
                        <Button color="primary" type="submit">
                          Add Product
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Addproduct;
