const initialState = {
    userToWg: [],
    editModal: false,
    user_to_wg: {
        type: '',
        id: '',
        wgname: '',
        wg_id: '',
        username: '',
        user_id: '',
        companyname: '',
        company_id: '',
        service_name: '',
        list_wg: [],
        list_users: []
    },
    check_user_to_wg: new Map(),
}

export default function userToWg(state = initialState, action) {
    if (action.type === "CONF_USER_TOWG_ADMIN") {
        state.userToWg = action.data;
        return {
            userToWg: action.data,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SHOW_USER_TO_WG_ADMIN") {
        state.editModal = !state.editModal;
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "CREATE_USER_TO_WG_ADMIN") {
        state.editModal = !state.editModal;
        state.user_to_wg.type = 'INSERT';
        state.user_to_wg.id = '';
        state.user_to_wg.wgname = '';
        state.user_to_wg.wg_id = '';
        state.user_to_wg.username = '';
        state.user_to_wg.user_id = '';
        state.user_to_wg.companyname = '';
        state.user_to_wg.company_id = '';
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "EDIT_USER_TO_WG_ADMIN") {
        state.editModal = !state.editModal;
        state.user_to_wg.type = 'UPDATE';
        state.user_to_wg.id = action.data.usertowg_id;
        state.user_to_wg.wgname = action.data.wg_name;
        state.user_to_wg.wg_id = action.data.wg_id;
        state.user_to_wg.username = action.data.username;
        state.user_to_wg.user_id = action.data.username_id;
        state.user_to_wg.companyname = action.data.companyname;
        state.user_to_wg.company_id = action.data.company_id;
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SET_ST_NAME_USER_TO_WG_ADMIN") {
        state.user_to_wg.service_name = action.data[0].service_name;
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SET_LIST_WG_USER_TO_WG_ADMIN") {
        state.user_to_wg.list_wg = action.data;
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SET_LIST_USERS_USER_TO_WG_ADMIN") {
        state.user_to_wg.list_users = action.data;
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SET_COMPANY_USER_TO_WG_ADMIN") {
        state.user_to_wg.wgname = '';
        state.user_to_wg.username = '';
        state.user_to_wg.companyname = action.data.event;
        state.user_to_wg.company_id = (() => {
            for (let key in action.data.data) {
                if (action.data.data[key].companyname === action.data.event) {
                    return action.data.data[key].company_id;
                }
            }
        })();
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SET_WG_USER_TO_WG_ADMIN") {
        state.user_to_wg.wgname = action.data.event;
        state.user_to_wg.wg_id = (() => {
            for (let key in action.data.data) {
                if (action.data.data[key].wg_name === action.data.event) {
                    return action.data.data[key].id;
                }
            }
        })();
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "SET_USER_USER_TO_WG_ADMIN") {
        state.user_to_wg.username = action.data.event;
        state.user_to_wg.user_id = (() => {
            for (let key in action.data.data) {
                if (action.data.data[key].username === action.data.event) {
                    return action.data.data[key].id;
                }
            }
        })();
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        };
    }
    if (action.type === "CHECK_USER_TO_WG_ADMIN") {
        state.check_user_to_wg.set(action.data.id, action.data.status);
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        }
    }
    if (action.type === "UNCHECK_USER_TO_WG_ADMIN") {
        state.check_user_to_wg.clear();
        return {
            userToWg: state.userToWg,
            editModal: state.editModal,
            user_to_wg: state.user_to_wg,
            check_user_to_wg: state.check_user_to_wg,
        }
    }
    return state;
}