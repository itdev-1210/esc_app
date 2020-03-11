import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { MainStack, LoginStack } from "../config/router";
import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <NavigationContainer>
                {this.props.state.isAuth ? <MainStack/> : <LoginStack/>}
            </NavigationContainer>
        )
    }
}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Root);
