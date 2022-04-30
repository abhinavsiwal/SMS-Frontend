import React, { useEffect, useState, useRef } from "react";
import { isAuthenticated } from "api/auth";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Button,
  CardImg,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { SearchOutlined } from "@ant-design/icons";
import AntTable from "../tables/AntTable";
import Loader from "components/Loader/Loader";
import { Popconfirm } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { getAllLeaves } from "../../../api/leave";

const ViewLeaves = () => {
  const { user } = isAuthenticated();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  getAllLeavesHandler();
}, [])


const getAllLeavesHandler = async()=>{
    try {
        setLoading(true);
        const data = await getAllLeaves(user._id,user.school);
        console.log(data);
        setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
    }
}

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
      <SimpleHeader name="View Leaves" />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader className="buttons-head">
            <h5>View Leaves</h5>
          </CardHeader>
          <CardBody>{loading ? <Loader /> : <AntTable />}</CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ViewLeaves;
