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
import { addClass, allClass } from "api/class";
import { ToastContainer, toast } from "react-toastify";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import { setClass } from "store/reducers/class";
import { useReducer, useSelector } from "react";
import { useDispatch } from "react-redux";

const AddClass = () => {
  const [classList, setClassList] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [classData, setClassData] = useState({
    name: "",
    abbreviation: "",
  });

  useEffect(() => {
    const getAllClasses = () => {
      const { user, token } = isAuthenticated();
      allClass(user._id, user.school, token)
        .then((res) => {
          console.log("allClass", res);
          dispatch(setClass(res))
          const data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              key: i,
              name: res[i].name,
              abbreviation: res[i].abbreviation,
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
          setClassList(data);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllClasses();
  }, [reload]);

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
    try {
      await addClass(user._id, token, formData);
      setClassData({
        name: "",
        abbreviation: "",
      });
      toast.success("Class added successfully");
      setReload(true);
    } catch (err) {
      toast.error("Something Went Wrong");
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
                      data={classList}
                      pagination={true}
                      exportFileName="ClassDetails"
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

export default AddClass;
