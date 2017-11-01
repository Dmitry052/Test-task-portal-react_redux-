const initialState = {
    order_view_id:0,
    // Управление, визуализация
    headerBtnClose: '',
    headerBtnTakeToWork: '',
    headerBtnAssignCar: '',
    headerBtnDoneTrip: '',
    headerBtnSave: '',
    headerBtnSendToBank: '',

    onoffbtnDoneTrip: false,
    opacitybtnDoneTrip: 1,
    // disabled input
    edit_id_to_stops: false,
    edit_time_start: false,
    edit_time_end: true,
    edit_driver_drop: true,
    edit_driver_data: false,
    edit_order_status: true,
    edit_data_to_sendbank: false,
    edit_solutions: false,
    edit_closure_code: false,
    edit_description: false,

    // Поля в заявке
    db_id: '',
    order_ID: '',
    order_BankContact: '',
    order_bank_contact_phone: '',
    oreder_travel_from: '',
    oreder_travel_to: '',
    order_ride_stops: '',
    order_ride_start_time: '',
    order_ride_start_time_toDB: null,
    order_ride_end_time: '',
    order_ride_end_time_toDB: null,

    order_ride_duration: '',
    order_ride_distance: '',
    order_ride_idle_time: '',
    order_ride_price: '',
    order_solution: '',
    order_descr: '',

    car_drivers: '',//Список
    defaultDriver: '',//по умолчанию из заявки
    order_driver_phone: '',
    order_driver_brand_car: '',
    order_driver_color_car: '',
    order_driver_num_car: '',

    order_statuses: '', //Список статусов
    order_status_val_def: '',//по умолчанию из заявки
    order_save_status_val_def: '',//для контроля сохранения
    order_wg: '', //Cписок групп
    order_wg_val_def: '', //по умолчанию из заявки
    order_executers: '', //Cписок исполнителей
    order_def_executor: '',//по умолчанию из заявки

    order_closure_statuses: '',
    order_def_closure_statuses: ''


};

