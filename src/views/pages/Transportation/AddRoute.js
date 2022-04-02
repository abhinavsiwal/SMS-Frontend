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
  Table,
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

import { routeAdd, routesAll } from "api/transportation";
import { isAuthenticated } from "api/auth";
import { allStaffs } from "api/staff";
import { allSessions } from "api/session";

//Import ToastContainer
import { ToastContainer, toast } from "react-toastify";

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
  const [roleOptions, setRoleOptions] = useState([]);
  const [addRoute, setAddRoute] = React.useState("");
  const [placeName, setPlaceName] = React.useState("");
  const [multiSelect, setMultiSelect] = React.useState();

  const [check, setCheck] = React.useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  // const [selectedRouteId, setSelectedRouteId] = useState("")
  const [addStops, setAddStops] = React.useState([]);
  console.log("addStops", addStops);
  const [allStaff, setAllStaff] = useState([]);

  const [busNo, setBusNo] = React.useState("");
  const [sessions, setSessions] = React.useState([]);
  const [session, setSession] = React.useState("");
  const { user } = isAuthenticated();
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
      };
      fileReader.readAsText(file);
    }
  };

  const getAllStaffs = async () => {
    const res = await allStaffs(user.school, user._id);
    console.log(res);
    let canteenStaff = res.find((staff) => staff.assign_role === "canteen");
    setAllStaff(canteenStaff);
    let options = [];
    for (let i = 0; i < res.length; i++) {
      options.push({ value: res[i]._id, label: res[i].firstname });
    }
    console.log(options);
    setRoleOptions(options);
  };

  //Getting Session data
  const getSession = async () => {
    const { user, token } = isAuthenticated();
    try {
      const session = await allSessions(user._id, user.school, token);
      if (session.err) {
        return toast.error(session.err);
      } else {
        setSessions(session);
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  const getAllRoutes = async () => {
    try {
      let data = await routesAll(user._id, user.school);
      console.log(data);
      setAllRoutes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllStaffs();
    getAllRoutes();
    getSession();
  }, []);

  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    setMultiSelect(value);
  };

  const addStop = () => {
    let obj = {
      stopName: placeName,
      pickupTime: startTime,
      dropTime: endTime,
    };
    let arr = addStops;
    arr.push(obj);
    setAddStops(arr);
    if (check === true) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj2 = {
      routName: addRoute,
      staffMember: multiSelect,
      bus_no: busNo,
      startTime: startDuration,
      endTime: endDuration,
      addStop: addStops,
    };

    let formData = new FormData();
    formData.set("name", addRoute);
    formData.set("bus_number", busNo);
    formData.set("session", session);
    formData.set("start", startDuration);
    formData.set("end", endDuration);
    formData.set("school", user.school);
    formData.set("staff", JSON.stringify(multiSelect));
    formData.set("stops", JSON.stringify(addStops));

    console.log("obj2", obj2);

    try {
      const data = await routeAdd(user._id, formData);
      if (data.err) {
        return toast.error(data.err);
      } else {
        toast.success("Route Added Successfully");
        setAddRoute("");
        setPlaceName("");
        setSession("");
        setBusNo("");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
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
      <SimpleHeader name="Transport" parentName="Add Route" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="6">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Route</h3>
                </CardHeader>
                <Row>
                  <Col className="d-flex justify-content-center mt-3 ">
                    <form>
                      <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                      />

                      <Button
                        onClick={(e) => {
                          handleOnSubmit(e);
                        }}
                        color="primary"
                      >
                        IMPORT CSV
                      </Button>
                    </form>
                  </Col>
                </Row>
                <Form className="mb-4" onSubmit={handleSubmit}>
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
                          placeholder="Route Name"
                          type="text"
                          onChange={(e) => setAddRoute(e.target.value)}
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
                    <Row>
                      <Col md="12">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Bus No.
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Bus No"
                          type="text"
                          onChange={(e) => setBusNo(e.target.value)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <Label
                          className="form-control-label"
                          htmlFor="xample-date-input"
                        >
                          Select Session
                        </Label>
                        <Input
                          id="example4cols3Input"
                          type="select"
                          onChange={(e) => setSession(e.target.value)}
                          required
                        >
                          <option value="" disabled selected>
                            Select Session
                          </option>
                          {sessions.map((session) => {
                            return (
                              <option value={session._id} key={session._id}>
                                {session.name}
                              </option>
                            );
                          })}
                        </Input>
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
                          onChange={(e) => setPlaceName(e.target.value)}
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
                          Pickup Time
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
                          Drop Time
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

                  <Row>
                    <Col className="ml-3">
                      <Button color="primary" onClick={addStop}>
                        Add
                      </Button>
                    </Col>
                    <Col>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </div>
          </Col>

          <Col lg="6">
            <Card>
              <CardHeader>
                <h3>Add Stops</h3>
              </CardHeader>
              <CardBody>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Place Name</th>
                      <th>pickup Time</th>
                      <th>DropTime</th>
                    </tr>
                  </thead>
                  {addStops !== null ? (
                    <>
                      {addStops.map((stops, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td key={index}>{index + 1}</td>
                              <td key={index}>{stops.stopName}</td>
                              <td key={index}>{stops.pickupTime}</td>
                              <td key={index}>{stops.dropTime}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </>
                  ) : (
                    <h3>No Data</h3>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddRoute;
