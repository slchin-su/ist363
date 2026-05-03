import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home');
  const birds = [
    {id: 1, name:'Scarlet Tanageer', src:'../../images/scarlet-tanager.jpg', scientificName:'Ammodramus caudacutus', identification: 'Medium-sized sparrow with a conical bill. Feathers are grey and orange on the head with a white stomach that has speckles of gray', habitat: 'Tidal salt marshes, found on the south shore of Long Island', diet:'Seeds of marsh plants, occasionally insects',},
    {id: 2, name:'Saltmarsh Sparrow', src:'../../images/saltmarsh-sparrow.jpg', scientificName:'Piragana olivacera', identification: 'Medium-sized sparrow with a conical bill. Feathers are grey and orange on the head with a white stomach that has speckles of gray', habitat: 'Tidal salt marshes, found on the south shore of Long Island', diet:'Seeds of marsh plants, occasionally insects',},
    {id: 3, name:'Piping Plover', src:'../../images/piping-plover.jpeg',scientificName:'Charadrius melodus', identification: 'Medium-sized sparrow with a conical bill. Feathers are grey and orange on the head with a white stomach that has speckles of gray', habitat: 'Tidal salt marshes, found on the south shore of Long Island', diet:'Seeds of marsh plants, occasionally insects',},
  ]
  
  const [observations, setObservations] = useState(initialObservations);

  return (
    <div>
      <Header setPage={setPage}/>
      {page === 'home' && <HomeScreen birds={birds} setPage={setPage} />}
      {page === 'birds' && <BirdScreen birds={birds} />}
      {page === 'mission' && <MissionScreen />}
      <Footer />
      <AddObservation observations={observations} setObservations={setObservations} />
      <JournalObservations observations={observations} setObservations={setObservations}/>
    </div>
  );

};

//HOME PAGE
function HomeScreen({birds, setPage}) {

  return (
    <div>
      <div id="banner-container">
        <Banner setPage={setPage}/>
      </div>
      <div id="general-container">
        <h1>Discover New York's Birds</h1>
        <p>This selection of birds was chosen for their role as indicator species, which reflect the health of the ecosystem they reside in, as identified by the Audubon Society.</p>
        <BirdCard birds={birds}/>
      </div>
    </div>
  )

  
}
function Header({setPage}) {
  return (
   <header>
        <div id="header-logo">
            <img src="../images/bird-icon.png" alt="bird logo" id="logo"/>
            <h1 id="company-name">New York Birds</h1>
        </div>
        <div id="header-links">
            <a className="link" onClick={() => setPage('home')}>Home</a>
            <a className="link" onClick={() => setPage('birds')}>The Birds</a>
            <a className="link" onClick={() => setPage('mission')}>Our Mission</a>
        </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>
          &copy; New York Birds 2026
      </p>
            
    </footer>
  )
}

function Banner() {
  return (
    <div id="banner-container">
        <img src="../images/bird-banner.jpg" alt="raven flying" id="banner" />
        <div id="banner-text">
            <h1 id="banner-header">Join the Birding <br /> Community</h1>
            <button id="banner-button">Our Mission <i className="fa-solid fa-arrow-right"></i></button>
        </div>     
    </div>
  )
}


function BirdCard({birds}) {
    return (
      <div>
        <div id="all-birds"> 
          {birds.map(function(bird) {
              return (
                <div className="bird-card">
                    <img src={bird.src} alt="bird1" className="bird-img"/>
                    <h2>{bird.name}</h2>
                    <i>{bird.scientificName}</i><br/>
                    <button className="greenbutton">Learn More <i className="fa-solid fa-arrow-right"></i></button>
                </div>   
              );
          })} 
        </div>  
      </div>
    );
    }


// Field Journal Entry

let initialObservations = [
  {id: 1, item: 'Write your observations here!'},
  
]
let nextId = 2;


const AddObservation = ({observations, setObservations}) => {
  const [name, setName] = useState('')

  const addObservation = () => {
    setObservations([
      ...observations,
      {id: nextId++, item: name}
    ]);
    setName('')
  };

    return (
    <div>
    <input id="task" type="text" value={name} placeholder="Write Your Observations" onChange={e => setName(e.target.value)} />
    <button onClick={addObservation}>Add Observation</button>
    </div>
    );
};

function JournalObservations({observations, setObservations}) {
    return (
      <div>
        <ul>
          {observations.map(obs => (
          <li key={obs.id}>{obs.item}</li>
          ))}
        </ul>
      </div>
    );
    }



export default App
