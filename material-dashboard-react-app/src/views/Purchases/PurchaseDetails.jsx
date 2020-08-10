import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddAlert from "@material-ui/icons/AddAlert";

import Snackbar from "components/Snackbar/Snackbar.jsx";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import CustomSelect from "../../components/CustomSelect/CustomSelect";


const { REACT_APP_SERVER_URL } = process.env;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.search.split('=')[1],
      errors: {},
      employeesData: [],
      providersData: [],
      detailsData: [],
      employeeComboVal: '',
      providerComboVal: '',
      date: '',
      alertColor: '',
      alertOpen: false,
      alertMsg: ''
    };
    this.fillComboEmployee(this);
    this.fillComboProvider(this);
    this.fillTableDetails(this);
    this.fillCombos(this);
  }

  fillComboEmployee(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/employees`)
      .then(res => {
        const cat = res.data.employees;
        cat.forEach(e => {
          e.name = e.name + " " + e.last_name;
        });
        this.setState({ employeesData: cat.map(c => Object.values(c))});
      })
  }

  fillComboProvider(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/providers`)
      .then(res => {
        const cat = res.data.providers;
        this.setState({ providersData: cat.map(c => Object.values(c))});
      })
  }

  fillCombos(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/purchases/` + this.state.id)
      .then(res => {
        this.setState({ employeeComboVal: res.data.employee_id});
        this.setState({ providerComboVal: res.data.provider_id});
        this.setState({ date: res.data.date });
      })
  }

  fillTableDetails(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/purchases/` + this.state.id + `/details`)
      .then(res => {
        const cat = res.data.details;
        this.setState({ detailsData: cat.map(c => Object.values(c))});
      })
  }

  render() {
    const { classes, name, description } = this.props;
    const { errors , alertColor, alertMsg, alertOpen } = this.state;

    console.log(errors.name);
    return (
      <div>
        <GridContainer>
          <GridItem xs={24} sm={24} md={12}>
            <form onSubmit={this.insertObject}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Compras</h4>
                  <p className={classes.cardCategoryWhite}>Detalle de Compra</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={4}>
                      <CustomSelect
                          labelText="Empleado"
                          id="employee_id"
                          error={errors.username}
                          value={this.state.employeeComboVal}
                          onChange={this.updateEmployee}
                          readOnly="true"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            required: true,
                            name: "employee_id"
                          }}
                          items={this.state.employeesData}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={4}>
                      <CustomSelect
                          labelText="Proveedor"
                          id="provider_id"
                          value={this.state.providerComboVal}
                          onChange={this.updateProvider}
                          readOnly="true"
                          error={errors.username}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            required: true,
                            name: "provider_id",
                            readOnly: true
                          }}
                          items={this.state.providersData}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <CustomInput
                        labelText="Fecha"
                        id="date"
                        value={this.state.date}
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          name: "date",
                          disabled: true
                        }}
                      />
                    </GridItem>

                
                    
                    <div className={classes.tableResponsive}>
                    <Table className={classes.table}>
                        <TableHead className={classes["primaryTableHeader"]}>
                          <TableRow>
                            {["ID", "Artículo", "Precio Unitario", "Cantidad"].map((prop, key) => {
                              return (
                                <TableCell
                                  className={classes.tableCell + " " + classes.tableHeadCell}
                                  key={key}
                                >
                                  {prop}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.detailsData.map((prop, key) => {
                              return (
                                <TableRow key={key}>
                                  {prop.map((prop, key) => {
                                    return (
                                      <TableCell className={classes.tableCell} key={key}>
                                        {prop}
                                      </TableCell>
                                    );
                                  })}
                                  
                                </TableRow>
                              );
                            })}
                        </TableBody>
                    </Table>
                    </div>
                  
                    
                  </GridContainer>
                  </CardBody>
              </Card>
            </form>
                  <Snackbar
                    place="br"
                    color={alertColor}
                    message={alertMsg}
                    open={alertOpen}
                  />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string
};

export default withStyles(formStyle)(UserProfile);
