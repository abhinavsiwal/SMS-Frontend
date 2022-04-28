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
import { toast, ToastContainer } from "react-toastify";
import { getStaffByDepartment, allStaffs } from "api/staff";
import { getDepartment } from "api/department";

const StaffReturn = () => {
  const { user, token } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState({
    department: "",
    staff: "",
    bookName: "",
    bookId: "",
    collectionDate: "",
    collectedBy: "",
  });

  const [allDepartments, setAllDepartments] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [filterStaff, setFilterStaff] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  const getAllDepartment = async () => {
    try {
      setLoading(true);
      const dept = await getDepartment(user.school, user._id, token);
      if (dept.err) {
        return toast.error(dept.err);
      }
      console.log(dept);
      setAllDepartments(dept);
      setLoading(false);
    } catch (err) {
      console.log(err);
      // toast.error("Error fetching departments");
      setLoading(false);
    }
  };

  const getAllStaffs = async () => {
    try {
      setLoading(true);
      const { data } = await allStaffs(user.school, user._id);
      console.log(data);
      //   let canteenStaff = data.find((staff) => staff.assign_role === "library");
      setAllStaff(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Fetching Staffs Failed");
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllDepartment();
    getAllStaffs();
  }, [checked]);
  const handleChange = (name) => async (event) => {
    setReturnData({ ...returnData, [name]: event.target.value });
    console.log(name, event.target.value);

    if (name === "department") {
      if (event.target.value === "") {
        return;
      }
      filterStaffHandler(event.target.value);
    }
    if (name === "staff") {
      if (event.target.value === "") {
        return;
      }
      let selectedStaff1 = allStaff.find(
        (staff) => staff._id === event.target.value
      );
      console.log(selectedStaff1);
      setSelectedStaff(selectedStaff1);
    }
  };
  const filterStaffHandler = async (id) => {
    const formData = {
      departmentId: id,
    };
    try {
      setLoading(true);
      const data = await getStaffByDepartment(user.school, user._id, formData);
      console.log(data);
      setFilterStaff(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching staff");
      setLoading(false);
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
        draggable
        pauseOnHover
        theme="colored"
      />
      {loading ? (
        <Loader />
      ) : (
        <Form className="mt-3">
          <Row>
            <Col md="6">
              <Label
                className="form-control-label"
                htmlFor="example4cols2Input"
              >
                Department
              </Label>
              <Input
                id="example4cols2Input"
                placeholder="Canteen Name"
                type="select"
                name="department"
                onChange={handleChange("department")}
                value={returnData.department}
                required
              >
                <option value="">Select Department</option>
                {allDepartments &&
                  allDepartments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
              </Input>
            </Col>
            <Col md="6">
              <Label
                className="form-control-label"
                htmlFor="example4cols2Input"
              >
                Staff
              </Label>
              <Input
                id="example4cols2Input"
                placeholder="Student Name"
                type="select"
                name="staff"
                onChange={handleChange("staff")}
                value={returnData.staff}
                required
              >
                <option value="">Select Staff</option>
                {filterStaff &&
                  filterStaff.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.firstname} {staff.lastname}
                    </option>
                  ))}
              </Input>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Label
                className="form-control-label"
                htmlFor="example4cols2Input"
              >
                Issued Book
              </Label>
              <Input
                id="exampleFormControlSelect3"
                type="select"
                required
                value={returnData.bookName}
                onChange={handleChange("bookName")}
                name="section"
              >
                <option value="">Select Book</option>
                {selectedStaff.issuedBooks &&
                  selectedStaff.issuedBooks.map((book) => {
                    console.log(book);
                    return (
                      <option value={book._id} key={book._id}>
                        {book.book.name} - {book.bookID}
                      </option>
                    );
                  })}
              </Input>
            </Col>
            <Col md="6">
              <Label
                className="form-control-label"
                htmlFor="example-date-input"
              >
                Collection Date
              </Label>
              <Input
                id="example-date-input"
                type="date"
                onChange={handleChange("collectionDate")}
                value={returnData.collectionDate}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Label
                className="form-control-label"
                htmlFor="example4cols2Input"
              >
                Collected By
              </Label>
              <Input
                id="example4cols2Input"
                placeholder="Student Name"
                type="select"
                name="allocatedBy"
                onChange={handleChange("collectedBy")}
                value={returnData.collectedBy}
                required
              >
                <option value="">Select Staff</option>
                {allStaff &&
                  allStaff.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.firstname} {staff.lastname}
                    </option>
                  ))}
              </Input>
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
                Allocate Book
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default StaffReturn;
