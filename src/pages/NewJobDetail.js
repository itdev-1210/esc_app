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

class NewJobDetail extends Component {
    state = {
        client: '',
        property: '',
        date: null,
        job_refer: '',
        description: '',
        material_use: '',
        isShowDate: false,
    };

    onNext = () => {
        this.props.navigation.navigate('EditTimesheet');
    }

    onSave = () => {
        this.props.navigation.navigate('MyJobs');
    }

    onEditClient = () => {
        this.props.navigation.navigate('EditClient');
    }

    onEditProperty = () => {
        this.props.navigation.navigate('EditProperty');
    }

    onEditDate = () => {
        this.setState({isShowDate: true})
    }

    handleConfirm = (date) => {
        var tmp_date = date.getDate() + '/' + (date.getMonth()+1)+'/'+date.getFullYear();
        this.setState({isShowDate:false, date: tmp_date})
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
        this.setState({isShowDate:false, description: value})
    }

    onChangeRefer = (value) => {
        this.setState({isShowDate:false, job_refer: value})
    }

    onChangeMaterial = (value) => {
        this.setState({isShowDate:false, material_use: value})
    }

    render() {
        const { client, property, date, isShowDate, description, job_refer, material_use } = this.state;
        let newDate = this.formatDate(date);
        return (
            <View style={styles.containerStyle}>
                <ScrollView>
                    <EditInput 
                        placeholder="Client" 
                        value={client.first_name+' '+client.surname} 
                        onEditClick={this.onEditClient}
                        iconClass='pencil'/>
                    <EditInput 
                        placeholder="Property" 
                        value={property.first_name+' '+property.surname} 
                        onEditClick={this.onEditProperty}
                        iconClass='pencil'/>
                    <EditInput 
                        placeholder="Date" 
                        value={date} onEditClick={this.onEditDate}
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
                        value={job_refer} 
                        multiline={false}
                        numberOfLines={1}
                        changeText={this.onChangeRefer}/>
                    <CustomInput
                        placeholder="Description of Work" 
                        value={description} 
                        multiline={true}
                        numberOfLines={4}
                        changeText={this.onChangeDescription}/>
                    <CustomInput
                        placeholder="Materials Used" 
                        value={material_use} 
                        multiline={true}
                        numberOfLines={4}
                        changeText={this.onChangeMaterial}/>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <CustomButton title={'Save'} onPress={this.onSave}/>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton title={'Next'} onPress={this.onNext}/>
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
)(NewJobDetail);

