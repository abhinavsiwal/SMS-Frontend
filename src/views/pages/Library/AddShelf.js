import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import Loader from "components/Loader/Loader";
import "react-datepicker/dist/react-datepicker.css";
import { isAuthenticated } from "api/auth";
import "./style.css";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { toast, ToastContainer } from "react-toastify";
import {
  addLibrarySection,
  getAllLibrarySection,
  addLibraryShelf,
} from "../../../api/libraryManagement";
import { SearchOutlined } from "@ant-design/icons";
const AddShelf = () => {
  const [sectionName, setSectionName] = useState("");
  const [sectionAbv, setSectionAbv] = useState("");
  const { user } = isAuthenticated();
  const [addLoading, setAddLoading] = useState(false);
  const [allSection, setAllSection] = useState([]);
  const [shelfName, setShelfName] = useState("");
  const [shelfAbv, setShelfAbv] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [checked, setChecked] = useState(false)

  const columns=[
    {
      title: "S No.",
      dataIndex: "s_no",
    },
    {
      title: "Section Name",
      dataIndex: "shelf_name",
      sorter: (a, b) => a.shelf_name > b.shelf_name,
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
        return record.shelf_name.toLowerCase().includes(value.toLowerCase());
      },
    },
  ]

  useEffect(() => {
    getAllSection();
  }, [checked]);

  const getAllSection = async () => {
    try {
      const data = await getAllLibrarySection(user.school, user._id);
      console.log(data);
      setAllSection(data);
    } catch (err) {
      console.log(err);
      toast.error("Error in getting Sections");
    }
  };

  const addSectionHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.set("name", sectionName);
    formData.set("abbreviation", sectionAbv);
    formData.set("school", user.school);
    try {
      setAddLoading(true);
      const data = await addLibrarySection(user._id, formData);
      console.log(data);
      if(data.err){
        toast.error(data.err);
        setAddLoading(false);
        return;
      }
      toast.success("Section Added Successfully");
      setSectionName("");
      setSectionAbv("");
      setChecked(!checked);
      setAddLoading(false);
    } catch (err) {
      console.log(err);
      setAddLoading(false);
      toast.error("Section Added Failed");
    }
  };

  const getAllShelf = async () => {
    
  }

  const addShelfHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", shelfName);
    formData.set("abbreviation", shelfAbv);
    formData.set("section", sectionId);
    formData.set("school",user.school);

    try {
      setAddLoading(true);
      const data = await addLibraryShelf(user._id, formData);
      console.log(data);
      if(data.err){
        toast.error(data.err);
        setAddLoading(false);
        return;
      }
      toast.success("Shelf Added Successfully");
      setChecked(!checked);
      setShelfName("")
      setShelfAbv("");
      setSectionId("");
      setAddLoading(false);
    } catch (err) {
      console.log(err);
      setAddLoading(false);
      toast.error("Shelf Added Failed");
    }


  };

  return (
    <>
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
      <SimpleHeader name="Library" parentName="Add Shelf" />
      <Container className="mt--6" fluid>
        {addLoading ? (
          <Loader />
        ) : (
          <Row>
            <Col lg="4">
              <div className="card-wrapper">
                <Card>
                  <CardHeader>
                    <h3>Add Library Section</h3>
                  </CardHeader>
                  <CardBody>
                    <Form className="mb-4" onSubmit={addSectionHandler}>
                      <Row>
                        <Col>
                          <Label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Section Name
                          </Label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Section Name"
                            type="text"
                            onChange={(e) => setSectionName(e.target.value)}
                            value={sectionName}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Section Abbreviation
                          </Label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Section Name"
                            type="text"
                            onChange={(e) => setSectionAbv(e.target.value)}
                            value={sectionAbv}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <Button color="primary" type="submit">
                            Add Section
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col lg="8">
              <div className="card-wrapper">
                <Card>
                  <CardHeader>
                    <h3>Add Shelf</h3>
                  </CardHeader>
                  <CardBody>
                    <Form className="mb-4" onSubmit={addShelfHandler} >
                      <Row
                        md="4"
                        className="d-flex justify-content-center mb-4"
                      >
                        <Col md="12">
                          <Label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Shelf Name
                          </Label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Name"
                            type="text"
                            onChange={(e) => setShelfName(e.target.value)}
                            value={shelfName}
                            required
                          />
                        </Col>
                        <Col md="12">
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            Section
                          </Label>
                          <Input
                            id="exampleFormControlSelect3"
                            type="select"
                            onChange={(e) => setSectionId(e.target.value)}
                            value={sectionId}
                            required
                          >
                            <option value="" selected>
                              Select Section
                            </option>
                            {allSection &&
                              allSection.map((section) => {
                                return (
                                  <option
                                    key={section._id}
                                    value={section._id}
                                    selected
                                  >
                                    {section.name}
                                  </option>
                                );
                              })}
                          </Input>
                        </Col>
                        <Col md="12">
                          <Label
                            className="form-control-label"
                            htmlFor="example4cols2Input"
                          >
                            Shelf Abbreviation
                          </Label>
                          <Input
                            id="example4cols2Input"
                            placeholder="Name"
                            type="text"
                            onChange={(e) => setShelfAbv(e.target.value)}
                            value={shelfAbv}
                            required
                          />
                        </Col>
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            marginTop:"2rem"
                          }}
                          md="12"
                        >
                          <Button color="primary" type="submit">
                            Add Shelf
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default AddShelf;
