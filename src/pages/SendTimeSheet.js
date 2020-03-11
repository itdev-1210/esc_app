import React, { Component } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Pdf from 'react-native-pdf';
import CustomButton from "../components/button";
import { COLOR } from "../config/styles";

class SendTimeSheet extends Component {
    state = {
        // url: 'http://10.70.5.84:81/storage/logos/1.pdf'
        url: 'https://esc.boluga.com/storage/logos/1.pdf'
    }

    onSend = () => {
        this.props.navigation.navigate('MyJobs');
    }

    onSave = () => {
        this.props.navigation.navigate('MyJobs');
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <ScrollView>
                    <Pdf
                        source={{uri: this.state.url}}
                        // onLoadComplete={(numberOfPages,filePath)=>{
                        //     console.log(`number of pages: ${numberOfPages}`);
                        // }}
                        // onPageChanged={(page,numberOfPages)=>{
                        //     console.log(`current page: ${page}`);
                        // }}
                        // onError={(error)=>{
                        //     console.log(error);
                        // }}
                        // onPressLink={(uri)=>{
                        //     console.log(`Link presse: ${uri}`)
                        // }}
                        style={styles.pdf}/>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <View style={{width: '50%', paddingHorizontal: 10}}><CustomButton title={'Save'} onPress={this.onSave}/></View>
                    <View style={{width: '50%', paddingHorizontal: 10}}><CustomButton title={'Send'} onPress={this.onSend}/></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLOR.WHITE,
        flex: 1,
        padding: 24
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
})

export default SendTimeSheet;

