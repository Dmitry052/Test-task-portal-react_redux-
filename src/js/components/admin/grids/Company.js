import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCompany, currentMenu, deleteCompany } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';

class Company extends Component {
    createCompany() {
        this.props.createCompany();
    }
    onRowClick(row) {
        this.props.editCompany({ row: row, st: this.props.store.service_types.st });
    }
    closeModal() {
        this.props.showCompany();
    }
    setNameCompany() {
        this.props.setNameCompany(this.companyname.value);
    }
    setStCompany(e) {
        this.props.setStCompany({ event: e.target.value, st: this.props.store.service_types.st });
    }
    setAssigneeCompany() {
        this.props.setAssigneeCompany(this.assignee_sber.value);
    }
    setContactCompany() {
        this.props.setContactCompany(this.contact.value);
    }
    setCoordinatorCompany() {
        this.props.setCoordinatorCompany(this.coordinator.value);
    }
    saveToDCompany() {
        console.log(this.props.store.company.set_comp);
        this.props.saveCompany(this.props.store.company.set_comp);
        this.props.currentMenu();
        this.props.showCompany();
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_Company({ id: isSelected.company_id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.store.company.check_company;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteCompany(trueArr);
        this.props.uncheck_Company();
        this.props.currentMenu();
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
        return (
            <div className='col-lg-12 col-md-12'>
                <button className="btn btn-success" onClick={this.createCompany.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                <BootstrapTable
                    hover
                    data={this.props.company.company}
                    pagination={true}
                    selectRow={selectRow}
                    options={options}
                >
                    <TableHeaderColumn dataField='company_id' width='8%' isKey={true} filter={{ type: 'TextFilter' }} >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter' }} >Название компании</TableHeaderColumn>
                    <TableHeaderColumn dataField='service_name' filter={{ type: 'TextFilter' }}>Тип услуг</TableHeaderColumn>
                    <TableHeaderColumn dataField='assignee_sber' filter={{ type: 'TextFilter' }}>	Исполнитель в банке</TableHeaderColumn>
                    <TableHeaderColumn dataField='contact' filter={{ type: 'TextFilter' }}>Контакт</TableHeaderColumn>
                    <TableHeaderColumn dataField='coordinator' filter={{ type: 'TextFilter' }}>Координатор</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.company.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '400px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Назавание компании<span>*</span></span>
                            <input type='text'
                                value={this.props.store.company.set_comp.companyname}
                                className='form-control'
                                ref={(companyname) => { this.companyname = companyname }}
                                onChange={this.setNameCompany.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Тип услуг<span>*</span></span>
                            <select className='form-control' value={this.props.store.company.set_comp.st || '---'} onChange={this.setStCompany.bind(this)} >
                                <option key={777} value={'---'}>---</option>
                                {
                                    this.props.store.service_types.st.map((item, i) => {
                                        return <option key={i} value={item.service_name}>{item.service_name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Исполнитель в банке<span>*</span></span>
                            <input type='text'
                                value={this.props.store.company.set_comp.assignee_sber || ''}
                                className='form-control'
                                ref={(assignee_sber) => { this.assignee_sber = assignee_sber }}
                                onChange={this.setAssigneeCompany.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Контакт<span>*</span></span>
                            <input type='text'
                                value={this.props.store.company.set_comp.contact || ''}
                                className='form-control'
                                ref={(contact) => { this.contact = contact }}
                                onChange={this.setContactCompany.bind(this)}
                            />
                        </div>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Координатор<span>*</span></span>
                            <input type='text'
                                value={this.props.store.company.set_comp.coordinator || ''}
                                className='form-control'
                                ref={(coordinator) => { this.coordinator = coordinator }}
                                onChange={this.setCoordinatorCompany.bind(this)}
                            />
                        </div>
                        <button id="saveModal" className="btn btn-primary" onClick={this.saveToDCompany.bind(this)}>Сохранить</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default connect(
    state => ({
        store: state,
        company: state.company
    }),
    dispatch => ({
        showCompany: () => {
            dispatch({ type: 'SHOW_COMPANY_ADMIN' });
        },
        createCompany: () => {
            dispatch({ type: 'CREATE_COMPANY_ADMIN' });
        },
        editCompany: (company) => {
            dispatch({ type: 'EDIT_COMPANY_ADMIN', data: company });
        },
        // ------------------------
        setNameCompany: (name) => {
            dispatch({ type: 'SET_NAME_COMPANY_ADMIN', data: name });
        },
        setStCompany: (st) => {
            dispatch({ type: 'SET_ST_COMPANY_ADMIN', data: st });
        },
        setAssigneeCompany: (assignee) => {
            dispatch({ type: 'SET_ASSIGNEE_COMPANY_ADMIN', data: assignee });
        },
        setContactCompany: (contact) => {
            dispatch({ type: 'SET_CONTACT_COMPANY_ADMIN', data: contact });
        },
        setCoordinatorCompany: (coordinator) => {
            dispatch({ type: 'SET_COORDINATOR_COMPANY_ADMIN', data: coordinator });
        },
        // ------------------------
        check_Company: (company) => {
            dispatch({ type: 'CHECK_COMPANY_ADMIN', data: company });
        },
        uncheck_Company: () => {
            dispatch({ type: 'UNCHECK_COMPANY_ADMIN' });
        },
        saveCompany: (company) => {
            dispatch(saveCompany(company));
        },
        deleteCompany: (company) => {
            dispatch(deleteCompany(company));
        },
        currentMenu: () => {
            dispatch(currentMenu('company'));
        }
    })
)(Company);