const initialState = {
    st: [],
    editModal: false,
    st_name: {
        type: '',
        id: '',
        name: ''
    },
    check_st: new Map(),
}

export default function service_type(state = initialState, action) {
    if (action.type === "ST_ADMIN") {
        state.st = action.data;
        return {
            st: action.data,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        };
    }
    if (action.type === "SHOW_ST_ADMIN") {
        state.editModal = !state.editModal;
        return {
            st: state.st,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        };
    }
    if (action.type === "CREATE_ST_ADMIN") {
        state.editModal = !state.editModal;
        state.st_name.type = 'INSERT';
        state.st_name.name = '';
        return {
            st: state.st,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        };
    }
    if (action.type === "EDIT_NAME_ST_ADMIN") {
        state.editModal = !state.editModal;
        state.st_name.type = 'UPDATE';
        state.st_name.id = action.data.id;
        state.st_name.name = action.data.service_name;
        return {
            st: state.st,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        };
    }
    if (action.type === "SET_NAME_ST_ADMIN") {
        state.st_name.name = action.data;
        return {
            st: state.st,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        };
    }
    if (action.type === "CHECK_ST_ADMIN") {
        state.check_st.set(action.data.id, action.data.status);
        return {
            st: state.st,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        }
    }
    if (action.type === "UNCHECK_ST_ADMIN") {
        state.check_st.clear();
        return {
            st: state.st,
            editModal: state.editModal,
            st_name: state.st_name,
            check_st: state.check_st
        }
    }
    return state;
}