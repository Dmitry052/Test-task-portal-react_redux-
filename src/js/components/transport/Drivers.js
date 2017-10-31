import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { showAddDriver, showEditDriver } from 'Actions/actionTransp';
import Modal from 'react-modal';
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

    render() {
        console.log(this.props.transp.companyToUser);
        const options = {
            sizePerPage: 10,
            onRowDoubleClick: this.onRowClick.bind(this),
        };

        const dropdtaCompany = this.props.transp.companyToUser.map((name, i) => {
            return <MenuItem eventKey={i} onSelect={() => this.setClosureCode(name.companyname)}>{name.companyname}</MenuItem>
        })

        return (
            <div id="gridDrivers">
                <button className='btn-success' onClick={this.showAddDriver.bind(this)}>Добавить нового водителя</button>
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={this.props.transp.carDrivers}
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
                        <button className='btn btn-primary' onClick={this.showAddDriver.bind(this)}>{this.props.transp.directoties.valBtnAddEdit}</button>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>ФИО</span>
                        <input type='text' value={this.props.transp.directoties.driver_driver_name} />
                    </div >
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Телефон</span>
                        <input type='text' value={this.props.transp.directoties.driver_driver_phone} />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Статус</span>
                        <input type='text' value={this.props.transp.directoties.driver_status} />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Регистрационный номер</span>
                        <input type='text' value={this.props.transp.directoties.driver_vehicle_id_number} />
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 modalDriver'>
                        <span>Компания</span>
                        <DropdownButton
                            title={this.props.transp.directoties.driver_company}
                        >
                            {dropdtaCompany}
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
        }

    })
)(Drivers);