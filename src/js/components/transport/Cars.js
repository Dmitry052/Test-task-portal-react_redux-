import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { showAddCar, showEditCar, selectCar, deleteCars, setBrandName, setVehicleNumberCar, setColorCar, setStatusCarDirect, setCompanyCar, saveToDBCarDirect, cars } from 'Actions/actionTransp';
import Modal from 'react-modal';
import MaskedInput from 'react-maskedinput';
import Mask from 'react-text-mask';
import Dropdown from 'react-dropdown';
import { DropdownButton, MenuItem, Alert } from "react-bootstrap";

class Cars extends Component {
    constructor(props) {
        super(props);


    }
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
    setVehicleNumber(e) {
        this.props.setVehicleNumber(e.target.value);
        this.setState({});
    }
    setColorCar() {
        this.props.setColorCar(this.colorCar.value);
        this.setState({});
    }
    setStatus(status) {
        this.props.setStatusCarDirect(status);
        this.setState({});
    }
    setCompany(company) {
        this.props.setCompany(company);
        this.setState({});
    }
    setShowCars() {
        this.props.setShowCars();
        this.setState({});
    }
    saveToDBCar() {
        const car = {
            id: this.props.transp.directoties.car_id,
            type: this.props.transp.directoties.valBtnAddEdit === 'Добавить' ? 'INSERT' : 'UPDATE',
            vehicle_brand: this.props.transp.directoties.car_vehicle_brand,
            vehicle_id_number: this.props.transp.directoties.car_vehicle_id_number,
            vehicle_color: this.props.transp.directoties.car_vehicle_color,
            status: (() => {
                for (var key in this.props.transp.transport_cars_status) {
                    if (this.props.transp.transport_cars_status[key].status === this.props.transp.directoties.car_status) {
                        return this.props.transp.transport_cars_status[key].id;
                    }
                }
            })(),
            company_id: (() => {
                for (var key in this.props.transp.companyToUser) {
                    if (this.props.transp.companyToUser[key].companyname === this.props.transp.directoties.car_company) {
                        return this.props.transp.companyToUser[key].company_id;
                    }
                }
            })(),
        }
        // console.log('car', car);
        var check = false;
        for (var key in car) {
            if (car[key] === undefined || car[key] === null || car[key] === '' || car[key] === '---') {
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
        const onlyWorckingCars = [];
        for (var key in this.props.transp.cars) {
            if (this.props.transp.cars[key].num_status === 1) {
                onlyWorckingCars.push(this.props.transp.cars[key]);
            }
        }
        return (
            <div id="gridCars">
                <button className='btn-success' onClick={this.showAddCar.bind(this)} title="Добавить новый автомобиль"><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className='btn-success' onClick={this.setShowCars.bind(this)} title="Показать все автомобили"><i className="fa fa-braille" aria-hidden="true"></i></button>
                <button id='btnDelCars' className='btn-default' onClick={this.handleDelSelected.bind(this)} title="Удалить"><i className="fa fa-minus" aria-hidden="true"></i></button>
                <Alert id="alertBlock" style={{ display: this.props.transp.directoties.car_alert }} bsStyle={'danger'}>
                    <center>{this.props.transp.directoties.car_alert_text}</center>
                </Alert>
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={this.props.transp.directoties.show_cars_all === false ? onlyWorckingCars : this.props.transp.cars}
                    pagination={true}
                    options={options}
                    selectRow={selectRow}
                >
                    <TableHeaderColumn isKey={true} dataField='vehicle_brand' filter={{ type: 'TextFilter', defaultValue: '' }}>Марка</TableHeaderColumn>
                    <TableHeaderColumn dataField='vehicle_id_number' filter={{ type: 'TextFilter', defaultValue: '' }}>Регистрационный номер</TableHeaderColumn>
                    <TableHeaderColumn dataField={'vehicle_color' === 1 ? 'sdfds' : 'vehicle_color'} filter={{ type: 'TextFilter', defaultValue: '' }}>Цвет</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'SelectFilter', options: wg }}>Компания</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' filter={{ type: 'TextFilter', defaultValue: '' }}>Компания</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.transp.directoties.showAddCar}
                    contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'background-color': '#f5f5f5', height: '485px' } }}
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
                        <Mask mask={[/[а-яА-Яa-zA-z]/, /\d/, /\d/, /\d/, /[а-яА-Яa-zA-z]/, /[а-яА-Яa-zA-z]/, /\d/, /\d/, /\d/]}
                            value={this.props.transp.directoties.car_vehicle_id_number}
                            onChange={this.setVehicleNumber.bind(this)}
                            placeholder='A777AA152'
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
                        <span>Статус <span>*</span></span>
                        <DropdownButton
                            title={this.props.transp.directoties.car_status || '-'}
                        >
                            {this.props.transp.transport_cars_status.map((status, i) => {
                                return <MenuItem eventKey={i} onSelect={() => this.setStatus(status.status)}>{status.status}</MenuItem>
                            })}
                        </DropdownButton>
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

        setShowCars: () => {
            dispatch({ type: 'SHOW_ALL_CARS' })
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
        setStatusCarDirect: (status) => {
            dispatch(setStatusCarDirect(status));
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