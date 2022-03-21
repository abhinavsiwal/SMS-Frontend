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

const AddSubject = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editSubjectName, setEditSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getAllClasses();
  }, [reload, checked]);

  const getAllClasses = () => {
    const { user, token } = isAuthenticated();
    allSubjects(user._id, user.school, token)
      .then((res) => {
        console.log("res", res);
        const data = [];
        for (let i = 0; i < res[0].list.length; i++) {
          data.push({
            key: i,
            list: res[0].list[i],
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
        setSubjectList(data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [subjectData, setSubjectData] = useState({
    list: "",
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

  const columns = [
    {
      title: "Subjects",
      dataIndex: "list",
      width: "90%",
      sorter: (a, b) => a.list > b.list,
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
        return record.list.toLowerCase().includes(value.toLowerCase());
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
    setSubjectData({ ...subjectData, [name]: event.target.value });
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
        list: "",
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
                          Subject
                        </label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Subject"
                          type="text"
                          onChange={handleChange("list")}
                          value={subjectData.list}
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
          <Col>
            <div className="card-wrapper">
              <Card>
                <CardBody>
                  {loading ? (
                    <AntTable
                      columns={columns}
                      data={subjectList}
                      pagination={true}
                      exportFileName="SubjectDetails"
                    />
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
