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
        company: 'First Company',
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
        company: 'Second Company',
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

class JobClient extends Component {
    state = {
        client: null
    }

    onNext = () => {
        if (this.state.client.id !== '') {
            this.props.actions.updateJobClient(this.state.client)
            this.props.navigation.navigate('JobProperty');
        }
    }

    onValueChange = (data) => {
        this.setState({client: data})
    }

    componentDidMount() {
        this.setState({client: this.props.state.jobDetail.client})
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

    componentWillUnmount() {
        this.props.actions.resetJobDetail()
    }
    
    render() {
        const { client } = this.state;
        return (
            <View style={styles.containerStyle}>
                {client &&
                <ScrollView>
                    <CustomPicker
                        placeholder={'Please choose company...'}
                        options={pickerItems}
                        getLabel={item => item.company}
                        fieldTemplate={this.renderField}
                        optionTemplate={this.renderOption}
                        onValueChange={item => this.onValueChange(item)}
                        value={client}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Title'}
                        value={client.title}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'FirstName'}
                        value={client.first_name}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Surname'}
                        value={client.surname}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Email'}
                        value={client.email}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Phone'}
                        value={client.phone}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Address1'}
                        value={client.address1}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Address2'}
                        value={client.address2}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'City'}
                        value={client.city}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'County'}
                        value={client.county}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'PostCode'}
                        value={client.postcode}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={COLOR.TEXT}
                        placeholder={'Country'}
                        value={client.country}
                        underlineColorAndroid="transparent"
                        editable={false}
                    />
                </ScrollView>}
                <View style={styles.btnContainer}>
                    <View style={{width: '100%'}}><CustomButton title={'Next'} onPress={this.onNext}/></View>
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
)(JobClient);

