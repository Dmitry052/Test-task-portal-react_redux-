import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { showAddDriver, showEditDriver, drivers, deleteDrivers, selectDriver, carDriversAll, setDriverName, setDriverPhone, setStatusDriverDirect, setCompanyDriverDirect, saveToDBDriverDirect, setVehicleNumber } from 'Actions/actionTransp';
import Modal from 'react-modal';
import MaskedInput from 'react-maskedinput';
import Dropdown from 'react-dropdown';

import { DropdownButton, MenuItem, Alert } from "react-bootstrap";

class Drivers extends Component {
    onRowClick(row) {
        var company = this.props.transp.companyToUser;
        this.props.showEditDriver(row, company);
        this.setState({});
    }
    showAddDriver() {
        var company = this.props.transp.companyToUser;
        this.props.showAddDriver(company);
        this.setState({});
    }
    showEditDriver() {
        this.props.showAddDriver();
        this.setState({});
    }
    saveToDB() {
        const newDriver = {
            driver_fullname: '',
            driver_phone: '',
            status: '',
            car_id: '',
            company_id: '',
        }
    }
    setDriverName() {
        this.props.setDriverName(this.driverName.value);
        this.setState({});
    }
    setDriverPhone(e) {
        this.props.setDriverPhone(e.target.value);
        this.setState({});
    }
    setStatus(status) {
        this.props.setStatusDriverDirect(status);
        this.setState({});

    }
    setVehicleNumber(num) {
        this.props.setVehicleNumber(num);
        this.setState({});
    }
    setCompany(company) {
        this.props.setCompanyDriverDirect(company);
        this.setState({});
    }
    setShowDrivers() {
        this.props.setShowDrivers();
        this.setState({});
    }
    saveToDBDriverDirect() {
        const driver = {
            type: this.props.transp.directoties.valBtnAddEdit === 'Добавить' ? 'INSERT' : 'UPDATE',
            id: this.props.transp.directoties.driver_id,
            driver_fullname: this.props.transp.directoties.driver_driver_name || null,
            driver_phone: this.props.transp.directoties.driver_driver_phone || null,
            status: (() => {
                for (var key in this.props.transp.transport_drivers_status) {
                    if (this.props.transp.transport_drivers_status[key].status === this.props.transp.directoties.driver_status) {
                        return this.props.transp.transport_drivers_status[key].id;
                    }
                }
                return null;
            })(),
            car_id: (() => {
                for (var key in this.props.transp.cars) {
                    if (this.props.transp.cars[key].vehicle_id_number === this.props.transp.directoties.driver_vehicle_id_number) {
                        return this.props.transp.cars[key].id;
                    }
                }
                return null;
            })(),
            company_id: (() => {
                for (var key in this.props.transp.companyToUser) {
                    if (this.props.transp.companyToUser[key].companyname === this.props.transp.directoties.driver_company) {
                        return this.props.transp.companyToUser[key].company_id;
                    }
                }
                return null;
            })(),
        }
        var check = false;
        for (var key in driver) {
            if ((driver[key] === undefined || driver[key] === null) && key !== 'id') {
                check = true;
                break;
            }
        }
        
        if (check) {
            alert("Необходимо заполнить все поля.")
        }
        else {
            this.props.saveToDBDriverDirect(driver);
            this.props.carDrivers();
            this.props.carDriversAll();
            this.showAddDriver();
        }
        this.setState({});
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.selectDriver({ id: isSelected.id, status: rows });
        } else {
            this.props.selectDriver([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.transp.directoties.driver_selected;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteDrivers(trueArr);
        this.props.carDrivers();
        this.props.carDriversAll();
        this.setState({});
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
        const dropdataCompany = this.props.transp.companyToUser.map((name, i) => {
            return <MenuItem eventKey={i} onSelect={() => this.setCompany(name.companyname)}>{name.companyname}</MenuItem>
        });
        const dropdataVehicleNumber = this.props.transp.cars.map((num, i) => {
            for (var key in this.props.transp.carDriversAll) {
                if (this.props.transp.carDriversAll[key].vehicle_id_number === num.vehicle_id_number) {
                    return <MenuItem disabled eventKey={i} onSelect={() => this.setVehicleNumber(num.vehicle_id_number)}>{num.vehicle_id_number}</MenuItem>
                }
            }
            return <MenuItem eventKey={i} onSelect={() => this.setVehicleNumber(num.vehicle_id_number)}>{num.vehicle_id_number}</MenuItem>
        });
        // console.log(this.props.transp.directoties.show_drivers_all,this.props.transp.carDriversAll, this.props.transp.carDrivers)
        return (
            <div id="gridDrivers">
                <button className='btn-success' onClick={this.showAddDriver.bind(this)} title="Добавить нового водителя"><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className='btn-success' onClick={this.setShowDrivers.bind(this)} title="Показать всех водителей"><i className="fa fa-braille" aria-hidden="true"></i></button>
                <button id='btnDelDrivers' className='btn-default' onClick={this.handleDelSelected.bind(this)} title="Удалить"><i className="fa fa-minus" aria-hidden="true"></i></button>
                <Alert id="alertBlock" style={{ display: this.props.transp.directoties.driver_alert }} bsStyle={'danger'}>
                    <center>{this.props.transp.directoties.driver_alert_text}</center>
                </Alert>
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={this.props.transp.directoties.show_drivers_all === true ? this.props.transp.carDriversAll : this.props.transp.carDrivers}
                    pagination={true}
                    options={options}
                    selectRow={selectRow}
                >
                    <TableHeaderColumn isKey={true} dataField='driver_fullname' filter={{ type: 'TextFilter', defaultValue: '' }}>ФИО водителя</TableHeaderColumn>
                    <TableHeaderColumn dataField='driver_phone' filter={{ type: 'TextFilter', defaultValue: '' }}>Телефон</TableHeaderColumn>
                    <TableHeaderColumn dataField='vehicle_id_number' filter={{ type: 'TextFilter', defaultValue: '' }}>Регистрационный номер</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter', defaultValue: '' }}>Компания</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' filter={{ type: 'TextFilter', defaultValue: '' }}>Статус</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.transp.directoties.showAddDriver}
                    contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'background-color': '#f5f5f5', height: '475px' } }}
                >
                    <div className='btnModalDriver'>
                        <span>{this.props.transp.directoties.driver_header}</span>
                        <button className='btn' onClick={this.showAddDriver.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>ФИО <span>*</span></span>
                        <input type='text'
                            value={this.props.transp.directoties.driver_driver_name}
                            placeholder="Иванов Иван Иванович"
                            ref={(driverName) => { this.driverName = driverName }}
                            onChange={this.setDriverName.bind(this)}
                        />
                    </div >
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Телефон <span>*</span></span>
                        <MaskedInput
                            mask="71111111111"
                            placeholder="7xxxxxxxxxx"
                            value={this.props.transp.directoties.driver_driver_phone}
                            onChange={this.setDriverPhone.bind(this)}
                        />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Статус <span>*</span></span>
                        <DropdownButton title={this.props.transp.directoties.driver_status || '-'}>
                            {this.props.transp.transport_drivers_status.map((status, i) => {
                                return <MenuItem eventKey={i} onSelect={() => this.setStatus(status.status)}>{status.status}</MenuItem>
                            })}
                        </DropdownButton>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Регистрационный номер <span>*</span></span>
                        <DropdownButton
                            title={this.props.transp.directoties.driver_vehicle_id_number || '-'}
                            placeholder="Е777KX"
                        >
                            <MenuItem eventKey={'#0'} onSelect={() => this.setVehicleNumber('---')}>{'---'}</MenuItem>
                            {dropdataVehicleNumber}
                        </DropdownButton>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Компания <span>*</span></span>
                        <DropdownButton
                            title={this.props.transp.directoties.driver_company}
                        >
                            {dropdataCompany}
                        </DropdownButton>

                    </div>
                    <div id="footerDriver">
                        <button className='btn btn-primary' onClick={this.saveToDBDriverDirect.bind(this)}>{this.props.transp.directoties.valBtnAddEdit}</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({
        transp: state,
    }),
    dispatch => ({
        showAddDriver: (company) => {
            dispatch(showAddDriver(company));
        },
        showEditDriver: (row, company) => {
            dispatch(showEditDriver(row, company));
        },
        carDrivers: () => {
            dispatch(drivers());
        },
        carDriversAll: () => {
            dispatch(carDriversAll());
        },
        setDriverName: (name) => {
            dispatch(setDriverName(name));
        },
        setDriverPhone: (phone) => {
            dispatch(setDriverPhone(phone));
        },
        setStatusDriverDirect: (status) => {
            dispatch(setStatusDriverDirect(status));
        },
        setCompanyDriverDirect: (company) => {
            dispatch(setCompanyDriverDirect(company));
        },
        setVehicleNumber: (num) => {
            dispatch(setVehicleNumber(num));
        },
        setShowDrivers: () => {
            dispatch({ type: 'SHOW_ALL_DRIVERS' })
        },
        saveToDBDriverDirect: (driver) => {
            dispatch(saveToDBDriverDirect(driver));
        },
        selectDriver: (selected) => {
            dispatch(selectDriver(selected));
        },
        deleteDrivers: (selected) => {
            dispatch(deleteDrivers(selected));
        }

    })
)(Drivers);