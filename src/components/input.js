import React, { Component } from "react";
import Proptypes from "prop-types";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { COLOR } from "../config/styles";

class CustomInput extends Component {
    render() {
        return (
            <View>
                <Text style={{fontSize: 10, color: COLOR.TEXT}}>{this.props.placeholder}</Text>
                <TextInput
                    style={{
                        color: COLOR.TEXT,
                        height: 48,
                        fontSize: 14,
                        marginVertical: 7,
                        backgroundColor: COLOR.WHITE,
                        borderColor: COLOR.BORDER, 
                        borderWidth: 1
                    }}
                    placeholderTextColor={COLOR.GRAY}
                    value={this.props.value}
                    placeholder={this.props.placeholder || ""}
                    secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid="transparent"
                    onChangeText={v => this.props.onChangeText(v)}
                />
            </View>
        );
    }
}

CustomInput.propTypes = {
    placeholder: Proptypes.string,
    value: Proptypes.string.isRequired,
    onChangeText: Proptypes.func.isRequired
};

export default CustomInput;
