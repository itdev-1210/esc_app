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

class EditTime extends Component {
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

    onCancel = () => {
        this.props.navigation.goBack();
    }

    onSave = () => {
        if (!this.state.start_date || !this.state.start_time || !this.state.end_time) return;
        let count1 = 0; let count2 = 0;
        this.state.timesheets.filter((timeData, index) => {
            if (this.state.index == index) return;
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

        let realData = this.state.timesheets;
        realData[this.state.index]['start_date'] = this.state.start_date;
        realData[this.state.index]['start_time'] = this.state.start_time;
        realData[this.state.index]['end_time'] = this.state.end_time;
        this.props.actions.updateJobTimesheet(realData)
        this.props.navigation.navigate('EditTimesheet');
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

    componentDidMount() {
        this.setState({
            timesheets: this.props.state.jobDetail.timesheets, 
            start_date: this.props.state.jobDetail.timesheets[this.props.route.params.activeIndex]['start_date'],
            start_time: this.props.state.jobDetail.timesheets[this.props.route.params.activeIndex]['start_time'],
            end_time: this.props.state.jobDetail.timesheets[this.props.route.params.activeIndex]['end_time'],
            index: this.props.route.params.activeIndex
        })
    }

    render() {
        const { start_date, isShowDate, start_time, end_time, isShowStart, isShowEnd } = this.state;
        // console.warn(timesheets)
        let newDate = this.formatDate(start_date);
        let newStartTime = this.formatTime(start_time);
        let newEndTime = this.formatTime(end_time);
        return (
            <View style={styles.containerStyle}>
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
                    <View style={{width: '50%', paddingHorizontal: 10}}><CustomButton title={'Cancel'} onPress={this.onCancel}/></View>
                    <View style={{width: '50%', paddingHorizontal: 10}}><CustomButton title={'Save'} onPress={this.onSave}/></View>
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
})

export default connect(
    state => ({ state: state.job }),
    dispatch => ({
        actions: bindActionCreators(jobActions, dispatch)
    })
)(EditTime);

