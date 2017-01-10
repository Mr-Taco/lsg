import $ from 'jquery';

export const SUBSCRIBE_SET_ACTIVE = 'subscribeSetActive';
export const SUBSCRIBE_SET_INACTIVE = 'subscribeSetInactive';

export const SUBSCRIBE_SET_VALID = 'subscribeSetValid';
export const SUBSCRIBE_SET_INVALID = 'subscribeSetInvalid';

export const SUBSCRIBE_SET_SUBMITTED = 'subscribeSetSubmitted';


export function subscribeSetActive() {
	return {type: SUBSCRIBE_SET_ACTIVE};
}

export function subscribeSetInactive() {
	return {type: SUBSCRIBE_SET_INACTIVE};
}

export function subscribeSetValid() {
	return {type: SUBSCRIBE_SET_VALID};
}

export function subscribeSetInvalid() {
	return {type: SUBSCRIBE_SET_INVALID};
}

export function subscribeSetSubmitted() {
	return {type: SUBSCRIBE_SET_SUBMITTED};
}

export function subscribePostEmail(address, first, last) {
	console.log(address, first, last);
	return (dispatch, getState) => {
		// disable the submit box? 
		dispatch(subscribeSetInactive());

		var req = $.post(`subscribers?email_address=${address}&first_name=${first}&last_name=${last}`);

		req.done( (data, textStatus, jqXHR) => {
			dispatch(subscribeSetInactive());
			dispatch(subscribeSetSubmitted());
		});

		req.fail( (jqXHR, textStatus, errorThrown) => {
			console.log('fail: ', errorThrown);
			// What do we do if the request fails? 
			// dispatch(failureActions()); 

			// Does this re-enable submit box? 
			dispatch(subscribeSetActive);
		});
	}
}