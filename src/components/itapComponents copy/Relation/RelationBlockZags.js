import React, { useEffect, useState } from "react";
import './relationBlock.css'

import { components } from "react-select"
import { default as ReactSelect, StylesConfig } from "react-select";
import chroma from 'chroma-js';

// import {relationsLevel1, relationsLevel2} from '../../../data/relationsData.js'

const relationsLevel1 = [
    {value: "new_zags", label: "ЗАГС"},
    // {value: "REG_ADDRESS_CUR,REG_ADDRESS_HIST", label: "АДРЕС-РЕГИСТР"},
]

const colourStyles = {
    control: (styles) => ({ ...styles, color: "#ffffff", backgroundColor: 'rgba(0, 0, 0, 0.1)', border: 'none' }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        appearance: 'none',
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#c8e0f7"
          : isFocused
          ? "#ffffff"
          : undefined,
        color: isDisabled
          ? '#000000'
          : isSelected
          ? "#000000"
            ? isFocused
            : '#000000'
          : "#000000",
        opacity: '1',
        cursor: isDisabled ? 'not-allowed' : 'cursor',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#ffffff"
              : "#ffffff"
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#1b376f",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#ffffff",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "#ffffff",
      cursor: 'pointer',
      ':hover': {
        backgroundColor: "#1976d2",
        color: '#878787',
      },
    }),
  };

const Option = (props) => {
    return (
        <>
        <div className={"relsOption"}>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
      </div>
      </>
    );
};

const RelationBlock = (props) => {
    const [selectedOptions, setSelectedOptions] = useState([...relationsLevel1])

    const checkAdmin = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('ROLE_ADMIN')) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (document.getElementById("react-select-2-placeholder")) document.getElementById("react-select-2-placeholder").innerHTML = "Выберите связи"

        let rels = ""
        selectedOptions.forEach(el => {
            if (rels == "") rels = el.value
            else rels += "," + el.value
        });

        console.log(rels)
        props.setRels(rels)

    }, [selectedOptions])

    const handleChange = (selected) => {
        setSelectedOptions(selected)
    }

    const handleAllRels = () => {
        setSelectedOptions([...relationsLevel1])
    }

    const handleOptions = () => {
        return [...relationsLevel1]
    }

    return (
        <>
        <div className="relButton" onClick={handleAllRels}>Все связи</div>
        <span
            className="relsSelectBlock"
            data-toggle="popover"
            data-trigger="focus"
            data-content="Выберите связи"
        >
            <ReactSelect
                className="relsSelect"
                options={handleOptions()}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option
                }}
                onChange={handleChange}
                allowSelectAll={true}
                isSearchable={false}
                value={selectedOptions}
                styles={colourStyles}
            />
        </span>
        </>
    )
} 

export default RelationBlock;