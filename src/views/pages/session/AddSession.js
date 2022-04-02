import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useReactToPrint } from "react-to-print";
import SimpleHeader from "components/Headers/SimpleHeader";
import { Popconfirm } from "antd";
import PermissionsGate from "routeGuard/PermissionGate";
import { isAuthenticated } from "api/auth";
import { allSessions, addSession, editSession } from "api/session";
import { ToastContainer, toast } from "react-toastify";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";

import { deleteSession } from "api/session";
import { fetchingSessionError } from "constants/errors";
import { addSessionError } from "constants/errors";
import { deleteSessionError } from "constants/errors";
import { deleteSessionSuccess, addSessionSuccess } from "constants/success";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import moment Library
import moment from "moment";

const AddSession = () => {
  const [sessionList, setSessionList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const startTimeDuration = moment(startTime).format("LT");
  const [editing, setEditing] = useState(false);
  const [editSessionName, setEditSessionName] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editWorkingDay, setEditWorkingDay] = useState("");
  const [editWorkingTime, setEditWorkingTime] = useState(new Date());
  const editTimeDuration = moment(editWorkingTime).format("LT");
  const [editSessionId, setEditSessionId] = useState("");
  const [sessionData, setSessionData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    working_days: "",
  });
  const { user, token } = isAuthenticated();
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
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let permissions = [];
  useEffect(() => {
    if (user.role["Session"]) {
      permissions = user.role["Session"];
      console.log(permissions);
    }
  }, []);

  useEffect(() => {
    const getAllSessions = () => {
      // All Sections
      allSessions(user._id, user.school, token)
        .then((res) => {
          const data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              key: i,
              session: res[i].name,
              start_date: res[i].start_date.split("T")[0],
              end_date: res[i].start_date.split("T")[0],
              working_days: res[i].working_days,
              working_time: res[i].working_time,
              year: res[i].year,
              action: (
                <h5 key={i + 1} className="mb-0">
                  {/* {permissions && permissions.includes("edit") && (
                   
                  )} */}
                  <Button
                    className="btn-sm pull-right"
                    color="primary"
                    type="button"
                    key={"edit" + i + 1}
                    onClick={() =>
                      rowHandler(
                        res[i]._id,
                        res[i].name,
                        res[i].start_date.split("T")[0],
                        res[i].start_date.split("T")[0],
                        res[i].working_days
                      )
                    }
                  >
                    <i className="fas fa-user-edit" />
                  </Button>
                  {/* {permissions && permissions.includes("delete") && (
                   
                  )} */}
                  <Button
                    className="btn-sm pull-right"
                    color="danger"
                    type="button"
                    key={"delete" + i + 1}
                  >
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => handleDelete(res[i]._id)}
                    >
                      <i className="fas fa-trash" />
                    </Popconfirm>
                  </Button>
                </h5>
              ),
            });
          }
          setSessionList(data);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error(fetchingSessionError);
        });
    };
    getAllSessions();
  }, [reload, checked]);

  async function handleDelete(sessionId) {
    const { user, token } = isAuthenticated();
    try {
      await deleteSession(sessionId, user._id, token);
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      toast.success(deleteSessionSuccess);
    } catch (err) {
      toast.error(deleteSessionError);
    }
  }

  //Edit Session
  const handleEditSubmit = async () => {
    console.log("clicked");
    const { user, token } = isAuthenticated();
    let formData = new FormData();
    formData.set("name", editSessionName);
    formData.set("start_date", editStartDate);
    formData.set("end_date", editEndDate);
    formData.set("working_days", editWorkingDay);
    formData.set("working_time", editTimeDuration);

    try {
      const updateSession = await editSession(
        editSessionId,
        user._id,
        token,
        formData
      );
      console.log("updateDepartments", updateSession);
      setEditing(false);
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  //Getting values from fetch
  function rowHandler(
    id,
    name,
    startDate,
    endDate,
    working_days,
    working_time
  ) {
    // e.stopPropagation();
    setEditing(true);
    setEditSessionName(name);
    setEditStartDate(startDate);
    setEditEndDate(endDate);
    setEditSessionId(id);
    setEditWorkingDay(working_days);
  }

  const columns = [
    {
      title: "Session",
      dataIndex: "session",
      width: 150,
      sorter: (a, b) => a.session > b.session,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.session.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      width: 150,
      sorter: (a, b) => a.start_date > b.start_date,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.start_date.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      width: 150,
      sorter: (a, b) => a.end_date > b.end_date,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.end_date.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Working Days",
      dataIndex: "working_days",
      width: 150,
      sorter: (a, b) => a.working_days > b.working_days,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.working_days.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Working Time",
      dataIndex: "working_time",
      width: 150,
      sorter: (a, b) => a.working_time > b.working_time,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.working_time.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Year",
      dataIndex: "year",
      width: 150,
      sorter: (a, b) => a.year > b.year,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.year.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  const [formData] = useState(new FormData());
  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setSessionData({ ...sessionData, [name]: event.target.value });
  };

  //Final Submit
  const handleFormChange = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    const year =
      formData.get("start_date").slice(2, 4) +
      "-" +
      formData.get("end_date").slice(2, 4);
    formData.set("year", year);
    formData.set("working_days", sessionData.working_days);
    formData.set("working_time", startTimeDuration);
    try {
      const resp = await addSession(user._id, token, formData);
      console.log(resp);
      setSessionData({
        name: "",
        start_date: "",
        end_date: "",
        working_days: "",
      });
      if (resp.err) {
        return toast.error(resp.err);
      } else {
        toast.success(addSessionSuccess);
        if (checked === false) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
      // setReload(true);
    } catch (err) {
      toast.error(addSessionError);
    }
  };

  return (
    <>
      <SimpleHeader name="Add Session" />
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
          {/* {permissions && permissions.includes("add") && (
              
            )} */}
          <Col lg="4">
            <div className="card-wrapper">
              <Card>
                <Row>
                  <Col className="d-flex justify-content-center mt-2">
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
                <Form onSubmit={handleFormChange} className="mb-4">
                  <CardBody>
                    <Row>
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Session
                        </label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Session"
                          type="text"
                          onChange={handleChange("name")}
                          value={sessionData.name}
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="example-date-input"
                        >
                          Starting Date
                        </label>
                        <Input
                          id="example-date-input"
                          type="date"
                          onChange={handleChange("start_date")}
                          required
                          value={sessionData.start_date}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="example-date-input"
                        >
                          Ending Date
                        </label>
                        <Input
                          id="example-date-input"
                          value={sessionData.end_date}
                          type="date"
                          onChange={handleChange("end_date")}
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="example-date-input"
                        >
                          Working Days
                        </label>
                        <Input
                          id="example-date-input"
                          type="number"
                          onChange={handleChange("working_days")}
                          value={sessionData.working_days}
                          placeholder="Working Days"
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="example-date-input"
                        >
                          Working Time
                        </label>
                        <DatePicker
                          id="exampleFormControlSelect3"
                          className="Period-Time"
                          selected={startTime}
                          onChange={(date) => setStartTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4 float-right">
                      <Col>
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
            </div>
          </Col>

          <Col>
            <div className="card-wrapper">
              <Card>
                <CardBody>
                  <Button
                    color="primary"
                    className="mb-2"
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                  <Row className="ml-2">
                    {loading ? (
                      <div ref={componentRef}>
                        <AntTable
                          columns={columns}
                          data={sessionList}
                          pagination={true}
                          exportFileName="SessionDetails"
                        />
                      </div>
                    ) : (
                      <Loader />
                    )}
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <Modal
          className="modal-dialog-centered"
          isOpen={editing}
          toggle={() => setEditing(false)}
          size="lg"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              {editing ? "Edit Form" : "Create Form"}
            </h2>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setEditing(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody>
            <Row>
              <Col>
                <label className="form-control-label">Session Name</label>
                <Input
                  id="form-department-name"
                  value={editSessionName}
                  onChange={(e) => setEditSessionName(e.target.value)}
                  placeholder="School Address"
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <label
                  className="form-control-label"
                  htmlFor="example-date-input"
                >
                  Starting Date
                </label>
                <Input
                  id="example-date-input"
                  type="date"
                  onChange={(e) => setEditStartDate(e.target.value)}
                  required
                  value={editStartDate}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <label
                  className="form-control-label"
                  htmlFor="example-date-input"
                >
                  Ending Date
                </label>
                <Input
                  id="example-date-input"
                  value={editEndDate}
                  type="date"
                  onChange={(e) => setEditEndDate(e.target.value)}
                  required
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <label
                  className="form-control-label"
                  htmlFor="example-date-input"
                >
                  Working Days
                </label>
                <Input
                  id="example-date-input"
                  value={editWorkingDay}
                  type="number"
                  onChange={(e) => setEditWorkingDay(e.target.value)}
                  required
                  placeholder="Working Days"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <label
                  className="form-control-label"
                  htmlFor="example-date-input"
                >
                  Working Time
                </label>
                <DatePicker
                  id="exampleFormControlSelect3"
                  className="Period-Time"
                  selected={editWorkingTime}
                  onChange={(date) => setEditWorkingTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="button" onClick={handleEditSubmit}>
              Save changes
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default AddSession;
