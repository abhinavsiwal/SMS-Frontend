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
import { allClass } from "api/class";
import { allSections, addSection, addClassToSection } from "api/sections";
import { allSubjects } from "api/subjects";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import PermissionsGate from "routeGuard/PermissionGate";
import { SCOPES } from "routeGuard/permission-maps";

const AddSection = () => {
  const [sectionList, setSectionList] = useState([]);
  console.log("sectionList", sectionList);
  const [classList, setClassList] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      width: 150,
      sorter: (a, b) => a.class > b.class,
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
        return record.class.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Section",
      dataIndex: "name",
      width: 150,
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
      title: "Section Abbreviation",
      dataIndex: "abbreviation",
      width: 150,
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
      title: "Subject",
      dataIndex: "subject",
      width: 150,
      sorter: (a, b) => a.subject > b.subject,
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
        return record.subject.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  useEffect(() => {
    const getAllClasses = () => {
      const { user, token } = isAuthenticated();
      allClass(user._id, user.school, token)
        .then((res) => {
          const classes = [];
          for (var i = 0; i < res.length; i++) {
            classes.push({
              value: res[i]._id,
              label: res[i].name,
            });
          }
          setClassList(classes);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
      // All Sections
      allSections(user._id, user.school, token)
        .then((res) => {
          console.log("res", res);
          const data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              key: i,
              class: res[i].class.name,
              name: res[i].name,
              abbreviation: res[i].abbreviation,
              subject: res[i].subject.toString(),
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
                  <PermissionsGate scopes={[SCOPES.canDelete]}>
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
            console.log("data", data);
            setSectionList(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // All Subjects
      allSubjects(user._id, user.school, token)
        .then((res) => {
          const options = [];
          for (let i = 0; i < res[0].list.length; i++) {
            options.push({
              value: res[0].list[i],
              label: res[0].list[i],
            });
          }
          setRoleOptions(options);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllClasses();
  }, [reload]);

  const [formData] = useState(new FormData());
  const [sectionData] = useState(new FormData());

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
  };

  const handleFormChange = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    const classID = formData.get("class");
    try {
      const resp = await addSection(user._id, token, formData);
      sectionData.set("school", user.school);
      sectionData.set("section", resp._id);
      await addClassToSection(user._id, classID, token, sectionData);
      setReload(true);
      toast.success("Section added successfully");
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };

  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    console.log(value);
    formData.set("subject", JSON.stringify(value));
  };

  return (
    <>
      <SimpleHeader name="Add Section" parentName="Class Management" />
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
                            Class
                          </label>
                          <Input
                            id="example4cols2Input"
                            type="select"
                            onChange={handleChange("class")}
                            required
                          >
                            {classList?.map((clas, index) => (
                              <option key={index} value={clas.value}>
                                {clas.label}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Section
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Section"
                            type="text"
                            onChange={handleChange("name")}
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
                            Section Abbreviation
                          </label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Section Abbreviation"
                            type="text"
                            onChange={handleChange("abbreviation")}
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
                  {loading ? (
                    <AntTable
                      columns={columns}
                      data={sectionList}
                      pagination={true}
                      exportFileName="SectionDetails"
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

export default AddSection;
