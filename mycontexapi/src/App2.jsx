import MyComponent from './MyComponent'
import MyComponent2 from './MyComponent2'
import AuthContext from './AuthContext'
import MyList from './MyList'
import MyTable from './MyTable'
import MyForm from './MyForm'
import './App.css'

function App() {

  const username = '김일';

  return (
    <AuthContext.Provider value={username}>
      <MyForm />
      <MyComponent />
      <MyTable />
      <MyComponent2 />
    </AuthContext.Provider>
  )
}

export default App
