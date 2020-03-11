import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Signature from 'react-native-signature-canvas';
import CustomButton from "../components/button";
import EditInput from '../components/editInput';
import CustomInput from '../components/customInput'
import { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as jobActions from "../actions/job";
import { connect } from "react-redux";

class CompleteJob extends Component {
    state = {
        timesheets: null,
        complete_date: null,
        customer_name: '',
        signature: null,
        // signature: 'http://10.70.5.84:81/storage/logos/2_signature_1583423438.png',
        isShowDate: false,
    }

    onComplete = () => {
        // this.props.actions.updateJob(this.state.timesheets)
        this.props.navigation.navigate('SendTimesheet');
    }

    onSave = () => {
        // this.props.actions.updateJob(this.state.timesheets)
        this.props.navigation.navigate('MyJobs');
    }

    onEditDate = () => {
        this.setState({isShowDate: true})
    }

    handleConfirm = (date) => {
        var tmp_date = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2)+'/'+date.getFullYear();
        this.setState({isShowDate:false, complete_date: tmp_date})
    }

    hideDatePicker = () => {
        this.setState({isShowDate: false})
    }

    formatDate = (date) => {
        if (date) {
            var res = date.split('/');
            return new Date(res[2], res[1] - 1, res[0])
        } else {
            return new Date();
        }
    }

    onChangeName = (value) => {
        this.setState({customer_name: value})
    }

    handleSignature = signature => {
        this.setState({ signature });
    };
     
    handleEmpty = () => {
        console.log('Empty');
    }

    componentDidMount() {
        this.setState({
            timesheets: this.props.state.jobDetail.timesheets
        })
    }

    render() {
        const { timesheets, complete_date, isShowDate, customer_name, signature } = this.state;
        let newDate = this.formatDate(complete_date);
        const webStyle = `.m-signature-pad--footer
        .button {
        background-color: '#015880;
        color: #FFF;
        }`;
        return (
            <View style={styles.containerStyle}>
                <View style={styles.timeContainer}>
                    <Text style={styles.comment}>Start Date</Text>
                    <Text style={styles.comment}>Start Time</Text>
                    <Text style={styles.comment}>End Time</Text>
                </View>
                {timesheets &&
                <ScrollView>
                    {timesheets.map((timesheet, index) => 
                    <View style={styles.sheetContainer} key={index}>
                        <Text style={styles.sheet}>{timesheet.start_date}</Text>
                        <Text style={styles.sheet}>{timesheet.start_time}</Text>
                        <Text style={styles.sheet}>{timesheet.end_time}</Text>
                    </View>
                    )}
                </ScrollView>}
                <EditInput 
                    placeholder="Completion of Work Date" 
                    value={complete_date ? complete_date : ''} onEditClick={this.onEditDate}
                    iconClass='calendar'/>
                <DateTimePickerModal
                    isVisible={isShowDate}
                    mode="date"
                    date={newDate}
                    locale="en_GB"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
                <CustomInput
                    placeholder="Customer Name" 
                    value={customer_name} 
                    multiline={false}
                    numberOfLines={1}
                    changeText={this.onChangeName}/>

                <View style={{paddingHorizontal: 9}}>
                    <Text style={{fontSize: 10, color:COLOR.TEXT, fontWeight: 'bold'}}>Customer Signature</Text>
                    <View>
                        {signature ? (
                            <Image
                                resizeMode={"contain"}
                                style={{ height: 128, borderWidth: 1, borderColor: COLOR.BORDER }}
                                source={{ uri: signature }}
                            />
                        ) : null}
                    </View>
                    <View style={{height: 138}}>
                        <Signature
                            onOK={this.handleSignature}
                            onEmpty={this.handleEmpty}
                            descriptionText="Signature"
                            clearText="Clear"
                            confirmText="Save"
                            webStyle={webStyle}
                        />
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <View style={{width: '50%', paddingHorizontal: 10}}><CustomButton title={'Save'} onPress={this.onSave}/></View>
                    <View style={{width: '50%', paddingHorizontal: 10}}><CustomButton title={'Complete'} onPress={this.onComplete}/></View>
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
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10
    },
    sheetContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.BORDER,
        paddingVertical: 7,
        marginVertical: 5,
        height: 40,
    },
    comment: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLOR.TEXT,
        width: '33.3%',
        textAlign: 'center',
    },
    sheet: {
        fontSize: 14,
        color: COLOR.TEXT,
        width: '33.3%',
        textAlign: 'center',
    },
})

export default connect(
    state => ({ state: state.job }),
    dispatch => ({
        actions: bindActionCreators(jobActions, dispatch)
    })
)(CompleteJob);

