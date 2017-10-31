import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { showAddCar, showEditCar } from 'Actions/actionTransp';
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
    render() {
        const options = {
            sizePerPage: 10,
            onRowDoubleClick: this.onRowClick.bind(this),
        };
        const wg = {};
        return (
            <div id="gridCars">
                <button className='btn-success' onClick={this.showAddCar.bind(this)}>Добавить автомобиль</button>
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={this.props.transp.cars}
                    pagination={true}
                    options={options}
                >
                    <TableHeaderColumn isKey={true} dataField='vehicle_brand' filter={{ type: 'TextFilter', defaultValue: '' }}>Марка</TableHeaderColumn>
                    <TableHeaderColumn dataField='vehicle_id_number' filter={{ type: 'TextFilter', defaultValue: '' }}>Регистрационный номер</TableHeaderColumn>
                    <TableHeaderColumn dataField={'vehicle_color' === 1 ? 'sdfds' : 'vehicle_color'} filter={{ type: 'TextFilter', defaultValue: '' }}>Цвет</TableHeaderColumn>
                    <TableHeaderColumn dataField='companyname' filter={{ type: 'SelectFilter', options: wg }}>Компания</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.transp.directoties.showAddCar}
                    contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'background-color': '#f5f5f5', height: '400px' } }}
                >

                    <div className='btnModalCar'>
                        <button className='btn' onClick={this.showAddCar.bind(this)}>Закрыть</button>
                        <button className='btn btn-primary' onClick={this.showAddCar.bind(this)}>{this.props.transp.directoties.valBtnAddEdit}</button>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Марка</span>
                        <input type='text' value={this.props.transp.directoties.car_vehicle_brand} />
                    </div >
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Регистрационный номер</span>
                        <input type='text' value={this.props.transp.directoties.car_vehicle_id_number} />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Цвет</span>
                        <input type='text' value={this.props.transp.directoties.car_vehicle_color} />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalCar'>
                        <span>Компания</span>
                        <input type='text' value={this.props.transp.directoties.car_company} />
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
        }
    })
)(Cars);