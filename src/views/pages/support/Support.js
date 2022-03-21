/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalBody,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { support } from "api/support";
import { isAuthenticated } from "api/auth";
import { ToastContainer, toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import AntTable from "../tables/AntTable";
import { allSupports } from "api/support";
import Loader from "components/Loader/Loader";

function Support() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supportData, setSupportData] = useState({
    priority: "",
    root_caused: "",
    description: "",
  });
  const [supportList, setSupportList] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalSupport, setModalSupport] = useState({});
  const openModal = (support) => {
    setModalSupport(support);
    setModalState(true);
  };

  useEffect(() => {
    const getAllSupports = async () => {
      const { user, token } = isAuthenticated();
      allSupports(user._id, user.school, token)
        .then((res) => {
          const data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              key: i,
              sid: res[i].SID,
              status: res[i].status,
              root_caused: res[i].root_caused,
              action: (
                <h5 key={i + 1} className="mb-0">
                  <Button
                    className="btn-sm pull-right"
                    color="primary"
                    type="button"
                    key={"view" + i + 1}
                    onClick={() => {
                      openModal(res[i]);
                    }}
                  >
                    View More
                  </Button>
                </h5>
              ),
            });
          }
          setSupportList(data);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllSupports();
  }, [checked]);

  const columns = [
    {
      title: "SID",
      dataIndex: "sid",
      width: "30%",
      sorter: (a, b) => a.sid > b.sid,
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
        return record.sid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "30%",
      sorter: (a, b) => a.status > b.status,
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
        return record.status.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Root Caused",
      dataIndex: "root_caused",
      width: "30%",
      sorter: (a, b) => a.root_caused > b.root_caused,
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
        return record.root_caused.toLowerCase().includes(value.toLowerCase());
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
    setSupportData({ ...supportData, [name]: event.target.value });
  };
  const handleFormChange = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    try {
      const resp = await support(user._id, token, formData);
      console.log(resp);
      if (resp.err) {
        return toast.error(resp.err);
      }
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setSupportData({
        priority: "",
        root_caused: "",
        description: "",
      });
      toast.success("Student added successfully");
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <SimpleHeader name="Support" />
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
                  <CardBody className="ml-4 mr-4">
                    <Row>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect1"
                      >
                        Priority
                      </label>
                      <Input
                        id="exampleFormControlSelect1"
                        type="select"
                        onChange={handleChange("priority")}
                        value={supportData.priority}
                        required
                      >
                        <option value="P1">P1 - Critical</option>
                        <option value="P2">P2 - Medium</option>
                        <option value="P3">P3 - Normal</option>
                      </Input>
                    </Row>
                    <Row className="mt-4">
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Root Caused
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Root Caused"
                        type="text"
                        onChange={handleChange("root_caused")}
                        value={supportData.root_caused}
                        required
                      />
                    </Row>
                    <Row className="mt-4">
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlTextarea1"
                      >
                        Description
                      </label>
                      <Input
                        id="exampleFormControlTextarea1"
                        rows="5"
                        type="textarea"
                        onChange={handleChange("description")}
                        value={supportData.description}
                        required
                      />
                    </Row>
                    <Row className="mt-4 float-right">
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
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
                      data={supportList}
                      pagination={true}
                      exportFileName="SupportDetails"
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
      <Modal
        className="modal-dialog-centered"
        isOpen={modalState}
        toggle={() => setModalState(false)}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Support Details
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setModalState(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Row>
            <Col align="center">
              <h4 className="mt-3 mb-1">SID</h4>
              <span className="text-md">{modalSupport.SID}</span>
            </Col>
            <Col align="center">
              <h4 className="mt-3 mb-1">Status</h4>
              <span className="text-md">{modalSupport.status}</span>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <h4 className="mt-3 mb-1">Priority</h4>
              <span className="text-md">{modalSupport.priority}</span>
            </Col>
            <Col align="center">
              <h4 className="mt-3 mb-1">Root Caused</h4>
              <span className="text-md">{modalSupport.root_caused}</span>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <h4 className="mt-3 mb-1">Description</h4>
              <span className="text-md">{modalSupport.description}</span>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Support;
