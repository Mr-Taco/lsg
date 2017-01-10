import $ from 'jquery';

export const PAYMENT_FORM_SUBMIT_CARD = 'paymentFormSubmitCard';
export const PAYMENT_FORM_SET_CARD_SUBMITTED = 'paymentFormSetCardSubmitted';
export const PAYMENT_FORM_SET_STRIPE_ERRORS = 'paymentFormSetStripeErrors';
export const PAYMENT_FORM_SET_STRIPE_SUCCESS = 'paymentFormSetStripeSuccess'

export function paymentFormSubmitCard(form) {
    console.log("paymentFormSubmitCard");
    return (dispatch, getState) => {

        dispatch(paymentFormSetCardSubmitted);

        Stripe.card.createToken(form, (status, response) => {
            if (response.error) { // Problem!
              dispatch(paymentFormSetStripeErrors(response.error.message));

            } else { // Token was created!
              var token = response.id;
              dispatch(paymentFormSetStripeSuccess(token));
              dispatch(paymentFormDeliverToken(token))
            }
        });
    }
}

export function paymentFormDeliverToken(token){
    console.log("paymentFormDeliverToken");
    
    return (dispatch, getState) => {
        // send to backend
    }
}

export function paymentFormSetStripeSuccess(token) {
    console.log("paymentFormSetStripeSuccess");

    return {type: PAYMENT_FORM_SET_STRIPE_SUCCESS, token}
}

export function paymentFormSetStripeErrors(error_message) {
    console.log("paymentFormSetStripeErrors");

    return {type: PAYMENT_FORM_SET_STRIPE_ERRORS, error_message}
}

export function paymentFormSetCardSubmitted() {
    console.log("paymentFormSetCardSubmitted");

    return {type: PAYMENT_FORM_SET_CARD_SUBMITTED}
}
