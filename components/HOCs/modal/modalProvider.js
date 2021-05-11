import React, { Component } from "react";
import ModalContext from './modalContext'

class ModalProvider extends Component {

    showModal = (component, props = {}) => {
        this.setState({
            component,
            props
        });
    };

    hideModal = () => {
        this.setState({
            component: null,
            props: {},
        });
    }

    state = {
        component: null,
        props: {},
        showModal: this.showModal,
        hideModal: this.hideModal
    };

    render() {
        return (
            <ModalContext.Provider value={this.state}>
                {this.props.children}
            </ModalContext.Provider>
        );
    }
}

export default ModalProvider;