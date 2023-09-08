
import React, { useState, useEffect } from 'react';
import './App.css';

import img1 from './images/greatwhiteShark.jpg';
import img2 from './images/tigerShark.jpg';
import img3 from './images/whaleShark.jpg';
import img4 from './images/zebrashark.jpg';
import img5 from './images/hammerheadshark.jpg';
import img6 from './images/blacktipShark.jpg';
import oceanSound from './song.mp3';

const Song = () => (
  <audio src={oceanSound} autoPlay controls>
    Your browser does not support the audio element.
  </audio>
);

const imageSources = [
  { src: img1, label: 'Great White Shark', info: 'The great white shark is a large shark known for its distinctive white coloration and is one of the most feared predators in the ocean.' },
  { src: img2, label: 'Tiger Shark', info: 'The tiger shark is a large predatory shark known for its distinctive vertical stripes and voracious appetite.' },
  { src: img3, label: 'Whale Shark', info: 'The whale shark is the largest fish in the world and is known for its massive size and filter-feeding behavior.' },
  { src: img4, label: 'Zebra Shark', info: 'The zebra shark is a species of carpet shark known for its striking appearance, with dark spots on a light background.' },
  { src: img5, label: 'Hammerhead Shark', info: 'The hammerhead shark is named for its unique T-shaped head and is known for its schooling behavior.' },
  { src: img6, label: 'Blacktip Shark', info: 'The blacktip shark is a small shark species with black-tipped fins and is often found in coastal waters.' },
];

function RandomImg() {
  const [currentImageIndex, setCurrentImageIndex] = useState(getRandomIndex());
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  function getRandomIndex() {
    return Math.floor(Math.random() * imageSources.length);
  }

  function handleAnswerClick(selectedLabel) {
    const correctLabel = imageSources[currentImageIndex].label;
    const answerIsCorrect = selectedLabel === correctLabel;
    setIsAnswerCorrect(answerIsCorrect);
    setShowNextButton(true);
  }

  function handleNextClick() {
    const newIndex = getRandomIndex();
    setCurrentImageIndex(newIndex);
    setShowInfo(false);
    setIsAnswerCorrect(false);
    setShowNextButton(false);
  }

  useEffect(() => {
    setShowInfo(isAnswerCorrect);
  }, [isAnswerCorrect]);

  return (
    <div>
      <Song />
      <img
        src={imageSources[currentImageIndex].src}
        alt="Random"
        onClick={() => setShowInfo(!showInfo)}
        style={{ cursor: showInfo ? 'pointer' : 'default' }}
      />
      {showInfo && <p>{imageSources[currentImageIndex].info}</p>}
      <p>{isAnswerCorrect ? 'Correct Answer! Very Impressive!' : 'Try again! Loser!'}</p>
      {showNextButton && <button onClick={handleNextClick}>Next</button>}
      <Buttons imageSources={imageSources} handleAnswerClick={handleAnswerClick} />
    </div>
  );
}

function Buttons({ imageSources, handleAnswerClick }) {
  return (
    <div className='layout'>
      <div className='buttons4'>
        {imageSources.map((buttonData, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(buttonData.label)}
          >
            {buttonData.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RandomImg;