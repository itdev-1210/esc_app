import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import { COLOR } from "../config/styles";
import JobList from './JobList'

import { bindActionCreators } from "redux";
import * as jobActions from "../actions/job";
import { connect } from "react-redux";

const fakeData = [
    {
        id: '1',
        date: '01/01/2020',
        job_refer: '12345',
        client: {
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
        property: {
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
        timesheets: [
            {
                id: 1,
                start_date: '24/01/2020',
                start_time: '09:00',
                end_time: '17:00'
            },
            {
                id: 2,
                start_date: '24/02/2020',
                start_time: '08:00',
                end_time: '17:00'
            },
        ],
        description: 'This jos is the first fake job',
        material_use: 'This jos is the first fake job used',
    },
    {
        id: '2',
        date: '01/01/2020',
        job_refer: '12345',
        client: {
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
        property: {
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
        timesheets: [
            {
                id: 1,
                start_date: '24/01/2020',
                start_time: '09:00',
                end_time: '17:00'
            },
            {
                id: 2,
                start_date: '24/02/2020',
                start_time: '08:00',
                end_time: '17:00'
            },
        ],
        description: 'This jos is the second fake job',
        material_use: 'This jos is the second fake job used',
    }
]
class MyJobs extends Component {
    state = {
        search: '',
        jobData: [],
    };

    updateSearch = search => {
        if (search === '') {
            this.setState({ search: search, jobData: fakeData });
        } else {
            const data = fakeData.filter(data => (data.property.first_name+data.property.surname).toLowerCase().includes(search.toLowerCase()))
            this.setState({ search: search, jobData: data });
        }
    };

    onJobDetail = (data) => {
        this.props.actions.updateJobDetail(data)
        this.props.navigation.navigate('JobDetail', {jobData: data, jobId: data.id});
    }

    componentDidMount() {
        this.setState({jobData: fakeData})
    }

    render() {
        const { search, jobData } = this.state;
        return (
            <View style={styles.containerStyle}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme={true}
                    icon = {{type: 'material-community', color: COLOR.TEXT, name: 'share' }}
                    clearIcon = {{type: 'material-community', color: COLOR.TEXT, name: 'share' }}
                    round={true}
                    containerStyle={{
                        backgroundColor: COLOR.WHITE,
                    }}
                    inputContainerStyle={{
                        backgroundColor: COLOR.WHITE,
                        borderWidth: 1,
                        borderColor: COLOR.BORDER,
                        borderBottomWidth: 1,
                    }}
                    inputStyle={{
                        padding: 3,
                        color: COLOR.TEXT
                    }}
                    placeholderTextColor={COLOR.TEXT}
                />
                <ScrollView>
                    <View>
                    {jobData.length === 0 && <Text style={styles.noData}>No Job Data</Text>}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    {jobData.map((data) => <JobList data={data} onJobDetail={this.onJobDetail}/>)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLOR.WHITE,
        flex: 1,
    },
    noData: {
        color: COLOR.TEXT,
        textAlign: 'center',
        paddingVertical: 15
    }
})

// export default MyJobs;
export default connect(
    state => ({ state: state.job }),
    dispatch => ({
        actions: bindActionCreators(jobActions, dispatch)
    })
)(MyJobs);

