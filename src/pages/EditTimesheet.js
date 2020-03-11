import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, TouchableNativeFeedback } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CustomButton from "../components/button";
import EditInput from '../components/editInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as jobActions from "../actions/job";
import { connect } from "react-redux";

import Toast from 'react-native-root-toast';

class EditTimesheet extends Component {
    state = {
        timesheets: null,
        start_date: null,
        start_time: null,
        end_time: null,
        isShowDate: false,
        isShowStart: false,
        isShowEnd: false,
        index: null,
    }

    onComplete = () => {
        this.props.actions.updateJobTimesheet(this.state.timesheets)
        this.props.navigation.navigate('CompleteJob');
    }

    onSave = () => {
        this.props.actions.updateJobTimesheet(this.state.timesheets)
        this.props.navigation.navigate('MyJobs');
    }

    onAddTime = () => {
        if (!this.state.start_date || !this.state.start_time || !this.state.end_time) return;
        let count1 = 0; let count2 = 0;
        this.state.timesheets.filter((timeData) => {
            if (timeData.start_date == this.state.start_date && timeData.start_time == this.state.start_time && timeData.end_time == this.state.end_time)
                count1++;
            if (timeData.start_date == this.state.start_date)
                count2++;
        })

        if (count1 > 0) {
            Toast.show('Same Timesheet already added!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
            return;
        }

        if (count2 > 2) {
            Toast.show('Timesheet limited for one day!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
            })
            return;
        }

        let newTime = {
            index: this.state.index + 1,
            start_date: this.state.start_date,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
        }

        let realData = this.state.timesheets;
        realData.push(newTime)
        this.setState({
            timesheets: realData,
            start_date: null,
            start_time: null,
            end_time: null,
            index: this.state.index + 1
        })
    }

    onEditDate = () => {
        this.setState({isShowDate: true})
    }

    handleConfirm = (date) => {
        var tmp_date = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2)+'/'+date.getFullYear();
        this.setState({isShowDate:false, start_date: tmp_date})
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

    formatTime = (time) => {
        if (time) {
            var res = time.split(':');
            var date = new Date();
            date.setHours(res[0]); date.setMinutes(res[1]);
            return date;
        } else {
            return new Date();
        }
    }

    onEditStartTime = () => {
        this.setState({isShowStart: true})
    }

    handleConfirmStart = (time) => {
        var tmp_time = ("0" + time.getHours()).slice(-2) + ':' + ("0" + time.getMinutes()).slice(-2);
        this.setState({isShowStart:false, start_time: tmp_time})
    }

    hideDatePickerStart = () => {
        this.setState({isShowStart: false})
    }

    onEditEndTime = () => {
        this.setState({isShowEnd: true})
    }

    handleConfirmEnd = (time) => {
        var tmp_time = ("0" + time.getHours()).slice(-2) + ':' + ("0" + time.getMinutes()).slice(-2);
        this.setState({isShowEnd:false, end_time: tmp_time})
    }

    hideDatePickerEnd = () => {
        this.setState({isShowEnd: false})
    }

    getMax = (arr, prop) => {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    componentDidMount() {
        this.setState({timesheets: this.props.state.jobDetail.timesheets, index: this.getMax(this.props.state.jobDetail.timesheets, 'id')})
    }

    render() {
        const { timesheets, start_date, isShowDate, start_time, end_time, isShowStart, isShowEnd } = this.state;
        // console.warn(timesheets)
        let newDate = this.formatDate(start_date);
        let newStartTime = this.formatTime(start_time);
        let newEndTime = this.formatTime(end_time);
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
                    <TouchableNativeFeedback key={index} onPress={()=>this.props.navigation.navigate('EditTime', {activeIndex: index})}>
                        <View style={styles.sheetContainer}>
                            <Text style={styles.sheet}>{timesheet.start_date}</Text>
                            <Text style={styles.sheet}>{timesheet.start_time}</Text>
                            <Text style={styles.sheet}>{timesheet.end_time}</Text>
                            <Text style={styles.rightArrowStyle}>&#8250;</Text>
                        </View>
                    </TouchableNativeFeedback>
                    )}
                </ScrollView>}
                <EditInput 
                    placeholder="Date" 
                    value={start_date ? start_date : ''} onEditClick={this.onEditDate}
                    iconClass='calendar'/>
                <DateTimePickerModal
                    isVisible={isShowDate}
                    mode="date"
                    date={newDate}
                    locale="en_GB"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
                <EditInput 
                    placeholder="Start Time" 
                    value={start_time ? start_time : ''} onEditClick={this.onEditStartTime}
                    iconClass=''/>
                <DateTimePickerModal
                    isVisible={isShowStart}
                    mode="time"
                    date={newStartTime}
                    locale="en_GB"
                    onConfirm={this.handleConfirmStart}
                    onCancel={this.hideDatePickerStart}
                />
                <EditInput 
                    placeholder="End Time" 
                    value={end_time ? end_time : ''} onEditClick={this.onEditEndTime}
                    iconClass=''/>
                <DateTimePickerModal
                    isVisible={isShowEnd}
                    mode="time"
                    date={newEndTime}
                    locale="en_GB"
                    onConfirm={this.handleConfirmEnd}
                    onCancel={this.hideDatePickerEnd}
                />
                <View style={styles.btnContainer}>
                    <View style={{width: '100%', paddingHorizontal: 10}}><CustomButton title={'Add time'} onPress={this.onAddTime}/></View>
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
        width: '25%',
        textAlign: 'center',
    },
    sheet: {
        fontSize: 14,
        color: COLOR.TEXT,
        width: '25%',
        textAlign: 'center',
    },
    rightArrowStyle: {
        color: '#0083BE',
        fontSize: 48,
        fontWeight: 'bold',
        width: '25%',
        textAlign: 'right',
        paddingHorizontal: 30,
        marginTop: -10
    }
})

export default connect(
    state => ({ state: state.job }),
    dispatch => ({
        actions: bindActionCreators(jobActions, dispatch)
    })
)(EditTimesheet);

