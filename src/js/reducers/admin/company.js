const initialState = {
    company: [],
    set_comp: {
        id: '',
        type: '',
        companyname: '',
        st: '',
        st_id: '',
        assignee_sber: '',
        contact: '',
        coordinator: '',
    },
    editModal: false,
    check_company: new Map(),
}

export default function company(state = initialState, action) {
    if (action.type === "COMPANY_ADMIN") {
        state.company = action.data;
        return {
            company: action.data,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "SHOW_COMPANY_ADMIN") {
        state.editModal = !state.editModal;
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "CREATE_COMPANY_ADMIN") {
        state.editModal = !state.editModal;
        state.set_comp.type = 'INSERT';
        state.set_comp.companyname = '';
        state.set_comp.st = '';
        state.set_comp.assignee_sber = '';
        state.set_comp.contact = '';
        state.set_comp.coordinator = '';
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "EDIT_COMPANY_ADMIN") {
        state.editModal = !state.editModal;
        state.set_comp.id = action.data.row.company_id;
        state.set_comp.type = 'UPDATE';
        state.set_comp.companyname = action.data.row.companyname;
        state.set_comp.st_id = action.data.row.st_id;
        state.set_comp.st = (() => {
            for (var key in action.data.st) {
                if (action.data.st[key].id === action.data.row.st_id) {
                    return action.data.st[key].service_name;
                }
            }
        })();
        state.set_comp.assignee_sber = action.data.row.assignee_sber;
        state.set_comp.contact = action.data.row.contact;
        state.set_comp.coordinator = action.data.row.coordinator;
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "CHECK_COMPANY_ADMIN") {
        state.check_company.set(action.data.id, action.data.status);
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        }
    }
    if (action.type === "UNCHECK_COMPANY_ADMIN") {
        state.check_company.clear();
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        }
    }
    // ----------------------------------------
    if (action.type === "SET_NAME_COMPANY_ADMIN") {
        state.set_comp.companyname = action.data;
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "SET_ST_COMPANY_ADMIN") {
        state.set_comp.st = action.data.event;
        state.set_comp.st_id = (() => {
            for (var key in action.data.st) {
                if (action.data.st[key].service_name === action.data.event) {
                    return action.data.st[key].id;
                }
            }
        })();
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "SET_ASSIGNEE_COMPANY_ADMIN") {
        state.set_comp.assignee_sber = action.data;
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "SET_CONTACT_COMPANY_ADMIN") {
        state.set_comp.contact = action.data;
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    if (action.type === "SET_COORDINATOR_COMPANY_ADMIN") {
        state.set_comp.coordinator = action.data;
        return {
            company: state.company,
            set_comp: state.set_comp,
            editModal: state.editModal,
            check_company: state.check_company
        };
    }
    return state;
}