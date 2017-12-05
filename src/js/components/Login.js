import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import { apiPrefix } from './../../../etc/config.json';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      show: 'none',
      count: 0,
      text: '',
      defaultText: 'Не правильно введён логин или пароль. Осталось попыток ввода:',
      noUser: 'Пользователь с указаным логином не существует',
      kickText: 'Указаный пользователь блокирован. Обратитесь к администратору.'
    };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  handleChangeLogin(event) {
    return (
      this.setState({
        login: event.target.value,
      })
    )
  }

  handleChangePass(event) {
    return (
      this.setState({
        password: event.target.value,
      })
    )
  }
  signin() {
    axios({
      method: 'post',
      url: `${apiPrefix}/`,
      data: {
        login: this.state.login,
        password: this.state.password
      }
    }).then((response) => {
      if (typeof response.data === "object") {
        if (response.data.type !== 'nouser') {
          this.setState({
            show: '',
            count: 3 - response.data.count
          })
          if (response.data.status > 0) {
            this.setState({
              text: this.state.defaultText
            })
          }
          else {
            this.setState({
              text: this.state.kickText,
              count: ''
            })
          }
        }
        else{
          this.setState({
            text: this.state.noUser,
            show: '',
            count: ''
          })
        }

      }
      else {
        location.reload();
      }
    })
  }
  closeAlert() {
    this.setState({
      show: 'none',
    })
  }
  render() {
    return (
      <div className="Login">
        <div style={{ display: this.state.show }} id="alert" className="alert alert-danger">
          <a href="#" className="close" data-dismiss="alert" aria-label="close" onClick={this.closeAlert.bind(this)}>&times;</a>
          <strong>Ошибка</strong><br />
          {this.state.text}{' '}{this.state.count}
        </div>

        <form method="post" action="/">
          <div>
            <h2>Вход</h2>
            <span>Пожалуйста, заполните следующие поля для входа:</span>
          </div>
          <FormGroup controlId="login" bsSize="small">
            <ControlLabel>Логин</ControlLabel>
            <FormControl
              autoFocus
              name='login'
              value={this.state.login}
              onChange={this.handleChangeLogin}
              inputRef={(input) => { this.inputLogin = input; }}
              type="text"
              placeholder="Введите логин"
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="small">
            <ControlLabel>Пароль</ControlLabel>
            <FormControl
              name='password'
              value={this.state.password}
              onChange={this.handleChangePass}
              inputRef={(input) => { this.inputPassword = input; }}
              type="password"
              placeholder="Введите пароль"
            />
          </FormGroup>
          <Button block bsSize="small" bsStyle="primary" onClick={this.signin.bind(this)}>
            Вход
          </Button>
        </form>

      </div>
    )
  }
}
export default Login;