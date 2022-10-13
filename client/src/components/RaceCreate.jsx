import React, { useState, useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postRace, getTemperaments } from '../actions';

export default function RaceCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperamentsLoaded);

    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        img: "",
        temperaments: []
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch])

    const [errors, setErrors] = useState({});
    
    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }));
    };

    const handleInputChangeForNumbers = (event) => {
        setInput({
            ...input,
            [event.target.name]: Number(event.target.value)
        });
    }
    
    const handleSelect = (event) => {
        setInput({
            ...input,
            temperaments: [...input.temperaments, event.target.value]
        })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input);
        dispatch(postRace(input));
        alert('Raza creada')
        setInput({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            min_life_span: "",
            max_life_span: "",
            img: "",
            temperaments: []
        });
        history.push('/home')
    }

    return (
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" onChange={(e) => handleInputChange(e)} value={input.name}/>
                </div>
                <div>
                    <label>Altura</label>
                    <div>
                        <label>Minima:</label>
                        <input type="number" name="min_height" min={1} max={input.max_height} step={1} onChange={(e) => handleInputChangeForNumbers(e)} value={input.min_height}/>
                    </div>
                    <div>
                        <label>Maxima:</label>
                        <input type="number" name="max_height" min={input.min_height} max={500} step={1} onChange={(e) => handleInputChangeForNumbers(e)} value={input.max_height}/>
                    </div>
                </div>
                <div>
                    <label>Peso</label>
                    <div>
                        <label>Minimo:</label>
                        <input type="number" name="min_weight" min={1} max={input.max_weight} step={1} onChange={(e) => handleInputChangeForNumbers(e)} value={input.min_weight}/>
                    </div>
                    <div>
                        <label>Maximo:</label>
                        <input type="number" name="max_weight" min={input.min_weight} max={200} step={1} onChange={(e) => handleInputChangeForNumbers(e)} value={input.max_weight}/>
                    </div>
                </div>
                <div>
                    <label>Esperanza de vida</label>
                    <div>
                        <label>Minima:</label>
                        <input type="number" name="min_life_span" min={1} max={input.max_life_span} step={1} onChange={(e) => handleInputChangeForNumbers(e)} value={input.min_life_span}/>
                    </div>
                    <div>
                        <label>Maxima:</label>
                        <input type="number" name="max_life_span" min={input.min_life_span} max={99} step={1} onChange={(e) => handleInputChangeForNumbers(e)} value={input.max_life_span}/>
                    </div>
                </div>
                <div>
                    <label>Link a la Imagen:</label>
                    <input type="url" name="img" onChange={(e) => handleInputChange(e)} value={input.img} />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((temper) => (
                        <option value={temper.name}>{temper.name}</option>
                    ))}
                </select>
                <ul><li>{input.temperaments.map(el => el + ', ')}</li></ul>
                <button>Crear Raza</button>
            </form>
            { errors.name && (
                <p>{errors.name}</p>
            )}
            {   input.img &&
                    errors.img && (
                        <p>{errors.img}</p>
            )}
        </div>
    )
}

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'El Nombre es requerido';
    } else if (!/^[A-Za-z ,.'-]+$/.test(input.name)) {
        errors.name = 'Nombre invalido';
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)) {
        errors.img = 'Link invalido';
    }

  return errors;
}