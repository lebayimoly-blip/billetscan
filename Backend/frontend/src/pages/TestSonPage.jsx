import React from 'react';

function TestSonPage() {
  const playSound = (type) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch((err) => console.warn('🔇 Erreur audio :', err));
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>🔊 Test des sons</h2>
      <button onClick={() => playSound('valid')}>✅ Bip de validation</button>
      <button onClick={() => playSound('invalid')} style={{ marginLeft: '20px' }}>
        ❌ Bip d’erreur
      </button>
    </div>
  );
}

export default TestSonPage;