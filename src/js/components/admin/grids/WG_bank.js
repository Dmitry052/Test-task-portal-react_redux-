import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveWGbank, currentMenu, deleteWGbank } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';

class WG_bank extends Component {
    createWGbank() {
        this.props.createWG_bank();
    }
    closeModal() {
        this.props.showWG_bank();
    }
    onRowClick(row) {
        this.props.editWG_bank(row);
    }
    setbankWG() {
        this.props.setNameWG_bank(this.bankWG.value);
    }
    saveToDBbankWG() {
        this.props.saveWG_bank(this.props.store.wgbank.wgbank_name);
        this.props.currentMenu();
        this.props.showWG_bank();
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_WG_bank({ id: isSelected.id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.store.wgbank.check_wgbank;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteWG_bank(trueArr);
        this.props.uncheck_WG_bank();
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
                <button className="btn btn-success" onClick={this.createWGbank.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                <BootstrapTable
                    hover
                    data={this.props.store.wgbank.wgbank}
                    selectRow={selectRow}
                    options={options}
                >   
                    <TableHeaderColumn dataField='id'width='16%' isKey={true} filter={{ type: 'TextFilter' }}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='wg_name' filter={{ type: 'TextFilter' }}>Рабочая группа</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.store.wgbank.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '178px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Рабочая группа банка<span>*</span></span>
                            <input type='text'
                                value={this.props.store.wgbank.wgbank_name.name}
                                className='form-control'
                                ref={(bankWG) => { this.bankWG = bankWG }}
                                onChange={this.setbankWG.bind(this)}
                            />
                        </div>
                        <button id="saveModal" className="btn btn-primary" onClick={this.saveToDBbankWG.bind(this)}>Сохранить</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        showWG_bank: () => {
            dispatch({ type: 'SHOW_WGBANK_ADMIN' });
        },
        createWG_bank: () => {
            dispatch({ type: 'CREATE_WGBANK_ADMIN' });
        },
        editWG_bank: (name) => {
            dispatch({ type: 'EDIT_NAME_WGBANK_ADMIN', data: name });
        },
        setNameWG_bank: (name) => {
            dispatch({ type: 'SET_NAME_WGBANK_ADMIN', data: name });
        },
        check_WG_bank: (wg) => {
            dispatch({ type: 'CHECK_WGBANK_ADMIN', data: wg });
        },
        uncheck_WG_bank: () => {
            dispatch({ type: 'UNCHECK_WGBANK_ADMIN' });
        },
        saveWG_bank: (wg) => {
            dispatch(saveWGbank(wg));
        },
        deleteWG_bank: (wg) => {
            dispatch(deleteWGbank(wg));
        },
        currentMenu: () => {
            dispatch(currentMenu('wgbank'));
        }
    })
)(WG_bank);