const initialState = {
    data: {
        up: false,
        down: false,
        filtersGrid: '30px',
        defValuefiltersGrid: '',
        widthGrid: '83%',
        leftGrid: '17%',

        order_view_id: 0,
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
        edit_commentary_for_driver: false,
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
        order_date_deadline: '',
        order_BankContact: '',
        order_bank_contact_phone: '',
        oreder_travel_from: '',
        oreder_travel_to: '',
        order_ride_stops: '',
        order_commentary_for_driver: '',
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
    }
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
        state.data.defaultDriver = driverData.length === 0 ? "Выберете водителя" : driverData[0].driver_fullname;
        state.data.order_driver_phone = driverData.length === 0 ? "---" : driverData[0].driver_phone;
        state.data.order_driver_brand_car = driverData.length === 0 ? "---" : driverData[0].vehicle_brand;
        state.data.order_driver_color_car = driverData.length === 0 ? "---" : driverData[0].vehicle_color;
        state.data.order_driver_num_car = driverData.length === 0 ? "---" : driverData[0].vehicle_id_number;
    }
    function normalizeTime(time) {
        if (time > 0) {
            var date = new Date(time * 1000);
            var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
            var min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
            var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
            var month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
            var year = date.getFullYear();
            var formated_date = day + "-" + month + "-" + year + " " + hours + ":" + min;
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
        state.data.headerBtnClose = '';
        state.data.headerBtnTakeToWork = action.data[0].assignee === null ? '' : 'hidden';
        state.data.headerBtnAssignCar = '';
        state.data.headerBtnDoneTrip = 'hidden';
        state.data.headerBtnSave = '';
        state.data.headerBtnSendToBank = 'hidden';

        state.data.onoffbtnDoneTrip = false;
        state.data.opacitybtnDoneTrip = 1;

        state.data.edit_commentary_for_driver = true;
        state.data.edit_id_to_stops = true;
        state.data.edit_time_start = true;
        state.data.edit_time_end = true;
        state.data.edit_driver_drop = false;
        state.data.edit_driver_data = true;
        state.data.edit_order_status = false;
        state.data.edit_data_to_sendbank = true;
        state.data.edit_solutions = false;
        state.data.edit_closure_code = true;
        state.data.edit_description = true;
    }
    function assignedCar() {
        state.data.headerBtnClose = '';
        state.data.headerBtnTakeToWork = 'hidden';
        state.data.headerBtnAssignCar = 'hidden';
        state.data.headerBtnDoneTrip = '';
        state.data.headerBtnSave = state.data.order_save_status_val_def === '' ? 'hidden' : '';
            state.data.headerBtnSendToBank = 'hidden';

        state.data.onoffbtnDoneTrip = false;
        state.data.opacitybtnDoneTrip = 1;

        state.data.edit_commentary_for_driver = true;
        state.data.edit_id_to_stops = true;
        state.data.edit_time_start = true;
        state.data.edit_time_end = false;
        state.data.edit_driver_drop = false;
        state.data.edit_driver_data = true;
        state.data.edit_order_status = false;
        state.data.edit_data_to_sendbank = false;
        state.data.edit_solutions = false;
        state.data.edit_closure_code = true;
        state.data.edit_description = true;
    }
    function doneTrip() {
        state.data.headerBtnClose = '';
        state.data.headerBtnTakeToWork = 'hidden';
        state.data.headerBtnAssignCar = 'hidden';
        state.data.headerBtnDoneTrip = state.data.order_save_status_val_def === '' ? 'hidden' : '';
        state.data.headerBtnSave = state.data.order_save_status_val_def === '' ? 'hidden' : '';
        state.data.headerBtnSendToBank = 'hidden';

        state.data.onoffbtnDoneTrip = false;
        state.data.opacitybtnDoneTrip = 1;

        state.data.edit_commentary_for_driver = true;
        state.data.edit_id_to_stops = true;
        state.data.edit_time_start = true;
        state.data.edit_time_end = true;
        state.data.edit_driver_drop = true;
        state.data.edit_driver_data = true;
        state.data.edit_order_status = state.data.order_save_status_val_def === '' ? true : false;
        state.data.edit_data_to_sendbank = state.data.order_save_status_val_def === '' ? true : false;
        state.data.edit_solutions = state.data.order_save_status_val_def === '' ? true : false;
        state.data.edit_closure_code = true;
        state.data.edit_description = true;
    }
    function cancelClient() {
        state.data.headerBtnClose = '';
        state.data.headerBtnTakeToWork = 'hidden';
        state.data.headerBtnAssignCar = 'hidden';
        state.data.headerBtnDoneTrip = state.data.order_save_status_val_def === '' ? 'hidden' : '';
        state.data.headerBtnSave = state.data.order_save_status_val_def === '' ? 'hidden' : '';
        state.data.headerBtnSendToBank = 'hidden';

        state.data.onoffbtnDoneTrip = true;
        state.data.opacitybtnDoneTrip = 0.2;

        state.data.edit_commentary_for_driver = true;
        state.data.edit_id_to_stops = true;
        state.data.edit_time_start = true;
        state.data.edit_time_end = true;
        state.data.edit_driver_drop = true;
        state.data.edit_driver_data = true;
        state.data.edit_order_status = state.data.order_save_status_val_def === '' ? true : false;
        state.data.edit_data_to_sendbank = true;
        state.data.edit_solutions = state.data.order_save_status_val_def === '' ? true : false;
        state.data.edit_closure_code = true;
        state.data.edit_description = true;
    }
    function refusing() {
        state.data.headerBtnClose = '';
        state.data.headerBtnTakeToWork = 'hidden';
        state.data.headerBtnAssignCar = 'hidden';
        state.data.headerBtnDoneTrip = state.data.order_save_status_val_def === '' ? 'hidden' : '';
        state.data.headerBtnSave = state.data.order_save_status_val_def === '' ? 'hidden' : '';
        state.data.headerBtnSendToBank = 'hidden';

        state.data.onoffbtnDoneTrip = true;
        state.data.opacitybtnDoneTrip = 0.2;

        state.data.edit_commentary_for_driver = true;
        state.data.edit_id_to_stops = true;
        state.data.edit_time_start = true;
        state.data.edit_time_end = true;
        state.data.edit_driver_drop = true;
        state.data.edit_driver_data = true;
        state.data.edit_order_status = state.data.order_save_status_val_def === '' ? true : false;
        state.data.edit_data_to_sendbank = true;
        state.data.edit_solutions = true;
        state.data.edit_closure_code = true;
        state.data.edit_description = true;
    }
    function dataSend() {
        state.data.headerBtnClose = '';
        state.data.headerBtnTakeToWork = 'hidden';
        state.data.headerBtnAssignCar = 'hidden';
        state.data.headerBtnDoneTrip = 'hidden';
        state.data.headerBtnSave = 'hidden';
        state.data.headerBtnSendToBank = 'hidden';

        state.data.onoffbtnDoneTrip = false;
        state.data.opacitybtnDoneTrip = 1;

        state.data.edit_commentary_for_driver = true;
        state.data.edit_id_to_stops = true;
        state.data.edit_time_start = true;
        state.data.edit_time_end = true;
        state.data.edit_driver_drop = true;
        state.data.edit_driver_data = true;
        state.data.edit_order_status = true;
        state.data.edit_data_to_sendbank = true;
        state.data.edit_solutions = true;
        state.data.edit_closure_code = true;
        state.data.edit_description = true;
    }
    if (action.type === 'FILTERS_GRID') {
        if (state.data.filtersGrid === '30px') {
            state.data.filtersGrid = '60px';
        }
        else {
            state.data.filtersGrid = '30px';
            state.data.defValuefiltersGrid = ''
        }
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
        var driverData = driverData(action.data[1], action.data[0].driver_id || false, action.data[4]);
        // Кнопки управления
        // Информация о заказе
        state.data.order_view_id = action.data[6];
        state.data.db_id = action.data[0].id;
        state.data.order_ID = action.data[0].sb_id;
        state.data.order_date_deadline = action.data[0].date_deadline;
        state.data.order_BankContact = action.data[0].bank_contact;
        state.data.order_bank_contact_phone = action.data[0].bank_contact_phone;
        state.data.oreder_travel_from = action.data[0].travel_from;
        state.data.oreder_travel_to = action.data[0].travel_to;
        state.data.order_commentary_for_driver = action.data[0].commentary_for_driver;
        state.data.order_ride_stops = action.data[0].ride_stops;
        state.data.order_ride_start_time = normalizeTime(action.data[0].ride_start_time);
        state.data.order_ride_start_time_toDB = action.data[0].ride_start_time;
        state.data.order_ride_end_time = normalizeTime(action.data[0].ride_end_time);
        // Водитель
        state.data.car_drivers = action.data[1].map((num, index, arr) => { return num.driver_fullname });
        state.data.car_drivers.unshift('---');
        setDriverData(driverData);
        // Состояние заказа
        state.data.order_statuses = action.data[2].map((num, index, arr) => { return num.status === 'Данные переданы' ? '' : num.status });
        state.data.order_status_val_def = action.data[0].status;
        state.data.order_wg = action.data[3].map((num, index, arr) => { return num.wg_name });
        state.data.order_wg_val_def = action.data[0].wg_name;
        state.data.order_executers = []
        state.data.order_def_executor = action.data[0].displayname == null ? 'Выберете исполнителя' : action.data[0].displayname;
        // Данные о поездке для отправки в банк
        state.data.order_ride_duration = action.data[0].ride_duration;
        state.data.order_ride_distance = action.data[0].ride_distance;
        state.data.order_ride_idle_time = action.data[0].ride_idle_time;
        state.data.order_ride_price = action.data[0].ride_price === 'null' ? '' : action.data[0].ride_price;
        // Подробная информация о заказе
        state.data.order_solution = action.data[0].solution === 'null' ? '' : action.data[0].solution;

        state.data.order_descr = action.data[0].full_descr;
        state.data.order_closure_statuses = action.data[5].map((num, index, arr) => { return num.closure_code_name });
        state.data.order_def_closure_statuses = setDefClosureCode(action.data[5], action.data[0].closure_code) === "" ? 'Выберете код закрытия' : setDefClosureCode(action.data[5], action.data[0].closure_code);

        state.data.up = false;
        state.data.down = false;
        return { data: state.data }
    }
    if (action.type === 'listExecutors') {
        state.data.order_executers = action.data.map((num, index, arr) => { return num.displayname });
        return { data: state.data }
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
        return { data: state.data }
    }
    if (action.type === 'setStatus') {
        state.data.order_save_status_val_def = state.data.order_status_val_def;
        state.data.order_status_val_def = action.data;

        switch (action.data) {
            case state.data.order_statuses[0]:
                assignedToWG();
                break;
            case state.data.order_statuses[1]:
                state.data.order_def_closure_statuses = state.data.order_closure_statuses[0];
                state.data.order_solution = '';
                fassignCar();
                assignedCar();
                break;
            case state.data.order_statuses[2]:
                state.data.order_def_closure_statuses = state.data.order_closure_statuses[0];
                doneTrip();
                break;
            case state.data.order_statuses[3]:
                state.data.order_def_closure_statuses = state.data.order_closure_statuses[3];
                state.data.order_solution = 'Заявка отозвана по звонку'
                cancelClient();
                break;
            case state.data.order_statuses[4]:
                state.data.order_def_closure_statuses = state.data.order_closure_statuses[2];
                state.data.order_solution = 'Невозможно решить!\nОтказ в обслуживании.'
                refusing();
                break;
            case state.data.order_statuses[5]:
                dataSend();
                break;
        }
        state.data.order_save_status_val_def = '';
        return { data: state.data }
    }
    if (action.type === 'setWG') {
        state.data.order_wg_val_def = action.data;
        return { data: state.data }
    }
    if (action.type === 'setExecutor') {
        state.data.order_def_executor = action.data;
        return { data: state.data }
    }
    function fassignCar(user) {
        // Пробрасываем исполнителя
        // action.data.displayname - там наш user
        state.data.order_def_executor = state.data.order_def_executor === 'Выберете исполнителя' ? user.displayname : state.data.order_def_executor
        // Пробрасываем код закрытия
        state.data.order_def_closure_statuses = state.data.order_closure_statuses[0];
        // меняем статус
        state.data.order_status_val_def = state.data.order_statuses[1];
        // Проставляем дату
        state.data.order_ride_start_time_toDB = Math.floor(Date.now() / 1000);
        // state.order_ride_start_time = normalizeTime(state.order_ride_start_time_toDB);
        // Пробрасываем в поле решение данные водителя        
        state.data.order_solution = (state.data.order_solution === '' || state.data.order_solution === null ? '' : state.data.order_solution + '\n') + 'Водитель:' + state.data.defaultDriver + '\n' + 'тел.' + state.data.order_driver_phone + ' ' + ' ' + state.data.order_driver_brand_car + ' ' + state.data.order_driver_color_car + ' ' + state.data.order_driver_num_car;
    }
    if (action.type === 'assignCar') {
        fassignCar(action.data);
        return { data: state.data }
    }
    if (action.type === 'doneTrip') {
        state.data.order_ride_end_time_toDB = Math.floor(Date.now() / 1000);
        state.data.order_ride_end_time = normalizeTime(state.data.order_ride_end_time_toDB);
        // state.order_status_val_def = action.data;
        state.data.order_status_val_def = state.data.order_statuses[2];
        return { data: state.data }
    }
    if (action.type === 'closureCode') {
        state.data.order_def_closure_statuses = action.data;
        return { data: state.data }
    }
    if (action.type === 'setTimeTrip') {
        state.data.order_ride_duration = action.data;
        return { data: state.data }
    }
    if (action.type === 'setDistance') {
        state.data.order_ride_distance = action.data;
        return { data: state.data }
    }
    if (action.type === 'setIdletime') {
        state.data.order_ride_idle_time = action.data;
        return { data: state.data }
    }
    if (action.type === 'setPrice') {
        state.data.order_ride_price = action.data;
        return { data: state.data }
    }
    if (action.type === 'setSolution') {
        state.data.order_solution = action.data;
        return { data: state.data }
    }
    if (action.type === 'UP') {
        state.data.up = !state.data.up;
        return { data: state.data }
    }
    if (action.type === 'DOWN') {
        state.data.down = !state.data.down;
        return { data: state.data }
    }
    return state;
}