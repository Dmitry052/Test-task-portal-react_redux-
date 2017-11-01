import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { drivers, cars, carDriversAll, transpStatus, transpWG, transpUserToWg, transpExecutor, clickCurrentOrder, listExecutors, setDriver, setStatus, setWG, setExecutor, saveOrder, transpMyWG, assignCar, doneTrip, closureStatuses, companyToUser, setClosureCode, setTimeTrip, setDistance, setIdletime, setPrice, setSolution } from 'Actions/actionTransp';
import Modal from 'react-modal';
import { Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem, Alert } from "react-bootstrap"; // MenuItem,
import Textarea from 'react-textarea-autosize';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datetime';
import MaskedInput from 'react-maskedinput';
import Cars from './Cars';
import Drivers from './Drivers';

class Gridview extends Component {
    constructor(props) {
        super(props);

        this.props.carDrivers();
        this.props.carsDrivers();
        this.props.transpStat();
        this.props.transpUserToWg();
        this.props.closureStatuses();
        this.props.companyToUser();
        this.props.carDriversAll();

        this.state = {
            showModal: false,
            showInfoModal: false,
            showAlert: 'none',
            showGridFilters: 'none',
            showGridCat: '',
            statusAlert: 'success',
            messageAlert: '',
        }

        this.close = this.close.bind(this);
        this.onoffInfo = this.onoffInfo.bind(this);

        this.handletimeTrip = this.handletimeTrip.bind(this);
        this.handleDistance = this.handleDistance.bind(this);
        this.handleIdletime = this.handleIdletime.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleSolution = this.handleSolution.bind(this);

        this.onRowClick = this.onRowClick.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);

        this.setDriver = this.setDriver.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setWG = this.setWG.bind(this);
        this.setExecutor = this.setExecutor.bind(this);
        this.setClosureCode = this.setClosureCode.bind(this);


