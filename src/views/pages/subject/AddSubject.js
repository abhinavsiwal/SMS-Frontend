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
  CardHeader,
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
  const [subjectList1, setSubjectList1] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editSubjectName, setEditSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [checked, setChecked] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [type, setType] = useState("");
  const [inputFields, setInputFields] = useState([{ subjectName: "" }]);
  const { user, token } = isAuthenticated();
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState();
  const [view, setView] = useState(0);

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

  //Delete Subject
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

  const handleChangeSubject = (index, event) => {
    console.log(index, event.target.value);
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  //Edit Subject
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
      if (updatedSubject.err) {
        return toast.error(updatedSubject.err);
      } else {
        setEditing(false);
        if (checked === false) {
          setChecked(true);
        } else {
          setChecked(false);
        }
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

  const handleFormChange = async (e) => {
    e.preventDefault();
    console.log(inputFields);
    let list = [];
    for (const key in inputFields) {
      // console.log(inputFields[key].subjectName);
      list.push(inputFields[key].subjectName);
    }
    console.log(list);
    formData.set("list", JSON.stringify(list));
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    if (subjectData.name.length > 0) {
      formData.set("name", subjectData.name);
    } else {
      formData.set("name", groupName);
    }
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
      title: "Subject",
      dataIndex: "name",
      key: "subjects",
      // width: "90%",
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

  const columns1 = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      // width: "90%",
      sorter: (a, b) => a.groupName > b.groupName,
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
        return record.groupName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Subjects",
      dataIndex: "subjects",
      key: "subjects",
      // width: "90%",
      sorter: (a, b) => a.subjects > b.subjects,
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
      render: (subjects) => (
        <>
          {subjects.map((subject) => {
            return (
              <p>{subject}</p>
            );
          })}
        </>
      ),
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
        let data = [];
        let data1=[];

        for (let i = 0; i < res.length; i++) {
          if (res[i].list.length > 0) {
            console.log("here");
            data1.push({
              key: i,
              groupName: res[i].name,
              subjects: res[i].list,
              action: (
                <h5 key={i + 1} className="mb-0">
                  <Button
                    className="btn-sm pull-right"
                    color="primary"
                    type="button"
                    key={"edit" + i + 1}
                    onClick={() => rowHandler(res[i]._id, res[i].name)}
                  >
                    <i className="fas fa-user-edit" />
                  </Button>
                  {/* {permissions && permissions.includes("edit") && (
                    
                  )} */}
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
            
          } else {
            data.push({
              key: i,
              name: res[i].name,
              action: (
                <h5 key={i + 1} className="mb-0">
                  <Button
                    className="btn-sm pull-right"
                    color="primary"
                    type="button"
                    key={"edit" + i + 1}
                    onClick={() => rowHandler(res[i]._id, res[i].name)}
                  >
                    <i className="fas fa-user-edit" />
                  </Button>
                  {/* {permissions && permissions.includes("edit") && (
                  
                )} */}
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
        }
        setSubjectList(data);
        setSubjectList1(data1);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { subjectName: "" }]);
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
                  <Col className="d-flex justify-content-center mt-2 ml-4">
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
                        className="mt-2"
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
                              Group Name
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Group Name"
                              type="text"
                              onChange={(e) => setGroupName(e.target.value)}
                              value={groupName}
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
                              Subject
                            </label>
                            {inputFields.map((inputField, index) => {
                              return (
                                <div key={index}>
                                  <Input
                                    name="subjectName"
                                    id="example4cols2Input"
                                    placeholder="Subject"
                                    type="text"
                                    value={inputField.subjectName}
                                    onChange={(event) =>
                                      handleChangeSubject(index, event)
                                    }
                                  />
                                  <Button
                                    color="primary"
                                    style={{
                                      height: "1rem",
                                      width: "4rem",
                                      fontSize: "0.5rem",
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "0.7rem",
                                      marginBottom: "0.7rem",
                                    }}
                                    onClick={handleAddFields}
                                  >
                                    Add
                                  </Button>
                                </div>
                              );
                            })}
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
                    <Row className="mt-4">
                      <Col
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                <CardHeader>
                  <div>
                    <Button
                      color={`${view === 0 ? "warning" : "primary"}`}
                      type="button"
                      onClick={() => {
                        setView(0);
                      }}
                    >
                      List View
                    </Button>{" "}
                    <Button
                      color={`${view === 1 ? "warning" : "primary"}`}
                      type="button"
                      onClick={() => {
                        setView(1);
                      }}
                    >
                      Grid View
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <Button
                    color="primary"
                    className="mb-2"
                    onClick={handlePrint}
                    style={{ float: "right" }}
                  >
                    Print
                  </Button>
                  {!loading ? (
                    <Loader />
                  ) : (
                    <>
                      {view === 0 ? (
                        <>
                          <div ref={componentRef}>
                            <AntTable
                              columns={columns}
                              data={subjectList}
                              pagination={true}
                              exportFileName="SubjectDetails"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div ref={componentRef}>
                            <AntTable
                              columns={columns1}
                              data={subjectList1}
                              pagination={true}
                              exportFileName="SubjectDetails"
                            />
                          </div>
                        </>
                      )}
                    </>
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
