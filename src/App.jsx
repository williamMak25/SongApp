import { Route, Routes } from 'react-router-dom'
import './App.css'
import { DataContext} from './context/fetchDataContext'
import { SideBar } from './display/sideBar'
import { HomePage } from './display/homePage'
import { SearchPage } from './display/search/searchPage'
import { ArtistProfile } from './display/artistProfile'
import { Artists } from './display/artists'
import { AlbumPage } from './display/albumPage'
import { AlbumTracks } from './display/albumTracks'
import { ErrorPage } from './display/errorPage'
import { ProtectRoute } from './display/protectRoute'
import { ArtistAlbumTrack } from './display/artistAlbumTrack'
import { Song } from './display/song'

function App() {
  
  return (
    <div className="App">
      <DataContext>
      <SideBar/>
        <Routes>
          <Route element={<ProtectRoute/>}>

            <Route path='/' element={<HomePage/>}/>
            <Route path='/search' element={<SearchPage/>}/>
            <Route path='/artist' element={<Artists/>}/>
            <Route path='/tracks' element={<Song/>}/>

            <Route path='/artist/:id' element={<ArtistProfile/>}>
              <Route path='/artist/:id/:albumId' element={<ArtistAlbumTrack/>}/>
            </Route>

            <Route path='/album' element={<AlbumPage/>}/>
            <Route path='/album/:albumId' element={<AlbumTracks/>}/>
            
          </Route>
          <Route path='*' element={<ErrorPage/>}/>
          
        </Routes>
        
      </DataContext>
    </div>
  )
}

export default App
