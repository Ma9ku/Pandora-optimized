import { useEffect, useState } from 'react';

import './genericInput.scss'


function GenericInput({ label, type, options, value, onChange, stateWare }) {

    const [displayedChips, setDisplayedChips] = useState([])

    useEffect(() => {
        if (type == 'chip-selecter') {
            chooseAll()
        }
    }, [type])

    const toggleChip = (chip) => {
        onChange(prev =>
            prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
        );
    };

    const handleInputForChip = (e) => {
        const chips = e.split(',')
    }

    const chooseAll = () => {
        options.map(x => {
            toggleChip(x.value)
        })

        if (value.length == options.length) {
            onChange([])
        } else {
            onChange(options.map( x => x.value))
        }
    }

    const renderInput = () => {
        switch (type) {
            case 'text':
                return <input type="text" placeholder={label} value={value} 
                onChange={e => {
                    stateWare(true)
                    onChange(e.target.value)
                }} />;
            case 'number':
                return <input type="number" value={value} 
                onChange={e => {
                    stateWare(true)
                    onChange(e.target.value)
                }} />;
            case 'select':
                return (
                    <select value={value} onChange={e => {
                        stateWare(true)
                        onChange(e.target.value)
                    }}>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'chip-selecter':
                return (
                    <>
                        <button className='choose-all' onClick={chooseAll}><a>Выбрать все</a></button>
                        {/* <input type='text' value={selectedChips.map(x => options.find(s => s.value == x).name).join(',')} onChange={(e) => handleInputForChip(e.target.value)}/> */}
                        <div className="chip-container">

                            {displayedChips == 0 ? options.map(chip => (
                                <div
                                key={chip.value}
                                className={`chip ${value.includes(chip.value) ? 'selected' : ''}`}
                                onClick={() => toggleChip(chip.value)}
                                >
                                    {chip.label}
                                </div>
                            )) : 
                            displayedChips.map(chip => (
                                <div
                                key={chip.value}
                                className={`chip ${value.includes(chip.value) ? 'selected' : ''}`}
                                onClick={() => toggleChip(chip.value)}
                                >
                                    {chip.label}
                                </div>
                            ))
                            }
                        </div>
                    </>
                
                )
            default:
                return null;
        }
    };

    return (
        <div className="one-line-input">
            {label ? 
            <label>{label}</label>
            : null
            }
            {renderInput()}
        </div>
    );
}

export default GenericInput