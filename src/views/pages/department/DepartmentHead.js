import React, { useState, useEffect } from 'react';
import { Container, Table, Card, Input, CardBody } from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader';
import './styles.css';

const DepartmentHead = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments([
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
      'Department',
    ]);
  }, []);
  return (
    <>
      <SimpleHeader name="Dept Head" parentName="Department Management" />
      <Container fluid className="mt--6 shadow-lg">
        <Card className="department-head-container">
          <CardBody>
            <Table className="my-table">
              <tbody>
                {departments?.map((clas, index) => (
                  <tr className="teacher-table-row">
                    <td className="teacher-table-class">{clas}</td>
                    <td>
                      <Input id={index} type="select">
                        {departments?.map((tech, i) => (
                          <option key={i} value={tech}>
                            {tech}
                          </option>
                        ))}
                      </Input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default DepartmentHead;
