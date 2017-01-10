import $ from 'jquery';
import { browserHistory } from 'react-router'

let jwtDecode = require('jwt-decode');

// constant for localStorage name(s)
export const USER_STORAGE_KEY = 'userKey';

// action creators
export const USER_COMPLETE_LOGIN = 'userCompleteLogin';
export const USER_CREATE = 'userCreate';
export const USER_GET_PROFILE = 'userGetProfile';
export const USER_LOGIN = 'userLogin';
export const USER_LOGOUT = 'userLogout';
export const USER_SIGNUP = 'userSignup';
export const USER_SET_ID = 'userSetId';
export const USER_SET_KEY = 'userSetKey';
export const USER_STORED_USER_LOGIN = 'userStoredUserLogin';


export function userSignup(user) {
	return dispatch => {
		let data = JSON.stringify({user: user});

		$.ajax({
			url: 'api/users',
			method: 'POST',
			data: data,
			contentType: 'application/json'
		}).done((data) => {
			let creds = {email: data.email, password: user.password};
			dispatch(userLogin(creds));
		}).fail( (jqXHR, textStatus, errorThrown) => {
			console.log('fail: ', errorThrown);
		});
	};
}

export function userLogin(creds) {
	return dispatch => {
		let data = JSON.stringify({auth: creds});

		$.ajax({
			url: 'api/user_token',
			method: 'POST',
			data: data,
			contentType: 'application/json'
		}).done((data) => {
			let key = data.jwt, decode = jwtDecode(key), id = decode.sub;
			dispatch(userSetKey(key));
			localStorage.setItem(USER_STORAGE_KEY, key);
			dispatch(userGetProfile(id, key, true));
		}).fail( (jqXHR, textStatus, errorThrown) => {
			console.log('fail: ', errorThrown);
		});
	};
}

export function userStoredUserLogin(key) {
	return dispatch => {
		let id = jwtDecode(key).sub;
		dispatch(userGetProfile(id, key, false));
	};
}

export function userGetProfile(id, key, redirect) {
	return dispatch => {
		$.ajax({
			url: `/api/users/${id}`,
			method: 'GET',
			headers: { 'Authorization': key}
		}).done((data) => {
			dispatch(userCompleteLogin(data));
			if (redirect) browserHistory.push('/');
		}).fail( (jqXHR, textStatus, errorThrown) => {
			console.log('fail: ', errorThrown);
		});
	};
}

export function userSetId(id) {
	return {type: USER_SET_ID, id};
}

export function userSetKey(key) {
	return {type: USER_SET_KEY, key};
}

export function userCompleteLogin(user) {
	return {type: USER_COMPLETE_LOGIN, user};
}

export function userLogout() {
	localStorage.removeItem(USER_STORAGE_KEY);
	return {type: USER_LOGOUT};
}
