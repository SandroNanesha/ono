import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [dogImages, setDogImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/8')
      .then((response) => response.json())
      .then((data) => setDogImages(data.message))
      .catch((error) => console.error('Error fetching dog images:', error));
  }, []);

  const handleMicrophoneClick = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setShowMessageModal(true);
    }, 4000);
  };

  const closeModal = () => {
    setShowMessageModal(false);
  };

  return (
    <div className="app">
      {dogImages.map((src, index) => {
        const randomX = Math.random() * 80; // Random position from 0% to 80% of the width
        const randomY = Math.random() * 80; // Random position from 0% to 80% of the height
        return (
          <img
            key={index}
            src={src}
            alt={`Dog ${index + 1}`}
            className="dog-image"
            style={{
              top: `${randomY}%`,
              left: `${randomX}%`,
            }}
          />
        );
      })}

      <div className="button-container">
        <button className="mic-button" onClick={handleMicrophoneClick}>
          <span className="mic-icon">🎙️</span>
          მოუსმინე შენს ოთხფეხა მეგობარს
        </button>
      </div>

      {isRecording && (
        <div className="modal">
          <div className="modal-content">
            <div className="recording-animation">🔴 Recording...</div>
          </div>
        </div>
      )}

      {showMessageModal && (
        <div className="modal">
          <div className="modal-content">
            <p>თქვენი ოთხფეხა მეგობარი ამბობს: ნინიკოო ნუ აბრაზებ ონისეს ძალიან წყინს...</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
