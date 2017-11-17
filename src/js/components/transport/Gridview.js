import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { drivers, cars, carsStatus, carDriversAll, transpStatus, transpDriversStatus, transpWG, transpUserToWg, transpExecutor, clickCurrentOrder, listExecutors, setDriver, setStatus, setWG, setExecutor, saveOrder, transpMyWG, assignCar, doneTripStatus, closureStatuses, companyToUser, setClosureCode, setTimeTrip, setDistance, setIdletime, setPrice, setSolution, transpToMe, transpNew, transpCarAppoint, transpDoneTrip, cancelClient } from 'Actions/actionTransp';
import { showHistory, getHistory } from 'Actions/actionTransp_History';
import Modal from 'react-modal';
import { Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem, Alert } from "react-bootstrap"; // MenuItem,
import Textarea from 'react-textarea-autosize';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-datetime';
import MaskedInput from 'react-maskedinput';
import Cars from './Cars';
import Drivers from './Drivers';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import History from './History'; 
import ReactInterval from 'react-interval';

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
        this.props.transpDriversStatus();
        this.props.carsStatus();

        this.state = {
            showModal: false,
            showInfoModal: false,
            showAlert: 'none',
            showGridFilters: 'none',
            showGridCat: '',
            statusAlert: 'success',
            messageAlert: '',
            originOrder: ''
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

        setInterval(function () {
            // console.log(this.props.transp);
        }, 1000);
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
    showHistory() {
        this.props.showHistory();
    }
    handlePrev() {
        var index = this.props.order.data.order_view_id - 1;
        if (index >= 0) {
            if (this.props.order.data.down === true) { this.props.down(); }
            this.setState({ showAlert: 'none' });
            this.onRowClick(this.props.transp.transp[index]);
        }
        else {
            this.props.up();
        }

    }
    handleNext() {
        var index = this.props.order.data.order_view_id + 1;
        if (index < this.props.transp.transp.length) {
            if (this.props.order.data.up === true) { this.props.up(); }
            this.onRowClick(this.props.transp.transp[index]);
            this.setState({ showAlert: 'none' });
        }
        else {
            this.props.down();
            this.setState({});
        }
        this.setState({});
    }
    handletimeTrip(e) {
        this.props.setTimeTrip(e.target.value)
    }
    handleDistance(e) {
        this.props.setDistance(e.target.value);
        this.setState({});
    }
    handleIdletime(e) {
        this.props.setIdletime(e.target.value)
        this.setState({});
    }
    handlePrice(e) {
        this.props.setPrice(e.target.value);
        this.setState({});
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
        if (this.props.order.data.order_def_executor === null) {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Исполнитель не выбран',
            })
        }
        else {
            if (this.props.order.data.defaultDriver === 'Выберете водителя') {
                this.setState({
                    showAlert: 'block',
                    statusAlert: 'danger',
                    messageAlert: 'Водитель не выбран',
                })
            }
            else {
                this.props.assignCar(this.props.transp.user);
                this.setState({
                    showAlert: 'none',
                });
                this.saveToDB();
            }
        }
    }
    takeToWork() {
        this.setExecutor({ value: this.props.order.data.order_executers[0] });
    }
    doneTrip() {
        if (this.props.order.data.order_ride_duration === null || this.props.order.data.order_ride_duration === 'null') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о длительности поездки не заполнены',
            })
        }
        else if (this.props.order.data.order_ride_distance === null || this.props.order.data.order_ride_distance === 'null') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о пробеге не заполнены',
            })
        }
        else if (this.props.order.data.order_ride_price === null || this.props.order.data.order_ride_price === 'null' || this.props.order.data.order_ride_price === '') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Данные о цене не заполнены',
            })
        }
        else if (this.props.order.data.order_solution === null || this.props.order.data.order_solution === '') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Не заполнено поле "Решение"',
            })
        }
        else if (this.props.order.data.order_def_closure_statuses === null || this.props.order.data.order_def_closure_statuses === '') {
            this.setState({
                showAlert: 'block',
                statusAlert: 'danger',
                messageAlert: 'Не указан код закрытия',
            })
        }
        else {
            this.props.doneTripStatus(this.props.transp.transpStatus[2].status);
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
        // console.log(this.state.originOrder);
        var order = {
            id: this.props.order.data.db_id,
            sb_id: this.props.order.data.order_ID,
            status: (() => {
                for (var key in this.props.transp.transpStatus) {
                    if (this.props.transp.transpStatus[key].status === this.props.order.data.order_status_val_def) {
                        return { new: this.props.transp.transpStatus[key].id, old: this.state.originOrder.id_status };
                    }
                }
            })(),
            driver_id: (() => {
                for (var key in this.props.transp.carDrivers) {
                    if (this.props.transp.carDrivers[key].driver_fullname === this.props.order.data.defaultDriver) {
                        return { new: this.props.transp.carDrivers[key].id, old: this.state.originOrder.driver_id };
                    }
                }
                return { new: null, old: null }
            })(),
            workgroup_id: (() => {
                for (var key in this.props.transp.transpUserToWg) {
                    if (this.props.transp.transpUserToWg[key].wg_name === this.props.order.data.order_wg_val_def) {
                        return { new: this.props.transp.transpUserToWg[key].id, old: this.state.originOrder.workgroup_id };
                    }
                }
            })(),
            assignee: (() => {
                for (var key in this.props.order.data.order_executers) {
                    if (this.props.order.data.order_executers[key].displayname === this.props.order.data.order_def_executor) {
                        return { new: Number(this.props.order.data.order_executers[key].id), old: Number(this.state.originOrder.assignee_id) };
                    }
                }
                return { new: null, old: null }
            })(),
            ride_start_time: { new: this.props.order.data.order_ride_start_time_toDB, old: this.state.originOrder.ride_start_time },
            ride_end_time: (() => {
                if (this.props.order.data.order_status_val_def === revoked || this.props.order.data.order_status_val_def === refusing) {
                    return { new: Math.floor(Date.now() / 1000), old: this.state.originOrder.ride_end_time };
                }
                else {
                    return { new: this.props.order.data.order_ride_end_time_toDB, old: this.state.originOrder.ride_end_time };
                }
            })(),
            ride_duration: {
                new: this.props.order.data.order_ride_duration === '' || this.props.order.data.order_ride_duration === 'null' ? null : this.props.order.data.order_ride_duration,
                old: this.state.originOrder.ride_duration === '' || this.state.originOrder.ride_duration === 'null' ? null : this.state.originOrder.ride_duration
            },
            ride_distance: {
                new: this.props.order.data.order_ride_distance === '' || this.props.order.data.order_ride_distance === 'null' ? null : this.props.order.data.order_ride_distance,
                old: this.state.originOrder.ride_distance === '' || this.state.originOrder.ride_distance === 'null' ? null : this.state.originOrder.ride_distance
            },
            ride_idle_time: {
                new: this.props.order.data.order_ride_idle_time === '' || this.props.order.data.order_ride_idle_time === 'null' ? null : this.props.order.data.order_ride_idle_time,
                old: this.state.originOrder.ride_idle_time === '' || this.state.originOrder.ride_idle_time === 'null' ? null : this.state.originOrder.ride_idle_time
            },
            ride_price: {
                new: this.props.order.data.order_ride_price === '' || this.props.order.data.order_ride_price === 'null' ? null : this.props.order.data.order_ride_price,
                old: this.state.originOrder.ride_price === '' || this.state.originOrder.ride_price === 'null' ? null : this.state.originOrder.ride_price
            },
            solution: {
                new: this.props.order.data.order_solution === '' || this.props.order.data.order_solution === 'null' ? null : this.props.order.data.order_solution,
                old: this.state.originOrder.solution === '' || this.state.originOrder.solution === 'null' ? null : this.state.originOrder.solution
            },
            closure_code: (() => {
                let currentCode;
                if (this.props.order.data.order_status_val_def === 'Назначено в группу') {
                    currentCode = null;
                }
                else if (this.props.order.data.order_status_val_def === 'Машина назначена' || this.props.order.data.order_status_val_def === 'Поездка завершена') {
                    currentCode = 'Решено полностью';
                }
                else if (this.props.order.data.order_status_val_def === 'Отозвана клиентом') {
                    currentCode = 'Отозвано клиентом';
                }
                else if (this.props.order.data.order_status_val_def === 'Отказ в обслуживании') {
                    currentCode = 'Отказ в обслуживании';
                }
                for (let key in this.props.transp.closureStatuses) {
                    if (this.props.transp.closureStatuses[key].closure_code_name === currentCode) {
                        return {
                            new: this.props.transp.closureStatuses[key].id,
                            old: this.state.originOrder.closure_code
                        }
                    }
                }
                return { new: null, old: null }
            })(),
        }
        console.log(order);
        this.props.saveOrder(order);
        this.refreshState.call(this);
        this.setState({
            showAlert: 'none',
        });
        this.close();
    }
    refreshState() {
        for (var key in this.props.transp.left_menu) {
            if (this.props.transp.left_menu[key] === 'active') {
                switch (key) {
                    case 'filter1':
                        this.props.myWG();
                        return;
                    case 'filter2':
                        this.props.toMe();
                        return;
                    case 'filter6':
                        this.props.transpNew();
                        return;
                    case 'filter7':
                        this.props.transpCarAppoint()
                        return;
                    case 'filter3':
                        this.props.doneTrip();
                        return;
                    case 'filter5':
                        this.props.canclClient();
                        return;
                }
            }
        }
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
        this.props.getHistory(this.props.order.data.db_id);

        this.setState({
            showModal: true,
            originOrder: row
        });
    }
    showDirect() {
        this.setState({});
    }
    cleanFilters() {
        if (this.props.order.data.filtersGrid === '30px') {
            this.refs.inp_sb_id.applyFilter('');
            this.refs.inp_status.applyFilter('');
            this.refs.inp_displayname.applyFilter('');
            this.refs.inp_date_created.applyFilter('');
            this.refs.inp_date_deadline.applyFilter('');
        }
    }
    filterGrid() {
        this.props.filterGrid();
        this.cleanFilters();
        this.setState({});
    }
    setColorLine(row, rowIdx) {
        var now = Math.floor(new Date() / 1000);
        if ((row.ride_start_time === 0 || row.ride_start_time === null) && row.status === 'Назначено в группу') {
            var time = row.unix_date_deadline - now;
            if (time >= 14400) { return 'success'; }
            else if (time < 144400 && time >= 3600) { return 'warning'; }
            else if (time < 3600) { return 'danger'; }
        }
        return '';
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
        if (this.props.order.data.car_drivers instanceof Object) {
            dropdataDriver = this.props.order.data.car_drivers.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setDriver(name)}>{name}</MenuItem>
            })
        }
        if (this.props.order.data.order_statuses instanceof Object) {
            dropdataStatuses = this.props.order.data.order_statuses.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setStatus(name)}>{name}</MenuItem>
            })
        }
        if (this.props.order.data.order_wg instanceof Object) {
            dropdataWG = this.props.order.data.order_wg.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setWG(name)}>{name}</MenuItem>
            })
        }

        if (this.props.order.data.order_executers instanceof Object) {
            dropdataAssigne = this.props.order.data.order_executers.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setExecutor(name.displayname)}>{name.displayname}</MenuItem>
            })
        }
        if (this.props.order.data.order_closure_statuses instanceof Object) {
            dropdataClosureCode = this.props.order.data.order_closure_statuses.map((name, i) => {
                return <MenuItem eventKey={i + 1} onSelect={() => this.setClosureCode(name)}>{name}</MenuItem>
            })
        }
        // console.log('в гриде',this.props.transp);
        // console.log(this.props.transp);
        return (
            // style={{  width: this.props.order.widthGrid, left: this.props.order.leftGrid }}
            <div className='gridTransp'  >
                <div style={{ display: this.props.transp.directoties.show }}>
                    <ReactHTMLTableToExcel
                        id="exportEXCEL"
                        className="btn btn-default"
                        table="tableEXCEL"
                        filename="export"
                        sheet="sheet"
                        buttonText="Экспорт в Excel" />
                    <table id="tableEXCEL" style={{ display: 'none' }}>
                        <tbody>
                            <tr>
                                <th>ID Сбербанка</th>
                                <th>Статус</th>
                                <th>Рабочая группа</th>
                                <th>Исполнитель</th>
                                <th>Дата создания</th>
                                <th>Дата поездки</th>
                            </tr>

                            {
                                this.props.transp.transp.map((order, i) => {
                                    return (
                                        <tr>
                                            <td>{order.status}</td>
                                            <td>{order.descr}</td>
                                            <td>{order.wg_name}</td>
                                            <td>{order.displayname}</td>
                                            <td>{order.date_created}</td>
                                            <td>{order.date_deadline}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <Button id="filterGrid" onClick={this.filterGrid.bind(this)}>Фильры</Button>
                    <BootstrapTable className='col-lg-12 col-md-12'
                        hover
                        data={this.props.transp.transp}
                        pagination={true}
                        headerStyle={{ height: this.props.order.data.filtersGrid }}
                        trClassName={this.setColorLine.bind(this)}
                        options={options}
                    >
                        <TableHeaderColumn dataField='sb_id' ref='inp_sb_id' isKey={true} filter={{ type: 'TextFilter' }} >ID Сбербанка</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' filter={{ type: 'SelectFilter', options: status }}>Статус</TableHeaderColumn>
                        <TableHeaderColumn dataField='descr' ref='inp_status' filter={{ type: 'TextFilter' }}>Тема</TableHeaderColumn>
                        <TableHeaderColumn dataField='wg_name' ref='inp_wg_name' filter={{ type: 'SelectFilter', options: wg }}>Рабочая группа</TableHeaderColumn>
                        <TableHeaderColumn dataField='assignee' ref='inp_displayname' filter={{ type: 'TextFilter' }}>Исполнитель</TableHeaderColumn>
                        <TableHeaderColumn dataField='date_created' ref='inp_date_created' width='19%' filter={{ type: 'TextFilter' }} >Дата создания</TableHeaderColumn>
                        <TableHeaderColumn dataField='date_deadline' ref='inp_date_deadline' width='19%' filter={{ type: 'TextFilter' }}>Дата поездки</TableHeaderColumn>
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
                        <h4><i className="fa fa-bookmark-o" aria-hidden="true"></i>{' '}{this.props.order.data.order_ID || 'SD12345678'}{' '}{' '} заказ на {this.props.order.data.order_date_deadline}</h4>
                        <Button id='btn1' className={this.props.order.data.headerBtnClose} onClick={this.close}><i className="fa fa-times" aria-hidden="true"></i></Button>
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
                                        <input disabled={this.props.order.data.edit_id_to_stops} type='text' value={this.props.order.data.order_BankContact || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Телефон клиента</span>
                                        <input disabled={this.props.order.data.edit_id_to_stops} type='text' value={this.props.order.data.order_bank_contact_phone || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Пункт отправления</span>
                                        <Textarea disabled={this.props.order.data.edit_id_to_stops} minRows={4} defaultValue={this.props.order.data.oreder_travel_from || ''}></Textarea>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Пункт назначения</span>
                                        <Textarea disabled={this.props.order.data.edit_id_to_stops} minRows={4} defaultValue={this.props.order.data.oreder_travel_to || ''}></Textarea>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>

                                    </div>
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <span>Промежуточные пункты</span>
                                        <Textarea disabled={this.props.order.data.edit_id_to_stops} minRows={4} defaultValue={this.props.order.data.order_ride_stops || ''}></Textarea>
                                    </div>
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <span>Комментарии водителю</span>
                                        <Textarea disabled={this.props.order.data.edit_commentary_for_driver} minRows={3} type='text' value={this.props.order.data.order_commentary_for_driver || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Время назначения авто</span>
                                        <input disabled={this.props.order.data.edit_time_start} type='text' value={this.props.order.data.order_ride_start_time || ''} />
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12'>
                                        <span>Время завершения поездки</span>
                                        <DatePicker inputProps={{ disabled: this.props.order.data.edit_time_end }} value={this.props.order.data.order_ride_end_time} locale="ru" />
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
                                                disabled={this.props.order.data.edit_driver_drop}
                                                title={this.props.order.data.defaultDriver}
                                                id="bg-nested-dropdown">
                                                {dropdataDriver}
                                            </DropdownButton>
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Телефон</span>
                                            <input disabled={this.props.order.data.edit_driver_data} type='text' value={this.props.order.data.order_driver_phone || ''} />
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Марка</span>
                                            <input disabled={this.props.order.data.edit_driver_data} type='text' value={this.props.order.data.order_driver_brand_car || ''} />
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Цвет</span>
                                            <input disabled={this.props.order.data.edit_driver_data} type='text' value={this.props.order.data.order_driver_color_car || ''} />
                                        </div>
                                        <div className='col-lg-6 col-md-12 col-sm-12'>
                                            <span>Госномер</span>
                                            <input disabled={this.props.order.data.edit_driver_data} type='text' value={this.props.order.data.order_driver_num_car || ''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default col-lg-12 col-md-12">
                                    <div className="panel-heading">
                                        <h4>Данные о поездке для отправки в банк</h4>
                                    </div>
                                    <div id="dataTrip" className="panel-body">
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <span>Длительность поездки</span>
                                            <MaskedInput mask="11:11"
                                                disabled={this.props.order.data.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handletimeTrip}
                                                value={this.props.order.data.order_ride_duration}
                                                placeholder="--:--"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <span>Пробег</span>
                                            {/* <MaskedInput mask="111"
                                                disabled={this.props.order.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handleDistance}
                                                value={this.props.order.order_ride_distance}
                                                placeholder="XXX"
                                            /> */}
                                            <input type="number"
                                                disabled={this.props.order.data.edit_data_to_sendbank}
                                                onChange={this.handleDistance}
                                                value={this.props.order.data.order_ride_distance}
                                                placeholder="xxxx"
                                            />
                                            <span>КМ</span>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <span>Время простоя</span>
                                            <MaskedInput mask="11:11"
                                                disabled={this.props.order.data.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handleIdletime}
                                                value={this.props.order.data.order_ride_idle_time || '00:00'}
                                                placeholder="ЧЧ:ММ"
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <span>Цена</span>
                                            {/* <MaskedInput mask="1111"
                                                disabled={this.props.order.edit_data_to_sendbank}
                                                size="20"
                                                onChange={this.handlePrice}
                                                value={this.props.order.order_ride_price}
                                                placeholder="XXXX"
                                            /> */}
                                            <input type="number"
                                                disabled={this.props.order.data.edit_data_to_sendbank}
                                                onChange={this.handlePrice}
                                                value={this.props.order.data.order_ride_price}
                                                placeholder="xxxx"
                                            />
                                            <span>р.</span>

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
                                            disabled={this.props.order.data.edit_order_status}
                                            title={this.props.order.data.order_status_val_def}
                                            id="bg-nested-dropdown">
                                            {dropdataStatuses}
                                        </DropdownButton>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <span>Рабочая группа</span>
                                        <DropdownButton
                                            disabled={this.props.order.data.edit_order_status}
                                            title={this.props.order.data.order_wg_val_def}
                                            id="bg-nested-dropdown">
                                            {dropdataWG}
                                        </DropdownButton>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-12'>
                                        <span>Исполнитель</span>
                                        <DropdownButton
                                            disabled={this.props.order.data.edit_order_status}
                                            title={this.props.order.data.order_def_executor}
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
                                            value={this.props.order.data.order_solution}
                                            disabled={this.props.order.data.edit_solutions}
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
                                            disabled={this.props.order.data.edit_closure_code}
                                            title={this.props.order.data.order_def_closure_statuses}
                                            id="bg-nested-dropdown">
                                            {dropdataClosureCode}
                                        </DropdownButton>
                                    </div>
                                    <div className="hidden">
                                        <span>Описание</span>
                                        <Textarea disabled={this.props.order.data.edit_description} minRows={4} defaultValue={this.props.order.data.order_descr || ''}></Textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Button id="up" onClick={this.handlePrev} disabled={this.props.order.data.up}>
                            <i className="fa fa-chevron-up" aria-hidden="true"></i>
                        </Button>
                        <Button id="down" onClick={this.handleNext} disabled={this.props.order.data.down}>
                            <i className="fa fa-chevron-down" aria-hidden="true"></i>
                        </Button>

                        <Button id='btn5' className={this.props.order.data.headerBtnSave} bsStyle="primary" onClick={this.saveToDB}>Сохранить</Button>
                        {/* <Button id='btn2' className={this.props.order.headerBtnTakeToWork} onClick={this.takeToWork} bsStyle="warning">Взять в работу</Button> */}
                        <Button id='btn3' className={this.props.order.data.headerBtnAssignCar} bsStyle="success" onClick={this.assignCar}>Назначить авто и закрыть</Button>
                        <Button id='btn4' disabled={this.props.order.data.onoffbtnDoneTrip} style={{ opacity: this.props.order.data.opacitybtnDoneTrip }} className={this.props.order.data.headerBtnDoneTrip} bsStyle="warning" onClick={this.doneTrip.bind(this)}>Завершить поездку и сохранить</Button>
                        {/* <Button id='btn6' className={this.props.order.headerBtnSendToBank} bsStyle="default">Передать данные о поездке в банк</Button> */}
                        <Button id='btn7' bsStyle="default" onClick={this.showHistory.bind(this)}>История</Button>
                    </div>
                    <Modal isOpen={this.state.showInfoModal} contentLabel="Modal">
                        <div id="fullDescr" className="panel panel-default col-lg-12 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h4>Описание</h4>
                                <Button id='btn1' onClick={this.onoffInfo}><i className="fa fa-times" aria-hidden="true"></i></Button>
                            </div>
                            <div id="result" className="panel-body">
                                <div>
                                    <Textarea disabled={this.props.order.data.edit_description} minRows={4} defaultValue={this.props.order.data.order_descr || ''}></Textarea>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={this.props.history.data.showHistoryModal} contentLabel="Modal">
                        <div className="history">
                            <h4>История по {this.props.order.data.order_ID}</h4>
                            <button className='btn' onClick={this.showHistory.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        </div>
                        <History />
                    </Modal>
                </Modal>
                <div style={{ display: this.props.transp.directoties.showLoader }}>
                    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                    <span>Загрузка данных...</span>
                </div>

                <ReactInterval timeout={10000} enabled={true}
                    callback={() => []}
                />
            </div>

        )

    }
}

export default connect(
    state => ({
        transp: state,
        order: state.currentOrder,
        history: state.history

    }),
    dispatch => ({
        filterGrid: () => {
            dispatch({ type: 'FILTERS_GRID' });
        },
        carDrivers: () => {
            dispatch(drivers());
        },
        carsDrivers: () => {
            dispatch(cars());
        },
        carDriversAll: () => {
            dispatch(carDriversAll());
        },
        carsStatus: () => {
            dispatch(carsStatus());
        },
        transpStat: () => {
            dispatch(transpStatus());
        },
        transpDriversStatus: () => {
            dispatch(transpDriversStatus());
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
        assignCar: (user) => {
            dispatch(assignCar(user));
        },
        doneTripStatus: (status) => {
            dispatch(doneTripStatus(status));
        },
        closureStatuses: () => {
            dispatch(closureStatuses());
        },
        up: () => {
            dispatch({ type: 'UP' });
        },
        down: () => {
            dispatch({ type: 'DOWN' });
        },
        // ******************************
        myWG: () => {
            dispatch(transpMyWG());
        },
        toMe: () => {
            dispatch(transpToMe());
        },
        transpNew: () => {
            dispatch(transpNew());
        },
        transpCarAppoint: () => {
            dispatch(transpCarAppoint());
        },
        doneTrip: () => {
            dispatch(transpDoneTrip());
        },
        canclClient: () => {
            dispatch(cancelClient());
        },
        // *******************************
        showHistory: () => {
            dispatch(showHistory());
        },
        getHistory: (sb_id) => {
            dispatch(getHistory(sb_id));
        }
    })
)(Gridview);



