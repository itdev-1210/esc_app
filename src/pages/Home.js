import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, Button } from "react-native";

import CustomButton from "../components/button";
import Logo from '../components/logo';

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class Home extends Component {
    authClick = () => {
        if (this.props.state.isAuth) {
            this.props.actions.logout()
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    myJobs = () => {
        if (this.props.state.isAuth) {
            this.props.navigation.navigate('MyJobs');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    createNewJob = () => {
        if (this.props.state.isAuth) {
            this.props.navigation.navigate('JobClient');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        const isAuth = this.props.state.isAuth;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo/>
                    {isAuth ? 
                    <View>
                        <Text style={styles.textStyle}>You are singed in as:</Text>
                        <Text style={styles.textStyle}>Rob Smith</Text>
                        <Text style={styles.textStyle}>ABC Plumbing Ltd</Text>
                    </View>: 
                    <Text style={styles.textStyle}>You are currently not signed in.</Text>}
                    <CustomButton title={isAuth?'Sign out':'Sign in'} onPress={this.authClick}/>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton title='My Jobs' onPress={this.myJobs}/>
                    <CustomButton title='Create new job' onPress={this.createNewJob}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F1F9FF',
        height: '50%',
        padding: 24,
        paddingBottom: 60
    },
    textStyle: {
        fontSize: 14,
        color: '#015880',
        textAlign: 'center',
        margin: 2
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '50%',
        padding: 24,
    }
})

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(Home);
