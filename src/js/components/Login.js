import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import { apiPrefix } from './../../../etc/config.json';
import Modal from 'react-modal';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      show: 'none',
      newPass: false,
      count: 0,
      text: '',
      passError: 'Пароль должен содержать не менее 6 символов, латинские буквы верхнего и нижнего регистров, хотя бы один спецсимвол',
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
  saveNewPass() {
    let newPass = this.newPass.value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g);
    let confirmPass = this.confirmPass.value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g);

    if (newPass !== null && confirmPass !== null && newPass[0] === confirmPass[0] && newPass[0] !== this.state.password) {
      axios({
        method: 'post',
        url: `${apiPrefix}/newUser`,
        data: {
          login: this.state.login,
          password: newPass[0]
        }
      });
      this.setState({
        password: '',
      })
      this.closeAlert();
    }
    else if (newPass === null || confirmPass === null) {
      alert("Неверно указан пароль!\n\nПароль должен содержать:\n - не менее 6 символов\n - латинские буквы верхнего и нижнего регистров\n - хотя бы один спецсимвол")
    }
    else if (newPass[0] === this.state.password) {
      alert("Неверно указан пароль!\n\nПароль не должен совпадать с первичным паролем!");
    }
    else if (newPass[0] !== confirmPass[0]) {
      console.log(newPass, confirmPass);
      alert("Указанные пароли не совпадают!");
    }
  }
  signin() {
    // (?=.*[0-9]) - строка содержит хотя бы одно число;
    // (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
    // (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
    // (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
    // [0-9a-zA-Z!@#$%^&*]{6,} - строка состоит не менее, чем из 6 вышеупомянутых символов.
    let pass = this.state.password.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g);

    if (pass !== null) {
      axios({
        method: 'post',
        url: `${apiPrefix}/`,
        data: {
          login: this.state.login,
          password: this.state.password
        }
      }).then((response) => {
        if (typeof response.data === "object") {
          if (response.data.type === 'newuser') {
            this.setState({
              newPass: true
            })
          }
          else if (response.data.type !== 'nouser') {
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

          else {
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
    else {
      this.setState({
        text: this.state.passError,
        show: '',
        count: ''
      })
    }
  }
  closeAlert() {
    this.setState({
      show: 'none',
      newPass: false
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
              // inputRef={(input) => { this.inputLogin = input; }}
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
              // inputRef={(input) => { this.inputPassword = input; }}
              type="password"
              pattern="/^[a-z0-9_-]{6,18}$/"
              placeholder="Введите пароль"
            />
          </FormGroup>
          <Button block bsSize="small" bsStyle="primary" onClick={this.signin.bind(this)}>
            Вход
          </Button>
        </form>
        <Modal isOpen={this.state.newPass} contentLabel="Modal"
          style={{ content: { width: '300px', border: 0, margin: 'auto', 'backgroundColor': '#f5f5f5', height: '107px' } }}
        >
          <div id="newPass" className='col-lg-12 col-md-12 col-sm-12'>
            <span>Новый пароль</span>
            <input type="password"
              ref={(newPass) => { this.newPass = newPass; }} />
          </div>
          <div id="confPass" className='col-lg-12 col-md-12 col-sm-12'>
            <span>Подтверждение</span>
            <input type="password"
              ref={(confirmPass) => { this.confirmPass = confirmPass; }} />
          </div>
          <button id="saveNewPass" className="btn btn-primary" onClick={this.saveNewPass.bind(this)}>Сохранить</button>
        </Modal>
      </div>
    )
  }
}
export default Login;