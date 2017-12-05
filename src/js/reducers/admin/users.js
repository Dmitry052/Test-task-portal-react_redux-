const initialState = {
    users: [],
    editModal: false,
    check_users: new Map(),
    user: {
        type: '',
        id: '',
        login: '',
        pass: '',
        displayname: '',
        email: '',
        company_id: '',
        companyname: '',
        usergroups: [],
        block: true,
    }
}

export default function users(state = initialState, action) {
    if (action.type === "USERS_ADMIN") {
        state.users = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: false,
            check_users: state.check_users
        };
    }
    if (action.type === "SHOW_USER_ADMIN") {
        state.editModal = !state.editModal;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    // ---------------------------------------
    if (action.type === "SET_BLOCK_USER_ADMIN") {
        state.user.block = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    if (action.type === "SET_LOGIN_USER_ADMIN") {
        state.user.login = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    if (action.type === "SET_PASS_USER_ADMIN") {
        state.user.pass = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    if (action.type === "SET_DN_USER_ADMIN") {
        state.user.displayname = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    if (action.type === "SET_EMAIL_USER_ADMIN") {
        state.user.email = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    if (action.type === "SET_COMPANY_USER_ADMIN") {
        state.user.company_id = action.data.id;
        state.user.companyname = action.data.companyname;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        }
    }
    if (action.type === "SET_USER_GROUPS_USER_ADMIN") {
        state.user.usergroups = action.data;
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        }
    }
    // ---------------------------------------
    if (action.type === "CREATE_USER_ADMIN") {
        state.editModal = !state.editModal;
        state.user = {
            type: 'INSERT',
            id: '',
            login: '',
            pass: '',
            displayname: '',
            email: '',
            company_id: '',
            companyname: '',
            usergroups: [],
            block: 'new'
        }
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        }
    }
    if (action.type === "EDIT_USER_ADMIN") {
        state.editModal = !state.editModal;
        state.user = {
            type: 'UPDATE',
            id: action.data.id,
            login: action.data.username,
            pass: '',
            displayname: action.data.displayname,
            email: action.data.email,
            company_id: action.data.company_id,
            companyname: action.data.companyname,
            usergroups: [],
            block: action.data.status === 1 ? false : true
        }
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        };
    }
    // ---------------------------------------
    if (action.type === "CHECK_USER_ADMIN") {
        state.check_users.set(action.data.id, action.data.status);
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        }
    }
    if (action.type === "UNCHECK_USER_ADMIN") {
        state.check_users.clear();
        return {
            users: state.users,
            user: state.user,
            editModal: state.editModal,
            check_users: state.check_users
        }
    }
    return state;
}