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
            isEmailInvalid: false,
            isNameInvalid: false,
        };
    }

    emailIsInvalid = () => {
        this.setState({
            isEmailInvalid: true
        });
    }

    emailIsValid = () => {
        this.setState({
            isEmailInvalid: false
        });
    }

    formIsValid = () => {
        this.setState({
            isEmailInvalid: false,
            isNameInvalid: false,
        });
    }

    nameIsInvalid = () => {
        this.setState({
            isNameInvalid: true
        });
    }

    nameIsValid = () => {
        this.setState({
            isNameInvalid: false
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
    }

    validateEmail = () => {
        this.isEmailValid(this.refs.email.value);
    }

    validateName = () => {
        this.isNameValid(this.refs.name.value.split(" "));
    }

    render() {
        const emailCls = classNames('', {invalid: this.state.isEmailInvalid});
        const nameCls = classNames('', {invalid: this.state.isNameInvalid});

        return <div className="fw">
            <div className="">
                <input onBlur={this.validateName} className={nameCls} ref="name" placeholder="Full Name" type="text" />
                <span ref="name-bar" className="input-bar" />
                <input onBlur={this.validateEmail} className={emailCls} ref="email" placeholder="Email" type="email" />
                <span ref="email-bar" className="input-bar" />
                <button onClick={this.onClickSubmit}>submit</button>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, {
    subscribePostEmail,
})(Form);
