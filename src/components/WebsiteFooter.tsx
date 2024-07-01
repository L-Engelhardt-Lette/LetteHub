import React from 'react';
import '../scss/Components/Footer.scss'; // Stile für den Footer

const WebsiteFooter: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Projektplanungswebsite. Alle Rechte vorbehalten.</p>
        <p>Kontakt: info@projektplanung.com</p>
      </div>
    </div>
  );
}

export default WebsiteFooter;
