import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResource = async (name: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/resource?file=${name}`);
      const text = await res.text();
      setOutput(text);
    } catch (err) {
      setOutput('ERROR: UNABLE TO REACH INTERNAL NODE');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>NEXUS | Secure Access Terminal</title>
      </Head>

      <div className="terminal">
        <div className="header">
          <div><span className="status-dot"></span> SYSTEM ACTIVE</div>
          <div>INTERNAL PORTAL v4.2.1-BETA</div>
        </div>

        <div className="content">
          <div className="line">
            <span className="prompt">$</span> ACCESSING NODE: PU-THM-SERVER-01...
          </div>
          <div className="line">
            WELCOME TO THE NEXUS PROJECT. UNAUTHORIZED ACCESS IS PROHIBITED.
          </div>

          <div className="line" style={{ marginTop: '40px' }}>
            AVAILABLE DOCUMENTATION:
            <div dangerouslySetInnerHTML={{ __html: '<!-- HINT: DO NOT MOVE SECRETS FOLDER FROM ROOT. LEGACY STORAGE SYSTEM REQUIRES IT. -->' }} />
            <div dangerouslySetInnerHTML={{ __html: '<!-- TODO: REMOVE node_99_config.sys BEFORE MIGRATION TO CLOUD-PU -->' }} />
            <ul className="resource-list">
              <li className="resource-item">
                <span>System Manifest (PUBLIC)</span>
                <span className="resource-link" onClick={() => fetchResource('manifest.txt')}>[FETCH]</span>
              </li>
              <li className="resource-item">
                <span>Network Protocol (INTERNAL)</span>
                <span className="resource-link" onClick={() => fetchResource('protocol.txt')}>[FETCH]</span>
              </li>
              <li className="resource-item">
                <span>Security Audit Log (INTERNAL)</span>
                <span className="resource-link" onClick={() => fetchResource('audit_log.txt')}>[FETCH]</span>
              </li>
            </ul>
          </div>

          {loading && <div className="line" style={{ color: '#fff' }}>[!] DATA RETRIEVAL IN PROGRESS...</div>}
          
          {output && (
            <div className="line">
              <span className="prompt">&gt;</span> RETRIEVED_DATA:
              <pre>{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
