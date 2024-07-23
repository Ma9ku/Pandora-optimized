import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { dossierURL } from '../../data/dossier';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import authService from "../../services/auth.service";

import './dosiePage.scss'
import './loader.scss'

import LeftTopFrame from '../../components/dossierComponents/ul-left-top-frame/UlLeftTopFrame';
import RightTopFrame from '../../components/dossierComponents/ul-right-top-frame/UlRightTopFrame';
import LeftBottomFrame from '../../components/dossierComponents/ul-left-bottom-frame/UlLeftBottomFrame';
import RightBottomFrame from '../../components/dossierComponents/ul-right-bottom-frame/UlRightBottomFrame';
import axios from 'axios';

// const baseURL = 'http://192.168.30.24:9095/'

const UlDosiePage = (props) => {
    const { bin } = useParams();
    const [loading, isLoading] = useState(null)
    const [uchreditel, setUchreditel] = useState([])


    const [fullName, setFullName] = useState('')
    const [ulBin, setUlBin] = useState(0)
    const [nedvijimost, setNedvijimost] = useState([])
    const [address, setAddress] = useState({})
    const [pdl, setPdl] = useState([])

    //RISKS
    const [opg, setOpg] = useState([])
    const [BlockEsfBlock, setBlockESF] = useState([])
    const [nds, setNds] = useState([])
    const [bankrot, setBankrot] = useState([])
    const [omn, setOMN] = useState([])

    const [founders, setFounders] = useState([{}, {}])
    const [taxes, setTaxes] = useState([])
    const [mshes, setMshes] = useState([])
    const [pension, setPension] = useState([])
    const [autos, setAutos] = useState([])
    const [commodityProducers, setCommodityProducers] = useState([])
    const [accountant, setAccountant] = useState([])

    const [taxCount, setTaxCount] = useState(0) 


    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const searchIIN = () => {
            isLoading(true)
            const params = {bin: bin}

            axios.get(dossierURL+'cc', {params: params}).then(res => {
                setFullName(res.data.mvUls[0] ? res.data.mvUls[0].full_name_rus : '')
                setAddress(res.data.regAddressUlEntities)
                setPdl(res.data.pdls)
                setOpg(res.data.opgEntities)
                setBlockESF(res.data.blockEsfs)
                setNds(res.data.ndsEntities)
                setBankrot(res.data.bankrots)
                setOMN(res.data.omns)
                setUlBin(bin)
                console.log(res.data)
                setFounders(res.data.mvUlFounderFls)
                setNedvijimost(res.data.mvRnOlds)
                setTaxes(res.data.taxOutEntities)
                setMshes(res.data.mshes)
                setAutos(res.data.mvAutoFls)
                console.log(res.data.pensionYearAndEmpNum)
                setPension((curr) => res.data.pensionYearAndEmpNum)
                setCommodityProducers(res.data.commodityProducers)
                setAccountant(res.data.accountantListEntities)
                setUchreditel(res.data.svedenyaObUchastnikovUlEntities)
                setTaxCount(res.data.taxCount);
                isLoading(false)
            })
        }
        
        searchIIN()
        // console.log(pension)
    }, [bin])

    const logoutHandler = () => {
        authService.logout();
        // navigate('/login');
    }

    if (!loading) {
        return (  
            <>
                <div className='dosiePage'>
                    <div className="central-bar">
                        <div className="frames">
                            <LeftTopFrame fullName={fullName} bin={ulBin} address = {address}/>
                            <RightTopFrame uchreditel={uchreditel} founders={founders} pdls={pdl}/>
                            <LeftBottomFrame taxCount={taxCount} accountant={accountant} commodityProducers={commodityProducers} mshes={mshes} taxes={taxes} nedvijimost={nedvijimost} pension={pension} bin={bin} autos={autos}/>
                            <RightBottomFrame opg={opg} esf={BlockEsfBlock} nds={nds} bankrot={bankrot} omn={omn}/>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (  
            <div className='dosiePage'>
                <div className='loadComponent'>
                    <div className="dim"></div>
                    <div className='load'>
                        <div className="tab11">
                        </div>
                        <div className="tab12">
                        </div>
                        <div className="tab31">
                        </div>
                        <div className="tab32">
                        </div>

                        <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

}

export default UlDosiePage;