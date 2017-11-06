const initialState = {
    show: '',
    showCarsDir: 'none',
    showDriversDir: 'none',
    showAddDriver: false,
    showAddCar: false,

    valBtnAddEdit: '',
    driver_edit_rules: false,
    car_edit_rules: false,

    show_drivers_all: false,
    driver_header: '',
    driver_id: '-',
    driver_driver_name: '',
    driver_driver_phone: '',
    driver_status: '',
    driver_vehicle_id_number: '',
    driver_company: '',

    driver_selected: new Map(),
    car_selected: new Map(),

    driver_alert: 'none',
    driver_alert_text: '',
    car_alert: 'none',
    car_alert_text: '',

    show_cars_all: false,
    cars_working: [],
    car_header: '',
    car_id: '',
    car_vehicle_brand: '',
    car_vehicle_id_number: '',
    car_vehicle_color: '',
    car_status: '',
    car_company: '',



}

export default function directoties(state = initialState, action) {
    if (action.type === "SHOW_DIRECT") {
        state.show = '';
        state.showCarsDir = 'none';
        state.showDriversDir = 'none';
        return state;
    }
    if (action.type === "SHOW_CARS") {
        state.show = 'none';
        state.showCarsDir = '';
        state.showDriversDir = 'none';
        return state;
    }
    if (action.type === "SHOW_ALL_DRIVERS") {
        state.show_drivers_all = !state.show_drivers_all;
        return state;
    }
    if (action.type === "SHOW_ALL_CARS") {
        state.show_cars_all = !state.show_cars_all;
        return state;
    }
    if (action.type === "SHOW_ADD_CARS") {
        state.showAddCar = !state.showAddCar;
        state.valBtnAddEdit = "Добавить";
        state.car_header = "Добавление нового автомобиля";

        state.car_id = '-';
        state.car_vehicle_brand = '';
        state.car_vehicle_id_number = '';
        state.car_vehicle_color = '';
        state.car_company = '';
        state.car_status = '';

        return state;
    }
    if (action.type === "SHOW_EDIT_CARS") {
        state.showAddCar = !state.showAddCar;
        state.valBtnAddEdit = "Сохранить";
        state.car_header = "Изменение данных по автомобилю"


        state.car_id = action.data[0].id || null;
        state.car_vehicle_brand = action.data[0].vehicle_brand;
        state.car_vehicle_id_number = action.data[0].vehicle_id_number;
        state.car_vehicle_color = action.data[0].vehicle_color;
        state.car_status = action.data[0].status;
        state.car_company = action.data[0].companyname;

        return state;
    }
    if (action.type === "SET_BRAND_NAME") {
        state.car_vehicle_brand = action.data;
        return state;
    }
    if (action.type === "SET_VEHICLE_NUMBER") {
        state.car_vehicle_id_number = action.data;
        return state;
    }
    if (action.type === "SET_COLOR_CAR") {
        state.car_vehicle_color = action.data;
        return state;
    }
    if (action.type === "SET_STATUS_CAR") {
        state.car_status = action.data;
        return state;
    }
    if (action.type === "SET_COMPANY_CAR") {
        state.car_company = action.data;
        return state;
    }
    // ------------------------------------
    if (action.type === "SHOW_DRIVERS") {
        state.show = 'none';
        state.showCarsDir = 'none';
        state.showDriversDir = '';
        return state;
    }
    if (action.type === "SHOW_ADD_DRIVERS") {
        state.showAddDriver = !state.showAddDriver;
        state.valBtnAddEdit = "Добавить";
        state.driver_header = "Добавление нового водителя";

        state.driver_driver_name = '';
        state.driver_driver_phone = '';
        state.driver_status = '';
        state.driver_vehicle_id_number = '';
        state.driver_company = 'Выберете компанию';

        return state;
    }
    if (action.type === "SHOW_EDIT_DRIVERS") {
        state.showAddDriver = !state.showAddDriver;
        state.valBtnAddEdit = "Сохранить";
        state.driver_header = "Изменение данных по водителю";

        state.driver_id = action.data[0].id || null;
        state.driver_driver_name = action.data[0].driver_fullname;
        state.driver_driver_phone = action.data[0].driver_phone;
        state.driver_status = action.data[0].status;
        state.driver_vehicle_id_number = action.data[0].vehicle_id_number;
        state.driver_company = action.data[0].companyname;

        return state;
    }
    if (action.type === "SET_DRIVER_NAME_DIRECT") {
        state.driver_driver_name = action.data;
        return state;
    }
    if (action.type === "SET_DRIVER_PHONE_DIRECT") {
        state.driver_driver_phone = action.data;
        return state;
    }
    if (action.type === "SET_VEHICLE_NUMBER_DRIVER_DIRECT") {
        state.driver_vehicle_id_number = action.data;
        return state;
    }
    if (action.type === "SET_STATUS_DRIVER_DIRECT") {
        state.driver_status = action.data;
        return state;
    }
    if (action.type === "SET_COMPANY_DRIVER_DIRECT") {
        state.driver_company = action.data;
        return state;
    }
    // -------------------------------------
    if (action.type === "SELECT_DRIVER") {
        state.driver_alert = 'none';
        state.driver_selected.set(action.data.id, action.data.status);
        return state;
    }
    if (action.type === "DELETE_SELECT_DRIVER") {
        state.driver_selected.clear();
        return state;
    }
    if (action.type === "SELECT_CAR") {
        state.car_selected.set(action.data.id, action.data.status);
        state.car_alert = 'none';
        return state;
    }
    if (action.type === "DELETE_SELECT_CAR") {
        state.car_selected.clear();
        return state;
    }
    // -------------------------------------
    if (action.type === "DRIVER_ALERT") {
        state.driver_alert = '';
        state.driver_alert_text = action.data;
        return state;
    }
    if (action.type === "CAR_ALERT") {
        state.car_alert = '';
        state.car_alert_text = action.data;
        return state;
    }
    return state;
}


