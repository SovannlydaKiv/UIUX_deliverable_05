// Simple audio player for music cards
let audioPlayer = null;
let currentCard = null;

// Manual song mapping - link specific card text to specific song files
const cardSongs = {
  // Homepage - Discover more music
  'Tyler, The creator': 'See You Again.mp3',
  'TV Girl': 'Lovers Rock.mp3',
  'Clairo': 'Flamin Hot Cheetos.mp3',
  
  // Homepage - Listening activities
  'Calling U Back': 'calling you back.mp3',
  'Not Cute Anymore': 'Not cute anymore.mp3',
  'Emails I can\'t send': 'emails i cant send.mp3',
  
  // Homepage - New from artists
  'Brighter days ahead': 'eternal sunshine.mp3',
  'This is how tomorrow moves': 'Take A Bite.mp3',
  
  // Homepage - Past favorites
  'No doubt - Enhypen': 'No Doubt.mp3',
  'UP NO MORE - Twice': 'UP NO MORE.mp3',
  'Hurt - NewJeans': 'Hurt.mp3',
  
  // Music Tab - On repeat
  'wannabewithu - Lover is a day': 'Lover Is a Day.mp3',
  
  // Music Tab - Trending albums
  'Ballads - Joji': 'Slow Dancing In The Dark.mp3',
  'Submarine - The Marías': 'Sienna.mp3',
  'Son of spergy - Daniel Caesar': 'Who Knows.mp3',
  
  // Music Tab - Songs you may enjoy
  'Lover Girl - Laufey': 'Lover Girl.mp3',
  'Ripples - Beabodoobee': 'Ripples.mp3',
  'About you - The 1975': 'About You.mp3',
  
  // Library - Listening activities
  'Calling U Back': 'calling you back.mp3',
  'Not Cute Anymore': 'Not cute anymore.mp3',
  'Emails I can\'t send': 'emails i cant send.mp3',
  
  // Library - New from artists
  'Brighter days ahead': 'eternal sunshine.mp3',
  'This is how tomorrow moves': 'Ripples.mp3',
  
  // Library - Past favorites
  'No doubt - Enhypen': 'No Doubt.mp3',
  'UP NO MORE - Twice': 'UP NO MORE.mp3',
  'Hurt - NewJeans': 'Hurt.mp3'
};

// Initialize player
function initializeAudioPlayer() {
  console.log('Initializing audio player...');
  
  audioPlayer = document.getElementById('audioPlayer');
  console.log('Audio player element:', audioPlayer);
  
  if (!audioPlayer) {
    console.error('Audio player element not found! Make sure <audio id="audioPlayer"></audio> exists in HTML');
    return;
  }
  
  // Set controls attribute so we can see it
  audioPlayer.controls = true;
  audioPlayer.style.width = '100%';
  audioPlayer.style.marginTop = '20px';
  audioPlayer.style.marginBottom = '20px';
  
  const cards = document.querySelectorAll('.music-card');
  console.log('Found', cards.length, 'music cards');
  
  // Handle music card clicks
  cards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('=== CARD CLICKED ===');
      
      const titleElement = this.querySelector('p');
      if (!titleElement) {
        console.warn('No title element found in card');
        return;
      }
      
      const cardText = titleElement.textContent.trim();
      const songFile = cardSongs[cardText];
      
      console.log('Card text:', cardText);
      console.log('Song file:', songFile);
      
      if (songFile) {
        // Remove playing state from previous card
        if (currentCard) {
          currentCard.classList.remove('now-playing');
          console.log('Removed now-playing from previous card');
        }
        
        // Add playing state to current card
        this.classList.add('now-playing');
        currentCard = this;
        console.log('Added now-playing to current card');
        
        // Play the song
        const url = '/music_sample/' + songFile;
        console.log('Playing URL:', url);
        audioPlayer.src = url;
        
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Playback started successfully');
          }).catch(err => {
            console.error('Playback error:', err);
          });
        }
      } else {
        console.warn('No song found for:', cardText);
        console.log('Available songs:', Object.keys(cardSongs));
      }
    });
    
    // Add cursor pointer style
    card.style.cursor = 'pointer';
  });
  
  // Update card when song ends to remove highlight
  audioPlayer.addEventListener('ended', function() {
    console.log('Song ended');
    if (currentCard) {
      currentCard.classList.remove('now-playing');
      currentCard = null;
    }
  });
  
  console.log('Audio player initialized successfully');
}

// Wait for DOM to be fully loaded
console.log('Audio player script loaded, document state:', document.readyState);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAudioPlayer);
} else {
  setTimeout(initializeAudioPlayer, 100);
}
