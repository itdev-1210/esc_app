import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";
import { COLOR } from "../config/styles";

class JobList extends Component {
    state = {
    };

    render() {
        return (
            <TouchableNativeFeedback onPress={()=>this.props.onJobDetail(this.props.data)}>
                <View style={styles.containerStyle}>
                    <View>
                        <Text style={styles.textStyle}>{this.props.data.property.first_name + ' ' + this.props.data.property.surname}</Text>
                        <Text style={styles.text10Style}>{this.props.data.date}</Text>
                        <Text style={styles.text10Style}>{`Reference:`+this.props.data.job_refer}</Text>
                    </View>
                    <Text style={styles.rightArrowStyle}>&#8250;</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLOR.BORDER,
        marginVertical: 3,
        padding: 12,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: 14,
        color: '#015880',
        margin: 2
    },
    text10Style: {
        fontSize: 10,
        color: '#015880',
        margin: 2
    },
    rightArrowStyle: {
        color: '#0083BE',
        fontSize: 48,
        fontWeight: 'bold'
    }
})

export default JobList;
