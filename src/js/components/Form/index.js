import React, {PureComponent, PropTypes} from 'react';
import { connect } from 'react-redux';
import classNames from 'class-names';

import {
    subscribePostEmail
} from './../../actions/subscribeActions.js';

require('./styles.scss');

class Form extends PureComponent {

    constructor() {
        super();

        this.state = {
            hasSubmitted: false,
            isEmailInvalid: false,
            isNameInvalid: false,
            showNameCheck: false,
            showEmailCheck: false,
        };
    }

    checkEmail = () => {
        console.log(this.refs.email);
        if (this.refs.email === null) return false;
        const email = this.refs.email.value;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let test = re.test(email);

        console.log('checkEmail: ', test);
        return test;
    }

    checkName = () => {
        const name = this.refs.name.value;
        return name.length > 0;
    }

    emailIsInvalid = () => {
        this.setState({
            isEmailInvalid: true,
            showEmailCheck: false,
        });
    }

    emailIsValid = () => {
        this.setState({
            isEmailInvalid: false,
            showEmailCheck: true,
        });
    }

    formIsValid = () => {
        this.setState({
            isEmailInvalid: false,
            isNameInvalid: false,
            showEmailCheck: true,
            showNameCheck: true,
        });
    }

    nameIsInvalid = () => {
        this.setState({
            isNameInvalid: true,
            showNameCheck: false,
        });
    }

    nameIsValid = () => {
        this.setState({
            isNameInvalid: false,
            showNameCheck: true,
        });
    }

    isEmailValid = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let test = re.test(email);

        if (!test) {
            this.emailIsInvalid();
            return false;
        }

        this.emailIsValid();
        return true;
    }

    isNameValid = name => {
        console.log('name: ', name, name.length);
        if (name.length < 2) {
            this.nameIsInvalid();
            return false;
        }

        this.nameIsValid();
        return true;
    }

    onClickSubmit = () => {
        const email = this.refs.email.value;
        const name = this.refs.name.value.split(" ");

        let a = this.isNameValid(name);
        let b = this.isEmailValid(email);

        if (!a || !b) return false;

        const first = name[0];
        const last = name[1];

        this.props.subscribePostEmail(email, first, last);
        this.setState({ hasSubmitted: true });
    }

    validateEmail = () => {
        this.isEmailValid(this.refs.email.value);
    }

    validateName = () => {
        this.isNameValid(this.refs.name.value.split(" "));
    }

    render() {
        const emailCls = classNames('', {invalid: this.state.isEmailInvalid});
        const emailCheckCls = classNames('checkmark email', {isShowing: this.state.showEmailCheck});
        const nameCls = classNames('', {invalid: this.state.isNameInvalid});
        const nameCheckCls = classNames('checkmark name', {isShowing: this.state.showNameCheck});
        const submitCls = classNames('submit', {isShowing: !this.state.hasSubmitted});
        const thanksCls = classNames('thanks', {isShowing: this.state.hasSubmitted});

        return <div className="fw">
            <div className="">
                <input onBlur={this.validateName} className={nameCls} ref="name" placeholder="Full Name" type="text" name="name" />
                <img src="/images/checkmark.svg" className={nameCheckCls} />
                <span ref="name-bar" className="input-bar" />
                <input onBlur={this.validateEmail} className={emailCls} ref="email" placeholder="Email" type="email" name="email" />
                <img src="/images/checkmark.svg" className={emailCheckCls} />
                <span ref="email-bar" className="input-bar" />
                <button className={submitCls} onClick={this.onClickSubmit}>submit</button>
                <span className={thanksCls}>Thank you for subscribing.</span>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, {
    subscribePostEmail,
})(Form);
