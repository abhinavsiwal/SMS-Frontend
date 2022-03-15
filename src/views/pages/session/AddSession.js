import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Button,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import PermissionsGate from "routeGuard/PermissionGate";
import { isAuthenticated } from "api/auth";
import { allSessions, addSession } from "api/session";
import { ToastContainer, toast } from "react-toastify";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import { SCOPES } from "routeGuard/permission-maps";

const AddSession = () => {
  const [sessionList, setSessionList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sessionData, setSessionData] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const getAllSessions = () => {
      const { user, token } = isAuthenticated();
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
              year: res[i].year,
              action: (
                <h5 key={i + 1} className="mb-0">
                  <PermissionsGate scopes={[SCOPES.canEdit]}>
                    <Button
                      className="btn-sm pull-right"
                      color="primary"
                      type="button"
                      key={"edit" + i + 1}
                    >
                      <i className="fas fa-user-edit" />
                    </Button>
                  </PermissionsGate>
                  <PermissionsGate scopes={[SCOPES.canEdit]}>
                    <Button
                      className="btn-sm pull-right"
                      color="danger"
                      type="button"
                      key={"delete" + i + 1}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </PermissionsGate>
                </h5>
              ),
            });
          }
          setSessionList(data);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllSessions();
  }, [reload]);

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

  const handleFormChange = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    const year =
      formData.get("start_date").slice(2, 4) +
      "-" +
      formData.get("end_date").slice(2, 4);
    formData.set("year", year);
    try {
      const resp = await addSession(user._id, token, formData);
      console.log(resp);
      setSessionData({
        name: "",
        start_date: "",
        end_date: "",
      });
      setReload(true);
      toast.success("Session added successfully");
    } catch (err) {
      toast.error("Something Went Wrong");
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
          <PermissionsGate scopes={[SCOPES.canCreate]}>
            <Col lg="4">
              <div className="card-wrapper">
                <Card>
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
          </PermissionsGate>

          <Col>
            <div className="card-wrapper">
              <Card>
                <CardBody>
                  <Row className="ml-2">
                    {loading ? (
                      <AntTable
                        columns={columns}
                        data={sessionList}
                        pagination={true}
                        exportFileName="SessionDetails"
                      />
                    ) : (
                      <Loader />
                    )}
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddSession;
