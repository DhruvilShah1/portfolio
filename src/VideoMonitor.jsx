
import { useEffect, useRef, useState } from "react";

const PYTHON_API = "http://localhost:8000";

// Wait for ICE gathering to complete
function waitForIceGathering(pc, timeout = 10000) {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === "complete") {
      resolve();
      return;
    }

    let finished = false;

    const cleanup = () => {
      pc.removeEventListener(
        "icegatheringstatechange",
        checkState
      );
      clearTimeout(timer);
    };

    const finish = () => {
      if (finished) return;

      finished = true;
      cleanup();
      resolve();
    };

    const checkState = () => {
      if (pc.iceGatheringState === "complete") {
        finish();
      }
    };

    const timer = setTimeout(finish, timeout);

    pc.addEventListener(
      "icegatheringstatechange",
      checkState
    );

    checkState();
  });
}

export default function VideoMonitor({ interviewId }) {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);
  const dataChannelRef = useRef(null);

  const [status, setStatus] = useState("connecting");
  const [message, setMessage] = useState(
    "Connecting to monitoring service..."
  );

  const [faceCount, setFaceCount] = useState(0);
  const [evidence, setEvidence] = useState([]);

  // Start WebRTC monitoring
  useEffect(() => {
    let cancelled = false;

    async function startMonitoring() {
      try {
        setStatus("connecting");
        setMessage("Requesting webcam access...");

        // 1. Access webcam
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: "user",
            },
            audio: false,
          });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        // 2. Create peer connection
        const pc = new RTCPeerConnection({
          iceServers: [
            {
              urls: "stun:stun.l.google.com:19302",
            },
          ],
        });

        pcRef.current = pc;

        // 3. Monitor connection state
        pc.onconnectionstatechange = () => {
          if (cancelled) return;

          if (pc.connectionState === "connected") {
            setStatus("connected");
            setMessage("Monitoring connected successfully.");
          }

          if (
            pc.connectionState === "failed" ||
            pc.connectionState === "disconnected"
          ) {
            setStatus("error");
            setMessage(
              "WebRTC connection interrupted."
            );
          }

          if (pc.connectionState === "closed") {
            setStatus("disconnected");
            setMessage("Monitoring connection closed.");
          }
        };

        // 4. Add webcam tracks
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // 5. Create data channel
        const dataChannel =
          pc.createDataChannel("monitoring");

        dataChannelRef.current = dataChannel;

        dataChannel.onopen = () => {
          console.log("Monitoring data channel connected");

          if (!cancelled) {
            setMessage(
              "Real-time monitoring data channel connected."
            );
          }
        };

        dataChannel.onclose = () => {
          console.log("Monitoring data channel closed");
        };

        dataChannel.onerror = (error) => {
          console.error("Data channel error:", error);
        };

        // 6. Receive Python monitoring results
        dataChannel.onmessage = (event) => {
          if (cancelled) return;

          try {
            const result = JSON.parse(event.data);

            console.log("Python monitoring result:", result);

            if (result.status) {
              setStatus(result.status);
            }

            if (result.message) {
              setMessage(result.message);
            }

            if (typeof result.faceCount === "number") {
              setFaceCount(result.faceCount);
            }

            if (result.evidenceUrl) {
              setEvidence((previous) => [
                {
                  url: result.evidenceUrl,
                  time: new Date().toLocaleTimeString(),
                },
                ...previous,
              ]);
            }
          } catch (error) {
            console.error(
              "Invalid monitoring result:",
              error
            );
          }
        };

        // 7. Create SDP offer
        const offer = await pc.createOffer();

        await pc.setLocalDescription(offer);

        // 8. Wait for ICE gathering
        await waitForIceGathering(pc);

        if (cancelled) return;

        setMessage("Connecting to Python monitoring server...");

        // 9. Send offer to Python
        const response = await fetch(
          `${PYTHON_API}/offer/${encodeURIComponent(interviewId)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sdp: pc.localDescription.sdp,
              type: pc.localDescription.type,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Python connection failed: ${response.status}`
          );
        }

        const answer = await response.json();

        if (cancelled) return;

        // 10. Set remote description
        await pc.setRemoteDescription(answer);

        console.log("WebRTC connection established");
      } catch (error) {
        console.error("Monitoring error:", error);

        if (!cancelled) {
          setStatus("error");
          setMessage(error.message);
        }
      }
    }

    if (interviewId) {
      startMonitoring();
    }

    // Cleanup
    return () => {
      cancelled = true;

      if (dataChannelRef.current) {
        dataChannelRef.current.close();
        dataChannelRef.current = null;
      }

      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [interviewId]);

  // Status styles
  const statusStyles = {
    connected: {
      container: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
      label: "Monitoring Active",
    },
    connecting: {
      container: "bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
      label: "Connecting",
    },
    error: {
      container: "bg-red-50 text-red-700",
      dot: "bg-red-500",
      label: "Connection Error",
    },
    disconnected: {
      container: "bg-slate-100 text-slate-600",
      dot: "bg-slate-400",
      label: "Disconnected",
    },
  };

  const currentStatus =
    statusStyles[status] || statusStyles.connecting;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>Interviews</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">
                Live Monitoring
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              AI Interview Monitoring
            </h1>

            <p className="text-slate-500 mt-1">
              Real-time interview supervision and activity tracking.
            </p>
          </div>

          <span
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold w-fit ${currentStatus.container}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${currentStatus.dot} ${
                status === "connected" ? "animate-pulse" : ""
              }`}
            />
            {currentStatus.label}
          </span>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Faces */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-500">
                Detected Faces
              </p>

              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21v-2a7 7 0 0114 0v2"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-4">
              {faceCount}
            </h2>

            <p className="text-xs text-slate-400 mt-2">
              Currently visible in camera
            </p>
          </div>

          {/* Evidence */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-500">
                Evidence Captured
              </p>

              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h3l2-3h6l2 3h3v13H4V7zM12 10a3 3 0 100 6 3 3 0 000-6z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-4">
              {evidence.length}
            </h2>

            <p className="text-xs text-slate-400 mt-2">
              Monitoring evidence images
            </p>
          </div>

          {/* Connection */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-500">
                Connection
              </p>

              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12.5l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-4">
              {status === "connected"
                ? "Connected"
                : status === "error"
                ? "Disconnected"
                : status === "disconnected"
                ? "Disconnected"
                : "Connecting"}
            </h2>

            <p className="text-xs text-slate-400 mt-2">
              WebRTC monitoring connection
            </p>
          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Webcam */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900">
                  Live Camera Feed
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Real-time candidate monitoring
                </p>
              </div>

              <span className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>

            <div className="relative bg-slate-950 aspect-video flex items-center justify-center">

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-contain"
              />

              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs px-3 py-2 rounded-lg">
                Candidate Camera
              </div>

              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-xs px-3 py-2 rounded-lg">
                {status === "connected"
                  ? "Camera Active"
                  : status}
              </div>

            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Camera Status
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {message}
                  </p>
                </div>

                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${currentStatus.container}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-6">

            <div>
              <h2 className="font-bold text-slate-900">
                Interview Session
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Session monitoring details
              </p>
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Interview ID
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-2 break-all">
                  {interviewId || "Not available"}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Monitoring Status
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-2 capitalize">
                  {status}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Face Detection
                </p>

                <p className="text-sm font-semibold text-slate-800 mt-2">
                  {faceCount} {faceCount === 1 ? "Face" : "Faces"} Detected
                </p>
              </div>

            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900">
                Monitoring Information
              </p>

              <p className="text-xs text-blue-700 mt-2 leading-relaxed">
                {message}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">
                WebRTC Data Channel
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {dataChannelRef.current?.readyState || "Initializing"}
              </p>
            </div>

          </div>
        </div>

        {/* Evidence Gallery */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div>
              <h2 className="font-bold text-slate-900">
                Captured Evidence
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Images received from the Python monitoring service
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
              {evidence.length} Images
            </span>

          </div>

          <div className="p-5">

            {evidence.length === 0 ? (

              <div className="py-14 text-center">

                <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h3l2-3h6l2 3h3v13H4V7zM12 10a3 3 0 100 6 3 3 0 000-6z"
                    />
                  </svg>
                </div>

                <h3 className="font-semibold text-slate-700">
                  No Evidence Captured
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                  Monitoring evidence will appear here when received.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {evidence.map((item, index) => (

                  <div
                    key={`${item.url}-${index}`}
                    className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                  >

                    <div className="aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={item.url}
                        alt="Monitoring evidence"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="p-3">

                      <p className="text-sm font-semibold text-slate-800">
                        Evidence #{evidence.length - index}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.time}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 pb-4">
          <p>AI Interview Monitoring System</p>
          <p>Powered by WebRTC + Python</p>
        </div>

      </div>
    </div>
  );
}
