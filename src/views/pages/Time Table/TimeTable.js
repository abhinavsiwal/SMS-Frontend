import React, { useEffect } from "react";

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
} from "reactstrap";
import PermissionsGate from "routeGuard/PermissionGate";
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
import { SCOPES } from "routeGuard/permission-maps";
import { createTimeTable } from "../../../api/Time Table";

import { isAuthenticated } from "api/auth";

import { allClass } from "api/class";

import { ToastContainer, toast } from "react-toastify";

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
  const [classess, setClassess] = React.useState([]);

  const [formData] = React.useState(new FormData());

  React.useEffect(() => {
    getClass();
  }, []);
  const getClass = async () => {
    const { user, token } = isAuthenticated();
    const classes = await allClass(user._id, user.school, token);
    if (classes.err) {
      return toast.error(classes.err);
    }
    setClassess(classes);
  };

  const handleData = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    try {
      const resp = await createTimeTable(user._id, token, formData);
      console.log(resp);
    } catch (err) {
      // toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
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
      <SimpleHeader name="Student" parentName="Time Table" />
      <PermissionsGate scopes={[SCOPES.canCreate]}>
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
                      {classess.map((clas) => {
                        return <option value={clas._id}>{clas.name}</option>;
                      })}
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

                {timeTableData.class !== null &&
                  timeTableData.section !== null && (
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
      </PermissionsGate>
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
