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
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
} from "reactstrap";

// import { Table } from "ant-table-extensions";
import { Table } from "antd";

import "./Attendance.css";

//api call
import { addAttendance } from "api/staff";

//Loader
import Loader from "../../../components/Loader/Loader";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//import moment from moment for Date
import moment from "moment";

function Attendance() {
  //start and end date of month
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  const endOfDayOfMonths = moment().endOf("month").format("DD");

  const [attendance, setAttendance] = React.useState({
    dateFrom: startOfMonth,
    dateTo: endOfMonth,
    name: "",
    studentId: "",
    selectClass: "",
    selectSection: "",
  });

  const [loading, setLoading] = React.useState(true);

  const [atd, setAtd] = React.useState({});
  console.log("atd", atd);

  //modal window for addAttende]ance
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setAttendance({ ...attendance, [name]: event.target.value });
  };

  //Columns of ant Table
  const columns = [
    {
      title: "#",
      width: 50,
      dataIndex: "hash",
      key: "hash",
      fixed: "left",
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
  ];

  for (let i = 1; i <= endOfDayOfMonths; i++) {
    columns.push({
      key: i,
      title: i,
      width: 110,
    });
  }

  //Data of ant Table
  const data = [];
  for (let i = 1; i < columns.length; i++) {
    data.push({
      key: i,
      hash: `${i}`,
      name: "Ajay",
    });
  }

  useEffect(async () => {
    setLoading(false);
    const data2 = await addAttendance();
    console.log("data2", data2);
    setLoading(true);
  }, []);

  return (
    <div>
      <SimpleHeader name="Student" parentName="Attendance" />
      <Container className="mt--6 shadow-lg" fluid>
        <Form>
          <Card>
            <CardBody>
              <Row md="4" className="d-flex justify-content-center mb-4">
                <Col md="6">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    From
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example-date-input"
                    type="date"
                    onChange={handleChange("dateFrom")}
                    value={attendance.dateFrom}
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
                  <Input
                    className="form-control-sm"
                    id="example-date-input"
                    type="date"
                    onChange={handleChange("dateTo")}
                    value={attendance.dateTo}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Name
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example4cols2Input"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={attendance.name}
                    type="text"
                    required
                  />
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    StudentID
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example4cols2Input"
                    placeholder="StudentID"
                    type="text"
                    onChange={handleChange("studentId")}
                    value={attendance.studentId}
                    required
                  />
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Select Class
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("selectClass")}
                    value={attendance.selectClass}
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
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("selectSection")}
                    value={attendance.selectSection}
                    required
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
                <Col className="mt-4">
                  <Button color="primary">Search</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
      <Container className="mt--0 shadow-lg table-responsive" fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div class="w-100">
                  <div class="row">
                    <div class="col-sm">
                      <h3 className="start-end">
                        {startOfMonth} - {endOfMonth}
                      </h3>
                    </div>
                    <div class="col-sm studentAttendance">
                      <p
                        className="ni ni-single-02"
                        style={{ background: "green", color: "white" }}
                      ></p>
                      <span className="tags"> - Present</span>
                      <p
                        className="ni ni-single-02"
                        style={{ background: "rgb(201, 3, 3)", color: "white" }}
                      ></p>
                      <span> - Absent</span>
                      <p
                        className="ni ni-single-02"
                        style={{
                          background: "rgb(243, 243, 71)",
                          color: "white",
                        }}
                      ></p>
                      <span> - Leave</span>
                    </div>
                    <div class="col-sm">
                      <Button
                        className="attendance-button"
                        onClick={toggle}
                        color="primary"
                      >
                        Add Attendance
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1500, y: 600 }}
                  />
                ) : (
                  <Loader />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          backdrop="static"
          size="xl"
          isOpen={modal}
          toggle={toggle}
          className="custom-modal-style"
        >
          <ModalHeader isClose={modal} toggle={toggle}>
            Add Attendance
          </ModalHeader>
          <ModalBody className="modal-body">
            <div>
              {data.map((student, index) => {
                return (
                  <>
                    <div className="d-flex justify-content-between studentAttendance">
                      <div>
                        <p key={student.key}>{student.name}</p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                          value="present"
                          checked={atd.present}
                          name={index}
                        />
                        Present
                      </div>
                      <div>
                        <input
                          type="radio"
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                          value="absent"
                          name={index}
                        />{" "}
                        Absent
                      </div>
                      <div>
                        <input
                          type="radio"
                          name={index}
                          value="halfday"
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                        />{" "}
                        Half Day
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="leave"
                          name={index}
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                        />{" "}
                        Leave
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
}

export default Attendance;
