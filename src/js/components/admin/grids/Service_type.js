import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveST, currentMenu, deleteST } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';

class Service_type extends Component {
    createST() {
        this.props.createST();
    }
    closeModal() {
        this.props.showST();
    }
    onRowClick(row) {
        this.props.editST(row);
    }
    setNameST() {
        this.props.setNameST(this.service_name.value);
    }
    saveToDBST() {
        this.props.saveST(this.props.store.service_types.st_name);
        this.props.currentMenu();
        this.props.showST();
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_st({ id: isSelected.id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.store.service_types.check_st;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteST(trueArr);
        this.props.uncheck_st();
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
            <div className='col-lg-6 col-md-12'>
                <button className="btn btn-success" onClick={this.createST.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                <BootstrapTable
                    hover
                    data={this.props.store.service_types.st}
                    selectRow={selectRow}
                    options={options}
                >
                    <TableHeaderColumn dataField='id'width='16%' isKey={true} filter={{ type: 'TextFilter' }} >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='service_name' filter={{ type: 'TextFilter' }} >Сервис</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.store.service_types.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '178px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Назавание сервиса<span>*</span></span>
                            <input type='text'
                                value={this.props.store.service_types.st_name.name}
                                className='form-control'
                                ref={(service_name) => { this.service_name = service_name }}
                                onChange={this.setNameST.bind(this)}
                            />
                        </div>
                        <button id="saveModal" className="btn btn-primary" onClick={this.saveToDBST.bind(this)}>Сохранить</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default connect(
    state => ({
        store: state,
        service_type: state.service_types
    }),
    dispatch => ({
        showST: () => {
            dispatch({ type: 'SHOW_ST_ADMIN' });
        },
        createST: () => {
            dispatch({ type: 'CREATE_ST_ADMIN' });
        },
        editST: (name) => {
            dispatch({ type: 'EDIT_NAME_ST_ADMIN', data: name });
        },
        setNameST: (name) => {
            dispatch({ type: 'SET_NAME_ST_ADMIN', data: name });
        },
        check_st: (st) => {
            dispatch({ type: 'CHECK_ST_ADMIN', data: st });
        },
        uncheck_st: (st) => {
            dispatch({ type: 'UNCHECK_ST_ADMIN'});
        },
        saveST: (st) => {
            dispatch(saveST(st));
        },
        deleteST: (st) => {
            dispatch(deleteST(st));
        },
        currentMenu: () => {
            dispatch(currentMenu('st'));
        }
    })
)(Service_type);