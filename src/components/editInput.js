import React, { Component } from "react";
import Proptypes from "prop-types";
import { View, TouchableNativeFeedback } from "react-native";

import { COLOR } from "../config/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

class EditInput extends Component {
    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.onEditClick()}>
                <View>
                    <Input
                        label={this.props.placeholder}
                        rightIcon={
                            <Icon
                            name={this.props.iconClass}
                            size={20}
                            color='#015880'
                            onPress={()=>this.props.onEditClick()}
                            />
                        }
                        placeholder={this.props.placeholder}
                        placeholderTextColor={COLOR.TEXT}
                        labelStyle={{color: COLOR.TEXT, fontSize: 10}}
                        inputContainerStyle={{
                            height: 32,
                            backgroundColor: COLOR.WHITE,
                            borderColor: COLOR.BORDER,
                            borderWidth: 1,
                            padding: 5,
                            marginVertical: 5
                        }}
                        inputStyle={{
                            fontSize: 14,
                            color: COLOR.TEXT,
                        }}
                        disabled={true}
                        disabledInputStyle={{
                            color: COLOR.TEXT,

                        }}
                        value={this.props.value}
                    ></Input>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

EditInput.propTypes = {
    placeholder: Proptypes.string,
    value: Proptypes.string.isRequired,
};

export default EditInput;