export default function currentOrder(state = initialState, action) {
    function driverData(drivers, driver_id, cars) {
        var arr = [];
        if (driver_id !== false) {
            for (var key in drivers) {
                if (drivers[key].id === driver_id) {
                    arr.push(drivers[key]);
                    for (var key in cars) {
                        if (arr[0].car_id === cars[key].id) {
                            arr.push(cars[key]);
                            break;
                        }
                    }
                    break;
                };
            }
        }
        // console.log('на выходе driverData ',arr);
        return arr;
    }
    function setDriverData(driverData) {
        state.defaultDriver = driverData.length === 0 ? "Выберете водителя" : driverData[0].driver_fullname;
        state.order_driver_phone = driverData.length === 0 ? "---" : driverData[0].driver_phone;
        state.order_driver_brand_car = driverData.length === 0 ? "---" : driverData[0].vehicle_brand;
        state.order_driver_color_car = driverData.length === 0 ? "---" : driverData[0].vehicle_color;
        state.order_driver_num_car = driverData.length === 0 ? "---" : driverData[0].vehicle_id_number;
    }
    function normalizeTime(time) {
        if (time > 0) {
            var date = new Date(time * 1000);
            var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
            var min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
            var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
            var month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
            var year = date.getFullYear();
            var formated_date = day + "." + month + "." + year + " " + hours + ":" + min;
        }
        return formated_date;
    }
    function setDefClosureCode(codes, code) {
        var def_code = '';
        for (var key in codes) {
            if (codes[key].id === code) {
                return codes[key].closure_code_name;
            }
        }
        return def_code;
    }
    function assignedToWG() {
        state.headerBtnClose = '';
        state.headerBtnTakeToWork = action.data[0].assignee === null ? '' : 'hidden';
        state.headerBtnAssignCar = '';
        state.headerBtnDoneTrip = 'hidden';
        state.headerBtnSave = '';
        state.headerBtnSendToBank = 'hidden';

        state.onoffbtnDoneTrip = false;
        state.opacitybtnDoneTrip = 1;

        state.edit_id_to_stops = true;
        state.edit_time_start = true;
        state.edit_time_end = true;
        state.edit_driver_drop = false;
        state.edit_driver_data = true;
        state.edit_order_status = false;
        state.edit_data_to_sendbank = true;
        state.edit_solutions = false;
        state.edit_closure_code = true;
        state.edit_description = true;
    }
    function assignedCar() {
        state.headerBtnClose = '';
        state.headerBtnTakeToWork = 'hidden';
        state.headerBtnAssignCar = 'hidden';
        state.headerBtnDoneTrip = '';
        state.headerBtnSave = '';
        state.headerBtnSendToBank = 'hidden';

        state.onoffbtnDoneTrip = false;
        state.opacitybtnDoneTrip = 1;

        state.edit_id_to_stops = true;
        state.edit_time_start = true;
        state.edit_time_end = false;
        state.edit_driver_drop = false;
        state.edit_driver_data = true;
        state.edit_order_status = false;
        state.edit_data_to_sendbank = false;
        state.edit_solutions = false;
        state.edit_closure_code = true;
        state.edit_description = true;
    }
    function doneTrip() {
        state.headerBtnClose = '';
        state.headerBtnTakeToWork = 'hidden';
        state.headerBtnAssignCar = 'hidden';
        state.headerBtnDoneTrip = state.order_save_status_val_def === '' ? 'hidden' : '';
        state.headerBtnSave = state.order_save_status_val_def === '' ? 'hidden' : '';
        state.headerBtnSendToBank = 'hidden';

        state.onoffbtnDoneTrip = false;
        state.opacitybtnDoneTrip = 1;

        state.edit_id_to_stops = true;
        state.edit_time_start = true;
        state.edit_time_end = true;
        state.edit_driver_drop = true;
        state.edit_driver_data = true;
        state.edit_order_status = state.order_save_status_val_def === '' ? true : false;
        state.edit_data_to_sendbank = state.order_save_status_val_def === '' ? true : false;
        state.edit_solutions = state.order_save_status_val_def === '' ? true : false;
        state.edit_closure_code = true;
        state.edit_description = true;
    }
    function cancelClient() {
        state.headerBtnClose = '';
        state.headerBtnTakeToWork = 'hidden';
        state.headerBtnAssignCar = 'hidden';
        state.headerBtnDoneTrip = state.order_save_status_val_def === '' ? 'hidden' : '';
        state.headerBtnSave = state.order_save_status_val_def === '' ? 'hidden' : '';
        state.headerBtnSendToBank = 'hidden';

        state.onoffbtnDoneTrip = true;
        state.opacitybtnDoneTrip = 0.2;

        state.edit_id_to_stops = true;
        state.edit_time_start = true;
        state.edit_time_end = true;
        state.edit_driver_drop = true;
        state.edit_driver_data = true;
        state.edit_order_status = state.order_save_status_val_def === '' ? true : false;
        state.edit_data_to_sendbank = true;
        state.edit_solutions = state.order_save_status_val_def === '' ? true : false;
        state.edit_closure_code = true;
        state.edit_description = true;
    }
    function refusing() {
        state.headerBtnClose = '';
        state.headerBtnTakeToWork = 'hidden';
        state.headerBtnAssignCar = 'hidden';
        state.headerBtnDoneTrip = state.order_save_status_val_def === '' ? 'hidden' : '';
        state.headerBtnSave = state.order_save_status_val_def === '' ? 'hidden' : '';
        state.headerBtnSendToBank = 'hidden';

        state.onoffbtnDoneTrip = true;
        state.opacitybtnDoneTrip = 0.2;

        state.edit_id_to_stops = true;
        state.edit_time_start = true;
        state.edit_time_end = true;
        state.edit_driver_drop = true;
        state.edit_driver_data = true;
        state.edit_order_status = state.order_save_status_val_def === '' ? true : false;
        state.edit_data_to_sendbank = true;
        state.edit_solutions = true;
        state.edit_closure_code = true;
        state.edit_description = true;
    }
    function dataSend() {
        state.headerBtnClose = '';
        state.headerBtnTakeToWork = 'hidden';
        state.headerBtnAssignCar = 'hidden';
        state.headerBtnDoneTrip = 'hidden';
        state.headerBtnSave = 'hidden';
        state.headerBtnSendToBank = 'hidden';

        state.onoffbtnDoneTrip = false;
        state.opacitybtnDoneTrip = 1;

        state.edit_id_to_stops = true;
        state.edit_time_start = true;
        state.edit_time_end = true;
        state.edit_driver_drop = true;
        state.edit_driver_data = true;
        state.edit_order_status = true;
        state.edit_data_to_sendbank = true;
        state.edit_solutions = true;
        state.edit_closure_code = true;
        state.edit_description = true;
    }
    if (action.type === 'currentOrder') {
        // console.log(action.data);
        switch (action.data[0].status) {
            case action.data[2][0].status:
                assignedToWG();
                break;
            case action.data[2][1].status:
                assignedCar();
                break;
            case action.data[2][2].status:
                doneTrip();
                break;
            case action.data[2][3].status:

                cancelClient();
                break;
            case action.data[2][4].status:
                refusing();
                break;
            case action.data[2][5].status:
                dataSend();
                break;
        }
        console.log('action.data',action.data);
        var driverData = driverData(action.data[1], action.data[0].driver_id || false, action.data[4]);
        // Кнопки управления
        // Информация о заказе
        state.order_view_id = action.data[6];
        state.db_id = action.data[0].id;
        state.order_ID = action.data[0].sb_id;
        state.order_BankContact = action.data[0].bank_contact;
        state.order_bank_contact_phone = action.data[0].bank_contact_phone;
        state.oreder_travel_from = action.data[0].travel_from;
        state.oreder_travel_to = action.data[0].travel_to;
        state.order_ride_stops = action.data[0].ride_stops;
        state.order_ride_start_time = normalizeTime(action.data[0].ride_start_time);
        state.order_ride_start_time_toDB = action.data[0].ride_start_time;
        state.order_ride_end_time = normalizeTime(action.data[0].ride_end_time);
        // Водитель
        state.car_drivers = action.data[1].map((num, index, arr) => { return num.driver_fullname });
        state.car_drivers.unshift('---');
        setDriverData(driverData);
        // Состояние заказа
        state.order_statuses = action.data[2].map((num, index, arr) => { return num.status === 'Данные переданы' ? '' : num.status });
        state.order_status_val_def = action.data[0].status;
        state.order_wg = action.data[3].map((num, index, arr) => { return num.wg_name });
        state.order_wg_val_def = action.data[0].wg_name;
        state.order_executers = []
        state.order_def_executor = action.data[0].displayname == null ? 'Выберете исполнителя' : action.data[0].displayname;
        // Данные о поездке для отправки в банк
        state.order_ride_duration = action.data[0].ride_duration;
        state.order_ride_distance = action.data[0].ride_distance;
        state.order_ride_idle_time = action.data[0].ride_idle_time;
        state.order_ride_price = action.data[0].ride_price === 'null' ? '0000.00' : action.data[0].ride_price;
        // Подробная информация о заказе
        state.order_solution = action.data[0].solution === 'null' ? '' : action.data[0].solution;

        state.order_descr = action.data[0].full_descr;
        state.order_closure_statuses = action.data[5].map((num, index, arr) => { return num.closure_code_name });
        state.order_def_closure_statuses = setDefClosureCode(action.data[5], action.data[0].closure_code) === "" ? 'Выберете код закрытия' : setDefClosureCode(action.data[5], action.data[0].closure_code);
    }
    if (action.type === 'listExecutors') {
        state.order_executers = action.data.map((num, index, arr) => { return num.displayname });;
    }
    if (action.type === 'setDriver') {
        var driver_id = '';
        // ищем id водителя по его ФИО
        for (var key in action.data[1]) {
            if (action.data[1][key].driver_fullname === action.data[0]) {
                driver_id = action.data[1][key].id;
            }
        }
        var driverData = driverData(action.data[1], driver_id, action.data[2]);
        setDriverData(driverData);
        return state;
    }
    if (action.type === 'setStatus') {
        state.order_save_status_val_def = state.order_status_val_def;
        state.order_status_val_def = action.data;

        switch (action.data) {
            case state.order_statuses[0]:
                assignedToWG();
                break;
            case state.order_statuses[1]:
                state.order_def_closure_statuses = state.order_closure_statuses[0];
                state.order_solution = '';
                fassignCar();
                assignedCar();
                break;
            case state.order_statuses[2]:
                state.order_def_closure_statuses = state.order_closure_statuses[0];
                doneTrip();
                break;
            case state.order_statuses[3]:
                state.order_def_closure_statuses = state.order_closure_statuses[3];
                state.order_solution = 'Заявка отозвана по звонку'
                cancelClient();
                break;
            case state.order_statuses[4]:
                state.order_def_closure_statuses = state.order_closure_statuses[2];
                state.order_solution = 'Невозможно решить!\nОтказ в обслуживании.'
                refusing();
                break;
            case state.order_statuses[5]:
                dataSend();
                break;
        }
        state.order_save_status_val_def = '';
    }
    if (action.type === 'setWG') {
        state.order_wg_val_def = action.data;
    }
    if (action.type === 'setExecutor') {
        state.order_def_executor = action.data;
    }
    function fassignCar(){
        // Пробрасываем код закрытия
        state.order_def_closure_statuses = state.order_closure_statuses[0];
        // меняем статус
        state.order_status_val_def = state.order_statuses[1];
        // Проставляем дату
        state.order_ride_start_time_toDB = Math.floor(Date.now() / 1000);
        // state.order_ride_start_time = normalizeTime(state.order_ride_start_time_toDB);
        // Пробрасываем в поле решение данные водителя        
        state.order_solution = (state.order_solution === '' || state.order_solution === null ? '' : state.order_solution + '\n') + 'Водитель:' + state.defaultDriver + '\n' + 'тел.' + state.order_driver_phone + ' ' + ' ' + state.order_driver_brand_car + ' ' + state.order_driver_color_car + ' ' + state.order_driver_num_car;
    }
    if (action.type === 'assignCar') {
        fassignCar();
    }
    if (action.type === 'doneTrip') {
        state.order_ride_end_time_toDB = Math.floor(Date.now() / 1000);
        state.order_ride_end_time = normalizeTime(state.order_ride_end_time_toDB);
        // state.order_status_val_def = action.data;
        state.order_status_val_def = state.order_statuses[2];

    }
    if (action.type === 'closureCode') {
        state.order_def_closure_statuses = action.data;
    }
    if (action.type === 'setTimeTrip') {
        state.order_ride_duration = action.data;
    }
    if (action.type === 'setDistance') {
        state.order_ride_distance = action.data;
    }
    if (action.type === 'setIdletime') {
        state.order_ride_idle_time = action.data;
    }
    if (action.type === 'setPrice') {
        state.order_ride_price = action.data;
    }
    if (action.type === 'setSolution') {
        state.order_solution = action.data;
    }
    return state;
}