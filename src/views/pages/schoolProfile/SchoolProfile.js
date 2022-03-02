/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Button, CardImg, Nav, NavItem, NavLink, TabContent, TabPane, ListGroupItem, ListGroup } from 'reactstrap';
// core components
import SimpleHeader from 'components/Headers/SimpleHeader.js';

import { FaEdit } from 'react-icons/fa';

function SchoolProfile() {
  // 1 -> Details 2 -> Contact
  const [activeTab, setActiveTab] = useState('1');

  return (
    <>
      <SimpleHeader name="School Profile" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="4">
            <div className="card-wrapper">
              <Card>
                <Col align="center">
                  <CardImg alt="..." src="https://trancaes.files.wordpress.com/2015/09/school-logo-new.jpg" top className="p-4" style={{ width: '80%', height: '100%' }} />
                </Col>
                <CardBody className="mt-0">
                  <Row>
                    <Col align="center">
                      <h4 class="mt-0 mb-1">School Name</h4>
                      <span className="text-md">Not Available</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col align="center">
                      <h4 class="mt-3 mb-1">Abbreviation</h4>
                      <span className="text-md">Not Available</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col align="center">
                      <h4 class="mt-3 mb-1">Affiliated Board</h4>
                      <span className="text-md">Not Available</span>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="10">
                      <Nav pills style={{ cursor: 'pointer' }}>
                        <NavItem>
                          <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                            Details
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                            Contact
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                    <Col className="text-right">
                      <Button className="btn-icon" color="primary" type="button">
                        <span className="btn-inner--icon">
                          <FaEdit />
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <ListGroup flush>
                        <Row>
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-info">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">School Address</h5>
                                  <small>abc@abc.abc</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                          <Col md="4">
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-success">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">Pin Code</h5>
                                  <small>abc@abc.abc</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-success">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">Country</h5>
                                  <small>abc@abc.abc</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-info">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">City</h5>
                                  <small>abc@abc.abc</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-success">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">State</h5>
                                  <small>abc@abc.abc</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                        </Row>
                      </ListGroup>
                    </TabPane>
                    <TabPane tabId="2">
                      <ListGroup flush>
                        <Row>
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-success">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">School Email</h5>
                                  <small>abc@abc.abc</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-info">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">Primary Contact Number</h5>
                                  <small>+91 123456789</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-success">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">Telephone</h5>
                                  <small>+91 123456789</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                          <Col>
                            <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                              <div className="checklist-item checklist-item-info">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0">Fax No.</h5>
                                  <small>+91 123456789</small>
                                </div>
                              </div>
                            </ListGroupItem>
                          </Col>
                        </Row>
                      </ListGroup>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SchoolProfile;
