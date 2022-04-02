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
import {
  allSections,
  addSection,
  addClassToSection,
  deleteSection,
} from "api/sections";
import { allSubjects } from "api/subjects";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import AntTable from "../tables/AntTable";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";

import { allSessions } from "api/session";

import { Popconfirm } from "antd";

import {
  fetchingClassError,
  fetchingSectionError,
  fetchingSubjectError,
  addSectionError,
  deleteSectionError,
} from "constants/errors";
import { deleteSectionSuccess, addSectionSuccess } from "constants/success";

import FixRequiredSelect from "../../../components/FixRequiredSelect";
import BaseSelect from "react-select";


const AddSection = () => {
  const [sectionList, setSectionList] = useState([]);
  console.log("sectionList", sectionList);
  const [classList, setClassList] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const { user, token } = isAuthenticated();

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
          toast.error(fetchingClassError);
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
                  {permissions && permissions.includes("edit") && (
                    <Button
                      className="btn-sm pull-right"
                      color="primary"
                      type="button"
                      key={"edit" + i + 1}
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
                        onConfirm={() => deleteSectionHandler(res[i]._id)}
                      >
                        <i className="fas fa-trash" />
                      </Popconfirm>
                    </Button>
                  )}
                </h5>
              ),
            });
            console.log("data", data);
            setSectionList(data);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(fetchingSectionError);
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
          toast.error(fetchingSubjectError);
        });
    };
    getAllClasses();
  }, [reload]);

  const deleteSectionHandler = async (sectionId) => {
    try {
      const data = await deleteSection(user._id, sectionId);
      console.log(data);
      toast.success(deleteSectionSuccess);
      setReload(!reload);
    } catch (err) {
      console.log(err);
      toast.error(deleteSectionError);
    }
  };

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
      if (resp.err) {
        return toast.error(resp.err);
      }
      toast.success(addSectionSuccess);
    } catch (err) {
      toast.error(addSectionError);
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

  
  const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options}
    />
  );
  

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
                          Class
                        </label>
                        <Input
                          id="example4cols2Input"
                          type="select"
                          onChange={handleChange("class")}
                          required
                        >
                          <option value="" disabled selected>
                            Select Class
                          </option>
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
                    <Row>
                      <Col className="mt-4">
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
                          // value={subjectData.session}
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
