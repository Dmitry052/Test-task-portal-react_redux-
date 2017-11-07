import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, DropdownButton, MenuItem, Alert } from "react-bootstrap";

class History extends Component {
    render() {
        console.log(this.props.history.dataHistory[0]);
        return (
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Поле</th>
                            <th>Старое значение</th>
                            <th>Новое значение</th>
                            <th>Сотрудник</th>
                            <th>Время</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Исполнитель</td>
                            <td>{this.props.history.dataHistory[0].new_assignee}</td>
                            <td>{this.props.history.dataHistory[0].old_assignee}</td>
                            <td>4</td>
                            <td>{this.props.history.dataHistory[0].date_edit}</td>
                        </tr>
                    </tbody>
                </table>
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