import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../pages/Home";
import Login from "../pages/Login";
import MyJobs from '../pages/MyJobs';
import JobDetail from '../pages/JobDetail';
import EditClient from '../pages/EditClient';
import EditProperty from '../pages/EditProperty';
import EditTimesheet from '../pages/EditTimesheet';
import EditTime from '../pages/EditTime';
import CompleteJob from '../pages/CompleteJob';
import SendTimeSheet from '../pages/SendTimeSheet';
import JobClient from '../pages/JobClient';
import JobProperty from '../pages/JobProperty';
import NewJobDetail from '../pages/NewJobDetail';

const MStack = createStackNavigator();
export function MainStack() {
    return (
      <MStack.Navigator initialRouteName="Home"
        screenOptions={{
            headerStyle: {
                backgroundColor: '#F1F9FF',
            },
            headerTintColor: '#015880',
            headerTitleStyle: {
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
        }}
    >
        <MStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <MStack.Screen name="Logout" component={Login} options={{headerShown: false}}/>
        <MStack.Screen name="MyJobs" component={MyJobs}
            options={{ headerTitle: "My Jobs"}}
        />
        <MStack.Screen name="JobDetail" component={JobDetail}
            options={{ headerTitle: "Job Details"}}
        />
        <MStack.Screen name="EditClient" component={EditClient}
            options={{ headerTitle: "Edit Client"}}
        />
        <MStack.Screen name="EditProperty" component={EditProperty}
            options={{ headerTitle: "Edit Property"}}
        />
        <MStack.Screen name="EditTimesheet" component={EditTimesheet}
            options={{ headerTitle: "Edit Timesheet"}}
        />
        <MStack.Screen name="EditTime" component={EditTime}
            options={{ headerTitle: "Edit Time"}}
        />
        <MStack.Screen name="CompleteJob" component={CompleteJob}
            options={{ headerTitle: "Complete Job"}}
        />
        <MStack.Screen name="SendTimesheet" component={SendTimeSheet}
            options={{ headerTitle: "Send Timesheet"}}
        />
        <MStack.Screen name="JobClient" component={JobClient}
            options={{ headerTitle: "Job Client"}}
        />
        <MStack.Screen name="JobProperty" component={JobProperty}
            options={{ headerTitle: "Job Property"}}
        />
        <MStack.Screen name="NewJobDetail" component={NewJobDetail}
            options={{ headerTitle: "Job Details"}}
        />
    </MStack.Navigator>
    );
}

const LStack = createStackNavigator();
export function LoginStack() {
    return (
        <LStack.Navigator initialRouteName="Home" headerMode="none">
            <LStack.Screen name="Home" component={Home} />
            <LStack.Screen name="Login" component={Login} />
        </LStack.Navigator>
    );
}
