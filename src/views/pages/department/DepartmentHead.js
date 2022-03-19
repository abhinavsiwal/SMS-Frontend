import React, { useState, useEffect } from "react";
import { Container, Table, Card, Input, CardBody } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import "./styles.css";
import { getDepartment,departmentHead } from "api/department";
import { isAuthenticated } from "api/auth";
import Loader from "components/Loader/Loader";
import { allStaffs } from "api/staff";
import { toast } from "react-toastify";

const DepartmentHead = () => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  useEffect( () => {
 
    getAllDepartments();
    getAllStaff();
   
  }, []);

  const getAllDepartments=async()=>{
    try {
      const dept = await getDepartment(user.school, user._id, token);
      if (dept.err) {
        return toast.error(dept.err);
      }
      console.log(dept);
      setDepartments(dept);
      setLoading(true);
    } catch (err) {
      toast.error(err);
    }


  }

  const getAllStaff=async()=>{
    try {
      const payload = { school: user.school };

      const staffData = await allStaffs(
        user.school,
        user._id,
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
  }



  const [selectStaff, setSelectStaff] = useState([]);

  const [formData] = useState(new FormData());

 


const departmentHeadHandler=departmentId=>async(e)=>{
  console.log(departmentId);
  console.log(e.target.value);
let formData = new FormData();
formData.set("head",e.target.value);

try {
  const data = await departmentHead(departmentId,user._id,token,formData)
  console.log(data);
} catch (err) {
  console.log(err);
}


  
}

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
                            onChange={departmentHeadHandler(clas._id)}
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
