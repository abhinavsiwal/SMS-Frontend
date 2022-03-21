import React,{useState,useEffect} from "react";

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

import {routeAdd,routesAll} from 'api/transportation'
import { isAuthenticated } from "api/auth";
import { allStaffs } from "api/staff";

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
  const { user } = isAuthenticated();
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

  const handleSubmit =async (e) => {
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
    formData.set("name",addRoute);
    formData.set("bus_number",busNo);
    formData.set("start",startDuration);
    formData.set("end",endDuration);
    formData.set("school",user.school);
    formData.set("staff",JSON.stringify(multiSelect));
    formData.set("stops",JSON.stringify(addStops));

    console.log("obj2", obj2);

    try {
      const data = await routeAdd(user._id, formData);
      console.log(data);
      setAddRoute("");
      setPlaceName("");
    } catch (err) {
      console.log(err);

    }



  };

  return (
    <>
      <SimpleHeader name="Transport" parentName="Add Route" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="6">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Route</h3>
                </CardHeader>
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
                          type="Number"
                          onChange={(e) => setBusNo(e.target.value)}
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
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{stops.stopName}</td>
                              <td>{stops.pickupTime}</td>
                              <td>{stops.dropTime}</td>
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
