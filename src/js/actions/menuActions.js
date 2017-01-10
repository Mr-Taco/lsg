import $ from 'jquery';

import {
	cartAddItem
} from './cartActions';



export const MENU_ADD_ACTIVE_ITEM = 'menuAddActiveItem';
export const MENU_SET_ACTIVE_ITEM = 'menuSetActiveItem';
export const MENU_RESET_ACTIVE_ITEM = 'menuResetActiveItem';

export const MENU_GET_ITEMS = 'menuGetItems';
export const MENU_SET_ITEMS = 'menuSetItems';
export const MENU_RESET_ITEMS = 'menuResetItems';

export const MENU_ADD_ORDER_STEP = 'menuAddOrderStep';
export const MENU_REMOVE_ORDER_STEP = 'menuRemoveOrderStep';
export const MENU_CLEAR_ORDER_STEPS = 'menuClearOrderSteps';
export const MENU_SET_ORDER_STEPS = 'menuSetOrderSteps';

export const MENU_ADD_ITEM_TO_STEP = 'menuAddItemToStep';
export const MENU_REMOVE_ITEM_TO_STEP = 'menuRemoveItemToStep';
export const MENU_CLEAR_STEP = 'menuClearStep';
export const MENU_SET_STEP = 'menuSetStep';



export function menuAddActiveItem() {
	return (dispatch, getState) => {
		const state = getState();
		let actItem = state.menu.activeItem;
		dispatch(cartAddItem(actItem));
		dispatch(menuResetActiveItem());
	};
}

export function menuSetActiveItem(item) {
	return {type: MENU_SET_ACTIVE_ITEM, item};
}

export function menuResetActiveItem() {
	return {type: MENU_RESET_ACTIVE_ITEM};
}

export function menuGetItems() {
	console.log('menuGetItems');
	return dispatch => {
		let end;
		$.get('/api/items', (data) => {
            dispatch(menuSetItems(data));
            end = data;
        });

        return end;
	};
}

export function menuSetItems(items) {
	return {type: MENU_SET_ITEMS, items};
}

export function menuAddOrderStep(step) {
	return (dispatch, getState) => {
		const state = getState();
		let orderSteps = state.menu.orderItem.steps;
		orderSteps.push(step);
		dispatch(menuSetOrderSteps(orderSteps));
	};
}

export function menuRemoveOrderStep(step) {
	return {type: MENU_REMOVE_ORDER_STEP, step};
}

export function menuClearOrderSteps() {
	return {type: MENU_CLEAR_ORDER_STEPS};
}

export function menuSetOrderSteps(steps) {
	return {type: MENU_SET_ORDER_STEPS, steps};
}

export function menuAddItemToStep(item) {
	console.log('menuAddItemToStep');
	return (dispatch, getState) => {
		const state = getState();
		let step = state.menu.step;
		step.push(item);
		dispatch(menuSetStep(step));
	};
}

export function menuRemoveItemToStep(item) {
	console.log('menuRemoveItemToStep');
	return (dispatch, getState) => {
		const state = getState();
		let step = state.menu.step;
		let boner = step.filter((i) => {return i.id !== item.id});
		dispatch(menuSetStep(boner));
	};
}

export function menuClearStep() {
	return {type: MENU_CLEAR_STEP};
}

export function menuSetStep(step) {
	return {type: MENU_SET_STEP, step};
}

