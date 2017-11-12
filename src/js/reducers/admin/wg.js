const initialState = {
    wg: [],
    editModal: false,
    wg_name: {
        type: '',
        id: '',
        name: ''
    },
    check_wg: new Map(),
}
export default function wg(state = initialState, action) {
    if (action.type === 'WG_ADMIN') {
        state.wg = action.data;
        return { 
            wg: action.data,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
         };
    }
    if (action.type === 'SHOW_WGPORTAL_ADMIN') {
        state.editModal = !state.editModal;
        return {
            wg: state.wg,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
        }
    }
    if (action.type === "CREATE_WGPORTAL_ADMIN") {
        state.editModal = !state.editModal;
        state.wg_name.type = 'INSERT';
        state.wg_name.name = '';
        return {
            wg: state.wg,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
        };
    }
    if (action.type === "EDIT_NAME_WGPORTAL_ADMIN") {
        state.editModal = !state.editModal;
        state.wg_name.type = 'UPDATE';
        state.wg_name.id = action.data.id;
        state.wg_name.name = action.data.wg_name;
        return {
            wg: state.wg,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
        };
    }
    if (action.type === "SET_NAME_WGPORTAL_ADMIN") {
        state.wg_name.name = action.data;
        return {
            wg: state.wg,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
        };
    }
    if (action.type === "CHECK_WGPORTAL_ADMIN") {
        state.check_wg.set(action.data.id, action.data.status);
        return {
            wg: state.wg,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
        }
    }
    if (action.type === "UNCHECK_WGPORTAL_ADMIN") {
        state.check_wg.clear();
        return {
            wg: state.wg,
            editModal: state.editModal,
            wg_name: state.wg_name,
            check_wg: state.check_wg
        }
    }
    return state;
}