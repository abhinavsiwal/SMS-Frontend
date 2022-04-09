import React, { useState, useEffect } from "react";
import { Container, Table, Card, Input, CardBody } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import "./styles.css";
import { getDepartment, departmentHead,getNonHeads } from "api/department";
import { isAuthenticated } from "api/auth";
import Loader from "components/Loader/Loader";
import { allStaffs,updateStaff1 } from "api/staff";
import { toast,ToastContainer } from "react-toastify";
import { fetchingDepartmentError } from "constants/errors";
import { fetchingStaffFailed } from "constants/errors";
import { departmentHeadAssignError } from "constants/errors";
import { departmentHeadAssignSuccess } from "constants/success";


const DepartmentHead = () => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();
  const [primaryHeadId, setPrimaryHeadId] = useState("");
  const [secondaryHeadId, setSecondaryHeadId] = useState("");
const [checked, setChecked] = useState(false);

  useEffect(() => {
    getAllDepartments();
    getAllStaff();
  }, [checked]);

  const getAllDepartments = async () => {
    try {
      setLoading(true);
      const dept = await getDepartment(user.school, user._id, token);
      if (dept.err) {
        return toast.error(dept.err);
      }
      console.log(dept);
      setDepartments(dept);
      setLoading(false);
    } catch (err) {
      toast.error(fetchingDepartmentError);
      setLoading(false);
    }
  };

  const getAllStaff = async () => {
    try {
      setLoading(true);
      const payload = { school: user.school };

      const staffData = await getNonHeads(user.school, user._id);
      console.log("staffData", staffData);
      if (staffData.err) {
        return toast.error(staffData.err);
      }
      // let teachers = staffData.filter(staff=>staff.assign_Role.name==="Teacher");
      // console.log(teachers);
      setStaff(staffData);
      setLoading(false);
    } catch (err) {
      toast.error(fetchingStaffFailed);
      setLoading(false);
    }
  };

  const [selectStaff, setSelectStaff] = useState([]);

  const [formData] = useState(new FormData());

  const primaryHeadHandler = (departmentId) => async (e) => {
    console.log(departmentId);
    console.log(e.target.value);
    let deptId=e.target.value;
    let formData = new FormData();
    formData.set("primary_head", e.target.value);
    let formData1 = new FormData();
    formData1.set("head",departmentId);
    try {
      setLoading(true);
      const data = await departmentHead(
        departmentId,
        user._id,
        token,
        formData
      );
      console.log(data);
      const data1 = await updateStaff1(deptId,user._id,formData1)
      console.log(data1);
      setChecked(!checked)
      setLoading(false);
      toast.success(departmentHeadAssignSuccess);

    } catch (err) {
      console.log(err);
      setLoading(false)
      toast.error(departmentHeadAssignError)
    }
  };
  const secondaryHeadHandler = (departmentId) => async (e) => {
    console.log(departmentId);
    console.log(e.target.value);
    let deptId=e.target.value;
    let formData = new FormData();
    formData.set("secondary_head", e.target.value);
    let formData1 = new FormData();
    formData1.set("head",departmentId);

    try {
      setLoading(true)
      const data = await departmentHead(
        departmentId,
        user._id,
        token,
        formData
      );
      console.log(data);
      const data1 = await updateStaff1(deptId,user._id,formData1)
      console.log(data1);
      setChecked(!checked)
      setLoading(false);
      toast.success(departmentHeadAssignSuccess);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(departmentHeadAssignError)
    }
  };

  return (
    <>
      <SimpleHeader name="Dept Head" parentName="Department Management" />
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
      <Container fluid className="mt--6 shadow-lg">
        <Card className="department-head-container">
          <CardBody>
            <Table className="my-table">
              <tbody>
                {!loading ? (
                  <>
                    { departments && departments.map((clas) => (
                      <tr className="teacher-table-row">
                        <td className="teacher-table-class">{clas.name}</td>
                        <td>
                          <Input
                            id={clas._id}
                            type="select"
                            onChange={primaryHeadHandler(clas._id)}
                            // value={subject[clas._id] || ""}
                            value={ clas.primary_head && clas.primary_head._id}
                            placeholder="Select Staff"
                          >
                            <option value="">
                              Primary Head
                            </option>
                        {console.log(clas)}
                            { staff&& staff.map((tech) => (
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
                            onChange={secondaryHeadHandler(clas._id)}
                            // value={subject[clas._id] || ""}
                            value={clas.secondary_head &&  clas.secondary_head._id}
                            placeholder="Select Staff"
                          >
                            <option value="">
                              Secondary Head
                            </option>

                            { staff && staff.map((tech) => (
                              <option key={tech._id} value={tech._id}>
                                {tech.firstname} {tech.lastname}
                              </option>
                            ))}
                          </Input>
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