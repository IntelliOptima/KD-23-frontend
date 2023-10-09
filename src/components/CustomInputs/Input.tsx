import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';

type InputProps = {
    htmlfor: string;
    errors?: any;
    type: string;
    placeholder: string;
    name: string;
    register?: UseFormRegister<FieldValues>;
    registerOptions?: RegisterOptions;
};

const Input = ({ errors, type, placeholder, htmlfor, register, name, registerOptions }: InputProps) => {
    return (
        <div>
            <label htmlFor={htmlfor}>
                {register ?
                    <input
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={type}
                        placeholder={placeholder}
                        {...register(name, {
                            ...registerOptions
                        })
                        }
                    /> 

                    :

                    <input
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={type}
                        placeholder={placeholder}
                    />}
            </label>
            {errors && errors[name] && <p className="text-red-500">{errors[name].message}</p>}
        </div>
    )
};

export default Input;
