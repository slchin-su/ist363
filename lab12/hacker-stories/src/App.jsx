import './App.css'
import { useState } from 'react'

const App = () => {
    const [pioneers, setPioneers] = useState([
    {id: 1, Viewed: 'False', name: 'Elizabeth J. Feinler', imagesrc: '/images/ElizabethFeinler.jpg', age: 94, KnownFor:'overseeing ARPANET which turned into the internet and inventing the concept of top-level domains like .com, .net, and .edu. She served as the director of the Network Information Systems Center at the Stanford Research Institute and operated the Network Information Center for ARPANET.'},
    {id: 2, Viewed: 'False', name: 'Tim Berners Lee', imagesrc: '/images/TimBernersLee.jpg', age: 69, KnownFor:'Inventor of the World Wide Web, the HTML markup language, the URL system, and HTTP. He founded W3C, and is a research fellow at the University of Oxfort and served as a professor for the Massachusetts Institute of Technology.'},
    {id: 3, Viewed: 'False', name: 'Ray Tomlinson', imagesrc: '/images/RayTomlinson.jpg', age: 'deceased', KnownFor:'Inventor of email and the use of "@" in addresses. He helped develop the TENEX operating system while working at BBN, and developed the CPYNET file transfer program.'},
    ]);

    const clickedCard = (id) => {
    setPioneers(pioneers.map(function(pioneer) {
        if (pioneer.id === id) {
            return {...pioneer, Viewed: 'True'};
        }
        return pioneer;
    }));

}
    const [page, setPage] = useState('home');
    const [selectedPioneer, setSelectedPioneer] = useState(null);

    //Viewed Label
    const ViewedLabel = ({viewed}) => {
        if (viewed === 'True') {
            return (
                <div className="p-1 rounded" id="viewed" style= {{width: '80px', backgroundColor: 'rgba(255, 0, 0, 0.752)'}}>
                    VIEWED
                </div>  
            )
            }
            return null;
        }

    //Main directory "Home" screen    
    function HomeScreen({list, setPage, setSelectedPioneer, clickedCard}) {
        return (
            //Main Flexbox
            <div>
                <h1 className="m-3">Internet Pioneers Bios</h1>
                <div className="d-flex flex-wrap gap-3 m-2">
                    {list.map(function(pioneer) {
                        return <PioneerCard key={pioneer.id} pioneer={pioneer} setPage={setPage} setSelectedPioneer={setSelectedPioneer} clickedCard={clickedCard}/>

                    })}
                </div>
            </div>
            );
    }

    function PioneerCard({pioneer, setSelectedPioneer, setPage, clickedCard}) {
        return (
            //Child component cards for flexbox
            <div>
                <div onClick={() => {setPage('pioneerInfo'); setSelectedPioneer(pioneer); clickedCard(pioneer.id);}} className="card p-2 m-2" style={{ width: '18rem' }}>
                    <img src={pioneer.imagesrc} alt={pioneer.name} className="card-image-top rounded img-fluid" />
                    <div className="card-img-overlay text-light text-center">
                        <ViewedLabel viewed={pioneer.Viewed} />
                    </div>
                    <div className="card-body text-center">
                        <h2 className="card-title">{pioneer.name}</h2>
                    </div>
                </div>
            </div>
        );
    }

    //Information Screen Popup when a person is clicked
    function PioneerInfo ({pioneer, setPage, setSelectedPioneer}) {
        return (
            <div className="m-3">
                <h1 className="m-3">Internet Pioneers Bios</h1>
                    <div className="p-4 m-2 bg-secondary text-light rounded">
                        <h5 className="text-light">{pioneer.name}</h5>
                        <hr />
                        <img src={pioneer.imagesrc} alt={pioneer.name} className="rounded m-4" />
                        <h5 className="mt-4">Age:</h5>
                        <p>{pioneer.age}</p>
                        <h5>Known for:</h5>
                        <p>
                            {pioneer.KnownFor}
                        </p>
                        <button onClick={() => {setPage('home'); setSelectedPioneer(null)}} type="button" className="btn btn-primary">Return to Directory</button>
                    </div>
            </div>
        );
    }

    return (
        <>
            {page === 'home' && <HomeScreen list={pioneers} setPage={setPage} setSelectedPioneer={setSelectedPioneer} clickedCard={clickedCard} />}
            {page === 'pioneerInfo' && <PioneerInfo pioneer={selectedPioneer} setPage={setPage} setSelectedPioneer={setSelectedPioneer} />}
        </>
    )

}

export default App
