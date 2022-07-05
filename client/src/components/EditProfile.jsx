import React, {useEffect, useState} from "react";
import { Form, TextField, SubmitField } from 'react-components-form';
import Schema from 'form-schema-validation';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";


const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const EditProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    nationalID: {
        type: String,
    },
    region: {
        type: String,
    },
    sports: {
        type: [String],
    },
    address: {
        type: String,
    },
    // img:
    //     {
    //         data: Buffer,
    //         contentType: String
    //     }
});








const EditProfile = () => {

    useEffect(() => {
        //let token = window.localStorage.getItem("token");
        //let id = window.localStorage.getItem("id");
        let id ="62c24c0c0d6372c368cb51ac";

        const headers = {
            "Content-Type": "application/json",
            //Authorization: "token " + token,
        };
        axios
            .get(" http://localhost:4000/api/players/card/" + id , {
                headers,
            })
            .then((res) => {
                console.log(res.data);

                setPlayer(res.data);

            });

    }, []);


    return (
        <div>
            <Form
                schema={EditProfileSchema}
                onSubmit={model => console.log(model)}
                onError={(errors, data) => console.log('error', errors, data)}
            >
                <TextField name="name" label="name" type="text"/>
                <TextField name="gender" label="gender" type="text"/>
                <TextField name="age" label="age" type="text"/>
                <TextField name="nationalID" label="nationalID" type="text"/>
                <SubmitField value="Submit"/>
            </Form>

        </div>
    );


};

export default EditProfile;
