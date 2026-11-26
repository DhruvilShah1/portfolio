
import { useCallback, useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const formatCost = (value) =>
  `$${Number(value || 0).toFixed(6)}`;

const formatNumber = (value) =>
  Number(value || 0).toLocaleString();

const formatDuration = (value) =>
  `${Number(value || 0).toFixed(0)} ms`;

function StatusBadge({ status }) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
    cancelled: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    running: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        styles[status] || styles.running
      }`}
    >
      {status || "unknown"}
    </span>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="text-2xl font-bold text-white mt-3">
        {value}
      </h2>

      {subtitle && (
        <p className="text-xs text-slate-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function AISettings() {
  const [settings, setSettings] = useState(null);
  const [summary, setSummary] = useState(null);
  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState("");

  // Fetch RAG status, usage summary and recent requests.
  const fetchDashboard = useCallback(async () => {
    try {
      const [statusResponse, summaryResponse, recordsResponse] =
        await Promise.all([
          fetch(`${API_URL}/rag/status`),
          fetch(`${API_URL}/usage/summary`),
          fetch(`${API_URL}/usage/recent?limit=50`),
        ]);

      if (
        !statusResponse.ok ||
        !summaryResponse.ok ||
        !recordsResponse.ok
      ) {
        throw new Error("Unable to load AI dashboard.");
      }

      const statusData = await statusResponse.json();
      const summaryData = await summaryResponse.json();
      const recordsData = await recordsResponse.json();

      setSettings(statusData);
      setSummary(summaryData);
      setRecords(recordsData.records || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + automatic refresh.
  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 5000);

    return () => clearInterval(interval);
  }, [fetchDashboard]);

  // Start or Stop RAG.
  const handleToggle = async () => {
    if (!settings || changing) return;

    setChanging(true);
    setError("");

    const endpoint = settings.rag_enabled
      ? "/rag/stop"
      : "/rag/start";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Request failed"
        );
      }

      await fetchDashboard();
    } catch (err) {
      setError(err.message);
    } finally {
      setChanging(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading AI Control Center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div>
            <p className="text-sm text-slate-400 mb-2">
              PORTFOLIO AI
            </p>

            <h1 className="text-3xl font-bold">
              AI Control Center
            </h1>

            <p className="text-slate-400 mt-2">
              Manage RAG execution and monitor AI usage.
            </p>
          </div>

          <button
            onClick={fetchDashboard}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
          >
            Refresh Dashboard
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* RAG CONTROL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8">

          <div className="flex items-center justify-between mb-8">

            <div>
              <p className="text-slate-400 text-sm">
                RAG Engine
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                {settings?.rag_enabled
                  ? "Running"
                  : "Stopped"}
              </h2>
            </div>

            <div
              className={`w-4 h-4 rounded-full ${
                settings?.rag_enabled
                  ? "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]"
                  : "bg-red-500"
              }`}
            />
          </div>

          {/* RAG STATUS */}
          <div
            className={`rounded-xl p-4 mb-6 border ${
              settings?.rag_enabled
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-red-500/10 border-red-500/20"
            }`}
          >
            <p
              className={`font-medium ${
                settings?.rag_enabled
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {settings?.rag_enabled
                ? "RAG is accepting new requests."
                : "RAG is disabled. New RAG requests are blocked."}
            </p>
          </div>

          {/* ACTIVE REQUESTS */}
          <div className="bg-slate-800/70 rounded-xl p-5 mb-6">
            <p className="text-slate-400 text-sm">
              Tracked Active Requests
            </p>

            <h3 className="text-4xl font-bold mt-2">
              {settings?.active_requests ?? 0}
            </h3>
          </div>

          {/* START / STOP */}
          <button
            onClick={handleToggle}
            disabled={changing}
            className={`w-full py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              settings?.rag_enabled
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            {changing
              ? "Updating..."
              : settings?.rag_enabled
                ? "Stop RAG Execution"
                : "Start RAG Execution"}
          </button>

          <p className="text-xs text-slate-500 mt-5 text-center">
            Status refreshes automatically every 5 seconds.
          </p>

        </div>

        {/* USAGE SUMMARY */}
        <div className="mb-8">

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Usage Overview
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Total tracked API usage and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <StatCard
              title="Total Requests"
              value={formatNumber(summary?.total_requests)}
              subtitle={`${summary?.successful_requests || 0} successful`}
            />

            <StatCard
              title="Input Tokens"
              value={formatNumber(summary?.total_input_tokens)}
              subtitle="Prompt tokens"
            />

            <StatCard
              title="Output Tokens"
              value={formatNumber(summary?.total_output_tokens)}
              subtitle="Generated tokens"
            />

            <StatCard
              title="Total Tokens"
              value={formatNumber(summary?.total_tokens)}
              subtitle="Input + Output"
            />

            <StatCard
              title="Total Cost"
              value={formatCost(summary?.total_cost)}
              subtitle="Estimated using Standard-tier rates"
            />

            <StatCard
              title="Average Duration"
              value={formatDuration(summary?.average_duration_ms)}
              subtitle="Across recorded requests"
            />

          </div>
        </div>

        {/* REQUEST STATUS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <StatCard
            title="Successful Requests"
            value={formatNumber(summary?.successful_requests)}
          />

          <StatCard
            title="Failed Requests"
            value={formatNumber(summary?.failed_requests)}
          />

          <StatCard
            title="Cancelled Requests"
            value={formatNumber(summary?.cancelled_requests)}
          />

        </div>

        {/* REQUEST HISTORY */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-slate-800">

            <h2 className="text-xl font-semibold">
              Request History
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Latest 50 recorded AI requests.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left">

              <thead className="text-slate-400 bg-slate-800/50">
                <tr>
                  <th className="px-5 py-4">Question</th>
                  <th className="px-5 py-4">Model</th>
                  <th className="px-5 py-4">Tokens</th>
                  <th className="px-5 py-4">Cost</th>
                  <th className="px-5 py-4">Duration</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">

                {records.map((record) => (
                  <tr
                    key={record.request_id}
                    className="hover:bg-slate-800/30 transition"
                  >

                    {/* QUESTION */}
                    <td className="px-5 py-4 min-w-[250px]">

                      <p className="text-white font-medium">
                        {record.question}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {record.request_id}
                      </p>

                    </td>

                    {/* MODEL */}
                    <td className="px-5 py-4 text-slate-300">
                      {record.model}
                    </td>

                    {/* TOKENS */}
                    <td className="px-5 py-4">

                      <div className="text-white">
                        {formatNumber(record.total_tokens)}
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        In: {formatNumber(record.input_tokens)}
                        {" / "}
                        Out: {formatNumber(record.output_tokens)}
                      </div>

                    </td>

                    {/* COST */}
                    <td className="px-5 py-4 text-emerald-400">
                      {formatCost(record.total_cost)}
                    </td>

                    {/* DURATION */}
                    <td className="px-5 py-4 text-slate-300">
                      {formatDuration(record.total_duration_ms)}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <StatusBadge status={record.status} />
                    </td>

                    {/* DATE */}
                    <td className="px-5 py-4 text-slate-400 min-w-[160px]">
                      {record.created_at
                        ? new Date(record.created_at).toLocaleString()
                        : "-"}
                    </td>

                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      No AI requests recorded yet.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-sm text-slate-400 leading-6">
          <p>
            When RAG is disabled, new RAG requests are rejected.
            Currently tracked requests receive a cancellation
            signal and stop at their next cancellation checkpoint.
          </p>
        </div>

        <p className="text-xs text-slate-500 mt-5 text-center">
          Dashboard refreshes automatically every 5 seconds.
        </p>

      </div>
    </div>
  );
}
