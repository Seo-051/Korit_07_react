import { useState } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './App.css'
import { ColDef, ICellEditorParams } from 'ag-grid-community';

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [ keyword, setKeyword ] = useState('');
  const [ repodata, setRepodata ] = useState<Repository[]>([]); 
  const [ columnDefs ] = useState<ColDef[]>([
    {field: 'id', sortable: true, filter: true},              // 컬럼1
    {field: 'full_name', sortable: true, filter: true},       // 컬럼2
    {field: 'html_url', sortable: true, filter: false},       // 컬럼3
    {
      headerName : 'Actions',
      field: 'full_name',
      cellRenderer: (params: ICellEditorParams) => (
        <button
          onClick={() => alert(params.value)}
        >
          Press Me ! 📌
        </button>
      )
    }
  ])

  const handleClick = () => {
    axios.get<{ items : Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(reponse => setRepodata(reponse.data.items))
    .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <input type="text" onChange={e => setKeyword(e.target.value)} value={keyword}/>
      <button onClick={handleClick}>Search📍</button>
      <div className="ag-theme-material"
        style={{height: 500, width: 850}}
      >
        <AgGridReact 
          rowData={repodata}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}  
        />
      </div>
    </div>
  )
}

export default App