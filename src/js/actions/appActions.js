export const APP_SET_ABOUT_MOUNTED = 'appSetAboutMounted';
export const APP_SET_ABOUT_UNMOUNTED = 'appSetAboutUnmounted';


export function appSetAboutMounted() {
	return {type: APP_SET_ABOUT_MOUNTED};
}

export function appSetAboutUnmounted() {
	return {type: APP_SET_ABOUT_UNMOUNTED};
}