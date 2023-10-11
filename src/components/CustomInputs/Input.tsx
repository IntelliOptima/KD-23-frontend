import { UseFormRegister, FieldValues, RegisterOptions } from 'react-hook-form';

type InputProps = {
    htmlfor: string;
    errors?: any;
    type: string;
    placeholder: string;
    name: string;
    autoComplete?: string;
    register?: UseFormRegister<FieldValues>;
    registerOptions?: RegisterOptions;
    className?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ errors, type, placeholder, htmlfor, register, name, registerOptions, className, autoComplete, disabled, onChange }: InputProps) => {
    return (
        <div className={className}>
            <label htmlFor={htmlfor}>
                {register ? (
                    <input
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        {...register(name, { ...registerOptions })}
                    />
                ) : (
                    <input
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )}
            </label>
            {errors && errors[name] && <p className="text-red-500">{errors[name].message}</p>}
        </div>
    )
};

export default Input;
