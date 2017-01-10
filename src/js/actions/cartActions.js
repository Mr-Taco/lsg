export const CART_ADD_ITEM = 'cartAddItem';
export const CART_PUSH_ITEMS = 'cartPushItems';
export const CART_REMOVE_ITEM = 'cartRemoveItem';
export const CART_CLEAR_ITEMS = 'cartClearItems';

export function cartAddItem(item) {
	return (dispatch, getState) => {
		const state = getState();
		let items = state.cart.items;
		items.push(item);
		console.log('item: ', items);
		return dispatch(cartPushItems(items));
	};
}

export function cartPushItems(items) {
	return {type: CART_PUSH_ITEMS, items};
}
