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
import { isAuthenticated } from "api/auth";
import { ToastContainer, toast } from "react-toastify";
import { allSubjects, addSubject } from "api/subjects";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";

const AddSubject = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllClasses = () => {
      const { user, token } = isAuthenticated();
      allSubjects(user._id, user.school, token)
        .then((res) => {
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
                  >
                    <i className="fas fa-user-edit" />
                  </Button>
                  <Button
                    className="btn-sm pull-right"
                    color="danger"
                    type="button"
                    key={"delete" + i + 1}
                  >
                    <i className="fas fa-trash" />
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
    getAllClasses();
  }, [reload]);

  const [subjectData, setSubjectData] = useState({
    list: "",
  });

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
      await addSubject(user._id, token, formData);
      setSubjectData({
        list: "",
      });
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
      </Container>
    </>
  );
};

export default AddSubject;
