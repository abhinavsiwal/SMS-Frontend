import React from "react";

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

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import moment Library
import moment from "moment";

//React-Select
import Select from "react-select";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import TextArea from "antd/lib/input/TextArea";

function AddRoute() {
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  console.log("start", startDuration);
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  console.log("end", endDuration);
  const [startTimePickup, setStartTimePickup] = React.useState(new Date());
  const startTime = moment(startTimePickup).format("LT");
  const [endTimePickup, setEndTimePickup] = React.useState(new Date());
  const endTime = moment(endTimePickup).format("LT");

  const [addRoute, setAddRoute] = React.useState({
    routeName: "",
    placeName: "",
  });
  console.log(addRoute);

  const roleOptions = [
    { value: "0", label: "Shyamlal" },
    { value: "1", label: "Ramlal" },
  ];

  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    // formData.set("subject", JSON.stringify(value));
  };

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setAddRoute({ ...addRoute, [name]: event.target.value });
  };

  return (
    <>
      <SimpleHeader name="Transport" parentName="Add Route" />
      <Container className="mt--6" fluid>
        <Row className="d-flex justify-content-center">
          <Col lg="6">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Route</h3>
                </CardHeader>
                <Form className="mb-4">
                  <CardBody>
                    <Row className="d-flex justify-content-center">
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Route Name
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="text"
                          onChange={handleChange("routeName")}
                          value={addRoute.routeName}
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="xample-date-input"
                        >
                          Select Staff Member
                        </Label>
                        <Select
                          isMulti
                          name="colors"
                          options={roleOptions}
                          onChange={handleSubjectChange}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="d-flex justify-content-center">
                      <Col md="6">
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
                      </Col>
                      <Col md="6">
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
                      </Col>
                    </Row>
                  </CardBody>
                  <CardHeader>
                    <h3>Add Stop</h3>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Place Name
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="text"
                          onChange={handleChange("placeName")}
                          value={addRoute.placeName}
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="xample-date-input"
                        >
                          From
                        </Label>
                        <DatePicker
                          id="exampleFormControlSelect3"
                          className="Period-Time"
                          selected={startTimePickup}
                          onChange={(date) => setStartTimePickup(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example-date-input"
                        >
                          To
                        </Label>
                        <DatePicker
                          id="exampleFormControlSelect3"
                          className="Period-Time"
                          selected={endTimePickup}
                          onChange={(date) => setEndTimePickup(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          required
                        />
                      </Col>
                    </Row>
                  </CardBody>

                  <Row className="mt-4 ml-3 ">
                    <Col>
                      <Button color="primary" type="submit">
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddRoute;
