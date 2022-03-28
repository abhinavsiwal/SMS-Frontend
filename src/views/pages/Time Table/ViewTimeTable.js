import React from "react";

import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
  Row,
  Col,
  Input,
  Label,
  Form,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//Import ToastContainer
import { ToastContainer, toast } from "react-toastify";

import { isAuthenticated } from "api/auth";
import {
  deleteTimeTable,
  getTimeTable,
  getSingleTimeTable,
} from "../../../api/Time Table";

import UpdateTimeTable from "./UpdateTimeTable";

import { Popconfirm } from "antd";

import { allClass } from "api/class";
import { allSessions } from "api/session";

function ViewTimeTable() {
  const [lecturer, setLectures] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [classess, setClassess] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [formData] = React.useState(new FormData());
  const [timeTableData, setTimeTableData] = React.useState({
    class: null,
    section: null,
    session: null,
    // prd: "",
    // subjects: "",
    // teachers: "",
    // selectMode: "",
    // link: "",
  });

  console.log("lecturer", lecturer);

  React.useEffect(() => {
    getClass();
    getSession();
    // getTimeTableData();
  }, [checked]);

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setTimeTableData({ ...timeTableData, [name]: event.target.value });
  };

  const getClass = async () => {
    const { user, token } = isAuthenticated();
    try {
      const classes = await allClass(user._id, user.school, token);
      if (classes.err) {
        return toast.error(classes.err);
      } else {
        setClassess(classes);
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

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

  //Get Single Timetable
  const getOneTimeTable = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    let row = {
      class: timeTableData.class,
      section: timeTableData.section,
    };

    try {
      const timeTable = await getSingleTimeTable(
        user.school,
        user._id,
        token,
        row
      );
      if (timeTable.err) {
        return toast.error(timeTable.err);
      }
      setLectures(timeTable);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    }
  };

  // Get TimeTable Data
  // const getTimeTableData = async () => {
  //   const { user, token } = isAuthenticated();
  //   try {
  //     const timeTable = await getTimeTable(user.school, user._id, token);
  //     if (timeTable.err) {
  //       return toast.error(timeTable.err);
  //     }
  //     setLectures(timeTable);
  //   } catch (err) {
  //     toast.error("Something Went Wrong!");
  //   }
  // };

  //Delete Data From The Table
  const deleteHandler = async (index) => {
    const { user, token } = isAuthenticated();
    // try {
    //   const dTD = await deleteTimeTable(index, user._id, token);
    //   console.log("dTD", dTD);
    //   if (dTD.err) {
    //     return toast.error(dTD.err);
    //   } else {
    //     toast.success(dTD.Massage);
    //     if (checked === true) {
    //       setChecked(false);
    //     } else {
    //       setChecked(true);
    //     }
    //   }
    // } catch (err) {
    //   toast.error("Something Went Wrong!");
    // }
  };

  //Edit Handler
  const editHandler = (index) => {
    setEditing(true);
    setEdit(index);
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

      {editing ? (
        <>
          <UpdateTimeTable data={edit} />
        </>
      ) : (
        <>
          <SimpleHeader name="Time" parentName="View TimeTable" />
          <Container className="mt--5 shadow-lg table-responsive" fluid>
            <Card>
              <CardBody>
                <Form onSubmit={getOneTimeTable}>
                  <Row className="m-4">
                    <Col md="4">
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
                          return (
                            <option key={clas._id} value={clas._id}>
                              {clas.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Col>
                    <Col md="4">
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
                        {classess.map((sections) => {
                          return sections.section.map((sec) => {
                            return (
                              <option value={sec._id} key={sec._id}>
                                {sec.name}
                              </option>
                            );
                          });
                        })}
                      </Input>
                    </Col>

                    <Col md="4">
                      <Label
                        className="form-control-label"
                        htmlFor="xample-date-input"
                      >
                        Select Session
                      </Label>
                      <Input
                        id="example4cols3Input"
                        type="select"
                        onChange={handleChange("session")}
                        value={timeTableData.session}
                        required
                        placeholder="Add Periods"
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
                  <Row>
                    <Col>
                      <Button type="submit" color="primary">
                        View
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            {timeTableData.class !== null &&
              timeTableData.section !== null &&
              timeTableData.session !== null && (
                <Card>
                  <CardHeader>Time Table</CardHeader>
                  <CardBody>
                    {/* <Table bordered>
                      <thead>
                        <tr>
                          {lecturer === null ? (
                            <h3>Empty</h3>
                          ) : (
                            <>
                              {Object.keys(lecturer).map((day, index) => {
                                return (
                                  <>
                                    <th key={index}>{day}</th>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </tr>
                      </thead>
                      <>
                        <tbody>
                          <tr>
                            <td>
                              <>
                                {lecturer &&
                                  lecturer.Monday &&
                                  lecturer.Monday.map((Monday, index) => {
                                    return (
                                      <h3>
                                        <br />
                                        Name:{Monday.name}
                                        <br /> Time:{Monday.time}
                                        <br /> Subject:{Monday.subject}
                                        <br /> Mode: {Monday.type}
                                        <br /> Teacher: {Monday.teacher}
                                        <br /> Lunch: {Monday.lunch}
                                        {Monday.link &&
                                          lecturer.Monday.map((link) => {
                                            return (
                                              <>
                                                <br /> Link:{link.link}
                                              </>
                                            );
                                          })}
                                        <br />
                                        <Button
                                          className="btn-sm pull-right"
                                          color="primary"
                                          type="button"
                                          onClick={() =>
                                            editHandler("Monday", index)
                                          }
                                        >
                                          <i className="fas fa-edit" />
                                        </Button>
                                        <Button
                                          className="btn-sm pull-right"
                                          color="danger"
                                          type="button"
                                        >
                                          <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                              deleteHandler("Monday", index)
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </Popconfirm>
                                        </Button>
                                        <hr />
                                      </h3>
                                    );
                                  })}
                              </>
                            </td>
                            <td>
                              <>
                                {lecturer &&
                                  lecturer.Tuesday &&
                                  lecturer.Tuesday.map((Tuesday, index) => {
                                    return (
                                      <h3>
                                        <br />
                                        Name:{Tuesday.name}
                                        <br /> Time:{Tuesday.time}
                                        <br /> Subject:{Tuesday.subject}
                                        <br /> Mode: {Tuesday.type}
                                        <br /> Teacher: {Tuesday.teacher}
                                        <br /> Lunch: {Tuesday.lunch}
                                        {Tuesday.link &&
                                          lecturer.Tuesday.map((link) => {
                                            return (
                                              <>
                                                <br /> Link:{link.link}
                                              </>
                                            );
                                          })}
                                        <br />
                                        <Button
                                          className="btn-sm pull-right"
                                          color="primary"
                                          type="button"
                                          onClick={() =>
                                            editHandler("Tuesday", index)
                                          }
                                        >
                                          <i className="fas fa-edit" />
                                        </Button>
                                        <Button
                                          className="btn-sm pull-right"
                                          color="danger"
                                          type="button"
                                        >
                                          <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                              deleteHandler("Tuesday", index)
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </Popconfirm>
                                        </Button>
                                        <hr />
                                      </h3>
                                    );
                                  })}
                              </>
                            </td>
                            <td>
                              <>
                                {lecturer &&
                                  lecturer.Wednesday &&
                                  lecturer.Wednesday.map((Wednesday, index) => {
                                    return (
                                      <h3>
                                        <br />
                                        Name:{Wednesday.name}
                                        <br /> Time:{Wednesday.time}
                                        <br /> Subject:{Wednesday.subject}
                                        <br /> Mode: {Wednesday.type}
                                        <br /> Teacher: {Wednesday.teacher}
                                        <br /> Lunch: {Wednesday.lunch}
                                        {Wednesday.link &&
                                          lecturer.Wednesday.map((link) => {
                                            return (
                                              <>
                                                <br /> Link:{link.link}
                                              </>
                                            );
                                          })}
                                        <br />
                                        <Button
                                          className="btn-sm pull-right"
                                          color="primary"
                                          type="button"
                                          onClick={() =>
                                            editHandler("Wednesday", index)
                                          }
                                        >
                                          <i className="fas fa-edit" />
                                        </Button>
                                        <Button
                                          className="btn-sm pull-right"
                                          color="danger"
                                          type="button"
                                        >
                                          <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                              deleteHandler("Wednesday", index)
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </Popconfirm>
                                        </Button>
                                        <hr />
                                      </h3>
                                    );
                                  })}
                              </>
                            </td>
                            <td>
                              <>
                                {lecturer &&
                                  lecturer.Thursday &&
                                  lecturer.Thursday.map((Thursday, index) => {
                                    return (
                                      <h3>
                                        <br />
                                        Name:{Thursday.name}
                                        <br /> Time:{Thursday.time}
                                        <br /> Subject:{Thursday.subject}
                                        <br /> Mode: {Thursday.type}
                                        <br /> Teacher: {Thursday.teacher}
                                        <br /> Lunch: {Thursday.lunch}
                                        {Thursday.link &&
                                          lecturer.Thursday.map((link) => {
                                            return (
                                              <>
                                                <br /> Link:{link.link}
                                              </>
                                            );
                                          })}
                                        <br />
                                        <Button
                                          className="btn-sm pull-right"
                                          color="primary"
                                          type="button"
                                          onClick={() =>
                                            editHandler("Thursday", index)
                                          }
                                        >
                                          <i className="fas fa-edit" />
                                        </Button>
                                        <Button
                                          className="btn-sm pull-right"
                                          color="danger"
                                          type="button"
                                        >
                                          <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                              deleteHandler("Thursday", index)
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </Popconfirm>
                                        </Button>
                                        <hr />
                                      </h3>
                                    );
                                  })}
                              </>
                            </td>
                            <td>
                              <>
                                {lecturer &&
                                  lecturer.Friday &&
                                  lecturer.Friday.map((Friday, index) => {
                                    return (
                                      <h3>
                                        <br />
                                        Name:{Friday.name}
                                        <br /> Time:{Friday.time}
                                        <br /> Subject:{Friday.subject}
                                        <br /> Mode: {Friday.type}
                                        <br /> Teacher: {Friday.teacher}
                                        <hr />
                                        <br /> Lunch: {Friday.lunch}
                                        {Friday.link &&
                                          lecturer.Friday.map((link) => {
                                            return (
                                              <>
                                                <br /> Link:{link.link}
                                              </>
                                            );
                                          })}
                                        <br />
                                        <Button
                                          className="btn-sm pull-right"
                                          color="danger"
                                          type="button"
                                        >
                                          <Button
                                            className="btn-sm pull-right"
                                            color="primary"
                                            type="button"
                                            onClick={() =>
                                              editHandler("Friday", index)
                                            }
                                          >
                                            <i className="fas fa-edit" />
                                          </Button>
                                          <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                              deleteHandler("Friday", index)
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </Popconfirm>
                                        </Button>
                                      </h3>
                                    );
                                  })}
                              </>
                            </td>
                            <td>
                              <>
                                {lecturer &&
                                  lecturer.Saturday &&
                                  lecturer.Saturday.map((Saturday, index) => {
                                    return (
                                      <h3>
                                        <br />
                                        Name:{Saturday.name}
                                        <br /> Time:{Saturday.time}
                                        <br /> Subject:{Saturday.subject}
                                        <br /> Mode: {Saturday.type}
                                        <br /> Teacher: {Saturday.teacher}
                                        <br /> Lunch: {Saturday.lunch}
                                        {Saturday.link &&
                                          lecturer.Saturday.map((link) => {
                                            return (
                                              <>
                                                <br /> Link:{link.link}
                                              </>
                                            );
                                          })}
                                        <br />
                                        <Button
                                          className="btn-sm pull-right"
                                          color="primary"
                                          type="button"
                                          onClick={() =>
                                            editHandler("Saturday", index)
                                          }
                                        >
                                          <i className="fas fa-edit" />
                                        </Button>
                                        <Button
                                          className="btn-sm pull-right"
                                          color="danger"
                                          type="button"
                                        >
                                          <Popconfirm
                                            title="Sure to delete?"
                                            onConfirm={() =>
                                              deleteHandler("Saturday", index)
                                            }
                                          >
                                            <i className="fas fa-trash" />
                                          </Popconfirm>
                                        </Button>
                                        <hr />
                                      </h3>
                                    );
                                  })}
                              </>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    </Table> */}
                  </CardBody>
                </Card>
              )}
          </Container>
        </>
      )}
    </div>
  );
}

export default ViewTimeTable;
