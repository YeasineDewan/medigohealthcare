import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Fingerprint, RefreshCw, CheckCircle2, AlertCircle, X } from 'lucide-react';

const getZkApi = () => {
  // ZKTeco Web SDKs typically expose globals. We try common names and
  // keep the integration defensive so the app does not crash.
  if (typeof window === 'undefined') return null;
  return (
    window.ZKFP ||
    window.ZKFingerprint ||
    window.zkfp ||
    window.ZKWebFP ||
    null
  );
};

const callMaybePromise = async (fn, args = []) => {
  const result = fn(...args);
  if (result && typeof result.then === 'function') return result;
  return result;
};

export default function BiometricLogin({ roleLabel, onAuthenticate, isSubmitting = false }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraStatus, setCameraStatus] = useState('idle'); // idle|starting|ready|captured|error
  const [fingerStatus, setFingerStatus] = useState('idle'); // idle|connecting|capturing|ready|captured|error|not_supported

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [capturedImageBlob, setCapturedImageBlob] = useState(null);

  // fingerprintTemplate: base64 string / Uint8Array / etc (depends on SDK)
  const [fingerprintTemplate, setFingerprintTemplate] = useState(null);

  const [error, setError] = useState('');

  useEffect(() => {
    // If the SDK is already present, mark it as potentially supported.
    const zkApi = getZkApi();
    if (zkApi) setFingerStatus('ready');
  }, []);

  const stopCamera = () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    } catch (e) {
      // ignore
    } finally {
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    setError('');
    setCameraStatus('starting');
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera is not supported in this browser.');
      }

      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraStatus('ready');
    } catch (e) {
      setCameraStatus('error');
      setError(e?.message || 'Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = async () => {
    setError('');
    try {
      if (!videoRef.current) throw new Error('Camera preview not ready.');

      const video = videoRef.current;
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 480;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas is not supported.');

      ctx.drawImage(video, 0, 0, w, h);

      // Convert to blob for uploading later
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
      if (!blob) throw new Error('Failed to capture photo.');

      setCapturedImageBlob(blob);

      const dataUrl = URL.createObjectURL(blob);
      setImagePreviewUrl(dataUrl);

      setCameraStatus('captured');
      // stop to reduce privacy surface
      stopCamera();
    } catch (e) {
      setError(e?.message || 'Failed to capture photo.');
    }
  };

  const captureFingerprint = async () => {
    setError('');
    setFingerprintTemplate(null);

    const zkApi = getZkApi();
    if (!zkApi) {
      setFingerStatus('not_supported');
      setError('ZKTeco fingerprint SDK not detected. Please install/enable the ZKTeco Web SDK for this browser.');
      return;
    }

    setFingerStatus('capturing');

    try {
      // ---- IMPORTANT ----
      // ZKTeco browser SDK APIs differ by model/version.
      // This function tries a few common method names. Replace/extend
      // with the exact SDK calls you use.
      // -------------------
      let template = null;

      const candidates = [
        zkApi.CaptureTemplate,
        zkApi.GetTemplate,
        zkApi.Capture,
        zkApi.CaptureFinger,
        zkApi.ExtractTemplate,
      ].filter(Boolean);

      if (candidates.length === 0) {
        throw new Error('Fingerprint SDK found but no capture method was detected.');
      }

      for (const fn of candidates) {
        try {
          template = await callMaybePromise(fn, []);
          if (template) break;
        } catch (inner) {
          // try next candidate
        }
      }

      if (!template) {
        throw new Error('Unable to capture fingerprint. Please try again.');
      }

      setFingerprintTemplate(template);
      setFingerStatus('captured');
    } catch (e) {
      setFingerStatus('error');
      setError(e?.message || 'Fingerprint capture failed.');
    }
  };

  const authenticate = async () => {
    setError('');

    if (!capturedImageBlob) {
      setError('Please capture a photo first.');
      return;
    }
    if (!fingerprintTemplate) {
      setError('Please capture your fingerprint first.');
      return;
    }

    onAuthenticate({
      imageBlob: capturedImageBlob,
      fingerprintTemplate,
    });
  };

  const hasPhoto = Boolean(capturedImageBlob);
  const hasFinger = Boolean(fingerprintTemplate);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 justify-center mb-3">
            <Camera className="w-6 h-6 text-[#5DBB63]" />
            <h3 className="text-xl font-semibold text-[#165028]">Photo capture</h3>
          </div>

          <p className="text-gray-600 mb-4">
            Allow camera permission to capture your photo for biometric verification.
          </p>

          <div className="relative mx-auto w-full max-w-sm">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Captured preview"
                className="w-full h-64 object-cover rounded-xl border border-gray-200"
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-64 object-cover rounded-xl border border-gray-200 bg-gray-50"
                muted
                playsInline
              />
            )}
          </div>

          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            <button
              type="button"
              onClick={startCamera}
              className="px-5 py-2 bg-[#f0fdf2] text-[#165028] rounded-xl hover:bg-[#dcfce7] transition-colors font-medium"
              disabled={cameraStatus === 'starting' || cameraStatus === 'ready'}
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              {cameraStatus === 'starting' ? 'Starting...' : 'Start camera'}
            </button>
            <button
              type="button"
              onClick={capturePhoto}
              className="px-5 py-2 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cameraStatus !== 'ready' || !videoRef.current}
            >
              <Camera className="w-4 h-4 inline mr-2" />
              Capture
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {hasPhoto ? (
              <span className="inline-flex items-center gap-2 text-green-700 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Photo captured
              </span>
            ) : (
              <span>
                Status: {cameraStatus}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 justify-center mb-3">
            <Fingerprint className="w-6 h-6 text-[#165028]" />
            <h3 className="text-xl font-semibold text-[#165028]">Fingerprint capture</h3>
          </div>

          <p className="text-gray-600 mb-4">
            Connect your ZKTeco fingerprint device and capture a template using the installed ZKTeco Web SDK.
          </p>

          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={captureFingerprint}
              className="px-6 py-3 bg-[#165028] text-white rounded-xl hover:bg-[#0f3d1c] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={fingerStatus === 'capturing'}
            >
              {fingerStatus === 'capturing' ? 'Capturing...' : 'Capture fingerprint'}
            </button>

            <div className="mt-4 text-sm text-gray-600">
              {hasFinger ? (
                <span className="inline-flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Fingerprint captured
                </span>
              ) : (
                <span>
                  Status: {fingerStatus}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-3 max-w-sm">
              If capture fails, ensure the ZKTeco SDK is loaded for this page and the expected browser global is available.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-5 inline-flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-left">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={authenticate}
          disabled={!hasPhoto || !hasFinger || isSubmitting}
          className="w-full max-w-md px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Fingerprint className="w-4 h-4" />
          {isSubmitting ? 'Authenticating...' : `Authenticate as ${roleLabel}`}
        </button>
      </div>
    </motion.div>
  );
}

