import React, {PureComponent, PropTypes} from 'react';

import Form from './components/Form';

class Main extends PureComponent {

    constructor() {
        super();
    }

    render() {
        return <div className="mw">
            <img src="/images/logo.png" />
            <span className="coming-soon">full website coming soon</span>
            <span className="blurb">Stay up to date with the new launch and projects.</span>
            <Form />
            <div className="bottom-text">
                <p>The best designs deserve</p>
                <span />
                <p>the best design partners.</p>
            </div>
        </div>; 
    }
}

export default Main;