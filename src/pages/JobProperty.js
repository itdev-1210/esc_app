import React, { Component } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput } from "react-native";
import { CustomPicker } from 'react-native-custom-picker'

import CustomButton from "../components/button";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from "../config/styles";

import { bindActionCreators } from "redux";
import * as jobActions from "../actions/job";
import { connect } from "react-redux";

const pickerItems = [
    {
        id: 1,
        title: 'Mr',
        first_name: 'Test',
        surname: 'Name',
        email: 'test@name.com',
        phone: '123456789',
        address1: 'address1 test name',
        address2: 'address2 test name',
        city: 'Test City',
        county: 'Test County',
        postcode: '123456',
        country: 'United Kingdom'
    },
    {
        id: 2,
        title: 'Mrs',
        first_name: 'Test1',
        surname: 'Name1',
        email: 'test1@name.com',
        phone: '123456789',
        address1: 'address11 test name',
        address2: 'address21 test name',
        city: 'Test1 City',
        county: 'Test1 County',
        postcode: '123456',
        country: 'United Kingdom'
    }
]

class JobProperty extends Component {
    state = {
        property: null
    }

    onNext = () => {
        this.props.actions.updateJobProperty(this.state.property)
        this.props.navigation.navigate('NewJobDetail');
    }

    onValueChange = (data) => {
        this.setState({property: data})
    }

    componentDidMount() {
        this.setState({property: this.props.state.jobDetail.property})
    }

    renderField(settings) {
        const { selectedItem, defaultText, getLabel } = settings
        return (
            <View style={styles.pickerContainer}>
                <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
                    {selectedItem && (
                    <View style={styles.innerContainer}>
                        <Text style={[styles.text, { color: COLOR.TEXT }]}>
                            {getLabel(selectedItem)}
                        </Text>
                    </View>
                    )}
                    <Icon
                        name={'search'}
                        size={20}
                        color={COLOR.TEXT}
                    />
                </View>
            </View>
        )
    }
     
    renderOption(settings) {
        const { item, getLabel } = settings
        return (
            <View style={styles.optionContainer}>
                <View style={styles.innerContainer}>
                    <Text style={{ color: COLOR.TEXT }}>{getLabel(item)}</Text>
                </View>
            </View>
        )
    }
    
    render() {
        const { property } = this.state;
        return (
            <View style={styles.containerStyle}>
                {property &&
                <ScrollView>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Contact Name'}
                        value={ property.first_name ? property.first_name + ' ' + property.surname : ''}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Contact Title'}
                        value={property.title}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'First Name'}
                        value={property.first_name}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <CustomPicker
                        placeholder={'Please choose surname...'}
                        options={pickerItems}
                        getLabel={item => item.surname}
                        fieldTemplate={this.renderField}
                        optionTemplate={this.renderOption}
                        onValueChange={item => this.onValueChange(item)}
                        value={property}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Email'}
                        value={property.email}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Phone'}
                        value={property.phone}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Address1'}
                        value={property.address1}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Address2'}
                        value={property.address2}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'City'}
                        value={property.city}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'County'}
                        value={property.county}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Postcode'}
                        value={property.postcode}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Country'}
                        value={property.country}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                </ScrollView>}
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
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLOR.BORDER,
        borderRadius: 4,
        height: 32,
        paddingHorizontal: 5,
        marginBottom: 7
    },
    text: {
        fontSize: 14
    },
    innerContainer: {
        padding: 5,
    },
    optionContainer: {
        padding: 12
    },
    textInput: {
        color: COLOR.TEXT,
        height: 32,
        fontSize: 14,
        marginVertical: 7,
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.BORDER, 
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: 0,
    }
})

export default connect(
    state => ({ state: state.job }),
    dispatch => ({
        actions: bindActionCreators(jobActions, dispatch)
    })
)(JobProperty);

