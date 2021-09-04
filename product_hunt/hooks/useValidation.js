import React, { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                fn(); // Function executed by component
            }
            setSubmitForm(false);
        }
    }, [errors]);

    // Function executed when the user writes on the form
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    // Function executed when the user submits the form
    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validate(values);
        setErrors(errorsValidation);
        setSubmitForm(true);
    }

    return {
        values,
        errors,
        submitForm,
        handleChange,
        handleSubmit
    }
}

export default useValidation;