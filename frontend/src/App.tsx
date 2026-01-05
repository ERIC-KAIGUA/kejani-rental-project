import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider, SignedIn } from '@clerk/clerk-react'
import { AuthSync } from './services/AuthSync'
import Index from './pages/Index'
import LandlordAbout from './pages/LandlordAbout'
import ScrollToTop from './hooks/ScrollToTop'
import TenantAbout from './pages/TenantAbout'
import Dashboard from './pages/Dashboard'
import Enquiries from './pages/Enquiries'
import Favourites from './pages/Favourites'
import PremiumTenant from './pages/PremiumTenant'
import Addlistings from './pages/Addlistings'
import Searchpage from './pages/Searchpage'
import ItemProperty from './pages/ItemProperty'
import MessageLandlord from './pages/MessageLandlord'
import Landingpage from './pages/Landingpage'
import EditProfile from './pages/EditProfile'
import VerifyDetails from './pages/VerifyDetails'
import DeleteAccount from './pages/DeleteAccount'


 const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }


const App = () => {
  return (
    <div>
      <Router>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <AuthSync />
            <ScrollToTop />
            <Routes>
              <Route path='/'  element={<Index/>}> </Route>
              <Route path ='/Landingpage' exact element={<Landingpage />}></Route>
              <Route path='/LandlordAbout' exact element={<LandlordAbout/>}></Route>
              <Route path='/TenantAbout' exact element={<TenantAbout/>}></Route>
              <Route path='/Dashboard' exact element={<SignedIn> <Dashboard/> </SignedIn>}></Route>
              <Route path='/Enquiries' exact element={<Enquiries/>}></Route>
              <Route path='/Favourites' exact element={<Favourites />}></Route>
              <Route path='/PremiumTenant' exact element={<PremiumTenant/>}></Route>
              <Route path='/Addlistings' exact element={<SignedIn> <Addlistings/> </SignedIn>}></Route>
              <Route path='/Searchpage' exact element={<Searchpage/>}></Route>
              <Route path='/ItemProperty/:id' exact element={<ItemProperty/>}></Route>
              <Route path='/MessageLandlord' exact element={<MessageLandlord />}></Route>
              <Route path='/EditProfile' exact element={<EditProfile />}></Route>
              <Route path='/VerifyDetails' exact element={<VerifyDetails />}></Route>
              <Route path='/DeleteAccount' exact element={<DeleteAccount/>}></Route>
            </Routes>
        </ClerkProvider>
      </Router>
      <Toaster toastOptions={{
        removeDelay:500,
        className:'font-quicksand font-semibold text-sm text-green-500 bg-green-300',
        style:{
          color:"#16610E",
          backgroundColor:"#FFFFF0"
        }
      }}></Toaster>
    </div>
  )
}



export default App
