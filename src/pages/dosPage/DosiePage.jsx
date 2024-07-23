import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import './dosiePage.scss';
import './loader.scss';

import axios from 'axios';
import LeftBottomFrame from '../../components/dossierComponents/left-bottom-frame/LeftBottomFrame';
import LeftTopFrame from '../../components/dossierComponents/left-top-frame/LeftTopFrame';
import RightBottomFrame from '../../components/dossierComponents/right-bottom-frame/RightBottomFrame';
import RightTopFrame from '../../components/dossierComponents/rigth-top-frame/RightTopFrame';
import { dossierURL } from '../../data/dossier';
import HierarchyChart from './Hierarchy';
import leftArrow from './left-arrow-svgrepo-com.svg';

import { dossierPage } from './dossierPage/dossierLocal';

const DosiePage = (props) => {
    const [leftTopFrameData, setLeftTopFrameData] = useState({});
    const [docs, setDocs] = useState([])
    const [transport, setTransport] = useState([])
    const [relatives, setRelatives] = useState([])
    const [addresses, setAddresses] = useState([])
    const [photo, setPhoto] = useState([])
    const [base, setBase] = useState('')
    const { iin } = useParams();
    const [loading, isLoading] = useState(true)

    const [photos, setPhotos] = useState([])

    // risks
    const [criminals, setCriminals] = useState([])
    const [convicts, setConvicts] = useState([])
    const [schools, setSchools] = useState([])
    const [universities, setUniversities] = useState([])
    const [pensions, setPensions] = useState([])
    const [military, setMilitary] = useState([])
    const [militaryEntities, setMilitaryEntities] = useState([])
    const [nedvijimost, setNedvijimost] = useState([])
    const [contacts, setContacts] = useState([])
    const [firstCreditBureauEntities, setFirstCreditBureauEntities] = useState([])
    const [blockEsf, setBlockEsf] = useState([])
    const [equipment, setEquipment] = useState([])
    const [mzEntities, setMzEntities] = useState([])
    const [convictsTerminatedByRehabs, setConvictsTerminatedByRehabs] = useState([])

    const [accountantListEntities, setAccountantListEntities] = useState([])
    const [advocateListEntities, setAdvocateListEntities] = useState([])
    const [auditorsListEntities, setAuditorsListEntities] = useState([])
    const [bailiffListEntities, setBailiffListEntities] = useState([])
    const [ipgoEmailEntities, setIpgoEmailEntities] = useState([])
    const [detdom, setDetdom] = useState([])
    const [adms, setAdms] = useState([])
    const [amoral, setAmorals] = useState([])
    const [convictsAbroads, setConvictsAbroads] = useState([])
    const [dismissals, setDismissals] = useState([])
    const [incapacitateds, setIncapacitateds] = useState([])
    const [kuis, setKuis] = useState([])
    const [drugAddicts, setDrugAddicts] = useState([])
    const [beneficiariesLists, setBeneficiariesLists] = useState([])
    const [ulLeaders, setUlLeaders] = useState([]) // Ul svedenia ob uchastiy
    const [flUlFounders, setFlUlFounders] = useState([])
    const [wantedList, setWantedList] = useState([])

    const [commodityProducers, setCommodityProducers] = useState([])

    const [json, setJson] = useState(true)

    const [pdl, setPdl] = useState([])

    const [menuOpen, setMenuOpen] = useState(false)

    const [hierarchy, setHierarchy] = useState(false)
   
    useEffect(() => {
        const searchIIN = () => {
            isLoading(true)
            const params = {iin: iin}
                axios.get(dossierURL+'profile', {params: params})
                    .then(res => {
                        console.log(res.data)
                        // setGraph(res.data.children)
                        setPhoto(res.data.photoDbf)
                        setLeftTopFrameData(res.data.mvFls)
                        setRelatives(res.data.fl_relatives)
                        if (res.data.photoDbf && res.data.photoDbf[0].photo) setBase(res.data.photoDbf[0].photo)
                        setPhotos(res.data.photoDbf)
                        // res.data.photoDDFmap()
                        setBeneficiariesLists(res.data.beneficiariesLists)
                        setAddresses(res.data.regAddressFls)
                        setDocs(res.data.mvIinDocs)
                        setTransport(res.data.mvAutoFls)
                        setKuis(res.data.kuis)
                        setIncapacitateds(res.data.incapacitateds)
                        setSchools(res.data.schools)
                        setUniversities(res.data.universities)
                        setCriminals(res.data.criminals)
                        setConvicts(res.data.convictsJustifieds)
                        setPensions(res.data.flPensionContrs)
                        setNedvijimost(res.data.mvRnOlds)
                        setContacts(res.data.contacts)
                        setFirstCreditBureauEntities(res.data.firstCreditBureauEntities)
                        setBlockEsf(res.data.blockEsfs)
                        setEquipment(res.data.equipment)
                        setDrugAddicts(res.data.drugAddicts)
                        setMilitary(res.data.millitaryAccounts)
                        setMilitaryEntities(res.data.militaryAccounting2Entities)
                        setMzEntities(res.data.mzEntities)
                        setConvictsTerminatedByRehabs(res.data.convictsTerminatedByRehabs)
                        
                        setAccountantListEntities(res.data.accountantListEntities)
                        setAdvocateListEntities(res.data.advocateListEntities)
                        setAuditorsListEntities(res.data.auditorsListEntities)
                        setBailiffListEntities(res.data.bailiffListEntities)
                        setWantedList(res.data.wantedListEntities)
        
                        setIpgoEmailEntities(res.data.ipgoEmailEntities)
                        setDetdom(res.data.orphans)
                        setAdms(res.data.adms)
        
                        setUlLeaders(res.data.ul_leaderList)
                        setAmorals(res.data.amoral)
                        setConvictsAbroads(res.data.convictsAbroads)
                        setDismissals(res.data.dismissals)
                        setFlUlFounders(res.data.mvUlFounderFls)
                        setCommodityProducers(res.data.commodityProducers)
        
                        setPdl(res.data.pdls)
        
        
                        isLoading(false)
                    })
                    .catch(e => {
                        let res = dossierPage.find(x => x.object.substring(0, 6) == iin)
                        console.log(res)
                        setPhoto(res.photoDbf)
                        setLeftTopFrameData(res.mvFls)
                        setRelatives(res.fl_relatives)
                        if (res.photoDbf && res.photoDbf[0].photo) setBase(res.photoDbf[0].photo)
                        setPhotos(res.photoDbf)
                        res.data.photoDDFmap()
                        setAddresses(res.regAddressFls)
                        setDocs(res.mvIinDocs)
                        setTransport(res.mvAutoFls)
                        setSchools(res.schools)
                        setUniversities(res.universities)
                        setCriminals(res.criminals)
                        setConvicts(res.convictsJustifieds)
                        setPensions(res.flPensionContrs)
                        setNedvijimost(res.mvRnOlds)
                        setContacts(res.contacts)
                        setFirstCreditBureauEntities(res.firstCreditBureauEntities)
                        setBlockEsf(res.blockEsfs)
                        setEquipment(res.equipment)
                    
                        setMilitary(res.millitaryAccounts)
                        setMilitaryEntities(res.militaryAccounting2Entities)
                        setMzEntities(res.mzEntities)
                        setConvictsTerminatedByRehabs(res.convictsTerminatedByRehabs)
                    
                        setAccountantListEntities(res.accountantListEntities)
                        setAdvocateListEntities(res.advocateListEntities)
                        setAuditorsListEntities(res.auditorsListEntities)
                        setBailiffListEntities(res.bailiffListEntities)
                        setWantedList(res.wantedListEntities)
                    
                        setIpgoEmailEntities(res.ipgoEmailEntities)
                        setDetdom(res.orphans)
                        setAdms(res.adms)
                    
                        setUlLeaders(res.ul_leaderList)
                        setFlUlFounders(res.mvUlFounderFls)
                        setCommodityProducers(res.commodityProducers)
                    
                        setPdl(res.pdls)
                    
                    
                        isLoading(false)
                    })
            }

        searchIIN()
    }, [iin])

    if (!loading) {
        return (  
            <>
                <div className='dosiePage'>
                        <div className="central-bar">
                        {!hierarchy ? 
                            <div className="frames">
                                <LeftTopFrame photo={base} photos={photos} data={leftTopFrameData}/>
                                <RightTopFrame setHierarchy={setHierarchy} relatives={relatives}/>
                                <LeftBottomFrame 
                                    flUlFounders={flUlFounders} 
                                    ulLeaders={ulLeaders} 
                                    docs={docs} addresses={addresses} transport={transport} 
                                    schools={schools} universities={universities} pensions={pensions} military={military} militaryEntities={militaryEntities}
                                    nedvijimost={nedvijimost} contacts={contacts} equipment={equipment} accountantListEntities={accountantListEntities} advocateListEntities={advocateListEntities} auditorsListEntities={auditorsListEntities} bailiffListEntities={bailiffListEntities} ipgoEmailEntities={ipgoEmailEntities} commodityProducers={commodityProducers}/>
                                <RightBottomFrame wantedList={wantedList} pdl={pdl} convictsTerminatedByRehabs={convictsTerminatedByRehabs} criminals={criminals} convicts={convicts} firstCreditBureauEntities={firstCreditBureauEntities} blockEsf={blockEsf} mzEntities={mzEntities} detdom={detdom} adms={adms} Amoral={amoral} dismissal={dismissals} beneficiariesList={beneficiariesLists} convictsAbroads={convictsAbroads} drugAddicts={drugAddicts} kuis={kuis} incapacitateds={incapacitateds}/>
                            </div>
                            : 
                            <div className="for-padding">
                                <div className="hierarchy">
                                    <img className='back' onClick={() => {setHierarchy(false)}} src={leftArrow} alt="Назад" />                                
                                    {/* <a onClick={() => {setHierarchy(false)}}>Назад</a> */}
                                   <HierarchyChart iin={iin}/>
                                </div>    
                            </div>    
                        }
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

export default DosiePage;