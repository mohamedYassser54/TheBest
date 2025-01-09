import React, { useState } from 'react';
import data from './data';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import confetti from 'canvas-confetti';
import '../css/cards.css';

const Card = () => {
  // const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);


  const handleVote = (item) => {
    const votedCards = JSON.parse(localStorage.getItem('votedCards2')) || [];
    
    if (votedCards.includes(item.id)) {
      alert('You can only vote for one card');
      // setFadeOut(false); 
      // setTimeout(() => {
      //   setFadeOut(true); 
      // }, 3000);
      return;

     
    }
  
    if (votedCards.length > 0) {
      alert('You can only vote for one card');
      // setFadeOut(false); 
      // setTimeout(() => {
      //   setFadeOut(true); 
      // }, 3000);
      return;
    }
  
    fetch('https://the-best-server.vercel.app/voteids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        name: item.name,
        description: item.Description,
        img: item.img,
        votes: 1,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage('Vote submitted successfully!');
          setFadeOut(false); 
          setTimeout(() => {
            setFadeOut(true); 
          }, 3000);

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
  
          votedCards.push(item.id);
          localStorage.setItem('votedCards2', JSON.stringify(votedCards));
        } else {
          alert('Failed to submit vote.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the vote.');
      });
  };
  
  
  return (
  
    <div className="allcard">
         {/* {errorMessage && (
        <Alert
          variant="danger"
          style={{
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 1s ease-out',
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
        >
          {errorMessage}
        </Alert>
      )} */}
      {successMessage && (
        <Alert
          variant="success"
          style={{
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 1s ease-out',
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
        >
          {successMessage}
        </Alert>
      )}
      <div className='TheBest'>
      <img src="/thebest.png" alt="The Best" />
      <div className='cardTheBest'>
        <h6>The Best!</h6>
        <h5>المزيد من تفاصيل الجائزة</h5>
        <div className='thebestlink'>
      <a class="advert-card-button" href="https://www.facebook.com/NationalYouthUnion"><span class="advert-card-icon"><svg width="25" height="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" fill="white"></path></svg></span><div class="advert-card-button-text advert-card-facebook"><span>اضغط هنا</span></div></a>
      
      <a class="advert-card-button Comment" href="https://www.facebook.com/share/p/ejW1kRsn2v3bQ7yZ/?mibextid=oFDknk"><span class="advert-card-icon"><svg width="25" height="25" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"></path></svg></span><div class="advert-card-button-text advert-card-comment"><span>التعليقات</span></div></a>
      </div>
      </div>
      
      </div>
      {data.map((item, index) => (
        <div className="card" key={index}>
          <div className="profile-pic">
            <img
              src={item.img} 
              alt={item.name}
              width="100%"
              height="90%"
            />
          </div>

          <div className="bottom">
            <div className="content">
              <span className="name">{item.name}</span>
              <span className="about-me">{item.Description}</span>
            </div>
            <div className="bottom-bottom">
              <div className="social-links-container">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height="15.999" viewBox="0 0 16 15.999">
                  <path
                    id="Subtraction_4"
                    data-name="Subtraction 4"
                    d="M6-582H-2a4,4,0,0,1-4-4v-8a4,4,0,0,1,4-4H6a4,4,0,0,1,4,4v8A4,4,0,0,1,6-582ZM2-594a4,4,0,0,0-4,4,4,4,0,0,0,4,4,4,4,0,0,0,4-4A4.005,4.005,0,0,0,2-594Zm4.5-2a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0,6.5-596ZM2-587.5A2.5,2.5,0,0,1-.5-590,2.5,2.5,0,0,1,2-592.5,2.5,2.5,0,0,1,4.5-590,2.5,2.5,0,0,1,2-587.5Z"
                    transform="translate(6 598)"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </div>

              <button className="button" onClick={() => handleVote(item)}>
               Vote
              </button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}




export default Card;
