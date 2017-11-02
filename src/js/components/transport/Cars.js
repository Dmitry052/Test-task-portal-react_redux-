import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { showAddCar, showEditCar, selectCar, deleteCars, setBrandName, setVehicleNumberCar, setColorCar, setCompanyCar, saveToDBCarDirect, cars } from 'Actions/actionTransp';
import Modal from 'react-modal';
import MaskedInput from 'react-maskedinput';
import Dropdown from 'react-dropdown';
import { DropdownButton, MenuItem, Alert } from "react-bootstrap";

class Cars extends Component {
    onRowClick(row) {
        this.props.showEditCar(row);
        this.setState({});
    }
    showAddCar() {
        this.props.showAddCar();
        this.setState({});
    }
    setBrandName() {
        this.props.setBrandName(this.brandtName.value);
        this.setState({});
    }
    setVehicleNumber() {
        this.props.setVehicleNumber(this.vehicleNumber.value);
        this.setState({});
    }
    setColorCar() {
        this.props.setColorCar(this.colorCar.value);
        this.setState({});
    }
    setCompany(company) {
        this.props.setCompany(company);
        this.setState({});
    }
    saveToDBCar() {
        const car = {
            id: this.props.transp.directoties.car_id,
            type: this.props.transp.directoties.valBtnAddEdit === 'Добавить' ? 'INSERT' : 'UPDATE',
            vehicle_brand: this.props.transp.directoties.car_vehicle_brand,
            vehicle_id_number: this.props.transp.directoties.car_vehicle_id_number,
            vehicle_color: this.props.transp.directoties.car_vehicle_color,
            company_id: (() => {
                for (var key in this.props.transp.companyToUser) {
                    if (this.props.transp.companyToUser[key].companyname === this.props.transp.directoties.car_company) {
                        return this.props.transp.companyToUser[key].company_id;
                    }
                }
            })(),
        }

        var check = false;
        for (var key in car) {
            if (car[key] === undefined || car[key] === null || car[key] === '') {
                check = true;
                break;
            }
        }
        if (check) {
            alert("Необходимо заполнить все поля.")
        } else {
            this.props.saveToDBCar(car);
            this.props.carsDrivers();
            this.showAddCar();
        }
        console.log(check, car);
        this.setState({});
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.selectCar({ id: isSelected.id, status: rows });
        } else {
            this.props.selectCar([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.transp.directoties.car_selected;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        console.log(trueArr);
        this.props.deleteCars(trueArr);
        this.props.carsDrivers();
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
        const wg = {};
        const dropdataCompany = this.props.transp.companyToUser.map((name, i) => {
            return <MenuItem eventKey={i} onSelect={() => this.setCompany(name.companyname)}>{name.companyname}</MenuItem>
        })
        return (
            <div id="gridCars">
                <button className='btn-success' onClick={this.showAddCar.bind(this)}><i class="fa fa-plus" aria-hidden="true"></i></button>
                <button id='btnDelCars' className='btn-default' onClick={this.handleDelSelected.bind(this)}><i class="fa fa-minus" aria-hidden="true"></i></button>
                <Alert id="alertBlock" style={{ display: this.props.transp.directoties.car_alert }} bsStyle={'danger'}>
                    <center>{this.props.transp.directoties.car_alert_text}</center>
                </Alert>
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={this.props.transp.cars}
                    pagination={true}
                    options={options}
                    selectRow={selectRow}
                >
                    <TableHeaderColumn isKey={true} dataField='vehicle_brand' filter={{ type: 'TextFilter', defaultValue: '' }}>Марка</TableHeaderColumn>
                    <TableHeaderColumn dataField='vehicle_id_number' filter={{ type: 'TextFilter', defaultValue: '' }}>Регистрационный номер</TableHeaderColumn>
                    <TableHeaderColumn dataField={'vehicle_color' === 1 ? 'sdfds' : 'vehicle_color'} filter={{ type: 'TextFilter', defaultValue: '' }}>Цвет</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'SelectFilter', options: wg }}>Компания</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.transp.directoties.showAddCar}
                    contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'background-color': '#f5f5f5', height: '440px' } }}
                >
                    <div className='btnModalCar'>
                        <span>{this.props.transp.directoties.car_header}</span>
                        <button className='btn' onClick={this.showAddCar.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Марка <span>*</span></span>
                        <input type='text'
                            value={this.props.transp.directoties.car_vehicle_brand}
                            ref={(brandName) => { this.brandtName = brandName }}
                            onChange={this.setBrandName.bind(this)}
                        />
                    </div >
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Регистрационный номер <span>*</span></span>
                        <input type='text'
                            value={this.props.transp.directoties.car_vehicle_id_number}
                            ref={(vehicleNumber) => { this.vehicleNumber = vehicleNumber }}
                            onChange={this.setVehicleNumber.bind(this)}
                        />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Цвет <span>*</span></span>
                        <input type='text'
                            value={this.props.transp.directoties.car_vehicle_color}
                            ref={(colorCar) => { this.colorCar = colorCar }}
                            onChange={this.setColorCar.bind(this)}
                        />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Компания <span>*</span></span>
                        <DropdownButton
                            title={this.props.transp.directoties.car_company || '-'}
                        >
                            {dropdataCompany}
                        </DropdownButton>
                    </div>
                    <div id="footerCar">
                        <button className='btn btn-primary' onClick={this.saveToDBCar.bind(this)}>{this.props.transp.directoties.valBtnAddEdit}</button>
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
        showAddCar: () => {
            dispatch(showAddCar());
        },
        showEditCar: (row) => {
            dispatch(showEditCar(row));
        },
        setBrandName: (brand) => {
            dispatch(setBrandName(brand));
        },
        setVehicleNumber: (num) => {
            dispatch(setVehicleNumberCar(num));
        },
        setColorCar: (color) => {
            dispatch(setColorCar(color));
        },
        setCompany: (company) => {
            dispatch(setCompanyCar(company));
        },
        saveToDBCar: (car) => {
            dispatch(saveToDBCarDirect(car));
        },
        carsDrivers: () => {
            dispatch(cars());
        },
        selectCar: (selected) => {
            dispatch(selectCar(selected));
        },
        deleteCars: (cars) => {
            dispatch(deleteCars(cars));
        }
    })
)(Cars);