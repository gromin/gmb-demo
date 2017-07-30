import React, { Component } from 'react';
import {
  Grid,
  Col,
  Row,
  Alert,
  Button
} from 'react-bootstrap';

class LoginForm extends Component {
  onLoginClick(e) {
    e.preventDefault()
    var webAuth = new window.auth0.WebAuth({
      domain: 'gromin.eu.auth0.com',
      clientID: 'dzl4f7W9O0WoOq59BdhnvOYiEhnW1fJC',
      redirectUri: 'http://localhost:3000',
      responseType: 'token id_token',
    });
    webAuth.authorize()
  }

  render() {
    return (
      <div className="container">
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <br />
              <Alert bsStyle="success">
                <center>You can login as<br /><code>writer@example.com / writer</code><br />or<br /><code>reader@example.com / reader</code> </center>
              </Alert>
              <center><Button onClick={this.onLoginClick}>Login</Button></center>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export { LoginForm }
