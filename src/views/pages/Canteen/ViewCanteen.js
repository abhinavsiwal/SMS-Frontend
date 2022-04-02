import React, { useEffect, useState, useRef } from "react";

import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  CardHeader,
  Row,
  Col,
  Modal,
  ModalBody,
  Label,
  Form,
} from "reactstrap";
import { useReactToPrint } from "react-to-print";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import AntTable from "../tables/AntTable";

//Ant Table
import { SearchOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import {
  canteenAdd,
  allCanteens,
  canteenDelete,
  menuItemDelete,
} from "../../../api/canteen/index";
//Loader
import Loader from "components/Loader/Loader";

import TextArea from "antd/lib/input/TextArea";

import { isAuthenticated } from "api/auth";
import { toast } from "react-toastify";

// import moment Library
import moment from "moment";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ViewCanteen() {
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  const [viewCanteen, setViewCanteen] = React.useState([]);
  const [allCanteen, setAllCanteen] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedCanteenId, setSelectedCanteenId] = useState();
  const [addMenu, setAddMenu] = React.useState({
    image: "",
    items: "",
    description: "",
    price: "",
    publish: "",
  });

  const [checked, setChecked] = useState(false);

  const columns = [
    {
      title: "S No.",
      dataIndex: "s_no",
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      sorter: (a, b) => a.item_name > b.item_name,
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
        return record.canteen_name.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Start Time",
      dataIndex: "start_time",
      sorter: (a, b) => a.description > b.description,
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
        return record.description.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      sorter: (a, b) => a.end_time > b.end_time,
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
        return record.description.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      sorter: (a, b) => a.image > b.image,
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
        return record.image.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.prize > b.prize,
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
        return record.prize.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Publish",
      dataIndex: "publish",
      sorter: (a, b) => a.publish > b.publish,
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
        return record.publish.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time > b.time,
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
        return record.time.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  const { user, token } = isAuthenticated();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let permissions = [];
  useEffect(() => {
    if (user.role["Canteen Management"]) {
      permissions = user.role["Canteen Management"];
      console.log(permissions);
    }
  }, []);

  React.useEffect(() => {
    fetchStaff();
  }, [checked]);
  const fetchStaff = async () => {
    const res = await allCanteens(user._id, user.school); // Call your function here
    console.log(res);
    await setAllCanteen(res);
    await setSelectedCanteenId(res[0]._id);

    setLoading(true);
  };
  useEffect(() => {
    if (selectedCanteenId) {
      tableData();
    }
  }, [selectedCanteenId]);

  const tableData = async () => {
    console.log(selectedCanteenId);
    console.log(allCanteen);
    let selectedCanteen = await allCanteen.find(
      (canteen) => canteen._id === selectedCanteenId
    );
    console.log(selectedCanteen);
    const data = [];
    if (selectedCanteen.menu.length === 0) {
      return;
    }
    for (let i = 0; i < selectedCanteen.menu.length; i++) {
      data.push({
        key: i,
        s_no: [i + 1],
        item_name: selectedCanteen.menu[i].item,
        start_time: selectedCanteen.menu[i].start_time,
        end_time: selectedCanteen.menu[i].end_time,
        image: selectedCanteen.menu[i].image,
        price: selectedCanteen.menu[i].price,
        publish: selectedCanteen.menu[i].publish,
        time: selectedCanteen.menu[i].time,
        action: (
          <h5 key={i + 1} className="mb-0">
            <Button
              className="btn-sm pull-right"
              color="primary"
              type="button"
              key={"edit" + i + 1}
              onClick={
                () => rowHandler()
                // res[i]._id,
                // res[i].name,
                // res[i].start_date.split("T")[0],
                // res[i].start_date.split("T")[0],
                // res[i].working_days
              }
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
                onConfirm={() =>
                  deleteMenuItemHandler(selectedCanteen.menu[i]._id)
                }
              >
                <i className="fas fa-trash" />
              </Popconfirm>
            </Button>
          </h5>
        ),
      });
    }
    setViewCanteen(data);
    setLoading(true);
  };

  //values of addMenu
  const handleChangeMenu = (name) => (event) => {
    setAddMenu({ ...addMenu, [name]: event.target.value });
  };

  //Value for image
  const handleFileChange = (name) => (event) => {
    setAddMenu({ ...addMenu, [name]: event.target.files[0].name });
  };

  function rowHandler(id) {
    setEditing(true);
  }
  //Edit Canteen
  const handleEditSubmit = () => {};

  const deleteCanteenHandler = async () => {
    try {
      const data = await canteenDelete(selectedCanteenId, user._id);
      console.log(data);
      setChecked(!checked);
      toast.success("Canteen Deleted Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Canteen Not Deleted");
    }
  };

  const deleteMenuItemHandler = async (itemId) => {
    try {
      const data = await menuItemDelete(itemId, user._id);
      console.log(data);
      setChecked(!checked);
      toast.success("Canteen Deleted Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Canteen Not Deleted");
    }
  };

  return (
    <>
      <SimpleHeader name="Canteen" parentName="View Canteen" />
      <Container className="mt--6 shadow-lg" fluid>
        <Card>
          <CardHeader>
            <h3>View Canteen</h3>

            <Input
              id="exampleFormControlSelect3"
              type="select"
              onChange={(e) => setSelectedCanteenId(e.target.value)}
              value={selectedCanteenId}
              required
              style={{ maxWidth: "10rem" }}
            >
              {allCanteen.map((canteen) => {
                return (
                  <option key={canteen._id} value={canteen._id} selected>
                    {canteen.name}
                  </option>
                );
              })}
            </Input>
            <Button
              color="danger"
              className="mt-3"
              onClick={deleteCanteenHandler}
            >
              Delete Canteen
            </Button>
          </CardHeader>
          <CardBody>
            <Button color="primary" className="mb-2" onClick={handlePrint}>
              Print
            </Button>
            {loading ? (
              <div ref={componentRef}>
                <AntTable
                  columns={columns}
                  data={viewCanteen}
                  pagination={true}
                  exportFileName="StudentDetails"
                />
              </div>
            ) : (
              <Loader />
            )}
          </CardBody>
        </Card>
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
            <Form className="mb-4" onSubmit={handleEditSubmit}>
              <CardBody>
                <Row md="4" className="d-flex justify-content-center mb-4">
                  <Col md="8">
                    <label
                      className="form-control-label"
                      htmlFor="example3cols2Input"
                    >
                      Upload Image
                    </label>
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        id="customFileLang"
                        lang="en"
                        type="file"
                        onChange={handleFileChange("image")}
                        accept="image/*"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileLang"
                      >
                        Select file
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Items Name
                    </Label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Name"
                      type="text"
                      onChange={handleChangeMenu("items")}
                      value={addMenu.items}
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Add Canteen
                    </Label>
                    <Input
                      id="exampleFormControlSelect3"
                      type="select"
                      onChange={(e) => setSelectedCanteenId(e.target.value)}
                      value={addMenu.addCanteen}
                      required
                    >
                      <option disabled value="" selected>
                        Select Canteen
                      </option>
                      {allCanteen.map((canteen) => {
                        return (
                          <option
                            key={canteen._id}
                            value={canteen._id}
                            selected
                          >
                            {canteen.name}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md="6">
                    <Label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Price
                    </Label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Price"
                      type="Number"
                      onChange={handleChangeMenu("price")}
                      value={addMenu.price}
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Publish
                    </Label>
                    <Input
                      id="exampleFormControlSelect3"
                      type="select"
                      onChange={handleChangeMenu("publish")}
                      value={addMenu.publish}
                      required
                    >
                      <option value="" disabled selected>
                        Publish
                      </option>
                      <option>Yes</option>
                      <option>No</option>
                    </Input>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md="3">
                    <Label
                      className="form-control-label"
                      htmlFor="xample-date-input"
                    >
                      From
                    </Label>
                    <DatePicker
                      id="exampleFormControlSelect3"
                      className="Period-Time"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      required
                    />
                  </Col>
                  <Col md="3">
                    <Label
                      className="form-control-label"
                      htmlFor="example-date-input"
                    >
                      To
                    </Label>
                    <DatePicker
                      id="exampleFormControlSelect3"
                      className="Period-Time"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Description
                    </Label>
                    <TextArea
                      id="example4cols2Input"
                      placeholder="Description"
                      type="Number"
                      onChange={handleChangeMenu("description")}
                      value={addMenu.description}
                    />
                  </Col>
                </Row>
                <Row className="mt-4 float-right">
                  <Col>
                    <Button color="primary" type="submit">
                      Add Menu
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

export default ViewCanteen;
