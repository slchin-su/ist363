import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('home');
  const [selectedBird, setSelectedBird] = useState(null);
  const [observationsByBird, setObservationsByBird] = useState({})
  const birds = [
    {
      id: 1, name:'Scarlet Tanager',  speciesCode: 'scatan', src:'/images/scarlet-tanager.jpg',  scientificName:'Ammodramus caudacutus', fieldpic:'/images/scarlet-tanager-fieldpic.png', 
      identification: 'Medium-sized songbird with a conical bill. Males possess a red body with black wings and a tail, while females have a yellow-ish green body, as this species is sexually dimorphic.', 
      habitat: 'High in the canopy of the deciduous forest', 
      diet:'blackberries, raspberries, huckleberries, juneberries, serviceberries, mulberries, strawberries, and chokeberries.', 
      funFact:'The Cowbird sometimes places its eggs in the nest of the Scarlet tanager, causing the tanagers to raise the imposter egg as their own.'
    },
    
      {
      id: 2, name:'Saltmarsh Sparrow', speciesCode: 'sstspa', src:'/images/saltmarsh-sparrow.jpg', scientificName:'Piragana olivacera', fieldpic:'/images/saltmarshsparrow-fieldpic.png', 
      identification: 'Medium-sized sparrow with a conical bill. Feathers are grey and orange on the head with a white stomach that has speckles of gray', 
      habitat: 'Tidal salt marshes, found on the south shore of Long Island', 
      diet:'Seeds of marsh plants, occasionally insects', 
      funFact:'The nests of the Saltmarsh Sparrow are most successful when made after the high tide of the new moon, as the new hatchlings can avoid the upcoming high tides'
    },

    {
      id: 3, name:'Piping Plover', speciesCode: 'pipplo', src:'/images/piping-plover.jpg',scientificName:'Charadrius melodus', fieldpic:'/images/piping-plover-fieldpic.png', 
      identification: 'A small, round shorebird with a short bill that has a black tip. Its feathers are greyish-brown on the top with a white stomach and black markings on the collar and head.', 
      habitat: ' lakeshores, alkali wetlands, coastal beaches, sandflats, and mudflats', 
      diet:'ants, spiders, grasshoppers, crickets, beetles, larvae, sea works, mollusks, crustaceans', 
      funFact:'The Piping Plover was the main character of the Disney Pixar short film, “Piper”!'
    },
  ];
  const submittedPhotos = [
    {id: 1, src: '/images/submitted-1.jpeg', alt: 'Submitted Photo 1'},
    {id: 2, src: '/images/submitted-2.jpeg', alt: 'Submitted Photo 1'},
    {id: 3, src: '/images/submitted-3.jpeg', alt: 'Submitted Photo 1'},

  ];

  return (
    <div>
      <Header setPage={setPage} setSelectedBird={setSelectedBird} birds={birds}/>
      {page === 'home' && <HomeScreen birds={birds} setPage={setPage} setSelectedBird={setSelectedBird}/>}
      {page === 'bird-detail' && (
        <BirdScreen bird={selectedBird} observations={observationsByBird[selectedBird?.id] || [{id: 1, item: 'Add your observations here!'}]}
        setObservations={(newObs) => setObservationsByBird(prev => ({...prev, [selectedBird.id]:newObs}))}
        />
      )}
      {page === 'mission' && <MissionScreen submittedPhotos={submittedPhotos}/>}
      <Footer />
      
    </div>
  );

};

