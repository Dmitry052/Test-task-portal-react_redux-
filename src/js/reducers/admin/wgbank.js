const initialState = {
    wgbank: [],
    editModal: false,
    wgbank_name: {
        type: '',
        id: '',
        name: ''
    },
    check_wgbank: new Map(),
}

export default function wg(state = initialState, action) {
    if (action.type === 'WGBANK_ADMIN') {
        state.wgbank = action.data;
        return { 
            wgbank: action.data,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        };
    }
    if (action.type === 'SHOW_WGBANK_ADMIN') {
        state.editModal = !state.editModal;
        return {
            wgbank: state.wgbank,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        }
    }
    if (action.type === "CREATE_WGBANK_ADMIN") {
        state.editModal = !state.editModal;
        state.wgbank_name.type = 'INSERT';
        state.wgbank_name.name = '';
        return {
            wgbank: state.wgbank,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        };
    }
    if (action.type === "EDIT_NAME_WGBANK_ADMIN") {
        state.editModal = !state.editModal;
        state.wgbank_name.type = 'UPDATE';
        state.wgbank_name.id = action.data.id;
        state.wgbank_name.name = action.data.wg_name;
        return {
            wgbank: state.wgbank,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        };
    }
    if (action.type === "SET_NAME_WGBANK_ADMIN") {
        state.wgbank_name.name = action.data;
        return {
            wgbank: state.wgbank,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        };
    }
    if (action.type === "CHECK_WGBANK_ADMIN") {
        state.check_wgbank.set(action.data.id, action.data.status);
        return {
            wgbank: state.wgbank,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        }
    }
    if (action.type === "UNCHECK_WGBANK_ADMIN") {
        state.check_wgbank.clear();
        return {
            wgbank: state.wgbank,
            editModal: state.editModal,
            wgbank_name: state.wgbank_name,
            check_wgbank: state.check_wgbank,
        }
    }
    return state;
}