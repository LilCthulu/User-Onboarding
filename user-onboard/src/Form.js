import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

// Validation for form
const schema = yup.object().shape({
    name: yup.string().required('⛔Name must be entered -Anon⛔').min(3, '⛔Get a longer name bro...⛔'),
    email: yup.string().email(),
    password: yup.string().min(8),
    agree: yup.boolean().oneOf([true], '⛔Must Agree to the Terms of Service. Otherwise how are we going to sell your data?⛔')
})


export default function Form(){

    const [users, setUsers] = useState([])

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        agree: false,
    });
   
    const submit = (evt) => {
     const newUser = {name: form.name, email: form.email, password: form.password, agree: form.agree}
    axios   
    .post('https://reqres.in/api/users', newUser)
    .then(response => {
        setUsers({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            agree: response.data.agree,
        })
    })
    .catch(err => console.log(err))};
    
    
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        agree: false,
    })
    
    const [disabled, setDisabled] = useState(true);
    
    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch(err => setErrors({...errors, [name]: err.errors[0]}))
    }

    const change = evt => {
        const {checked, value, name, type} = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormErrors(name, valueToUse)
        setForm({...form, [name]: valueToUse});
    }

    
    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    

    }, [form])


    return(
        <div className= 'Form'>
            <form onSubmit= {submit}>
            <div style= {{color: 'red'}}>
                <div>{errors.name}</div> <div>{errors.email}</div> <div>{errors.password}</div> <div>{errors.agree}</div>
            </div>
                <label >Name: 
                <input onChange= {change} type="text" name= 'name' value= {form.name}/>
                </label> 
                <label >Email:
                <input onChange= {change} type="text" name= 'email' />
                </label>
                <label >Password: 
                <input onChange= {change} type="text" name= 'password' />
                </label>
                <label >Agree to Terms of Service: 
                <input onChange= {change} type="checkbox" name= 'agree'/>
                </label>
                <button disabled={disabled} name= 'submit'>Submit</button>

            </form>
        </div>

        );
}