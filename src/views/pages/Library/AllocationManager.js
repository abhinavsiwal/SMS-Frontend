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
import { isAuthenticated } from "api/auth";
//css
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import StudentAllocation from "./StudentAllocation";
import StaffAllocation from "./StaffAllocation";

const AllocationManager = () => {
  const { user, token } = isAuthenticated();
  const [allocateRole, setAllocateRole] = useState("");
  const [allocateState, setAllocateState] = useState(0);
  const [allocationStudentData, setAllocationStudentData] = useState({
    studentClass: "",
    studentSection: "",
    student: "",
    bookName: "",
    bookId: "",
    allocationDate: "",
    allocatedBy: "",
    duration: "",
  });
 
  useEffect(() => {
    if (allocateRole === "") {
      setAllocateState(0);
      return;
    } else if (allocateRole === "student") {
      setAllocateState(1);
      console.log("here1");
      return;
    } else if (allocateRole === "staff") {
      console.log("here2");
      setAllocateState(2);
    }
  }, [allocateRole]);



  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <SimpleHeader name="Allocation Manager" parentName="Library Management" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="6">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Allocate Book</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Input
                        id="example4cols2Input"
                        type="select"
                        onChange={(e) => setAllocateRole(e.target.value)}
                        value={allocateRole}
                      >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                      </Input>
                    </Col>
                  </Row>
                  <>
                    {allocateState === 1 && <StudentAllocation />}
                    {allocateState === 2 && <StaffAllocation />}
                  </>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllocationManager;
