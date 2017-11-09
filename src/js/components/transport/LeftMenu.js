import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transpMyWG, transpNew, transpToMe, transpCarAppoint, transpDoneTrip, transpDataSend, cancelClient, showDirect, showCarsDirect, showDriversDirect } from 'Actions/actionTransp';
import { Nav, NavItem, Collapse, Button } from 'react-bootstrap';


class LeftMenu extends Component {
    constructor(props) {
        super(props);

        this.props.myWG();

        this.state = {
            checkedValue: false,
            collapseFilters: true,
            collapseDirectories: true,
            width: '16.6%',

            hideClassName: 'fa fa-angle-left fa-2x',

            iconFilters: '',
            iconFilter1: 'fa fa-users',
            iconFilter2: 'fa fa-user-circle-o',
            iconFilter3: 'fa fa-check-circle',
            // iconFilter4: 'fa fa-check-circle',
            iconFilter5: 'fa fa-times-circle',
            iconFilter6: 'fa fa-yelp',
            iconFilter7: 'fa fa-taxi',

            iconDirectories: '',
            iconDirectory1: 'fa fa-id-card-o',
            iconDirectory2: 'fa fa-car',

            nameFilters: 'Фильтры',
            nameFilter1: 'На мои рабочие группы',
            nameFilter2: 'Назначены мне',
            nameFilter3: 'Завершённые поездки',
            // nameFilter4: 'Данные отправлены',
            nameFilter5: 'Отозваны клиентом',
            nameFilter6: 'Новые заявки',
            nameFilter7: 'Машина назначена',


            nameDirectories: 'Справочники',
            nameDirectory1: 'Водители',
            nameDirectory2: 'Автомобили'

        };
        this.handleCheckedMenu = this.handleCheckedMenu.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
        this.toggleDirectories = this.toggleDirectories.bind(this);

    }

    toggleFilters() {
        this.setState({ collapseFilters: !this.state.collapseFilters });
    }

    toggleDirectories() {
        this.setState({ collapseDirectories: !this.state.collapseDirectories });
    }

