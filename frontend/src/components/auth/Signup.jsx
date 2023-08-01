import { useState, useContext } from 'react';
import { signupFields } from "../../constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import { AuthContext } from '../../contexts/AuthContext';

const fields=signupFields;
let fieldsState={};
fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const { signupUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setSignupState({...signupState,[e.target.id]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser(signupState);
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

      </form>
    )
}