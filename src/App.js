import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import NewList from './components/NewList';
import Select from './components/Select';

function App() {

  const apiUrl = "/api"
  const auth = {
    username: "tester",
    password: "test123"
  }

  async function fetchData() {
    const disease = await axios.get(apiUrl + "/disease/", auth)
    const drug = await axios.get(apiUrl + "/drug/", auth)
    const specialization = await axios.get(apiUrl + "/specialization/", auth)
    const organ = await axios.get(apiUrl + "/organ/", auth)
    const symptom = await axios.get(apiUrl + "/symptom/", auth)
    const medicalaction = await axios.get(apiUrl + "/medical-action/", auth)
    setdisease(disease.data)
    setdrug(drug.data)
    setspec(specialization.data)
    setorgan(organ.data)
    setsymptom(symptom.data)
    setmedact(medicalaction.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  async function Send_disease_drug() {
    await axios.post(
      apiUrl + "/disease/create-link-drug/",
      ({ diseaseId: id, drugsId: id1 }),
      auth
    )
    cleartable()
  }

  async function Send_disease_specialization() {
    await axios.post(
      apiUrl + "/disease/create-link-specialization/",
      ({ diseaseId: id, specializationsId: id1 }),
      auth
    )
    cleartable()
  }

  async function Send_specialization_organ() {
    await axios.post(
      apiUrl + "/specialization/create-link-organ/",
      ({ specializationsId: id, organsId: id1 }),
      auth
    )
    cleartable()
  }

  async function Send_dis_sym_org() {
    await axios.post(
      apiUrl + "/dis-sym-org/create",
      ({ diseaseId: id, symptomId: idsym, organsId: idorg }),
      auth
    )
    cleartable()
  }

  async function Send_disease_medical_action() {
    await axios.post(
      apiUrl + "/disease/create-link-mediacal_action/",
      ({ diseaseId: id, MedicalActionsId: id1 }),
      auth
    )
    cleartable()
  }

  const [disease, setdisease] = useState([])
  const [drug, setdrug] = useState([])
  const [specialization, setspec] = useState([])
  const [organ, setorgan] = useState([])
  const [symptom, setsymptom] = useState([])
  const [medact, setmedact] = useState([])

  const [relationships] = useState([
    { id: 0, title: "disease_drug" },
    { id: 1, title: "disease_specialization" },
    { id: 2, title: "specialization_organ" },
    { id: 3, title: "dis_sym_org" },
    { id: 4, title: "disease_medical_action" }
  ])

  const [selectedrel, setselectedrel] = useState('')

  const [id, setid] = useState()
  const [idsym, setidsym] = useState()
  const [idorg, setidorg] = useState()
  const [id1, setid1] = useState([])

  const linktable = (tab) => {
    setselectedrel(tab)
    setid(undefined)
    setidsym(undefined)
    setidorg(undefined)
    id1.splice(0)
  }
  
  const [ cl, setcl ]= useState (false)

  function cleartable(){
    setcl(true)
    setid(undefined)
    setidsym(undefined)
    setidorg(undefined)
    id1.splice(0)
    setcl(false)
  }


  const getvalue = (item) => {
    setid(item.id)
  }

  const getvalue1 = (item) => {
    setid1([...id1, item.id])
  }

  const removevalue1 = (item) => {
    setid1(id1.filter(i => i !== item.id))
  }

  return (
    <div className="App">
      <Select table={relationships} defaultValue={"Выберите связь таблиц"} value={selectedrel} onChange={linktable} />
      {selectedrel === '0'
        ? <div className="list">
          <List table={disease} getvalue={getvalue} clear={cl} />
          <NewList table={drug} getvalue={getvalue1} removevalue={removevalue1} clear={cl} />
          <button className="button-rel" onClick={Send_disease_drug}>Связать</button>
        </div>
        : <div></div>
      }

      {selectedrel === '1'
        ? <div className="list">
          <List table={disease} getvalue={getvalue} clear={cl}/>
          <NewList table={specialization} getvalue={getvalue1} removevalue={removevalue1} clear={cl}/>
          <button className="button-rel" onClick={Send_disease_specialization}>Связать</button>
        </div>
        : <div></div>
      }

      {selectedrel === '2'
        ? <div className="list">
          <List table={specialization} getvalue={getvalue} clear={cl}/>
          <NewList table={organ} getvalue={getvalue1} removevalue={removevalue1} clear={cl}/>
          <button className="button-rel" onClick={Send_specialization_organ}>Связать</button>
        </div>
        : <div></div>
      }

      {selectedrel === '3'
        ? <div className="list">
          <List table={disease} getvalue={getvalue} clear={cl}/>
          <List table={symptom} getvalue={setidsym} clear={cl}/>
          <List table={organ} getvalue={setidorg} clear={cl}/>
          <button className="button-rel" onClick={Send_dis_sym_org}>Связать</button>
        </div>
        : <div></div>
      }

      {selectedrel === '4'
        ? <div className="list">
          <List table={disease} getvalue={getvalue} clear={cl}/>
          <NewList table={medact} getvalue={getvalue1} removevalue={removevalue1} clear={cl}/>
          <button className="button-rel" onClick={Send_disease_medical_action}>Связать</button>
        </div>
        : <div></div>
      }
    </div>
  );
}

export default App;
