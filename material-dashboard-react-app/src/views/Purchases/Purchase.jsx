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
      errors: {},
      categoriesData: [],
      employeesData: [],
      providersData: [],
      itemsData: [],
      detailsData: [],
      detailForm: [],
      item: '',
      itemComboVal: '',
      employeeComboVal: '',
      providerComboVal: '',
      unitPrice: '',
      quantity: '',
      alertColor: '',
      alertOpen: false,
      alertMsg: ''
    };
    this.insertObject = this.insertObject.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.fillComboEmployee(this);
    this.fillComboProvider(this);
    this.fillComboItem(this);
    this.addDetail = this.addDetail.bind(this);
    this.updateUnitPrice = this.updateUnitPrice.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
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

  fillComboItem(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/items`)
      .then(res => {
        const cat = res.data.items;
        cat.forEach(e => {
          e.code = e.code + " " + e.name;
        });
        this.setState({ itemsData: cat.map(c => Object.values(c))});
      })
  }

  addDetail(e) {
    if(this.state.item != '' && this.state.unitPrice != '' && this.state.quantity != '') {
      const fields = [this.state.item, this.state.unitPrice, this.state.quantity];
      const fieldsForm = [this.state.itemComboVal, this.state.unitPrice, this.state.quantity];

      this.state.detailsData.push(fields);
      this.setState({detailsData : this.state.detailsData})

      this.state.detailForm.push(fieldsForm);

      this.setState({item : ''});
      this.setState({unitPrice : ''});
      this.setState({quantity : ''});
      this.setState({itemComboVal : ''});
    }
  }

  updateUnitPrice(e) {
    this.setState({ unitPrice: e.target.value});
  }

  updateQuantity(e) {
    this.setState({ quantity: e.target.value});
  }

  updateItem(e) {
    this.setState({itemComboVal : e.target.value});
    this.setState({item : this.state.itemsData.filter(i => i[0] == e.target.value)[0][1]});
  }

  updateEmployee(e) {
    this.setState({employeeComboVal : e.target.value});
  }

  updateProvider(e) {
    this.setState({providerComboVal : e.target.value});
  }

  showAlert(e, msg, success) {
    if(msg) {
      this.setState({ alertOpen: true});
      this.setState({ alertMsg: msg});
      this.setState({ alertColor: success ? 'success' : 'danger'});
      setTimeout(
        () => {
          this.setState({alertOpen: false});
      },
        3000
      );
    }
  }

  async insertObject(e) {
    e.preventDefault();
    this.setState({ errors: {}});

    const fields = ["employee_id", "provider_id", "date"];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    
    formValues.employee_id = parseInt(formValues.employee_id);
    formValues.provider_id = parseInt(formValues.provider_id);

    
    let details = [];

    this.state.detailForm.forEach(d => {
        let detail = {};
        detail.item_id = parseInt(d[0]);
        detail.unit_price = parseFloat(d[1]);
        detail.quantity = parseInt(d[2]);

        details.push(detail);
    });

    formValues.details = details;
    console.log('formValues');
    console.log(formValues);



    let insertRequest;
    try {
      insertRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/purchases`,
        {
          ...formValues
        }
      );
    } catch ({ response }) {
      insertRequest = response;
    }

    const { data: insertRequestData } = insertRequest;

    console.log(insertRequestData);
    console.log(insertRequest);

    var msg = '';

    if (!insertRequestData.success) {
      this.setState({
        errors:
        insertRequestData.messages && insertRequestData.messages.errors
      });
      if(insertRequestData.messages.errors.databaseError) {
        msg = insertRequestData.messages.errors.databaseError;
      }
    } else {
      msg = insertRequestData.messages.success;
    }
    this.showAlert(this, msg, insertRequestData.success);
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
                  <p className={classes.cardCategoryWhite}>Nueva Compra</p>
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
                          error={errors.username}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            required: true,
                            name: "provider_id"
                          }}
                          items={this.state.providersData}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <CustomInput
                        labelText="Fecha"
                        id="date"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          name: "date"
                        }}
                      />
                    </GridItem>

                    <GridItem xs={3} sm={3} md={4}>
                      <CustomSelect
                          labelText="Artículo"
                          id="item_id"
                          error={errors.username}
                          value={this.state.itemComboVal}
                          onChange={this.updateItem}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            required: true,
                            name: "item_id"
                          }}
                          items={this.state.itemsData}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={2}>
                      <CustomInput
                        labelText="Precio Unitario"
                        id="unit_price"
                        error={errors.username}
                        onChange={this.updateUnitPrice}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          name: "unit_price"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={2}>
                      <CustomInput
                        labelText="Cantidad"
                        id="quantity"
                        error={errors.username}
                        onChange={this.updateQuantity}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          name: "quantity"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                    <Button type="button" 
                              color="info" 
                              size="xs"
                              onClick={this.addDetail}
                      >
                        Agregar
                      </Button>
                    </GridItem>
                    
                    <div className={classes.tableResponsive}>
                    <Table className={classes.table}>
                        <TableHead className={classes["primaryTableHeader"]}>
                          <TableRow>
                            {["Artículo", "Precio Unitario", "Cantidad"].map((prop, key) => {
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
                    <GridItem xs={3} sm={3} md={3}>
                      <Button type="submit" color="info" size="xs">
                        Guardar
                      </Button>
                  </GridItem>
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
