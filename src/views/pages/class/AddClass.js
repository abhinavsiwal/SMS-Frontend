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
  ModalFooter,
  ModalBody,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import { isAuthenticated } from "api/auth";
import { addClass, allClass, updateClass, deleteClass } from "api/class";
import { ToastContainer, toast } from "react-toastify";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import { setClass } from "store/reducers/class";
import { useReducer, useSelector } from "react";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import {
  updateClassError,
  addClassError,
  deleteClassError,
  fetchingClassError,
} from "constants/errors";
import {
  updateClassSuccess,
  addClassSuccess,
  deleteClassSuccess,
} from "constants/success";

import { allSessions } from "api/session";
import { useReactToPrint } from "react-to-print";

const AddClass = () => {
  const [classList, setClassList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editClassName, setEditClassName] = useState("");
  const [classId, setClassId] = useState("");
  const [editClassAbv, setEditClassAbv] = useState("");
  console.log("editClassAdv", editClassAbv);
  const [sessions, setSessions] = useState([]);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { user, token } = isAuthenticated();

  const [classData, setClassData] = useState({
    name: "",
    session: "",
    abbreviation: "",
  });
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  let permissions;

  useEffect(() => {
    if (user.role["Library Management"]) {
      permissions = user.role["Library Management"];
      console.log(permissions);
    }
    getSession();
  }, []);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const getAllClasses = () => {
      allClass(user._id, user.school, token)
        .then((res) => {
          console.log("allClass", res);
          dispatch(setClass(res));
          const data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              key: i,
              name: res[i].name,
              abbreviation: res[i].abbreviation,
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
                      rowHandler(res[i]._id, res[i].name, res[i].abbreviation)
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
          setClassList(data);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error(fetchingClassError);
        });
    };
    getAllClasses();
  }, [reload, checked]);

  const handleDelete = async (classId) => {
    const { user, token } = isAuthenticated();
    try {
      await deleteClass(classId, user._id, token);
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      toast.success(deleteClassSuccess);
    } catch (err) {
      toast.error(deleteClassError);
    }
  };

  const rowHandler = (id, name, abbreviation) => {
    setEditing(true);
    setEditClassName(name);
    setEditClassAbv(abbreviation);
    setClassId(id);
  };

  const handleChangeEdit = (value) => {
    var b = [];
    value.map((items) => {
      b.push([items.value, items.label]);
    });
    console.log("b", b);
    formData.set("class", JSON.stringify(b));
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

  const handleEdit = async () => {
    console.log("inside");
    try {
      const { user, token } = isAuthenticated();
      formData.set("name", editClassName);
      formData.set("abbreviation", editClassAbv);
      const updatedClass = await updateClass(
        classId,
        user._id,
        token,
        formData
      );
      console.log("updateClass", updatedClass);
      if (updatedClass.err) {
        return toast.error(updatedClass.err);
      } else {
        setEditing(false);
        toast.success(updateClassSuccess);
        if (checked === false) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
    } catch (err) {
      toast.error(updateClassError);
    }
  };

  const columns = [
    {
      title: "Class",
      dataIndex: "name",
      width: "40%",
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
      title: "Abbreviation",
      dataIndex: "abbreviation",
      width: "50%",
      sorter: (a, b) => a.abbreviation > b.abbreviation,
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
        return record.abbreviation.toLowerCase().includes(value.toLowerCase());
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
    setClassData({ ...classData, [name]: event.target.value });
  };

  const handleFormChange = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    sessions.map((data) => {
      if (data.status === "current") {
        formData.set("session", data._id);
      }
    });
    try {
      await addClass(user._id, token, formData);
      setClassData({
        name: "",
        session: "",
        abbreviation: "",
      });
      toast.success(addClassSuccess);
      setReload(true);
    } catch (err) {
      toast.error(addClassError);
    }
  };

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
  return (
    <>
      <SimpleHeader name="Add Class" parentName="Class Management" />
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
                  <Col className="d-flex justify-content-center mt-3 ml-4">
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
                        className="mt-3"
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
                          Class
                        </label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="text"
                          onChange={handleChange("name")}
                          value={classData.name}
                          required
                        />
                      </Col>
                    </Row>
                    
                    <Row className="mt-4">
                      <Col>
                        <label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Class Abbreviation
                        </label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class Abbreviation"
                          type="text"
                          onChange={handleChange("abbreviation")}
                          value={classData.abbreviation}
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col style={{display:"flex",justifyContent:"center",width:"100%"}} >
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
                    style={{ float: "right" }}
              
              >
                    Print
                  </Button>
                  {loading && classList ? (
                    <div ref={componentRef}  >
                      <AntTable
                        columns={columns}
                        data={classList}
                        pagination={true}
                        exportFileName="ClassDetails"
                      
                    
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
                  value={editClassName}
                  onChange={(e) => setEditClassName(e.target.value)}
                  placeholder="Class Name"
                  type="text"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="form-control-label">Abbreviation</label>
                <Input
                  id="form-abbreviation-name"
                  value={editClassAbv}
                  onChange={(e) => setEditClassAbv(e.target.value)}
                  placeholder="Abbreviation"
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

export default AddClass;
