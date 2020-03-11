import {
    UPDATE_JOB_DETAIL,
    UPDATE_JOB_CLIENT,
    UPDATE_JOB_PROPERTY,
    UPDATE_JOB_TIMESHEET,
    RESET_JOB_DETAIL,
} from "../config/redux-action-types/job";

const initialState = {
    id: null,
    jobDetail: {
        id: '',
        date: '',
        job_refer: '',
        client: {
            id: '',
            company: '',
            title: '',
            first_name: '',
            surname: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            city: '',
            county: '',
            postcode: '',
            country: ''
        },
        property: {
            id: '',
            title: '',
            first_name: '',
            surname: '',
            email: '',
            phone: '',
            address1: '',
            address2: '',
            city: '',
            county: '',
            postcode: '',
            country: ''
        },
        timesheets: [],
        description: '',
        material_use: '',
    },
};

const jobReducer = function(state=initialState, action) {
    switch(action.type) {
        case UPDATE_JOB_DETAIL:
            return {
                ...state,
                jobDetail: action.payload,
                id: action.id
            };
        case UPDATE_JOB_CLIENT:
            let jobDetailClient = state.jobDetail;
            jobDetailClient.client = action.payload;
            return {
                ...state,
                jobDetail: jobDetailClient
            };
        case UPDATE_JOB_PROPERTY:
            let jobDetailProperty = state.jobDetail;
            jobDetailProperty.property = action.payload;
            return {
                ...state,
                jobDetail: jobDetailProperty
            };
        case UPDATE_JOB_TIMESHEET:
            let jobDetailTimesheets = state.jobDetail;
            jobDetailTimesheets.timesheets = action.payload;
            return {
                ...state,
                jobDetail: jobDetailTimesheets
            };
        case RESET_JOB_DETAIL:
            return initialState;
        default:
            return state;
    }
};

export default jobReducer;
