import React, { useState } from 'react';
import { View } from 'react-native';
import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";
import Form, {TYPES} from 'react-native-basic-form';
import { ErrorText } from "../../auth-components/Shared";

export default function UpdateProfile (props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { state, updateUser } = useAuth();
    

    const options = [
      {label: "Front End Developer", value:"Front End Developer"},
      {label: "Back End Developer", value:"Back End Developer"},
      {label: "Full Stack Developer", value: "Full Stack Developer"},
      {label: "Database Manager", value: "Database Manager"},
      {label: "Software Engineer", value: "Software Engineer"},
      {label: "Product Manager", value: "Product Manager"},
      {label: "Web Developer", value: "Web Developer"},
      {label: ".NET Developer", value: ".NET Developer"},
      {label: "Java Developer", value: "Java Developer"},
      {label: "Quality Assurance Engineer", value: "Quality Assurance Engineer"},
      {label: "Software Developer", value: "Software Developer"},
      {label: "Systems Architect", value: "Systems Architect"},
      {label: "Application Developer", value: "Application Developer"},
      {label: "Developer", value: "Developer"}
  ]

  const fields = [
    //Profile Image DOES NOT WORK!!
      {name: 'username', label:'Username', required: true},
      {name: 'firstName', label: 'First Name', required: true},
      {name: 'lastName', label: 'Last Name', required: true},
      {name: 'password', label: 'Password', required: true, secure:true},
      {name: 'jobRole', label: 'Job Title or Role', required: true, type: TYPES.Dropdown, options: options}
  ];

    async function onSubmit(data) {
        setLoading(true);

        try {
            let response = await api.updateProfile(state.user._id, data);
            updateUser(response.user);

            setLoading(false);

            navigation.goBack();
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }


    let formProps = {title: "Submit", fields, onSubmit, loading};
    return (
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
            <View style={{flex:1}}>
                <ErrorText error={error}/>
                <Form {...formProps} >
                </Form>
            </View>
        </View>
    );
};
                  

UpdateProfile.navigationOptions = ({}) => {
    return {
        title: `Update Profile`
    }
};