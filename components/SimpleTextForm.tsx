import TextField from '@mui/material/TextField';
import {useState} from 'react';

interface SimpleTextFormProps {
    label: string;
    helperText: string;
    onSubmit: (value: string) => void;
}

export default function SimpleTextForm(props: SimpleTextFormProps) {
    const [value, setValue] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(value);
        setValue('');
    };

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField value={value} label={props.label} helperText={props.helperText} onChange={handleChange}/>
        </form>
    );
}
