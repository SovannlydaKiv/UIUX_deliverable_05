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

// Initialize player when DOM is ready
function initializeAudioPlayer() {
  audioPlayer = document.getElementById('audioPlayer');
  
  if (!audioPlayer) {
    console.error('Audio player element not found!');
    return;
  }
  
  // Handle music card clicks
  document.querySelectorAll('.music-card').forEach(card => {
    card.addEventListener('click', function() {
      const titleElement = this.querySelector('p');
      if (!titleElement) return;
      
      const cardText = titleElement.textContent.trim();
      const songFile = cardSongs[cardText];
      
      console.log('Clicked card:', cardText, 'Playing:', songFile);
      
      if (songFile) {
        // Remove playing state from previous card
        if (currentCard) {
          currentCard.classList.remove('now-playing');
        }
        
        // Add playing state to current card
        this.classList.add('now-playing');
        currentCard = this;
        
        // Play the song
        audioPlayer.src = '/music_sample/' + songFile;
        audioPlayer.play().catch(err => console.error('Playback error:', err));
      } else {
        console.warn('No song mapping found for:', cardText);
      }
    });
    
    // Add cursor pointer style
    card.style.cursor = 'pointer';
  });
  
  // Update card when song ends to remove highlight
  audioPlayer.addEventListener('ended', function() {
    if (currentCard) {
      currentCard.classList.remove('now-playing');
      currentCard = null;
    }
  });
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAudioPlayer);
} else {
  initializeAudioPlayer();
}
