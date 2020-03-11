import React, { Component } from "react";
import { Header, Left, Icon as NativeIcon, Button, Body, Title, Right, Text } from 'native-base';
import { View } from "react-native";
import { COLOR } from "../config/styles";

const CustomHeader = props => {
    return (
        <View>
            <Text>&#60;</Text>
            <Text>{props.title}</Text>
        </View>
    )
}

export default CustomHeader