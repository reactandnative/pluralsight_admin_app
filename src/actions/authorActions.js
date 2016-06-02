import AuthorApi from '../mockAuthorApi';
import * as types from './actionTypes';

export function loadAuthorsSuccess(authors) {
    return {type: types.LOAD_AUTHOR_SUCCESS, authors};
}

export function loadAuthors() {
    return dispatch => {
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}
