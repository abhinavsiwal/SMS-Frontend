import React, { useState, useEffect } from "react";
import { Container, Table, Card, Input, CardBody, Button } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import "./styles.css";
import {
  getDepartment,
  departmentHead,
  updateDepartment,
} from "api/department";
import { isAuthenticated } from "api/auth";
import Loader from "components/Loader/Loader";
import { allStaffs } from "api/staff";
import { toast } from "react-toastify";
import { fetchingDepartmentError } from "constants/errors";
import { fetchingStaffFailed } from "constants/errors";
import { departmentHeadAssignError } from "constants/errors";
import { departmentHeadAssignSuccess } from "constants/success";

const DepartmentHead = () => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();
  const [primaryHead, setPrimaryHead] = useState("");
  const [secondaryHead, setSecondaryHead] = useState("");
const [checked, setChecked] = useState(false);

  useEffect(() => {
    getAllDepartments();
    getAllStaff();
  }, [checked]);

  const getAllDepartments = async () => {
    try {
      const dept = await getDepartment(user.school, user._id, token);
      if (dept.err) {
        return toast.error(dept.err);
      }
      console.log(dept);
      setDepartments(dept);
      setLoading(true);
    } catch (err) {
      toast.error(fetchingDepartmentError);
    }
  };

  const getAllStaff = async () => {
    try {
      const payload = { school: user.school };

      const staffData = await allStaffs(user.school, user._id);
      console.log("staffData", staffData);
      if (staffData.err) {
        return toast.error(staffData.err);
      }
      // let teachers = staffData.filter(staff=>staff.assign_Role.name==="Teacher");
      // console.log(teachers);
      setStaff(staffData);
      setLoading(true);
    } catch (err) {
      toast.error(fetchingStaffFailed);
    }
  };

  const [selectStaff, setSelectStaff] = useState([]);

  const [formData] = useState(new FormData());

  const updateHeadHandler = async (departmentId) => {
    console.log(departmentId);
    console.log(primaryHead);
    console.log(secondaryHead);

    const role = [primaryHead, secondaryHead];
    formData.set("role", JSON.stringify(role));

    try {
      const data = await updateDepartment(
        departmentId,
        user._id,
        token,
        formData
      );
      console.log(data);
      toast.success(departmentHeadAssignSuccess);
      setChecked(!checked)
    } catch (err) {
      console.log(err);
      toast.error(departmentHeadAssignError);
    }
  };

  return (
    <>
      <SimpleHeader name="Dept Head" parentName="Department Management" />
      <Container fluid className="mt--6 shadow-lg">
        <Card className="department-head-container">
          <CardBody>
            <Table className="my-table">
              <tbody>
                {loading ? (
                  <>
                    {departments &&
                      departments.map((clas) => (
                        <tr className="teacher-table-row">
                          <td className="teacher-table-class">{clas.name}</td>
                          <td>
                            <Input
                              id={clas._id}
                              type="select"
                              onChange={(e) => setPrimaryHead(e.target.value)}
                              value={clas.role[0]}
                              // value={primaryHead}
                              placeholder="Select Staff"
                            >
                              <option value="" disabled selected>
                                Primary Head
                              </option>

                              {staff &&
                                staff.map((tech) => (
                                  <option key={tech._id} value={tech._id}>
                                    {tech.firstname} {tech.lastname}
                                  </option>
                                ))}
                            </Input>
                          </td>
                          <td>
                            <Input
                              id={clas._id}
                              type="select"
                              onChange={(e) => setSecondaryHead(e.target.value)}
                              value={clas.role[1]}
                              // value={secondaryHead}
                              placeholder="Select Staff"
                            >
                              <option value="" disabled selected>
                                Secondary Head
                              </option>

                              {staff &&
                                staff.map((tech) => (
                                  <option key={tech._id} value={tech._id}>
                                    {tech.firstname} {tech.lastname}
                                  </option>
                                ))}
                            </Input>
                          </td>
                          <td>
                            <Button
                              color="primary"
                              onClick={() => updateHeadHandler(clas._id)}
                            >
                              Update Heads
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </>
                ) : (
                  <Loader />
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default DepartmentHead;
