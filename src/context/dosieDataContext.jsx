import React, { useState, useEffect, useContext, createContext } from 'react';
import { mockData1 } from '../pages/new-dosie-page/mockData';
import axios from 'axios';
import { dossierURL } from '../data/dossier';

const DataContext = createContext()

const DataProvider = ({ children }) => {
    const [ pIIN, pSetIIN] = useState(null);
    const [ data, setData ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);

    const value = {
        pIIN, 
        pSetIIN,
        data,
        setData,
        isLoading,
        setLoading 
    }

    useEffect(() => {
        console.log(pIIN)
        if (pIIN !== null) {
            const searchIIN = () => {
                axios.get(dossierURL+'profile', {params: { iin: pIIN }})
                    .then((res) => {
                        console.log(res.data);
                        setData(res.data);
                    })
                    .catch(err => {
                        console.log("ERROR")
                        setData(mockData1);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            };
            
            searchIIN();
        }
    }, [pIIN])

    return (
        <DataContext.Provider 
            value={value} 
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;

export const useData = () => {
    return useContext(DataContext)
}