//HOME PAGE
function HomeScreen({birds, setPage, setSelectedBird}) {

  return (
    <div>
      <Banner setPage={setPage}/>
      <div id="general-container">
        <h1>Discover New York's Birds</h1>
        <p>This selection of birds was chosen for their role as indicator species, which reflect the health of the ecosystem they reside in, as identified by the Audubon Society.</p>
        <BirdCard birds={birds} setPage={setPage} setSelectedBird={setSelectedBird}/>
      </div>
    </div>
  )

  
}
function Header({setPage, setSelectedBird, birds}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
   <header>
        <div id="header-logo" onClick={() => setPage('home')} style={{cursor: 'pointer'}}>
            <img src="/images/bird-icon.png" alt="bird logo" id="logo"/>
            <h1 id="company-name">New York Birds</h1>
        </div>
        <div id="header-links">
            <a className="link" onClick={() => setPage('home')}>Home</a>
            <div id="birds-dropdown">
              <a className="link" onClick={() => setDropdownOpen(!dropdownOpen)}>
                The Birds <i className="fa-solid fa-chevron-down"></i>
              </a>
              {dropdownOpen && (
                <div id="dropdown-menu">
                  {birds.map(bird => (
                    <a key={bird.id} className="dropdown-item" onClick={() => {
                      setSelectedBird(bird);
                      setPage('bird-detail');
                      setDropdownOpen(false);
                    }}>
                      {bird.name}
                      </a>
                  ))}
            </div>
            )}
            </div>
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

function Banner({setPage}) {
  return (
    <div id="banner-container">
        <img src="/images/bird-banner.jpg" alt="raven flying" id="banner" />
        <div id="banner-text">
            <h1 id="banner-header">Join the Birding <br /> Community</h1>
            <button id="banner-button" onClick={() => setPage('mission')}>Our Mission <i className="fa-solid fa-arrow-right"></i></button>
        </div>     
    </div>
  )
}


function BirdCard({birds, setPage, setSelectedBird}) {
    return (
      <div>
        <div id="all-birds"> 
          {birds.map(function(bird) {
              return (
                <div key={bird.id} className="bird-card">
                    <img src={bird.src} alt="bird1" className="bird-img"/>
                    <h2>{bird.name}</h2>
                    <i className="scientific-name">{bird.scientificName}</i>
                    <button className="greenbutton" onClick={() => {setSelectedBird(bird); setPage('bird-detail');}}>
                      Learn More <i className="fa-solid fa-arrow-right"></i></button>
                </div>   
              );
          })} 
        </div>  
      </div>
    );
    }

//BIRD INFO
function BirdScreen({bird, observations, setObservations}) {
  if (!bird) {
    return <p>Select a bird</p>
  }
  return (
    <div id="general-container">
      <div id="full-flexbox">
        <BirdInfo bird={bird} observations={observations} />
        <FieldJournal bird={bird} observations={observations} setObservations={setObservations} />
      </div>
   </div>
  );
}

function BirdInfo({bird}) {
  return (
    <main>
        <h1 className="bird-name">{bird.name}</h1>
        <i className="bird-name">{bird.scientificName}</i>
        <div id="bird-info">
            <div id="bird-info-col-01">
                <img src={bird.src} alt={bird.name} id="id-image" />
          
            </div>
            <div id="bird-info-col-02">
                <div className="bird-text">
                    <strong>Identification: </strong>
                    <span>{bird.identification}</span>
                </div>
                <div className="bird-text">
                    <strong>Habitat: </strong>
                    <span>{bird.habitat}</span>
                </div>
                <div className="bird-text">
                    <strong>Diet: </strong>
                    <span>{bird.diet}</span>
                </div>
                <div className="bird-text">
                    <strong>Fun Fact: </strong>
                    <span>{bird.funFact}</span>
                </div>
            </div>
        </div>
        <RecentObservations speciesCode={bird.speciesCode} birdName={bird.name}/> 
    </main>
  )

}

function RecentObservations ({speciesCode, birdName}) {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.ebird.org/v2/data/obs/US-NY/recent/${speciesCode}?maxResults=5`, {
      headers: {
        'X-eBirdApiToken': 'qjpd73c9lj91'
      }
    })
    .then(res => res.json())
    .then(data => {
      setObservations(data);
      setLoading(false);
    })
    .catch(err => {
      setError('Observations could not be fetched')
      setLoading(false);
    });
    }, [speciesCode]);
    if (loading) return <div className="whitebox"><h3>Recent Observations</h3><p>Loading...</p></div>;
    if (error) return <div className="whitebox"><h3>Recent Observations</h3><p>{error}</p></div>;
  return (
    <div className="whitebox">
      <h3>Recent Observations <i className="fa-solid fa-binoculars" style={{color: 'rgb(0, 0, 0)'}}></i></h3>
      <p>Here are some of the most recent recorded sightings of the {birdName} in New York State!</p>
        {observations.length === 0
        ? <li className="observationslist">No recent observations found.</li>
      : <table id="observations-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
            {observations.map(obs => (
              <tr key={obs.obsId}>
                <td>{obs.locName}</td>
                <td>{obs.obsDt}</td>
                <td>{obs.howMany ?? '-'}</td>
              </tr>
            ))}
        </tbody>
      </table>
  }
  </div>
  );
}

function FieldJournal ({bird, observations, setObservations}) {
  return (
    <section id="fieldpractice">
      <img src={bird.fieldpic} alt={bird.name} id="fieldpic" />
      <div id="observations">
          <h3 className="fieldjournal">Field Journal</h3>
          <p className="fieldjournal">What do you observe?</p>
          <AddObservation observations={observations} setObservations={setObservations}/>
      </div>
      <div id="journal-container">
          <img src="/images/fieldjournal.png" alt="Journal" id="journalimage"/>
          <div id="journal-text">
             <JournalObservations observations={observations}/>
          </div>
      </div>
  </section>
  );
}



const AddObservation = ({observations, setObservations}) => {
  const [name, setName] = useState('')
  const maxObservations = 7;

  const addObservation = () => {
    if (observations.length >= maxObservations) return;
      setObservations([
        ...observations,
        {id: Date.now(), item: name}
      ]);
    setName('')
  };

    return (
    <div>
    <input id="task" type="text" value={name} placeholder="I see..." onChange={e => setName(e.target.value)} />
    <button id="observationbutton" onClick={addObservation}>Add Observation</button>
    {observations.length>=maxObservations &&
    <p>You've reached the end of your page!</p>}
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

//MISSION PAGE
function MissionScreen ({submittedPhotos}) {
  return (
     <div id="general-container">
        <h1>Our Mission</h1>
        <p>At New York Birds, we are adamant about introducing the new generation to the exhilarating world of birds. We host organizational meetings around birdwatching and research, where anyone is welcome to join. Expand your knowledge of ornithology and learn how to report your sightings!</p>
        <h2>Submitted Photos</h2>
        <div id="submitted-gallery">
          {submittedPhotos.map(photo => (
            <img key={photo.id} src={photo.src} alt={photo.alt} className="submitted-pic" />
          ))}
        </div>
      <JoinUsForm />
      </div>
  )
}

function JoinUsForm () {
  const [formData, setFormData] = useState ({
    fname: '',
    lname: '',
    email: '',
    source: '',
    interest: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id="form-text">
      <h1 className="formspace">Join New York Birds!</h1>
      {submitted && (
        <p><strong>Thank you for joining New York Birds! We will send information regarding your membership shortly.</strong></p>
      )}
      <label htmlFor="fname">First name: </label>
      <input type="text" id="fname" name="fname" className="formspace" onChange={handleChange} value={formData.fname}/><br/>

      <label htmlFor="lname"className="formspace" >Last name: </label>
      <input type="text" id="lname" name="lname" className="formspace" onChange={handleChange} value={formData.lname}/><br/>
      
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" name="email" className="formspace" onChange={handleChange} value={formData.email}/><br/>


      <label htmlFor="sourcet">How did you hear about us?</label><br/>

      <input type="radio" id="member" name="source" value="member" checked={formData.source ==='member'} onChange={handleChange} />
      <label htmlFor="member">A NYBirds Member</label><br/>

      <input type="radio" id="familyfriends" name="source" value="familyfriends" checked={formData.source ==='familyfriends'} onChange={handleChange}/>
      <label htmlFor="familyfriends">Family/Friend</label><br/>

      <input type="radio" id="ad" name="source" value="ad" checked={formData.source ==='ad'} onChange={handleChange}/>
      <label htmlFor="ad">Advertisement</label><br/>

      
      <label id="areaspace" htmlFor="interest">Why you're interested:</label><br/>
      <textarea  id="interest" name="interest" rows="4" cols="50" value={formData.interest} onChange={handleChange}>
      </textarea><br />

      <button type="submit" id="submitbutton">Submit</button>
      </div>
    </form>
  );
}

export default App
