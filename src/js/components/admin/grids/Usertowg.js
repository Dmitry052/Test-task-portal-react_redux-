import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentMenu, saveUserToWG, deleteUserToWG, wgincomapny, userinwg, stName } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';

class Usertowg extends Component {
    create_new_user_to_wg() {
        this.props.create_new_user_to_wg();
    }
    closeModal_User() {
        this.props.show_user_to_wg();
    }
    onRowClick_user(row) {
        this.props.edit_user_to_wg(row);
    }
    set_user_user_to_wg(e) {
        var company = (() => {
            for (let key in this.props.store.users.users) {

                if (this.props.store.users.users[key].displayname === e.target.value) {
                    return this.props.store.users.users[key].companyname;
                }
            }
        })();
        this.props.set_user_user_to_wg({ event: e.target.value, data: this.props.store.users.users }, company);
    }
    set_company_user_to_wg(e) {
        // this.props.set_company_user_to_wg({ event: e.target.value, data: this.props.store.company.company });
    }
    set_wg_user_to_wg(e) {
        this.props.set_wg_user_to_wg({ event: e.target.value, data: this.props.store.wg.wg });
    }
    saveUserToWG() {
        this.props.saveUserToWG(this.props.store.usertowgAdmin.user_to_wg);
        this.props.currentMenu();
        this.props.show_user_to_wg();
    }
    handleRowSelect_User(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_user_to_wg({ id: isSelected.usertowg_id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected_User() {
        const selected = this.props.store.usertowgAdmin.check_user_to_wg;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteUserToWG(trueArr);
        this.props.uncheck_user_to_wg();
        this.props.currentMenu();
    }
    render() {
        const options_user = {
            sizePerPage: 10,
            onRowClick: this.onRowClick_user.bind(this),
        };
        const selectRow_User = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect_User.bind(this),
            onSelectAll: this.handleRowSelect_User.bind(this)
        };
        return (
            <div>
                <div className='col-lg-12 col-md-12'>
                    <h4>Пользователь - Рабочая группа</h4>
                    <button className="btn btn-success" onClick={this.create_new_user_to_wg.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    <button className="btn btn-danger" onClick={this.handleDelSelected_User.bind(this)} > <i className="fa fa-minus" aria-hidden="true"></i></button>
                    <BootstrapTable
                        hover
                        data={this.props.userToWg.userToWg}
                        selectRow={selectRow_User}
                        options={options_user}
                    >
                        <TableHeaderColumn dataField='usertowg_id' width='15%' isKey={true} filter={{ type: 'TextFilter' }} >ID в базе</TableHeaderColumn>
                        <TableHeaderColumn dataField='username' filter={{ type: 'TextFilter' }} >Пользователь</TableHeaderColumn>
                        <TableHeaderColumn dataField='wg_name' filter={{ type: 'TextFilter' }} >Рабочая группа</TableHeaderColumn>
                        <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter' }} >Компания</TableHeaderColumn>


                    </BootstrapTable>
                </div>
                <Modal isOpen={this.props.store.usertowgAdmin.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', border: 0, margin: 'auto', 'backgroundColor': '#f5f5f5', height: '250px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal_User.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <div id="user_conform" className='col-lg-4 col-md-4 col-sm-12'>
                                <span>Пользователь<span>*</span></span>
                                <select className='form-control' value={this.props.store.usertowgAdmin.user_to_wg.username || '---'} onChange={this.set_user_user_to_wg.bind(this)} >
                                    <option key={777} value={'---'}>---</option>
                                    {
                                        // this.props.store.usertowgAdmin.user_to_wg.list_users.map((item, i) => {
                                        //     return <option key={i} value={item.username}>{item.username}</option>
                                        // })
                                        this.props.store.users.users.map((item, i) => {
                                            return <option key={i} value={item.username}>{item.username}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div id="company_conform" className='col-lg-4 col-md-4 col-sm-6'>
                                <span>Компания<span>*</span></span>
                                <input className='form-control' disabled='disabled' value={this.props.store.usertowgAdmin.user_to_wg.companyname || ''} />
                                {/* <select className='form-control' value={this.props.store.usertowgAdmin.user_to_wg.companyname || '---'} onChange={this.set_company_user_to_wg.bind(this)} >
                                    <option key={777} value={'---'}>---</option>
                                    {
                                        this.props.store.company.company.map((item, i) => {
                                            return <option key={i} value={item.companyname}>{item.companyname}</option>
                                        })
                                    }

                                </select> */}
                            </div>
                            <div id="st_conform" className='col-lg-4 col-md-4 col-sm-6'>
                                <span>Тип услуги</span>
                                <input className='form-control' disabled='disabled' value={this.props.store.usertowgAdmin.user_to_wg.service_name || ''} />
                            </div>
                        </div>

                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Рабочая группа<span>*</span></span>
                            <select className='form-control' value={this.props.store.usertowgAdmin.user_to_wg.wgname || '---'} onChange={this.set_wg_user_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.usertowgAdmin.user_to_wg.list_wg.map((item, i) => {
                                        return <option key={i} value={item.wg_name}>{item.wg_name}</option>
                                    })
                                }

                            </select>
                        </div>

                        <button id="saveModal" className="btn btn-primary" onClick={this.saveUserToWG.bind(this)}>Сохранить</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state,
        userToWg: state.usertowgAdmin
    }),
    dispatch => ({
        show_user_to_wg: () => {
            dispatch({ type: 'SHOW_USER_TO_WG_ADMIN' });
        },
        create_new_user_to_wg: () => {
            dispatch({ type: 'CREATE_USER_TO_WG_ADMIN' });
        },
        edit_user_to_wg: (row) => {
            dispatch({ type: 'EDIT_USER_TO_WG_ADMIN', data: row });
            dispatch(wgincomapny(row.companyname));
            dispatch(stName(row.companyname));
            // dispatch(userinwg(row.wg_name));
        },
        // ------------------------------------
        set_user_user_to_wg: (user, company) => {
            console.log("dispatch set_user_user_to_wg",user, company);
            dispatch({ type: 'SET_USER_USER_TO_WG_ADMIN', data: user });
            dispatch(wgincomapny(company));
            dispatch(stName(company));
        },
        set_company_user_to_wg: (company) => {
            // dispatch({ type: 'SET_COMPANY_USER_TO_WG_ADMIN', data: company });
        },
        set_wg_user_to_wg: (wg) => {
            dispatch({ type: 'SET_WG_USER_TO_WG_ADMIN', data: wg });
            // dispatch(userinwg(wg.event));
        },
        // ------------------------------------
        check_user_to_wg: (wg) => {
            dispatch({ type: 'CHECK_USER_TO_WG_ADMIN', data: wg });
        },
        uncheck_user_to_wg: () => {
            dispatch({ type: 'UNCHECK_USER_TO_WG_ADMIN' });
        },
        saveUserToWG: (user) => {
            dispatch(saveUserToWG(user));
        },
        deleteUserToWG: (user) => {
            dispatch(deleteUserToWG(user));
        },
        // ----------------------------------------
        currentMenu: () => {
            dispatch(currentMenu('usertowg'));
        }
    })
)(Usertowg);