import { useState, useContext } from 'react';
import { loginFields } from "../../constants/formFields"
import Input from "./Input";
import FormExtra from './FormExtra';
import FormAction from './FormAction';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login() {
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext);


    
    const handleChange = (e) => {
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(loginState);
    }


    return(
        <form className="mt-8 space-y-6">
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>

            <FormExtra/>
            <FormAction handleSubmit={handleSubmit} text="Login"/>
        </form>
    )
}