    handleCheckedMenu() {
        // this.props.letf_menu();
        
        this.setState({
            checkedValue: !this.state.checkedValue,
        });

        if (this.state.checkedValue == true) {
            this.setState({
                width: '16.6%',

                hideClassName: 'fa fa-angle-left fa-2x',

                iconFilters: '',
                iconDirectories: '',

                nameFilters: 'Фильтры',
                nameFilter1: 'На мои рабочие группы',
                nameFilter2: 'Назначены мне',
                nameFilter3: 'Завершённые поездки',
                // nameFilter4: 'Данные отправлены',//убрать
                nameFilter5: 'Отозваны клиентом',
                nameFilter6: 'Новые заявки',
                nameFilter7: 'Машина назначена',

                nameDirectories: 'Справочники',
                nameDirectory1: 'Водители',
                nameDirectory2: 'Автомобили'

            });
        }
        else {
            this.setState({
                width: '40px',

                hideClassName: 'fa fa-angle-right fa-2x',

                iconFilters: 'fa fa-filter',
                iconDirectories: 'fa fa-cogs',

                nameFilters: '',
                nameFilter1: '',
                nameFilter2: '',
                nameFilter3: '',
                nameFilter4: '',
                nameFilter5: '',
                nameFilter6: '',
                nameFilter7: '',

                nameDirectories: '',
                nameDirectory1: '',
                nameDirectory2: ''

            });
        }
    }
    handleChecked() {
        // заглушка
    }
    handleFunction(func, num) {
        this.props.activeFilter(num);
        func();
        this.setState({});
    }
    render() {
        // Ширина меню
        const width = { width: this.state.width };
        return (
            <div className="leftMenu" style={width}>
                <div className="menuFilters">
                    <Button onClick={this.toggleFilters}><i className={this.state.iconFilters}></i>{' '}{this.state.nameFilters}</Button>
                    <Collapse in={this.state.collapseFilters}>
                        <Nav bsStyle="pills">
                            <NavItem eventKey={1} href="#" className={this.props.transp.left_menu.filter1} onClick={this.handleFunction.bind(this, this.props.myWG, 0)}><i className={this.state.iconFilter1}></i>{' '}{this.state.nameFilter1}</NavItem>
                            <NavItem eventKey={2} href="#" className={this.props.transp.left_menu.filter2} onClick={this.handleFunction.bind(this, this.props.toMe, 1)}><i className={this.state.iconFilter2}></i>{' '}{this.state.nameFilter2}</NavItem>
                            <NavItem eventKey={6} href="#" className={this.props.transp.left_menu.filter6} onClick={this.handleFunction.bind(this, this.props.transpNew, 5)}><i className={this.state.iconFilter6}></i>{' '}{this.state.nameFilter6}</NavItem>
                            <NavItem eventKey={7} href="#" className={this.props.transp.left_menu.filter7} onClick={this.handleFunction.bind(this, this.props.transpCarAppoint, 6)}><i className={this.state.iconFilter7}></i>{' '}{this.state.nameFilter7}</NavItem>
                            <NavItem eventKey={3} href="#" className={this.props.transp.left_menu.filter3} onClick={this.handleFunction.bind(this, this.props.doneTrip, 2)}><i className={this.state.iconFilter3}></i>{' '}{this.state.nameFilter3}</NavItem>
                            {/* <NavItem eventKey={4} href="#" onClick={this.props.dataSend}><i className={this.state.iconFilter4}></i>{' '}{this.state.nameFilter4}</NavItem> */}
                            <NavItem eventKey={5} href="#" className={this.props.transp.left_menu.filter5} onClick={this.handleFunction.bind(this, this.props.canclClient, 4)}><i className={this.state.iconFilter5}></i>{' '}{this.state.nameFilter5}</NavItem>
                        </Nav>
                    </Collapse>
                </div>
                <div className="menuDirectory">
                    <Button onClick={this.toggleDirectories}><i className={this.state.iconDirectories}></i>{' '}{this.state.nameDirectories}</Button>
                    <Collapse in={this.state.collapseDirectories}>
                        <Nav bsStyle="pills">
                            <NavItem eventKey={1} href="#" className={this.props.transp.left_menu.filter8} onClick={this.handleFunction.bind(this, this.props.showDriversDirect, 7)}><i className={this.state.iconDirectory1}></i>{' '}{this.state.nameDirectory1}</NavItem>
                            <NavItem eventKey={2} href="#" className={this.props.transp.left_menu.filter9} onClick={this.handleFunction.bind(this, this.props.showCarsDirect, 8)}><i className={this.state.iconDirectory2}></i>{' '}{this.state.nameDirectory2}</NavItem>
                        </Nav>
                    </Collapse>
                </div>
                <label>
                    <div className="hideLeftMenu">
                        <input type="checkbox"
                            checked={this.state.checkedValue}
                            onClick={this.handleCheckedMenu}
                            onChange={this.handleChecked}
                        />
                        {<i className={this.state.hideClassName}></i>}
                    </div>
                </label>

            </div>
        );
    }
}

export default connect(
    state => ({
        transp: state
    }),
    dispatch => ({
        activeFilter: (num) => {
            dispatch({ type: 'FILETER_ACTIVE', data: num })
        },
        myWG: () => {
            dispatch(showDirect());
            dispatch(transpMyWG());
        },
        transpNew: () => {
            dispatch(showDirect());
            dispatch(transpNew());
        },
        toMe: () => {
            dispatch(showDirect());
            dispatch(transpToMe());
        },
        transpCarAppoint: () => {
            dispatch(showDirect());
            dispatch(transpCarAppoint());
        },
        doneTrip: () => {
            dispatch(showDirect());
            dispatch(transpDoneTrip());
        },
        dataSend: () => {
            dispatch(showDirect());
            dispatch(transpDataSend());
        },
        canclClient: () => {
            dispatch(showDirect());
            dispatch(cancelClient());
        },
        // ------------------------------
        showCarsDirect: () => {
            dispatch(showCarsDirect());
        },
        showDriversDirect: (cars, drivers, company) => {
            dispatch(showDriversDirect());
        },
        // ----------------------
        letf_menu: () => {
            dispatch(letf_menu());
        }

    })
)(LeftMenu);