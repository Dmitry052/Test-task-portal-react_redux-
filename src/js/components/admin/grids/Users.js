import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, currentMenu, deleteUsers } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';
import { DropdownButton, MenuItem, Alert } from "react-bootstrap";

class Users extends Component {
    createUser() {
        this.props.createUser();
    }
    onRowClick(row) {
        this.props.editUser(row);
    }
    closeModal() {
        this.props.showUser();
    }
    setLogin() {
        this.props.setLogin(this.login.value);
    }
    setPass() {
        this.props.setPass(this.pass.value);
    }
    setDisplayname() {
        this.props.setDisplayname(this.displayname.value);
    }
    setEmail() {
        this.props.setEmail(this.email.value);
    }
    setCompany(e) {
        let id;
        for (var key in this.props.store.company.company) {
            if (this.props.store.company.company[key].companyname === e.target.value) {
                id = this.props.store.company.company[key].company_id;
                break;
            }
        }
        this.props.setCompanyUser({ id: id, companyname: e.target.value });
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.checkUser({ id: isSelected.id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.users.check_users;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteUsers(trueArr);
        this.props.currentMenu();

    }
    saveToDBUser() {
        this.props.saveUser(this.props.user);
        this.props.currentMenu();
        this.props.showUser();
        
    }
    render() {
        const options = {
            sizePerPage: 10,
            onRowClick: this.onRowClick.bind(this),
        };
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect.bind(this),
            onSelectAll: this.handleRowSelect.bind(this)
        };
        // console.log(this.props.store);
        return (
            <div className='col-lg-6 col-md-12'>
                <button className="btn btn-success" onClick={this.createUser.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                <BootstrapTable
                    hover
                    data={this.props.users.users}
                    selectRow={selectRow}
                    options={options}
                >
                    <TableHeaderColumn dataField='username' isKey={true} filter={{ type: 'TextFilter' }} >Логин</TableHeaderColumn>
                    <TableHeaderColumn dataField='displayname' filter={{ type: 'TextFilter' }}>Отображаемое имя</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' filter={{ type: 'TextFilter' }}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='created_at' filter={{ type: 'TextFilter' }}>Создан</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter' }}>Компания</TableHeaderColumn>
                </BootstrapTable>

                <Modal isOpen={this.props.users.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '400px' } }}
                >
                    <div id="headerUsersAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Логин<span>*</span></span>
                            <input type='text'
                                value={this.props.user.login}
                                className='form-control'
                                ref={(login) => { this.login = login }}
                                onChange={this.setLogin.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Пароль<span>*</span></span>
                            <input type='password'
                                value={this.props.user.pass}
                                className='form-control'
                                ref={(pass) => { this.pass = pass }}
                                onChange={this.setPass.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Отображаемое имя<span>*</span></span>
                            <input type='text'
                                value={this.props.user.displayname}
                                className='form-control'
                                ref={(displayname) => { this.displayname = displayname }}
                                onChange={this.setDisplayname.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Email<span>*</span></span>
                            <input type='email'
                                value={this.props.user.email}
                                className='form-control'
                                ref={(email) => { this.email = email }}
                                onChange={this.setEmail.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Компания<span>*</span></span>
                            <select className='form-control' value={this.props.user.companyname || '---'} onChange={this.setCompany.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.company.company.map((item, i) => {
                                        return <option key={i} value={item.companyname}>{item.companyname}</option>
                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <button id="saveModal" className="btn btn-primary" onClick={this.saveToDBUser.bind(this)}>Сохранить</button>
                </Modal>

            </div>

        )
    }
}
export default connect(
    state => ({
        store: state,
        users: state.users,
        user: state.users.user
    }),
    dispatch => ({
        showUser: () => {
            dispatch({ type: 'SHOW_USER_ADMIN' });
        },
        setLogin: (login) => {
            dispatch({ type: 'SET_LOGIN_USER_ADMIN', data: login })
        },
        setPass: (pass) => {
            dispatch({ type: 'SET_PASS_USER_ADMIN', data: pass })
        },
        setDisplayname: (dn) => {
            dispatch({ type: 'SET_DN_USER_ADMIN', data: dn })
        },
        setEmail: (email) => {
            dispatch({ type: 'SET_EMAIL_USER_ADMIN', data: email })
        },
        createUser: () => {
            dispatch({ type: 'CREATE_USER_ADMIN' });
        },
        editUser: (user) => {
            dispatch({ type: 'EDIT_USER_ADMIN', data: user });
        },
        setCompanyUser: (company) => {
            dispatch({ type: 'SET_COMPANY_USER_ADMIN', data: company });
        },
        checkUser: (user) => {
            dispatch({ type: 'CHECK_USER_ADMIN', data: user });
        },
        saveUser: (user) => {
            dispatch(saveUser(user));
        },
        deleteUsers: (users) => {
            dispatch(deleteUsers(users));
        },
        currentMenu: () => {
            dispatch(currentMenu('users'));
        }
    })
)(Users);