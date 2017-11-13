import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCompanyToWG, currentMenu, deleteCompanyToWG, saveUserToWG, deleteUserToWG, wgincomapny, userinwg, stName } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';

class Conformity extends Component {
    create_new_comp_to_wg() {
        this.props.create_new_comp_to_wg();
    }
    closeModal() {
        this.props.show_comp_to_wg();
    }
    onRowClick(row) {
        this.props.edit_comp_to_wg(row);
    }
    set_company_comp_to_wg(e) {
        this.props.set_company_comp_to_wg({ event: e.target.value, data: this.props.store.company.company });
    }
    set_wgbank_comp_to_wg(e) {
        this.props.set_wgbank_comp_to_wg({ event: e.target.value, data: this.props.store.wgbank.wgbank });
    }
    set_wg_comp_to_wg(e) {
        this.props.set_wg_comp_to_wg({ event: e.target.value, data: this.props.store.wg.wg });
    }
    saveCompanyToWG() {
        this.props.saveCompanyToWG(this.props.store.companytowgAdmin.comp_to_wg);
        this.props.currentMenu();
        this.props.show_comp_to_wg();
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_wg_comp_to_wg({ id: isSelected.companytowg_id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.store.companytowgAdmin.check_comp_to_wg;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteCompanyToWG(trueArr);
        this.props.uncheck_wg_comp_to_wg();
        this.props.currentMenu();
    }
    // -----------------------------
    create_new_user_to_wg() {
        this.props.create_new_user_to_wg();
    }
    closeModal_User() {
        this.props.show_user_to_wg();
    }
    onRowClick_user(row) {
        this.props.edit_user_to_wg(row);
    }
    set_company_user_to_wg(e) {
        this.props.set_company_user_to_wg({ event: e.target.value, data: this.props.store.company.company });
    }
    set_wg_user_to_wg(e) {
        this.props.set_wg_user_to_wg({ event: e.target.value, data: this.props.store.wg.wg });
    }
    set_user_user_to_wg(e) {
        this.props.set_user_user_to_wg({ event: e.target.value, data: this.props.store.users.users });
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
        const options = {
            sizePerPage: 10,
            onRowClick: this.onRowClick.bind(this),
        };
        const options_user = {
            sizePerPage: 10,
            onRowClick: this.onRowClick_user.bind(this),
        };
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect.bind(this),
            onSelectAll: this.handleRowSelect.bind(this)
        };
        const selectRow_User = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect_User.bind(this),
            onSelectAll: this.handleRowSelect_User.bind(this)
        };
        return (
            <div>
                <div className='col-lg-6 col-md-12'>
                    <h4>Компания - Рабочая группа</h4>
                    <button className="btn btn-success" onClick={this.create_new_comp_to_wg.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                    <BootstrapTable
                        hover
                        data={this.props.companyToWg.companyToWg}
                        selectRow={selectRow}
                        options={options}
                    >
                        <TableHeaderColumn dataField='companytowg_id' isKey={true} width='20%' filter={{ type: 'TextFilter' }} >ID в базе</TableHeaderColumn>
                        <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter' }} >Компания</TableHeaderColumn>
                        <TableHeaderColumn dataField='wg_name' filter={{ type: 'TextFilter' }} >РГ портала</TableHeaderColumn>
                        <TableHeaderColumn dataField='bankwg_name' filter={{ type: 'TextFilter' }} >РГ банка</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Modal isOpen={this.props.store.companytowgAdmin.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '290px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Компания<span>*</span></span>
                            <select className='form-control' value={this.props.store.companytowgAdmin.comp_to_wg.companyname || '---'} onChange={this.set_company_comp_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.company.company.map((item, i) => {
                                        return <option key={i} value={item.companyname}>{item.companyname}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>РГ портала<span>*</span></span>
                            <select className='form-control' value={this.props.store.companytowgAdmin.comp_to_wg.wg_name || '---'} onChange={this.set_wg_comp_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.wg.wg.map((item, i) => {
                                        return <option key={i} value={item.wg_name}>{item.wg_name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>РГ банка<span>*</span></span>
                            <select className='form-control' value={this.props.store.companytowgAdmin.comp_to_wg.bank_wg_name || '---'} onChange={this.set_wgbank_comp_to_wg.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.wgbank.wgbank.map((item, i) => {
                                        return <option key={i} value={item.wg_name}>{item.wg_name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <button id="saveModal" className="btn btn-primary" onClick={this.saveCompanyToWG.bind(this)}>Сохранить</button>
                    </div>
                </Modal>
                <div className='col-lg-6 col-md-12'>
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
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '300px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal_User.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <div id="company_conform" className='col-lg-8 col-md-8 col-sm-6'>
                                <span>Компания<span>*</span></span>
                                <select className='form-control' value={this.props.store.usertowgAdmin.user_to_wg.companyname || '---'} onChange={this.set_company_user_to_wg.bind(this)} >
                                    <option key={777} value={'---'}>---</option>
                                    {
                                        this.props.store.company.company.map((item, i) => {
                                            return <option key={i} value={item.companyname}>{item.companyname}</option>
                                        })
                                    }

                                </select>
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
                        <div className='col-lg-12 col-md-12 col-sm-12'>
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
        companyToWg: state.companytowgAdmin,
        userToWg: state.usertowgAdmin
    }),
    dispatch => ({
        show_comp_to_wg: () => {
            dispatch({ type: 'SHOW_COMP_TO_WG_ADMIN' });
        },
        create_new_comp_to_wg: () => {
            dispatch({ type: 'CREATE_COMP_TO_WG_ADMIN' });
        },
        edit_comp_to_wg: (company) => {
            dispatch({ type: 'EDIT_COMP_TO_WG_ADMIN', data: company });
        },
        set_company_comp_to_wg: (company) => {
            dispatch({ type: 'SET_COMPANY_COMP_TO_WG_ADMIN', data: company });
        },
        set_wgbank_comp_to_wg: (wgbank) => {
            dispatch({ type: 'SET_WGBANK_COMP_TO_WG_ADMIN', data: wgbank });
        },
        set_wg_comp_to_wg: (wg) => {
            dispatch({ type: 'SET_WG_COMP_TO_WG_ADMIN', data: wg });
        },
        check_wg_comp_to_wg: (company) => {
            dispatch({ type: 'CHECK_COMP_TO_WG_ADMIN', data: company });
        },
        uncheck_wg_comp_to_wg: () => {
            dispatch({ type: 'UNCHECK_COMP_TO_WG_ADMIN' });
        },
        saveCompanyToWG: (company) => {
            dispatch(saveCompanyToWG(company));
        },
        deleteCompanyToWG: (company) => {
            dispatch(deleteCompanyToWG(company));
        },
        // -----------------------------------------
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
        set_company_user_to_wg: (company) => {
            dispatch({ type: 'SET_COMPANY_USER_TO_WG_ADMIN', data: company });
            dispatch(wgincomapny(company.event));
            dispatch(stName(company.event));
        },
        set_wg_user_to_wg: (wg) => {
            dispatch({ type: 'SET_WG_USER_TO_WG_ADMIN', data: wg });
            // dispatch(userinwg(wg.event));
        },
        set_user_user_to_wg: (user) => {
            dispatch({ type: 'SET_USER_USER_TO_WG_ADMIN', data: user });
        },
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
            dispatch(currentMenu('conformity'));
        }
    })
)(Conformity);