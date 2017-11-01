import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { showAddDriver, showEditDriver, drivers, carDriversAll, setDriverName, setDriverPhone, setStatusDriverDirect, setCompanyDriverDirect, saveToDBDriverDirect, setVehicleNumber } from 'Actions/actionTransp';
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
    saveToDBDriverDirect() {
        const driver = {
            type: this.props.transp.directoties.valBtnAddEdit === 'Добавить' ? 'INSERT' : 'UPDATE',
            id: this.props.transp.directoties.driver_id,
            driver_fullname: this.props.transp.directoties.driver_driver_name || null,
            driver_phone: this.props.transp.directoties.driver_driver_phone || null,
            status: (() => {
                if (this.props.transp.directoties.driver_status === 'Работает') {
                    return 1;
                } else if (this.props.transp.directoties.driver_status === 'Отпуск') {
                    return 2;
                } else {
                    return null;
                }
            })(),
            car_id: (() => {
                for (var key in this.props.transp.cars) {
                    if (this.props.transp.cars[key].vehicle_id_number === this.props.transp.directoties.driver_vehicle_id_number) {
                        return this.props.transp.cars[key].id;
                    }
                }
            })(),
            company_id: (() => {
                for (var key in this.props.transp.companyToUser) {
                    if (this.props.transp.companyToUser[key].companyname === this.props.transp.directoties.driver_company) {
                        return this.props.transp.companyToUser[key].company_id;
                    }
                }
            })(),
        }
        var check = false;
        for (var key in driver) {
            if (driver[key] === undefined || driver[key] === null) {
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
    render() {
        const options = {
            sizePerPage: 10,
            onRowClick: this.onRowClick.bind(this),
        };
        const dropdataCompany = this.props.transp.companyToUser.map((name, i) => {
            return <MenuItem eventKey={i} onSelect={() => this.setCompany(name.companyname)}>{name.companyname}</MenuItem>
        });
        const dropdataVehicleNumber = this.props.transp.cars.map((num, i) => {
            return <MenuItem eventKey={i} onSelect={() => this.setVehicleNumber(num.vehicle_id_number)}>{num.vehicle_id_number}</MenuItem>
        });
        console.log(this.props.transp);
        return (
            <div id="gridDrivers">
                <button className='btn-success' onClick={this.showAddDriver.bind(this)}>Добавить нового водителя</button>
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={this.props.transp.carDriversAll}
                    pagination={true}
                    options={options}
                >
                    <TableHeaderColumn isKey={true} dataField='driver_fullname' filter={{ type: 'TextFilter', defaultValue: '' }}>ФИО водителя</TableHeaderColumn>
                    <TableHeaderColumn dataField='driver_phone' filter={{ type: 'TextFilter', defaultValue: '' }}>Телефон</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' filter={{ type: 'TextFilter', defaultValue: '' }}>Статус</TableHeaderColumn>
                    <TableHeaderColumn dataField='vehicle_id_number' filter={{ type: 'TextFilter', defaultValue: '' }}>Регистрационный номер</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'TextFilter', defaultValue: '' }}>Компания</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.transp.directoties.showAddDriver}
                    contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'background-color': '#f5f5f5', height: '510px' } }}
                >
                    <div className='btnModalDriver'>
                        <button className='btn' onClick={this.showAddDriver.bind(this)}>Закрыть</button>
                        <button className='btn btn-primary' onClick={this.saveToDBDriverDirect.bind(this)}>{this.props.transp.directoties.valBtnAddEdit}</button>
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
                            <MenuItem eventKey={'work'} onSelect={() => this.setStatus('Работает')}>Работает</MenuItem>
                            <MenuItem eventKey={'dismissed'} onSelect={() => this.setStatus('Отпуск')}>Отпуск</MenuItem>
                        </DropdownButton>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Регистрационный номер <span>*</span></span>
                        <DropdownButton
                            title={this.props.transp.directoties.driver_vehicle_id_number || '-'}
                            placeholder="Е777KX"
                        >
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
        saveToDBDriverDirect: (driver) => {
            dispatch(saveToDBDriverDirect(driver));
        }

    })
)(Drivers);