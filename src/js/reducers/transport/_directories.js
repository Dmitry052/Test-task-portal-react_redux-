const initialState = {
    show: '',
    showCarsDir: 'none',
    showDriversDir: 'none',
    showAddDriver: false,
    showAddCar: false,

    valBtnAddEdit: '',
    driver_edit_rules: false,
    car_edit_rules: false,

    driver_driver_name: '',
    driver_driver_phone: '',
    driver_status: '',
    driver_vehicle_id_number: '',
    driver_company: '',

    car_vehicle_brand: '',
    car_vehicle_id_number: '',
    car_vehicle_color: '',
    car_company: ''
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
    if (action.type === "SHOW_DRIVERS") {
        state.show = 'none';
        state.showCarsDir = 'none';
        state.showDriversDir = '';
        return state;
    }
    if (action.type === "SHOW_ADD_DRIVERS") {
        state.showAddDriver = !state.showAddDriver;
        state.valBtnAddEdit = "Добавить";

        state.driver_driver_name = '';
        state.driver_driver_phone = '';
        state.driver_status = '';
        state.driver_vehicle_id_number = '';
        state.driver_company = 'Выберете компанию';
        // console.log(state.driver_company);
        return state;
    }
    if (action.type === "SHOW_EDIT_DRIVERS") {
        state.showAddDriver = !state.showAddDriver;
        state.valBtnAddEdit = "Изменить";

        state.driver_driver_name = action.data[0].driver_fullname;
        state.driver_driver_phone = action.data[0].driver_phone;
        state.driver_status = action.data[0].status;
        state.driver_vehicle_id_number = action.data[0].vehicle_id_number;
        state.driver_company = action.data[0].companyname;

        return state;
    }
    if (action.type === "SHOW_ADD_CARS") {
        state.showAddCar = !state.showAddCar;
        state.valBtnAddEdit = "Добавить";

        state.car_vehicle_brand = '';
        state.car_vehicle_id_number = '';
        state.car_vehicle_color = '';
        // state.car_compan = action.data.

        return state;
    }
    if (action.type === "SHOW_EDIT_CARS") {
        state.showAddCar = !state.showAddCar;
        state.valBtnAddEdit = "Изменить";

        state.car_vehicle_brand = action.data.vehicle_brand
        state.car_vehicle_id_number = action.data.vehicle_id_number
        state.car_vehicle_color = action.data.vehicle_color
        // state.car_compan = action.data.
       
        return state;
    }
    return state;
}