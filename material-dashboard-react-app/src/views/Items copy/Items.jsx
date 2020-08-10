import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "./node_modules/components/Grid/GridItem.jsx.js";
import GridContainer from "./node_modules/components/Grid/GridContainer.jsx.js";
import CustomInput from "./node_modules/components/CustomInput/CustomInput.jsx.js";
import Button from "./node_modules/components/CustomButtons/Button.jsx.js";
import Card from "./node_modules/components/Card/Card.jsx.js";
import CardHeader from "./node_modules/components/Card/CardHeader.jsx.js";
import CardBody from "./node_modules/components/Card/CardBody.jsx.js";
import AddAlert from "@material-ui/icons/AddAlert";

import Snackbar from "./node_modules/components/Snackbar/Snackbar.jsx.js";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import tableStyle from "./node_modules/assets/jss/material-dashboard-react/components/tableStyle.jsx.js";
import formStyle from "./node_modules/assets/jss/material-dashboard-react/components/formStyle.jsx.js";
import CustomSelect from "../../components/CustomSelect/CustomSelect";


const { REACT_APP_SERVER_URL } = process.env;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      categoriesData: [],
      alertColor: '',
      alertOpen: false,
      alertMsg: ''
    };
    this.insertObject = this.insertObject.bind(this);
    this.fillTable = this.fillTable.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.fillTable(this);
  }

  fillTable(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/items`)
      .then(res => {
        const cat = res.data.items;
        this.setState({ categoriesData: cat.map(c => Object.values(c))});
      })
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

    const fields = ["name", "description"];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let insertRequest;
    try {
      insertRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/categories`,
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

    this.fillTable(this);
    this.showAlert(this, msg, insertRequestData.success);
  }

  render() {
    const { classes, name, description } = this.props;
    const { errors , alertColor, alertMsg, alertOpen } = this.state;

    console.log(errors.name);
    return (
      <div>
        <GridContainer>
          <GridItem xs={24} sm={24} md={24}>
            <form onSubmit={this.insertObject}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Artículos</h4>
                  <p className={classes.cardCategoryWhite}>Administración</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={1} sm={1} md={2}>
                      <CustomInput
                        labelText="Codigo"
                        id="codigo"
                        error={errors.codigo}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: "codigo"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <CustomInput
                        labelText="Nombre"
                        id="name"
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: "name"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={6}>
                      <CustomInput
                        labelText="Descripción"
                        id="description"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          name: "description"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={2}>
                      <CustomInput
                        labelText="Precio"
                        id="precio"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          name: "precio"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={2}>
                      <CustomInput
                        labelText="Stock"
                        id="stock"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          name: "stock"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <CustomSelect
                          labelText="Categoría"
                          id="category"
                          error={errors.username}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            required: true,
                            name: "category"
                          }}
                          items={["Indumentaria", "Bazar"]}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <Button type="submit" color="info" size="xs">
                        Guardar
                      </Button>
                    </GridItem>
                  </GridContainer>
                  <Snackbar
                    place="br"
                    color={alertColor}
                    message={alertMsg}
                    open={alertOpen}
                  />

                  <div className={classes.tableResponsive}>
                    <Table className={classes.table}>
                        <TableHead className={classes["primaryTableHeader"]}>
                          <TableRow>
                            {["ID", "Código", "Nombre", "Descripción", "Precio", "Stock", "Categoría"].map((prop, key) => {
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
                        {this.state.categoriesData.map((prop, key) => {
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
                </CardBody>
              </Card>
            </form>
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
