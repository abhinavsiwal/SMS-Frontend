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
  Table,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // CardHeader,
} from "reactstrap";

//css
import "./TimeTable.css";

//React-select
import Select from "react-select";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import moment Library
import moment from "moment";

function TimeTable() {
  const [timeTableData, setTimeTableData] = React.useState({
    class: null,
    section: null,
    prd: "",
    subjects: "",
    teachers: "",
    selectMode: "",
  });

  console.log("timetable", timeTableData);
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  const [startTimeRecises, setStartTimeRecises] = React.useState(new Date());
  const startTime = moment(startTimeRecises).format("LT");
  const [endTimeRecises, setEndTimeRecises] = React.useState(new Date());
  const endTime = moment(endTimeRecises).format("LT");

  const roleOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setTimeTableData({ ...timeTableData, [name]: event.target.value });
  };

  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    // formData.set("subject", JSON.stringify(value));
  };

  const [timePeriod, setTimePeriod] = React.useState([]);

  const handleData = () => {};

  return (
    <div>
      <SimpleHeader name="Student" parentName="Time Table" />
      <Container className="mt--6 shadow-lg" fluid>
        <Form>
          <Card>
            <CardBody>
              <Row className="m-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Select Class
                  </Label>
                  <Input
                    id="example4cols3Input"
                    type="select"
                    onChange={handleChange("class")}
                    value={timeTableData.class}
                    required
                  >
                    <option value="" disabled selected>
                      Select Class
                    </option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                    <option>5th</option>
                    <option>6th</option>
                    <option>7th</option>
                    <option>8th</option>
                    <option>9th</option>
                    <option>10th</option>
                    <option>11th</option>
                    <option>12th</option>
                  </Input>
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Select Section
                  </Label>
                  <Input
                    id="example4cols3Input"
                    type="select"
                    onChange={handleChange("section")}
                    value={timeTableData.section}
                    required
                    placeholder="Add Periods"
                  >
                    <option value="" disabled selected>
                      Select Section
                    </option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </Input>
                </Col>
              </Row>

              {timeTableData.class !== null && timeTableData.section !== null && (
                <>
                  <Row className="m-4">
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Select Days
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
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Add Periods
                      </Label>
                      <Input
                        id="example4cols3Input"
                        type="Number"
                        onChange={handleChange("prd")}
                        value={timeTableData.prd}
                        placeholder="Add Periods"
                        required
                      ></Input>
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col md="1">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      ></Label>
                      <p
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Period
                      </p>
                    </Col>
                    <Col md="3">
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
                      />
                    </Col>
                    <Col md="3">
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
                      />
                    </Col>
                  </Row>
                  <Row className="m-4">
                    <Col md="1">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      ></Label>
                      <p
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Recises
                      </p>
                    </Col>
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        From
                      </Label>
                      <DatePicker
                        id="exampleFormControlSelect3"
                        className="Period-Time"
                        selected={startTimeRecises}
                        onChange={(date) => setStartTimeRecises(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </Col>
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                      >
                        To
                      </Label>
                      <DatePicker
                        id="exampleFormControlSelect3"
                        className="Period-Time"
                        selected={endTimeRecises}
                        onChange={(date) => setEndTimeRecises(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </Col>
                  </Row>

                  <Row className="d-flex justify-content-center mb-4 m-4">
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Subjects
                      </Label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={handleChange("subjects")}
                        value={timeTableData.subjects}
                        required
                      >
                        <option value="" disabled selected>
                          Subjects
                        </option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Maths</option>
                        <option>Hindi</option>
                      </Input>
                    </Col>
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Teachers
                      </Label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={handleChange("teachers")}
                        value={timeTableData.teachers}
                        required
                      >
                        <option value="" disabled selected>
                          Teacher
                        </option>
                        <option>David</option>
                        <option>Sam</option>
                        <option>Mike</option>
                        <option>Jordan</option>
                      </Input>
                    </Col>
                    <Col md="3">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Select Mode
                      </Label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={handleChange("selectMode")}
                        value={timeTableData.selectMode}
                        required
                      >
                        <option value="" disabled selected>
                          Select Mode
                        </option>
                        <option>Offline</option>
                        <option>Online</option>
                      </Input>
                    </Col>
                    <Col className="mt-4">
                      <Button color="primary" onClick={handleData}>
                        Add
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </CardBody>
          </Card>
        </Form>
      </Container>
      <Container className="mt--0 shadow-lg table-responsive" fluid>
        <Card>
          <CardHeader>Time Table</CardHeader>
          <CardBody>
            <Table bordered></Table>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default TimeTable;
