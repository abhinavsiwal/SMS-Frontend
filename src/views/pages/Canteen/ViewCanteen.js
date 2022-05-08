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
  menuItemEdit,
} from "../../../api/canteen/index";
//Loader
import Loader from "components/Loader/Loader";

import TextArea from "antd/lib/input/TextArea";

import { isAuthenticated } from "api/auth";
import { toast, ToastContainer } from "react-toastify";

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
  const [isData, setisData] = useState(false);
  const [addMenu, setAddMenu] = React.useState({
    image: "",
    item: "",
    price: "",
    publish: "",
    id: "",
  });
  const [deleted, setDeleted] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
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
        return record.item_name.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Start Time",
      dataIndex: "start_time",
      sorter: (a, b) => a.start_time > b.start_time,
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
        return record.start_time.toLowerCase().includes(value.toLowerCase());
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
        return record.end_time.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price > b.price,
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
        return record.price.toLowerCase().includes(value.toLowerCase());
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
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  const { user, token } = isAuthenticated();
  const [editLoading, setEditLoading] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let permission1 = [];
  useEffect(() => {
    // console.log(user);
    if (user.permissions["Canteen Management"]) {
      permission1 = user.permissions["Canteen Management"];
      setPermissions(permission1);
      // console.log(permissions);
    }
  }, [checked, selectedCanteenId]);

  React.useEffect(() => {
    fetchCanteen();
  }, [checked]);
  const fetchCanteen = async () => {
    setLoading(true);
    const res = await allCanteens(user._id, user.school); // Call your function here
    // console.log(res);
    await setAllCanteen(res);

    setLoading(false);
  };
  useEffect(() => {
    if (selectedCanteenId) {
      tableData();
    }
  }, [selectedCanteenId, deleted]);

  const tableData = async () => {
    // console.log(selectedCanteenId);

    if (selectedCanteenId === undefined) {
      return;
    }

    if (selectedCanteenId === "empty") {
      // console.log("empty");
      setisData(false);
      setShowDeleteButton(false);
      return;
    }
    // console.log(allCanteen);
    let selectedCanteen = await allCanteen.find(
      (canteen) => canteen._id === selectedCanteenId
    );
    // console.log(selectedCanteen);
    const data = [];
    if (selectedCanteen.menu.length === 0) {
      setisData(false);
      setShowDeleteButton(true);
      return;
    }
    setShowDeleteButton(true);
    setisData(true);
    for (let i = 0; i < selectedCanteen.menu.length; i++) {
      data.push({
        key: i,
        s_no: [i + 1],
        item_name: selectedCanteen.menu[i].item,
        start_time: selectedCanteen.menu[i].start_time,
        end_time: selectedCanteen.menu[i].end_time,
        image: (
          <img width={100} height={100} src={selectedCanteen.menu[i].tempPhoto} />
        ),
        price: selectedCanteen.menu[i].price,
        publish: selectedCanteen.menu[i].publish,
        action: (
          <h5 key={i + 1} className="mb-0">
            {permission1 && permission1.includes("edit") && (
              <Button
                className="btn-sm pull-right"
                color="primary"
                type="button"
                key={"edit" + i + 1}
                onClick={() => rowHandler(selectedCanteen.menu[i])}
              >
                <i className="fas fa-user-edit" />
              </Button>
            )}
            {permission1 && permission1.includes("delete") && (
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
            )}
          </h5>
        ),
      });
    }
    setViewCanteen(data);
    setLoading(false);
  };

  //values of addMenu
  const handleChangeMenu = (name) => (event) => {
    setAddMenu({ ...addMenu, [name]: event.target.value });
  };

  //Value for image
  const handleFileChange = (name) => (event) => {
    setAddMenu({ ...addMenu, [name]: event.target.files[0].name });
  };

  function rowHandler(sectionData) {
    setEditing(true);
    // console.log(sectionData);
    setAddMenu({
      ...addMenu,
      item: sectionData.item,
      // start_time: sectionData.start_time,
      // end_time: sectionData.end_time,
      price: sectionData.price,
      publish: sectionData.publish,
      // start_time: sectionData.start_time,
      image: sectionData.image,
      id: sectionData._id,
    });
  }
  //Edit Canteen
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // console.log(addMenu);
    // console.log(startDuration);
    // console.log(endDuration);

    let formData = new FormData();
    formData.set("school", user.school);
    formData.set("item", addMenu.item);
    formData.set("image", addMenu.image);
    // formData.set("description", addMenu.description);
    formData.set("start_time", startDuration);
    formData.set("end_time", endDuration);
    formData.set("price", addMenu.price);
    formData.set("publish", addMenu.publish);

    try {
      setEditLoading(true);
      const data = await menuItemEdit(addMenu.id, user._id, formData);

      // console.log(data);
      setChecked(!checked);
      toast.success("Item edited successfully");
      setEditing(false);
      setSelectedCanteenId("empty");
      setDeleted(!deleted);
      setEditLoading(false);
    } catch (err) {
      console.log(err);
      setEditLoading(false);
      toast.error("Error editing item");
    }
  };

  const deleteCanteenHandler = async () => {
    try {
      setLoading(true);
      const data = await canteenDelete(selectedCanteenId, user._id);
      // console.log(data);
      setChecked(!checked);
      setLoading(false);
      toast.success("Canteen Deleted Successfully");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Canteen Not Deleted");
    }
  };

  const deleteMenuItemHandler = async (itemId) => {
    try {
      setLoading(true);
      const data = await menuItemDelete(itemId, user._id);
      // console.log(data);
      setChecked(!checked);
      setLoading(false);
      setSelectedCanteenId("empty");
      setDeleted(!deleted);
      toast.success("Canteen Deleted Successfully");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Canteen Not Deleted");
    }
  };

  return (
    <>
      <SimpleHeader name="Canteen" parentName="View Canteen" />
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
              <option value="empty">Select Canteen</option>
              {allCanteen.map((canteen) => {
                return (
                  <option key={canteen._id} value={canteen._id}>
                    {canteen.name}
                  </option>
                );
              })}
            </Input>

            {showDeleteButton && permissions && permissions.includes("delete") && (
              <Button color="danger" className="mt-3">
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => deleteCanteenHandler()}
                >
                  DeleteCanteen <i className="fas fa-trash" />
                </Popconfirm>
              </Button>
            )}
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
            {!loading && viewCanteen ? (
              isData ? (
                <div ref={componentRef}>
                  <AntTable
                    columns={columns}
                    data={viewCanteen}
                    pagination={true}
                    exportFileName="StudentDetails"
                  />
                </div>
              ) : (
                <h3>No Menu Found</h3>
              )
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
          {editLoading ? (
            <Loader />
          ) : (
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
                        Item Name
                      </Label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Name"
                        type="text"
                        onChange={handleChangeMenu("item")}
                        value={addMenu.item}
                        required
                      />
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
                  </Row>
                  <Row className="mt-4 float-right">
                    <Col>
                      <Button color="primary" type="submit">
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Form>
            </ModalBody>
          )}
        </Modal>
      </Container>
    </>
  );
}

export default ViewCanteen;
