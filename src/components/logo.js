import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/logo.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Logo;
