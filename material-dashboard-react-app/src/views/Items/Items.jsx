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

import MaskedInput from 'react-text-mask';

import formStyle from "assets/jss/material-dashboard-react/components/formStyle.jsx";
import CustomSelect from "../../components/CustomSelect/CustomSelect";


const { REACT_APP_SERVER_URL } = process.env;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      itemsData: [],
      categoriesData: [],
      alertColor: '',
      alertOpen: false,
      categoryComboVal: '',
      alertMsg: '',
    };
    this.insertObject = this.insertObject.bind(this);
    this.fillTable = this.fillTable.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.fillTable(this);
    this.fillCombo(this);
  }

  fillTable(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/items`)
      .then(res => {
        const cat = res.data.items;
        this.setState({ itemsData: cat.map(c => Object.values(c))});
      })
  }

  fillCombo(e) {
    axios.get(`http://${REACT_APP_SERVER_URL}/categories`)
      .then(res => {
        const cat = res.data.categories;
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

  updateCategory(e) {
    this.setState({categoryComboVal : e.target.value});
  }
  

  async insertObject(e) {
    e.preventDefault();
    this.setState({ errors: {}});

    const fields = ["code", "name", "description", "price", "stock", "category_id"];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    if(!formValues.code) {formValues.code = null;}
    formValues.category = parseInt(formValues.category);
    formValues.price = parseFloat(formValues.price);
    formValues.stock = parseInt(formValues.stock);
    if(!formValues.stock) {formValues.stock = null;}


    console.log('values');
    console.log(formValues);
    let insertRequest;
  
    try {
      insertRequest = await axios.post(
        `http://${REACT_APP_SERVER_URL}/items`,
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
                        id="code"
                        error={errors.code}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          name: "code"
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
                          name: "name"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={6}>
                      <CustomInput
                        labelText="Descripción"
                        id="description"
                        error={errors.description}
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
                        id="price"
                        error={errors.price}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          name: "price"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={2}>
                      <CustomInput
                        labelText="Stock"
                        id="stock"
                        error={errors.stock}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          name: "stock"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <CustomSelect
                          labelText="Categoría"
                          id="category_id"
                          error={errors.category}
                          value={this.state.categoryComboVal}
                          onChange={this.updateCategory}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            required: true,
                            name: "category_id"
                          }}
                          items={this.state.categoriesData}
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
                        {this.state.itemsData.map((prop, key) => {
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
