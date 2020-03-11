import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";

import CustomButton from "../components/button";
import CustomInput from "../components/input";
import CustomLoading from "../components/loading";
import Logo from '../components/logo';

import Styles, { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    renderError(error) {
        if (error) {
            return (
                <View
                    style={{
                        height: 40,
                        padding: 8,
                        marginTop: 12,
                        marginHorizontal: 24,
                        borderWidth: 1,
                        borderColor: COLOR.WHITE,
                        backgroundColor: COLOR.DANGER
                    }}
                >
                    <Text style={{ color: COLOR.WHITE }}>{error}</Text>
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={styles.logoContainer}>
                    <Logo/>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View>
                            <Text style={styles.textStyle}>Enter your Engineer details to sign in:</Text>
                            {this.renderError(this.props.state.authError)}

                            <View style={{padding: 24}}>
                                <CustomInput
                                    value={this.state.email}
                                    placeholder="Email"
                                    onChangeText={v => this.setState({ email: v })}
                                />
                                <CustomInput
                                    value={this.state.password}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    onChangeText={v => this.setState({ password: v })}
                                />
                            </View>
                            <CustomButton
                                onPress={() =>
                                    this.props.actions.login(this.state.email, this.state.password)
                                }
                                title={"SIGN IN"}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <CustomLoading loading={this.props.state.requestingAuth} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center',
        height: '70%',
        padding: 24,
        paddingBottom: 60
    },
    textStyle: {
        fontSize: 14,
        color: '#015880',
        textAlign: 'center'
    },
})

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Login);
