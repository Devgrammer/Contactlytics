import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './pages/ContactList';
import ContactDetails from './pages/ContactDetails';
import ChartAndMap from './pages/ChartAndMap';
import Layout from './components/layout';



const App: React.FC = () => {
  //Things to do
  //1 Create a router and define the routes
  //2 Create ContactList Component
  //3 Create ContactDetails Component
  //4 Create Charts&Map Component
  //5 Create Redux Store  contacts

  return (

    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<ContactList />} />
          <Route path='/contacts/:id' element={<ContactDetails />} />
          <Route path='/chart-and-map' element={<ChartAndMap />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
