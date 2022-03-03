import React, { useState, useEffect } from "react";
import { Container, Table, Card, Input, CardBody } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import "./styles.css";
import { getDepartment } from "api/department";
import { isAuthenticated } from "api/auth";
import Loader from "components/Loader/Loader";
import { allStaffs } from "api/staff";
import { toast } from "react-toastify";

const DepartmentHead = () => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      const { user, token } = isAuthenticated();
      const dept = await getDepartment(user.school, user._id, token);
      if (dept.err) {
        return toast.error(dept.err);
      }
      setDepartments(dept);
      setLoading(true);
    } catch (err) {
      toast.error(err);
    }

    try {
      const { user, token } = isAuthenticated();
      const payload = { school: user.school };

      const staffData = await allStaffs(
        user._id,
        token,
        JSON.stringify(payload)
      );
      console.log("staffData", staffData);
      if (staffData.err) {
        return toast.error(staffData.err);
      }
      setStaff(staffData);
      setLoading(true);
    } catch (err) {
      toast.error(err);
    }
  }, []);

  const [selectStaff, setSelectStaff] = useState([]);

  console.log("selectStaff", selectStaff);
  const [formData] = useState(new FormData());

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setSelectStaff({ ...selectStaff, [name]: event.target.value });
    // setStaff(
    //   staff.filter((staff) => {
    //     return staff._id !== event.target.value;
    //   })
    // );
  };
  console.log("staff", staff);
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
                    {departments.map((clas) => (
                      <tr className="teacher-table-row">
                        <td className="teacher-table-class">{clas.name}</td>
                        <td>
                          <Input
                            id={clas._id}
                            type="select"
                            onChange={handleChange("head")}
                            // value={subject[clas._id] || ""}
                            value={[selectStaff.head]}
                            placeholder="Select Staff"
                          >
                            <option value="" disabled selected>
                              Select Staff
                            </option>

                            {staff.map((tech) => (
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
