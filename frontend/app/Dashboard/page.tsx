'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

interface MetricsData {
  totalRequests: number;
  feedCount: number;
  uniqueClientsCount: number;
  errorLogsCount: number;
  requestsPerClient: { clientId: string; count: number }[];
  requestsPerFeed: { feedId: number; feedTitle: string; count: number }[];
  statusSummary: {
    healthy: boolean;
    systemStatus: string;
  };
}

interface HealthData {
  status: string;
  uptime: number;
  timestamp: string;
  database?: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch Health Status
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const healthJson = await healthRes.json();
        setHealth(healthJson);
      } else {
        setHealth({ status: 'unhealthy', uptime: 0, timestamp: new Date().toISOString() });
      }

      // 2. Fetch Aggregated Metrics
      const metricsRes = await fetch('/api/metrics');
      if (!metricsRes.ok) {
        throw new Error('Failed to load system metrics from database.');
      }
      const metricsJson = await metricsRes.json();
      setMetrics(metricsJson);
    } catch (err: any) {
      setError(err.message || 'Error connecting to metrics service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh metrics every 10 seconds for real-time monitoring
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="container p-4" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>RSS System Observability & Reporting Dashboard</h2>
          <button className="btn btn-outline-primary btn-sm" onClick={fetchDashboardData}>
            Refresh Data
          </button>
        </div>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            <strong>System Warning:</strong> {error}
          </div>
        )}

        {/* 1. Health Status Banner */}
        <div className="row mb-4">
          <div className="col-12">
            <div className={`card text-white ${health?.status === 'ok' ? 'bg-success' : 'bg-danger'}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">
                    System Health Check ({health?.status === 'ok' ? '200 OK' : 'Service Down'})
                  </h5>
                  <p className="card-text mb-0">
                    Uptime: {health ? `${Math.floor(health.uptime)} seconds` : 'N/A'} | Database: {health?.database || 'N/A'}
                  </p>
                </div>
                <span className="badge bg-light text-dark fs-6">
                  {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Key Metrics Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-light border-primary mb-3">
              <div className="card-body text-center">
                <h6 className="card-subtitle text-muted mb-2">Total Requests</h6>
                <h2 className="card-title text-primary">{metrics?.totalRequests ?? 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light border-info mb-3">
              <div className="card-body text-center">
                <h6 className="card-subtitle text-muted mb-2">Total RSS Feeds</h6>
                <h2 className="card-title text-info">{metrics?.feedCount ?? 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-light border-success mb-3">
              <div className="card-body text-center">
                <h6 className="card-subtitle text-muted mb-2">Unique Clients</h6>
                <h2 className="card-title text-success">{metrics?.uniqueClientsCount ?? 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className={`card bg-light mb-3 ${metrics?.errorLogsCount ? 'border-danger' : 'border-secondary'}`}>
              <div className="card-body text-center">
                <h6 className="card-subtitle text-muted mb-2">Logged Errors</h6>
                <h2 className={`card-title ${metrics?.errorLogsCount ? 'text-danger' : 'text-secondary'}`}>
                  {metrics?.errorLogsCount ?? 0}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Reporting Tables */}
        <div className="row">
          {/* Requests per Feed */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white font-weight-bold">Requests per Feed</div>
              <div className="card-body p-0">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Feed Title</th>
                      <th className="text-end">Request Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics?.requestsPerFeed && metrics.requestsPerFeed.length > 0 ? (
                      metrics.requestsPerFeed.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.feedTitle}</td>
                          <td className="text-end">
                            <span className="badge bg-primary rounded-pill">{item.count}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="text-center text-muted p-3">
                          No feed requests recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Requests per Client */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white font-weight-bold">Requests per Client</div>
              <div className="card-body p-0">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Client Identifier</th>
                      <th className="text-end">Request Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics?.requestsPerClient && metrics.requestsPerClient.length > 0 ? (
                      metrics.requestsPerClient.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-truncate" style={{ maxWidth: '250px' }}>
                            {item.clientId}
                          </td>
                          <td className="text-end">
                            <span className="badge bg-secondary rounded-pill">{item.count}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="text-center text-muted p-3">
                          No client records logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}