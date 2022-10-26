import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postBreed, getTemperaments } from '../../actions';
import NavBar from '../NavBar/NavBar';
import style from './BreedCreate.module.css';

export default function BreedCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    const allBreeds = useSelector((state) => state.allBreeds);

    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: null,
        max_life_span: null,
        img: "",
        temperaments: []
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch])

    const [errors, setErrors] = useState({});
    
    const handleInputChange = (event) => {
        if (event.target.name === 'name' || event.target.name === 'img') {
            setInput({
                ...input,
                [event.target.name]: event.target.value
            });
        } else if (input.min_life_span === 0) {
            setInput({
                ...input,
                [event.target.name]: null
            });
        } else if (input.max_life_span === 0) {
            setInput({
                ...input,
                [event.target.name]: null
            });
        } else {
            setInput({
                ...input,
                [event.target.name]: Number(event.target.value)
            });
        }

        
        setErrors(validate({
            ...input,
            breeds: allBreeds,
            [event.target.name]: event.target.value
        }));
    };
    
    const handleSelect = (event) => {
        setErrors(validate({
            ...input,
            [event.target.name + 'Added']: event.target.value
        }));

        if (!input.temperaments.includes(event.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, event.target.value]
            });
        }

    }

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temper => temper !== el)
        })
    }
    
    const handleSubmit =  (event) => {
        event.preventDefault();
        if (Object.keys(errors).length !== 0 || !input.name.length) {
            alert('Please resolve errors')
            setErrors(validate({
                ...input,
            }));
        } else {
            if (input.img === "") delete input.img;
            dispatch(postBreed(input));
            alert('Breed added')
            setInput({
                name: "",
                min_height: "",
                max_height: "",
                min_weight: "",
                max_weight: "",
                min_life_span: null,
                max_life_span: null,
                img: null,
                temperaments: []
            });
            history.push('/home')
        }
    }

    const placeHolderImg = 'https://thumbs.dreamstime.com/b/preview-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135745554.jpg';

    return (
        <div className={style.body}>
            <NavBar searchBar={false} />
            <div className={style.form_container}>
                <div className={style.image_preview} onChange={(e) => handleInputChange(e)}>
                    <img src={(errors.img || !input.img.length) ? placeHolderImg : input.img} alt='Not found' width='100%' height='100%'/>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
                    <span className={style.title}>New Breed</span>
                    <div className={style.form_containers_single}>
                        <label>Name*</label>
                        <input type="text" name="name" onChange={(e) => handleInputChange(e)} value={input.name} className={style.input_name} style={errors.name && {backgroundColor:'#d466669c'}}/>
                    </div>
                    { errors.name && <p className={style.error_message}>{errors.name}</p>}
                    <div className={style.form_containers}>
                        <label>Height(cm)*</label>
                        <div className={style.form_containers_inputs} style={errors.height && {backgroundColor:'#d466669c'}}>
                            <label>Min</label>
                            <input type="number" name="min_height" min={1} max={input.max_height-1} step={1} onChange={(e) => handleInputChange(e)} value={input.min_height} />
                        </div>
                        <div className={style.form_containers_inputs} style={errors.height && {backgroundColor:'#d466669c'}}>
                            <label>Max</label>
                            <input type="number" name="max_height" min={input.min_height+1} max={500} step={1} onChange={(e) => handleInputChange(e)} value={input.max_height}/>
                        </div>
                    </div>
                    { errors.height && <p className={style.error_message}>{errors.height}</p>}
                    <div className={style.form_containers}>
                        <label>Weight(kg)*</label>
                        <div className={style.form_containers_inputs} style={errors.weight && {backgroundColor:'#d466669c'}}>
                            <label>Min</label>
                            <input type="number" name="min_weight" min={1} max={input.max_weight-1} step={1} onChange={(e) => handleInputChange(e)} value={input.min_weight}/>
                        </div>
                        <div className={style.form_containers_inputs} style={errors.weight && {backgroundColor:'#d466669c'}}>
                            <label>Max</label>
                            <input type="number" name="max_weight" min={input.min_weight+1} max={200} step={1} onChange={(e) => handleInputChange(e)} value={input.max_weight}/>
                        </div>
                    </div>
                    { errors.weight && <p className={style.error_message}>{errors.weight}</p>}
                    <div className={style.form_containers}>
                        <label>Life Span</label>
                        <div className={style.form_containers_inputs} style={errors.life_span && {backgroundColor:'#d466669c'}}>
                            <label>Min</label>
                            <input type="number" name="min_life_span" min={1} max={input.max_life_span-1} step={1} onChange={(e) => handleInputChange(e)} value={input.min_life_span}/>
                        </div>
                        <div className={style.form_containers_inputs} style={errors.life_span && {backgroundColor:'#d466669c'}}>
                            <label>Max</label>
                            <input type="number" name="max_life_span" min={input.min_life_span+1} max={99} step={1} onChange={(e) => handleInputChange(e)} value={input.max_life_span}/>
                        </div>
                    </div>
                    { errors.life_span && <p className={style.error_message}>{errors.life_span}</p>}
                    <div className={style.form_containers_single}>
                        <label>Link to Image</label>
                        <input type="url" name="img" onChange={(e) => handleInputChange(e)} value={input.img} style={errors.img && {backgroundColor:'#d466669c'}}/>
                    </div>
                    {  errors.img && <p className={style.error_message}>{errors.img}</p>}
                    <div className={style.form_temperaments_container}>
                        <label>Select Temperaments</label>
                        <select onChange={(e) => handleSelect(e)} name={'temperaments'}>
                            <option>Temperaments</option>
                            {temperaments.map((temper) => (
                                <option key={temper.name + Math.random()} value={temper.name}>{temper.name}</option>
                            ))}
                        </select>
                        <div className={style.form_temperaments_selected_container}>
                            {
                                input.temperaments?.map(el => 
                                        <div className={style.temperaments_selected} key={el + Math.random()}>
                                            <p>{el}</p>
                                            <button onClick={() => handleDelete(el)}>x</button>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    { errors.temperaments && <p className={style.error_message}>{errors.temperaments}</p> }
                    <button className={style.submit_button}>Add Breed</button>
                </form>
            </div>
        </div>
    )
}

export function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'name required';
    else if(input.breeds.find(breed => breed.name.toLowerCase() === input.name.toLowerCase())) errors.name = 'breed already created';
    else if (!/^[A-Za-z ,.'-]+$/.test(input.name)) errors.name = 'invalid name';
    else delete errors.name;

    if (!input.min_height || !input.max_height) errors.height = 'missing height information';
    else if (input.min_height <= 0 || input.max_height <= 0) errors.height = 'height cannot be less than or equal to zero';
    else if (input.min_height > input.max_height) errors.height = 'minimum height must be less than maximum height';
    else if (input.max_height > 500) errors.height = 'maximum height exceeded';
    else delete errors.height;

    if (!input.min_weight || !input.max_weight) errors.weight = 'missing weight information';
    else if (input.min_weight <= 0 || input.max_weight <= 0) errors.weight = 'weight cannot be less than or equal to zero';
    else if (input.min_height > input.max_height) errors.weight = 'minimum weight must be less than maximum weight';
    else if (input.max_weight > 200) errors.weight = 'maximum weight exceeded';
    else delete errors.weight;

    if ( (input.min_life_span && input.min_life_span < 1) || (input.max_life_span && input.max_life_span < 1) ) errors.life_span = 'life span cannot be less than or equal to zero';
    else if (input.min_life_span > input.max_life_span) errors.life_span = 'minimum life span must be less than maximum life span';
    else if (input.max_life_span > 99) errors.life_span = 'maximum life span exceeded';
    else delete errors.life_span;

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img) && input.img !== '') errors.img = 'invalid link';
    else delete errors.img;
    
    if (input.temperaments.includes(input.temperamentsAdded)) errors.temperaments = 'temperament already added';
    else delete errors.temperaments;

  return errors;
}