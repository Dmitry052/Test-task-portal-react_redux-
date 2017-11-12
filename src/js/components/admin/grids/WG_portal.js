import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveWG, currentMenu, deleteWG } from 'Actions/admin/actionAdmin';
import Modal from 'react-modal';

class WG_portal extends Component {
    createWGportal() {
        this.props.createWG();
    }
    closeModal() {
        this.props.showWG_portal();
    }
    onRowClick(row) {
        this.props.editWG(row);
    }
    setPortalwg() {
        this.props.setNameWG(this.portalwg.value);
    }
    saveToDBPortalwg() {
        this.props.saveWG(this.props.store.wg.wg_name);
        this.props.currentMenu();
        this.props.showWG_portal();
    }
    handleRowSelect(isSelected, rows) {
        if (isSelected instanceof Object) {
            this.props.check_WG({ id: isSelected.id, status: rows });
        } else {
            // console.log([isSelected, rows]);
        }
    }
    handleDelSelected() {
        const selected = this.props.store.wg.check_wg;
        let trueArr = [];
        for (var key of selected) {
            key[1] === true ? trueArr.push(key[0]) : '';
        }
        this.props.deleteWG(trueArr);
        this.props.uncheck_WG();
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
                <button className="btn btn-success" onClick={this.createWGportal.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={this.handleDelSelected.bind(this)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                <BootstrapTable
                    hover
                    data={this.props.store.wg.wg}
                    selectRow={selectRow}
                    options={options}
                >
                    <TableHeaderColumn dataField='wg_name' isKey={true} filter={{ type: 'TextFilter' }}>Рабочая группа</TableHeaderColumn>
                </BootstrapTable>
                <Modal isOpen={this.props.store.wg.editModal} contentLabel="Modal"
                    style={{ content: { width: '600px', margin: 'auto', 'backgroundColor': '#f5f5f5', height: '178px' } }}
                >
                    <div id="headerSTAdmin">
                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}><i className="fa fa-times" aria-hidden="true" /></button>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <span>Рабочая группа портала<span>*</span></span>
                            <input type='text'
                                value={this.props.store.wg.wg_name.name}
                                className='form-control'
                                ref={(portalwg) => { this.portalwg = portalwg }}
                                onChange={this.setPortalwg.bind(this)}
                            />
                        </div>
                        <button id="saveModal" className="btn btn-primary" onClick={this.saveToDBPortalwg.bind(this)}>Сохранить</button>
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
        showWG_portal: () => {
            dispatch({ type: 'SHOW_WGPORTAL_ADMIN' });
        },
        createWG: () => {
            dispatch({ type: 'CREATE_WGPORTAL_ADMIN' });
        },
        editWG: (name) => {
            dispatch({ type: 'EDIT_NAME_WGPORTAL_ADMIN', data: name });
        },
        setNameWG: (name) => {
            dispatch({ type: 'SET_NAME_WGPORTAL_ADMIN', data: name });
        },
        check_WG: (wg) => {
            dispatch({ type: 'CHECK_WGPORTAL_ADMIN', data: wg });
        },
        uncheck_WG: () => {
            dispatch({ type: 'UNCHECK_WGPORTAL_ADMIN' });
        },
        saveWG: (wg) => {
            dispatch(saveWG(wg));
        },
        deleteWG: (wg) => {
            dispatch(deleteWG(wg));
        },
        currentMenu: () => {
            dispatch(currentMenu('wg'));
        }
    })
)(WG_portal);