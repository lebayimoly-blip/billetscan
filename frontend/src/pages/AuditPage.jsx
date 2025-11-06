import React, { useEffect, useState } from 'react';
import './AuditPage.css';
import Header from '../components/Header';
import AppIcon from '../components/AppIcon';
import { getAuditLog } from '../utils/offlineManager';

function AuditPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const audit = getAuditLog();
    setLogs(audit.reverse()); // du plus récent au plus ancien
  }, []);

  return (
    <div className="audit-container">
      <Header />
      <h1>📝 Journal d’audit local</h1>

      {logs.length === 0 ? (
        <p>Aucune activité enregistrée.</p>
      ) : (
        <ul className="audit-list">
          {logs.map((log, index) => (
            <li key={index}>
              <span className="timestamp">{new Date(log.timestamp).toLocaleString()}</span>
              <span className="message">{log.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuditPage;
