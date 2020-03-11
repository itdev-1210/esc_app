import {
    UPDATE_JOB_DETAIL,
    UPDATE_JOB_CLIENT,
    UPDATE_JOB_PROPERTY,
    UPDATE_JOB_TIMESHEET,
    RESET_JOB_DETAIL
} from "../config/redux-action-types/job";

export function updateJobDetail(jobDetail) {
    return async dispatch => {
        dispatch({
            type: UPDATE_JOB_DETAIL,
            payload: jobDetail,
            id: jobDetail.id
        })
    }
}

export function updateJobClient(client) {
    return async dispatch => {
        dispatch({
            type: UPDATE_JOB_CLIENT,
            payload: client
        })
    }
}

export function updateJobProperty(property) {
    return async dispatch => {
        dispatch({
            type: UPDATE_JOB_PROPERTY,
            payload: property
        })
    }
}

export function updateJobTimesheet(timesheets) {
    return async dispatch => {
        dispatch({
            type: UPDATE_JOB_TIMESHEET,
            payload: timesheets
        })
    }
}

export function resetJobDetail() {
    return async dispatch => {
        dispatch({
            type: RESET_JOB_DETAIL,
        })
    }
}