        this.saveToDB = this.saveToDB.bind(this);
        this.takeToWork = this.takeToWork.bind(this);
        this.assignCar = this.assignCar.bind(this);
        this.doneTrip = this.doneTrip.bind(this);


    }
    // Экспорт в csv
    csvFormatter(cell, row) {
        return `${row.id}: ${cell}`;
    }
    // Закрытие окна заявки
    close() {
        this.setState({
            showModal: false,
            showInfoModal: false,
            showAlert: 'none',
        })
    }
    onoffInfo() {
        this.setState({
            showInfoModal: !this.state.showInfoModal,
        })
    }
    handlePrev() {
        var index = this.props.order.order_view_id - 1;
        if (index >= 0) {
            this.setState({ showAlert: 'none' });
            this.onRowClick(this.props.transp.transp[index]);
        }
        else {
            this.setState({
                showAlert: 'block',
                statusAlert: 'Warning',
                messageAlert: 'Данное обращение является первым в списке',
            });
        }

    }
    handleNext() {
        var index = this.props.order.order_view_id + 1;
        if (index < this.props.transp.transp.length) {
            this.onRowClick(this.props.transp.transp[index]);
            this.setState({ showAlert: 'none' });
        }
        else {
            this.setState({
                showAlert: 'block',
                statusAlert: 'Warning',
                messageAlert: 'Данное обращение является последним в списке',
            });
        }
        this.setState({});
    }
    handletimeTrip(e) {
        this.props.setTimeTrip(e.target.value)
    }
    handleDistance(e) {
        this.props.setDistance(e.target.value)
    }
    handleIdletime(e) {
        this.props.setIdletime(e.target.value)
    }
    handlePrice(e) {
        this.props.setPrice(e.target.value)
    }
    handleSolution(e) {
        this.props.setSolution(e.target.value);
        this.setState({})
    }
    // обработчик вып.списка водителей
    setDriver(driver) {
        var drivers = this.props.transp.carDrivers;
        var cars = this.props.transp.cars;

        // console.log('drivers',drivers);

        this.props.setDriver(driver, drivers, cars);
        this.setState({
            // flag: !this.state.flag
        })
    }
    setStatus(status) {
        this.props.setStatus(status);
        this.setState({});

    }
    setWG(wg) {
        this.props.setWG(wg);
        this.setState({});
    }
    // обработчик вып.списка исполнителей
    setExecutor(executor) {
        this.props.setExecutor(executor);
        this.setState({});
    }
    setClosureCode(code) {
        this.props.setClosureCode(code);
        this.setState({});
    }
    assignCar() {
        if (this.props.order.order_def_executor === null) {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Исполнитель не выбран',
            })
        }
        else {
            if (this.props.order.defaultDriver === 'Выберете водителя') {
                this.setState({
                    showAlert: 'block',
                    statusAlert: 'danger',
                    messageAlert: 'Водитель не выбран',
                })
            }
            else {
                this.props.assignCar();
                this.setState({
                    showAlert: 'none',
                });
                this.saveToDB();
            }
        }
    }
    takeToWork() {
        this.setExecutor({ value: this.props.order.order_executers[0] });
    }
    doneTrip() {
        if (this.props.order.order_ride_duration === null || this.props.order.order_ride_duration === 'null') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о длительности поездки не заполнены',
            })
        }
        else if (this.props.order.order_ride_distance === null || this.props.order.order_ride_distance === 'null') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о пробеге не заполнены',
            })
        }
        else if (this.props.order.order_ride_idle_time === null || this.props.order.order_ride_idle_time === 'null') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о Время простоя не заполнены',
            })
        }
        else if (this.props.order.order_ride_price === null || this.props.order.order_ride_price === 'null') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о цене не заполнены',
            })
        }
        else if (this.props.order.order_solution === null || this.props.order.order_solution === '') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Не заполнено поле "Решение"',
            })
        }
        else if (this.props.order.order_def_closure_statuses === null || this.props.order.order_def_closure_statuses === '') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Не указан код закрытия',
            })
        }
        else {
            this.props.doneTrip(this.props.transp.transpStatus[2].status);
            this.setState({
                showAlert: 'none',
                statusAlert: 'danger',
                messageAlert: '',
            });
            this.saveToDB();
        }

    }
    saveToDB() {
        var revoked = this.props.transp.transpStatus[3].status;
        var refusing = this.props.transp.transpStatus[4].status;

        var order = {
            id: this.props.order.db_id,
            status: (() => {
                for (var key in this.props.transp.transpStatus) {
                    if (this.props.transp.transpStatus[key].status === this.props.order.order_status_val_def) {
                        return this.props.transp.transpStatus[key].id;
                    }
                }
            })(),
            driver_id: (() => {
                for (var key in this.props.transp.carDrivers) {
                    if (this.props.transp.carDrivers[key].driver_fullname === this.props.order.defaultDriver) {
                        return this.props.transp.carDrivers[key].id;
                    }
                }
            })(),
            workgroup_id: (() => {
                for (var key in this.props.transp.transpUserToWg) {
                    if (this.props.transp.transpUserToWg[key].wg_name === this.props.order.order_wg_val_def) {
                        return this.props.transp.transpUserToWg[key].id;
                    }
                }
            })(),
            assignee: (() => {
                for (var key in this.props.transp.transpExecutor) {
                    if (this.props.transp.transpExecutor[key].displayname === this.props.order.order_def_executor) {
                        return this.props.transp.transpExecutor[key].username_id;
                    }
                }
            })(),
            ride_start_time: this.props.order.order_ride_start_time_toDB,
            ride_end_time: (() => {
                if (this.props.order.order_status_val_def === revoked || this.props.order.order_status_val_def === refusing) {
                    return Math.floor(Date.now() / 1000);
                }
                else {
                    return this.props.order.order_ride_end_time_toDB;
                }
            })(),
            ride_duration: this.props.order.order_ride_duration,
            ride_distance: this.props.order.order_ride_distance,
            ride_idle_time: this.props.order.order_ride_idle_time,
            ride_price: this.props.order.order_ride_price,
            solution: this.props.order.order_solution,
            closure_code: (() => {
                for (var key in this.props.transp.closureStatuses) {
                    if (this.props.transp.closureStatuses[key].closure_code_name === this.props.order.order_def_closure_statuses) {
                        return this.props.transp.closureStatuses[key].id;
                    }
                }
            })(),
        }
        this.props.saveOrder(order);
        this.props.myWG();
        this.setState({
            showAlert: 'none',
        });
        this.close();
    }
    // клик по заявки в гриде
    onRowClick(row) {
        // ищем позицию в массиве
        var index = 0;
        while (index < this.props.transp.transp.length) {
            if (this.props.transp.transp[index].id === row.id) {
                break;
            }
            index++;
        }
        var transp = this.props.transp.transp; var listExecutors = [];
        for (var key in transp) {
            transp[key].assignee === null ? '' : listExecutors.push(transp[key].displayname)
        }
        var drivers = this.props.transp.carDrivers;
        var cars = this.props.transp.cars;
        var statuses = this.props.transp.transpStatus;
        var wg = this.props.transp.transpUserToWg;
        var closure_code = this.props.transp.closureStatuses;

        this.props.clickOrder(row, drivers, statuses, wg, cars, listExecutors, closure_code, index);

        this.setState({
            showModal: true,
        });
    }
    showDirect() {
        this.setState({});

    }
    render() {
        const options = {
            sizePerPage: 10,
            onRowClick: this.onRowClick,
        };
        // статусы грида
        let status = {};
        for (var key in this.props.transp.transpStatus) {
            status[this.props.transp.transpStatus[key].status] = this.props.transp.transpStatus[key].status;
        }
        // рабочая группа фильтров грида
        const wg = {}
        for (var key in this.props.transp.transpUserToWg) {
            wg[this.props.transp.transpUserToWg[key].wg_name] = this.props.transp.transpUserToWg[key].wg_name;
        }
        // Строим дроп-меню
        let dropdataDriver = [];
        let dropdataStatuses = [];
        let dropdataWG = [];
        let dropdataAssigne = [];
        let dropdataClosureCode = [];
        if (this.props.order.car_drivers instanceof Object) {
            dropdataDriver = this.props.order.car_drivers.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setDriver(name)}>{name}</MenuItem>
            })
        }
        if (this.props.order.order_statuses instanceof Object) {
            dropdataStatuses = this.props.order.order_statuses.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setStatus(name)}>{name}</MenuItem>
            })
        }
        if (this.props.order.order_wg instanceof Object) {
            dropdataWG = this.props.order.order_wg.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setWG(name)}>{name}</MenuItem>
            })
        }
        if (this.props.order.order_executers instanceof Object) {
            dropdataAssigne = this.props.order.order_executers.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setExecutor(name)}>{name}</MenuItem>
            })
        }
        if (this.props.order.order_closure_statuses instanceof Object) {
            dropdataClosureCode = this.props.order.order_closure_statuses.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setClosureCode(name)}>{name}</MenuItem>
            })
        }
        return (
            <div className='gridTransp'>
                <div style={{ display: this.props.transp.directoties.show }}>
                    <BootstrapTable className='col-lg-12 col-md-12'
                        hover
                        exportCSV={true}
                        data={this.props.transp.transp}
                        pagination={true}
                        options={options}
                    >
                        <TableHeaderColumn dataField='sb_id' isKey={true} filter={{ type: 'TextFilter', defaultValue: '' }} >ID Сбербанка</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' filter={{ type: 'SelectFilter', options: status }}>Статус</TableHeaderColumn>
                        <TableHeaderColumn dataField='descr' filter={{ type: 'TextFilter', defaultValue: '' }}>Тема</TableHeaderColumn>
                        <TableHeaderColumn dataField='wg_name' filter={{ type: 'SelectFilter', options: wg }}>Рабочая группа</TableHeaderColumn>
                        <TableHeaderColumn dataField='displayname' filter={{ type: 'TextFilter', defaultValue: '' }}>Исполнитель</TableHeaderColumn>
                        <TableHeaderColumn dataField='date_created' width='19%' filter={{ type: 'DateFilter', defaultValue: '' }} >Дата создания</TableHeaderColumn>
                        <TableHeaderColumn dataField='date_deadline' width='19%' filter={{ type: 'DateFilter', defaultValue: '' }}>Дата поездки</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div style={{ display: this.props.transp.directoties.showCarsDir }}>
                    <Cars />
                </div>
                <div style={{ display: this.props.transp.directoties.showDriversDir }}>
                    <Drivers />
                </div>
                <Modal isOpen={this.state.showModal} contentLabel="Modal">
                    <div className='modalHead'>
                        <h4><i className="fa fa-bookmark-o" aria-hidden="true"></i>{' '}{this.props.order.order_ID || 'SD12345678'}{' '}{' '} заказ на {this.props.order.order_date_deadline}</h4>
                        <Button id='btn1' className={this.props.order.headerBtnClose} onClick={this.close}><i className="fa fa-times" aria-hidden="true"></i></Button>
                    </div>
                    <Alert id="alertBlock" style={{ display: this.state.showAlert }} bsStyle={this.state.statusAlert}>
                        <center>{this.state.messageAlert}</center>
                    </Alert>

                    <div className='modalBody'>
                        <div id="orderBlock" className='col-lg-4 col-md-4'>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4>Информация о заказе</h4>
                                    <span onClick={this.onoffInfo}>
                                        Подробнее <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <div id="infOrder" className="panel-body">
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Клиент</span>
                                        <input disabled={this.props.order.edit_id_to_stops} type='text' value={this.props.order.order_BankContact || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Телефон клиента</span>
                                        <input disabled={this.props.order.edit_id_to_stops} type='text' value={this.props.order.order_bank_contact_phone || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Пункт отправления</span>
                                        <Textarea disabled={this.props.order.edit_id_to_stops} minRows={4} defaultValue={this.props.order.oreder_travel_from || ''}></Textarea>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Пункт назначения</span>
                                        <Textarea disabled={this.props.order.edit_id_to_stops} minRows={4} defaultValue={this.props.order.oreder_travel_to || ''}></Textarea>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>

                                    </div>
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <span>Промежуточные пункты</span>
                                        <Textarea disabled={this.props.order.edit_id_to_stops} minRows={4} defaultValue={this.props.order.order_ride_stops || ''}></Textarea>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Время назначения авто</span>
                                        <input disabled={this.props.order.edit_time_start} type='text' value={this.props.order.order_ride_start_time || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Время завершения поездки</span>
                                        <DatePicker inputProps={{ disabled: this.props.order.edit_time_end }} value={this.props.order.order_ride_end_time} locale="ru" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tripBlock" className='col-lg-8 col-md-8 col-sm-12'>
                            <div className='col-lg-6 col-md-6'>
                                <div className="panel panel-default col-lg-12 col-md-12">
                                    <div className="panel-heading">
                                        <h4>Водитель</h4>
                                    </div>
                                    <div id="infDrive" className="panel-body">
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <span>Водитель</span>
                                            <DropdownButton
                                                disabled={this.props.order.edit_driver_drop}
                                                title={this.props.order.defaultDriver}
                                                id="bg-nested-dropdown">
                                                {dropdataDriver}
                                            </DropdownButton>
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Телефон</span>
                                            <input disabled={this.props.order.edit_driver_data} type='text' value={this.props.order.order_driver_phone || ''} />
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Марка</span>
                                            <input disabled={this.props.order.edit_driver_data} type='text' value={this.props.order.order_driver_brand_car || ''} />
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Цвет</span>
                                            <input disabled={this.props.order.edit_driver_data} type='text' value={this.props.order.order_driver_color_car || ''} />
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Госномер</span>
                                            <input disabled={this.props.order.edit_driver_data} type='text' value={this.props.order.order_driver_num_car || ''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default col-lg-12 col-md-12">
                                    <div className="panel-heading">
                                        <h4>Данные о поездке для отправки в банк</h4>
                                    </div>
                                    <div id="dataTrip" className="panel-body">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <span>Длительность поездки</span>
                                            <MaskedInput mask="11:11"
                                                disabled={this.props.order.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handletimeTrip}
                                                value={this.props.order.order_ride_duration}
                                                placeholder="ЧЧ:ММ"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <span>Пробег</span>
                                            <MaskedInput mask="111 Км"
                                                disabled={this.props.order.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handleDistance}
                                                value={this.props.order.order_ride_distance}
                                                placeholder="XXX КМ"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <span>Время простоя</span>
                                            <MaskedInput mask="11:11"
                                                disabled={this.props.order.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handleIdletime}
                                                value={this.props.order.order_ride_idle_time}
                                                placeholder="ЧЧ:MM"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <span>Цена</span>
                                            <MaskedInput mask="1111.11"
                                                disabled={this.props.order.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handlePrice}
                                                value={this.props.order.order_ride_price}
                                                placeholder="XXXX.XX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default col-lg-6 col-md-6">
                                <div className="panel-heading">
                                    <h4>Состояние заказа</h4>
                                </div>
                                <div id="infStatus" className="panel-body">
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <span>Статус</span>
                                        <DropdownButton
                                            disabled={this.props.order.edit_order_status}
                                            title={this.props.order.order_status_val_def}
                                            id="bg-nested-dropdown">
                                            {dropdataStatuses}
                                        </DropdownButton>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <span>Рабочая группа</span>
                                        <DropdownButton
                                            disabled={this.props.order.edit_order_status}
                                            title={this.props.order.order_wg_val_def}
                                            id="bg-nested-dropdown">
                                            {dropdataWG}
                                        </DropdownButton>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <span>Исполнитель</span>
                                        <DropdownButton
                                            disabled={this.props.order.edit_order_status}
                                            title={this.props.order.order_def_executor}
                                            id="bg-nested-dropdown">
                                            {dropdataAssigne}
                                        </DropdownButton>
                                    </div>
                                </div>
                                <div id="solution" className='panel panel-default col-lg-12 col-md-12 col-sm-12'>
                                    <div className="panel-heading">
                                        <h4>Решение</h4>

                                    </div>
                                    <div className="panel-body">
                                        <textarea
                                            rows="8"
                                            cols="10"
                                            onChange={this.handleSolution}
                                            value={this.props.order.order_solution}
                                            disabled={this.props.order.edit_solutions}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id="dataBlock" className='hidden col-lg-12 col-md-12'>

                            <div className="panel panel-default col-lg-8 col-md-8">
                                <div className="panel-heading">
                                    <h4>Подробная информация о заказе</h4>
                                </div>
                                <div id="result" className="panel-body">
                                    <div>
                                        <span>Решение</span>
                                        {/* <textarea
                                                rows="3"
                                                cols="10"
                                                onChange={this.handleSolution}
                                                value={this.props.order.order_solution}
                                                disabled={this.props.order.edit_solutions}
                                            ></textarea> */}
                                    </div>
                                    <div className="hidden">
                                        <span>Код закрытия</span>
                                        <DropdownButton
                                            disabled={this.props.order.edit_closure_code}
                                            title={this.props.order.order_def_closure_statuses}
                                            id="bg-nested-dropdown">
                                            {dropdataClosureCode}
                                        </DropdownButton>
                                    </div>
                                    <div className="hidden">
                                        <span>Описание</span>
                                        <Textarea disabled={this.props.order.edit_description} minRows={4} defaultValue={this.props.order.order_descr || ''}></Textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Button id="up" onClick={this.handlePrev} disabled={this.props.order.up}>
                            <i className="fa fa-chevron-up" aria-hidden="true"></i>
                        </Button>
                        <Button id="down" onClick={this.handleNext} disabled={this.props.order.doun}>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </Button>
                        <Button id='btn5' className={this.props.order.headerBtnSave} bsStyle="primary" onClick={this.saveToDB}>Сохранить</Button>
                        {/* <Button id='btn2' className={this.props.order.headerBtnTakeToWork} onClick={this.takeToWork} bsStyle="warning">Взять в работу</Button> */}
                        <Button id='btn3' className={this.props.order.headerBtnAssignCar} bsStyle="success" onClick={this.assignCar}>Назначить авто и закрыть</Button>
                        <Button id='btn4' disabled={this.props.order.onoffbtnDoneTrip} style={{ opacity: this.props.order.opacitybtnDoneTrip }} className={this.props.order.headerBtnDoneTrip} bsStyle="warning" onClick={this.doneTrip}>Завершить поездку и сохранить</Button>
                        {/* <Button id='btn6' className={this.props.order.headerBtnSendToBank} bsStyle="default">Передать данные о поездке в банк</Button> */}
                    </div>
                    <Modal isOpen={this.state.showInfoModal} contentLabel="Modal">
                        <div id="fullDescr" className="panel panel-default col-lg-12 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h4>Описание</h4>
                                <Button id='btn1' onClick={this.onoffInfo}><i className="fa fa-times" aria-hidden="true"></i></Button>
                            </div>
                            <div id="result" className="panel-body">
                                <div>
                                    <Textarea disabled={this.props.order.edit_description} minRows={4} defaultValue={this.props.order.order_descr || ''}></Textarea>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </Modal>
            </div>

        )

    }
}

export default connect(
    state => ({
        transp: state,
        order: state.currentOrder

    }),
    dispatch => ({
        carDrivers: () => {
            dispatch(drivers());
        },
        carsDrivers: () => {
            dispatch(cars());
        },
        carDriversAll: () => {
            dispatch(carDriversAll());
        },
        transpStat: () => {
            dispatch(transpStatus());
        },
        transpUserToWg: () => {
            dispatch(transpUserToWg());
        },
        transpExecutor: (executor) => {
            dispatch(transpExecutor(executor));
        },
        companyToUser: () => {
            dispatch(companyToUser());
        },
        // ******************************************
        clickOrder: (row, drivers, statuses, wg, cars, listExecutors, closure_code, index) => {
            dispatch(clickCurrentOrder(row, drivers, statuses, wg, cars, listExecutors, closure_code, index));
        },
        setDriver: (driver, drivers, cars) => {
            dispatch(setDriver(driver, drivers, cars));
        },
        setStatus: (status) => {
            dispatch(setStatus(status));
        },
        setWG: (wg) => {
            dispatch(setWG(wg));
        },
        setExecutor: (executor) => {
            dispatch(setExecutor(executor));
        },
        setClosureCode: (code) => {
            dispatch(setClosureCode(code));
        },

        setTimeTrip: (time) => {
            dispatch(setTimeTrip(time));
        },
        setDistance: (distance) => {
            dispatch(setDistance(distance));
        },
        setIdletime: (idletime) => {
            dispatch(setIdletime(idletime));
        },
        setPrice: (price) => {
            dispatch(setPrice(price));
        },
        setSolution: (text) => {
            dispatch(setSolution(text));
        },
        saveOrder: (order) => {
            dispatch(saveOrder(order));
        },
        assignCar: () => {
            dispatch(assignCar());
        },
        doneTrip: (status) => {
            dispatch(doneTrip(status));
        },
        closureStatuses: () => {
            dispatch(closureStatuses());
        },
        // ******************************
        myWG: () => {
            dispatch(transpMyWG());
        },

    })
)(Gridview);
