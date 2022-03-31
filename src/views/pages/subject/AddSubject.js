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
  Modal,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import { isAuthenticated } from "api/auth";
import { ToastContainer, toast } from "react-toastify";
import {
  allSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "api/subjects";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import Loader from "components/Loader/Loader";

//React-select
import Select from "react-select";

import { allSessions } from "api/session";
import { useReactToPrint } from "react-to-print";
const AddSubject = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editSubjectName, setEditSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [checked, setChecked] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [type, setType] = useState("");
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

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let permissions;
  useEffect(() => {
    if (user.role["Library Management"]) {
      permissions = user.role["Library Management"];
      console.log(permissions);
    }
  }, []);

  useEffect(() => {
    getAllClasses();
    getSession();
  }, [reload, checked]);

  const roleOptions = [
    { value: "Math", label: "Math" },
    { value: "English", label: "English" },
    { value: "Science", label: "Science" },
  ];

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

  const [subjectData, setSubjectData] = useState({
    type: "",
    name: "",
    session: "",
  });

  const handleDelete = async (subjectId) => {
    console.log("delete");
    const { user, token } = isAuthenticated();
    try {
      await deleteSubject(subjectId, user._id, token);
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  const rowHandler = (id, name) => {
    console.log(id);
    setEditing(true);
    setEditSubjectName(name);
    setSubjectId(id);
  };

  const handleEdit = async () => {
    try {
      const { user, token } = isAuthenticated();
      formData.set("name", editSubjectName);
      const updatedSubject = await updateSubject(
        subjectId,
        user._id,
        token,
        formData
      );
      console.log("updateSubject", updatedSubject);
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

  const [formData] = useState(new FormData());
  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setSubjectData({ ...subjectData, [name]: event.target.value });
  };

  //Taking Values from react-select
  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    formData.set("name", JSON.stringify(value));
  };

  const handleFormChange = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    try {
      const subject = await addSubject(user._id, token, formData);
      if (subject.err) {
        return toast.error(subject.err);
      }
      setSubjectData({
        type: "",
        name: "",
        session: "",
      });
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      toast.success("Subject added successfully");
      setReload(true);
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "Subjects",
      dataIndex: "name",
      width: "90%",
      sorter: (a, b) => a.name > b.name,
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
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  const getAllClasses = () => {
    allSubjects(user._id, user.school, token)
      .then((res) => {
        console.log("res", res);
        const data = [];
        for (let i = 0; i < res.length; i++) {
          data.push({
            key: i,
            name: res[i].name,
            action: (
              <h5 key={i + 1} className="mb-0">
                {permissions && permissions.includes("edit") && (
                  <Button
                    className="btn-sm pull-right"
                    color="primary"
                    type="button"
                    key={"edit" + i + 1}
                    onClick={() => rowHandler(res[i]._id, res[i].name)}
                  >
                    <i className="fas fa-user-edit" />
                  </Button>
                )}
                {permissions && permissions.includes("delete") && (
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
                )}
              </h5>
            ),
          });
        }
        setSubjectList(data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SimpleHeader name="Add Subject" parentName="Class Management" />
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
                          Select type
                        </label>
                        <Input
                          id="exampleFormControlSelect3"
                          type="select"
                          // onChange={(e) => setType(e.target.value)}
                          onChange={handleChange("type")}
                          value={subjectData.type}
                          required
                        >
                          <option value="" disabled selected>
                            Select type
                          </option>
                          <option>Single</option>
                          <option>Group</option>
                        </Input>
                      </Col>
                    </Row>
                    {subjectData.type === "Single" && (
                      <>
                        <Row>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Subject
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Subject"
                              type="text"
                              onChange={handleChange("name")}
                              value={subjectData.name}
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
                              Select Session
                            </label>
                            <Input
                              id="example4cols3Input"
                              type="select"
                              onChange={handleChange("session")}
                              value={subjectData.session}
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
                      </>
                    )}
                    {subjectData.type === "Group" && (
                      <>
                        <Row>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Subject
                            </label>
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
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Select Session
                            </label>
                            <Input
                              id="example4cols3Input"
                              type="select"
                              onChange={handleChange("session")}
                              value={subjectData.session}
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
                      </>
                    )}
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
                  {loading ? (
                    <div ref={componentRef}>
                      <AntTable
                        columns={columns}
                        data={subjectList}
                        pagination={true}
                        exportFileName="SubjectDetails"
                      />
                    </div>
                  ) : (
                    <Loader />
                  )}
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
                <label className="form-control-label">Class Name</label>
                <Input
                  id="form-class-name"
                  value={editSubjectName}
                  onChange={(e) => setEditSubjectName(e.target.value)}
                  placeholder="Class Name"
                  type="text"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="button" onClick={handleEdit}>
              Save changes
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default AddSubject;
