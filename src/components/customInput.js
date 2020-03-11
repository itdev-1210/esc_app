import React, { Component } from "react";
import Proptypes from "prop-types";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { COLOR } from "../config/styles";

class CustomInput extends Component {
    render() {
        return (
            <View style={{paddingHorizontal: 9}}>
                <Text style={{fontSize: 10, color: COLOR.TEXT, fontWeight: 'bold'}}>{this.props.placeholder}</Text>
                <TextInput
                    style={{
                        color: COLOR.TEXT,
                        height: 32 * this.props.numberOfLines,
                        fontSize: 14,
                        marginVertical: 7,
                        backgroundColor: COLOR.WHITE,
                        borderColor: COLOR.BORDER, 
                        borderWidth: 1,
                        paddingVertical: 0,
                    }}
                    placeholderTextColor={COLOR.TEXT}
                    value={this.props.value}
                    placeholder={this.props.placeholder || ""}
                    secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid="transparent"
                    multiline={this.props.multiline}
                    numberOfLines={this.props.numberOfLines}
                    onChangeText={v => this.props.changeText(v)}
                />
            </View>
        );
    }
}

CustomInput.propTypes = {
    placeholder: Proptypes.string,
    value: Proptypes.string.isRequired,
    changeText: Proptypes.func.isRequired
};

export default CustomInput;
