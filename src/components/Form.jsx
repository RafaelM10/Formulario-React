import { useState } from 'react'

const Form = () => {
    const [form, SetForm] = useState({
            name:"",
            email:"",
            gender:""
    });

    const [emptyValue, SetEmptyValue] = useState(false);
    const [validEmail, SetValidEmail] = useState(false);

        const handleChange = (e) => {
                let newProp = form;
                SetValidEmail(true)
                 newProp[e.target.name] = e.target.value;
                    SetForm({ ...newProp });
        };

       const handleSubmit = (e) => {
           e.preventDefault()   
           
           //Verificar se existem campos vazios
           let emptyValues = Object.values(form).some(obj => obj == "");

            SetEmptyValue(emptyValues);

            //Verificar se o e-mail é valido
            let validEmail = form["email"].toLocaleLowerCase().match(/[a-z]+@[a-z]+\.com(\.br)*/)
            SetValidEmail(validEmail);

            if(!emptyValues && validEmail) {
                fetch("http://localhost:3000", { method:"POST", body: JSON.stringify(form) });
                e.currentTarget.submit()
            };
       };

    return (
        <div>
            <h2>Formulário</h2>

            <form onSubmit={(e) => handleSubmit (e)}>
                <label>Nome: </label>
                <input type='text' name='name' onBlur={(e) => handleChange(e)} />
                { emptyValue && form ["name"] == "" ? <span className='emptyText'>O campo nome precisa ser preenchido</span> : ""}
                <br />
                <label>E-mail: </label>
                <input type='text' name='email' onBlur={(e) => handleChange (e)} />
                { emptyValue && form ["email"] == "" ? <span className='emptyText'>O campo E-mail precisa ser preenchido</span> : ""}
                { !validEmail && form ["email"] !== "" ? <span className='emptyText'> E-mail inválido</span> : "" }
                <br />
                <label>Gênero: </label>
                <select name='gender' onChange={(e) => handleChange(e)} > 
                    <option>-</option>
                    <option>M</option>
                    <option>F</option>
                </select>
                { emptyValue && form["gender"] == "" ? <span className='emptyText'>O campo Gênero precisa ser preenchido</span> : ""}
                <br /> 
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
     
}

export default Form;