import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../components/button";
import EditInput from '../components/editInput';
import CustomInput from '../components/customInput';
import { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as jobActions from "../actions/job";
import { connect } from "react-redux";

class JobDetail extends Component {
    state = {
        jobData: {},
        client: '',
        property: '',
        date: null,
        job_refer: '',
        description: '',
        material_use: '',
        isShowDate: false,
    };

    onTimeSheet = () => {
        this.props.navigation.navigate('EditTimesheet');
    }

    onSave = () => {
        this.props.navigation.navigate('MyJobs');
    }

    onComplete = () => {
        this.props.navigation.navigate('CompleteJob');
    }

    onEditClient = () => {
        this.props.navigation.navigate('EditClient');
    }

    onEditProperty = () => {
        this.props.navigation.navigate('EditProperty');
        // console.warn('edit click1')
    }

    onEditDate = () => {
        this.setState({isShowDate: true})
    }

    handleConfirm = (date) => {
        var tmp_date = date.getDate() + '/' + (date.getMonth()+1)+'/'+date.getFullYear();
        if (this.props.state.id) {
            let jobData = this.state.jobData;
            jobData.date = tmp_date;
            this.setState({isShowDate:false, jobData: jobData})
        } else {
            this.setState({isShowDate:false, date: tmp_date})
        }
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

    onChangeDescription = (value) => {
        if (this.props.state.id) {
            let jobData = this.state.jobData;
            jobData.description = value;
            this.setState({isShowDate:false, jobData: jobData})
        } else {
            this.setState({isShowDate:false, description: value})
        }
    }

    onChangeRefer = (value) => {
        if (this.props.state.id) {
            let jobData = this.state.jobData;
            jobData.job_refer = value;
            this.setState({isShowDate:false, jobData: jobData})
        } else {
            this.setState({isShowDate:false, job_refer: value})
        }
    }

    onChangeMaterial = (value) => {
        if (this.props.state.id) {
            let jobData = this.state.jobData;
            jobData.material_use = value;
            this.setState({isShowDate:false, jobData: jobData})
        } else {
            this.setState({isShowDate:false, material_use: value})
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({jobData: this.props.state.id ? this.props.state.jobDetail : {}})
    }

    componentWillUnmount() {
        this.props.actions.resetJobDetail()
    }

    render() {
        const isNew = this.props.state.id ? false : true;
        const { jobData, client, property, date, isShowDate, description, material_use } = this.state;
        let newDate = this.formatDate(isNew ? date : jobData.date);
        return (
            <View style={styles.containerStyle}>
                <ScrollView>
                    <EditInput 
                        placeholder="Client" 
                        value={isNew ? client.first_name+' '+client.surname : jobData.client.first_name + ' ' + jobData.client.surname} 
                        onEditClick={this.onEditClient}
                        iconClass='pencil'/>
                    <EditInput 
                        placeholder="Property" 
                        value={isNew ? property.first_name+' '+property.surname : jobData.property.first_name + ' ' + jobData.property.surname} 
                        onEditClick={this.onEditProperty}
                        iconClass='pencil'/>
                    <EditInput 
                        placeholder="Date" 
                        value={isNew ? date : jobData.date} onEditClick={this.onEditDate}
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
                        placeholder="Reference" 
                        value={isNew ? job_refer : jobData.job_refer} 
                        multiline={false}
                        numberOfLines={1}
                        changeText={this.onChangeRefer}/>
                    <CustomInput
                        placeholder="Description of Work" 
                        value={isNew ? description : jobData.description} 
                        multiline={true}
                        numberOfLines={4}
                        changeText={this.onChangeDescription}/>
                    <CustomInput
                        placeholder="Materials Used" 
                        value={isNew ? material_use : jobData.material_use} 
                        multiline={true}
                        numberOfLines={4}
                        changeText={this.onChangeMaterial}/>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <CustomButton title={isNew ? 'Add time' : 'Edit timesheet'} onPress={this.onTimeSheet}/>
                </View>
                <View style={styles.btnContainer}>
                    <View style={{width: '50%', paddingRight: 14}}><CustomButton title={'Save'} onPress={this.onSave}/></View>
                    <View style={{width: '50%', paddingLeft: 14}}><CustomButton title={'Complete'} onPress={this.onComplete}/></View>
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
    }
})

export default connect(
    state => ({ state: state.job }),
    dispatch => ({
        actions: bindActionCreators(jobActions, dispatch)
    })
)(JobDetail);

