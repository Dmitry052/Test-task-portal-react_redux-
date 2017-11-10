import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, DropdownButton, MenuItem, Alert } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class History extends Component {

    render() {
        // console.log('История', this.props.history.dataHistory);
        let data = [];
        if (this.props.history.dataHistory[0] === undefined) {
            data = [];
        }
        else {
            this.props.history.dataHistory.map((item, i) => {
                for (var key in item) {
                    let j = key.split('_');
                    if (j.length > 2) {
                        j[1] = j.slice(1, j.length).join('_');
                    }
                    if (j[0] === 'old') {
                        for (var key2 in item) {
                            let s = key2.split('_');
                            if (s.length > 2) {
                                s[1] = s.slice(1, s.length).join('_');
                            }
                            
                            if (s[0] === 'new' && s[1] === j[1]) {
                                console.log(key,key2,item[key],item[key2],item[key] !== item[key2]);
                                if (item[key] !== item[key2]) {
                                    switch (s[1]) {
                                        case 'status':
                                            s[1] = 'Статус';
                                            break;
                                        case 'ride_end_time':
                                            s[1] = 'Время завершения поездки';
                                            break;
                                        case 'ride_duration':
                                            s[1] = 'Длительность поездки';
                                            break;
                                        case 'ride_distance':
                                            s[1] = 'Пробег';
                                            break;
                                        case 'ride_price':
                                            s[1] = 'Цена';
                                            break;
                                        case 'ride_start_time':
                                            s[1] = 'Время назначения авто';
                                            break;
                                        case 'solution':
                                            s[1] = 'Решение';
                                            break;
                                        case 'driver_id':
                                            s[1] = 'Водитель';
                                            break;
                                        case 'assignee':
                                            s[1] = 'Исполнитель';
                                            break;
                                        case 'workgroup_id':
                                            s[1] = 'Рабочая группа';
                                            break;
                                        case 'ride_end_time':
                                            s[1] = 'Время завершения поездки';
                                            break;
                                        case 'ride_distance':
                                            s[1] = 'Пробег';
                                            break;
                                        case 'ride_idle_time':
                                            s[1] = 'Время простоя';
                                            break;
                                        case 'ride_price':
                                            s[1] = 'Цена';
                                            break;
                                        case 'closure_code':
                                            s[1] = 'Код закрытия';
                                            break;
                                    }
                                    if (item[key] === 'null') { item[key] = ''; }
                                    if (item[key2] === 'null') { item[key] = ''; }
                                    data.push({ field: s[1], old: item[key], new: item[key2], user: item.displayname, time: item.date_edit });
                                }
                                break;
                            }
                        }
                    }
                }
            });
            console.log(data);
        }
        return (
            <div className="dataHistory">
                <BootstrapTable className='col-lg-12 col-md-12'
                    hover
                    data={data}
                >
                    <TableHeaderColumn dataField='field' isKey={true} >Поле</TableHeaderColumn>
                    <TableHeaderColumn dataField='old' >Старое значение</TableHeaderColumn>
                    <TableHeaderColumn dataField='new' >Новое значение</TableHeaderColumn>
                    <TableHeaderColumn dataField='user' >Сотрудник</TableHeaderColumn>
                    <TableHeaderColumn dataField='time' dataSort={true}>Время</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default connect(
    state => ({
        order: state.currentOrder,
        history: state.history
    }),
    dispatch => ({

    })
)(History);