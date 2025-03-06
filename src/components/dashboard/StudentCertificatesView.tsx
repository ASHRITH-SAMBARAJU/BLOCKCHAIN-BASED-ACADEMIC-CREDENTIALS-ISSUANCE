import { useEffect, useState } from 'react';
import { Download, Award, ExternalLink } from 'lucide-react';
import { getCertificatesByStudent } from '../../utils/certificates';
import { useAuth } from '../../context/AuthContext';
import { generateCertificateHash } from '../../utils/blockchain';

import { CertificateType } from '../../types/certificates';

interface Certificate {
  id: string;
  studentName: string;
  rollNumber: string;
  institution: string;
  course: string;
  issueDate: string;
  hash: string;
  issuedAt: string;
  type: CertificateType;
  documentUrl?: string;
}

export function StudentCertificatesView() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [visibleHash, setVisibleHash] = useState<Record<string, string>>({}); // Updated state

  useEffect(() => {
    const fetchCertificates = async () => {
      if (user?.rollNumber) {
        const certs = await getCertificatesByStudent(user.rollNumber);
        setCertificates(certs);
      }
    };
    fetchCertificates();
  }, [user?.rollNumber]);

  const sendOTP = async (phone: string) => {
    try {
      const response = await fetch('http://localhost:5176/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const result = await response.json();

      if (result.success) {
        setOtpSent(true);
        alert('OTP sent to your phone.');
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('There was an issue sending OTP. Please try again.');
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:5176/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const result = await response.json();

      if (result.success) {
        setOtpVerified(true);
        alert('OTP verified successfully. You can now download certificates.');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('There was an issue verifying OTP. Please try again.');
    }
  };

  const handleDownload = (cert: Certificate) => {
    if (!otpVerified) {
      alert('Please verify your OTP before downloading.');
      return;
    }
    if (cert.documentUrl) {
      const a = document.createElement('a');
      a.href = cert.documentUrl;
      a.download = `${cert.course}_Certificate.pdf`;
      a.click();
    } else {
      alert('Certificate document is not available for download.');
    }
  };

  const toggleViewHash = async (cert: Certificate) => {
    if (visibleHash[cert.id]) {
      // If already visible, toggle off
      setVisibleHash((prev) => {
        const newState = { ...prev };
        delete newState[cert.id];
        return newState;
      });
    } else {
      // Otherwise, generate hash and toggle on
      try {
        const hash = await generateCertificateHash(cert);
        setVisibleHash((prev) => ({
          ...prev,
          [cert.id]: hash,
        }));
      } catch (error) {
        console.error('Error generating certificate hash:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Your Certificates</h2>
      {certificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.type}</h3>
                  <p className="text-sm text-gray-600">{cert.course}</p>
                </div>
                <Award className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Issued By:</span> {cert.institution}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Issue Date:</span> {cert.issueDate}
                </p>
                <br></br>
                {visibleHash[cert.id] && (
                  <p
                    className="text-sm text-gray-700 break-words bg-gray-100 p-2 rounded-md"
                    style={{ wordWrap: 'break-word' }}
                  >
                    <span className="font-medium">Hash:</span> {visibleHash[cert.id]}
                  </p>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => toggleViewHash(cert)}
                  className="flex items-center text-sm text-indigo-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {visibleHash[cert.id] ? 'Hide' : 'View'}
                </button>
                <button
                  onClick={() => handleDownload(cert)}
                  className="flex items-center text-sm text-indigo-600 hover:underline"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No certificates available at this time.</p>
      )}

      {/* OTP Verification */}
      <div>
        {!otpVerified && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => sendOTP(phoneNumber)}
              className="mt-3 text-sm text-indigo-600 hover:underline"
            >
              Send OTP
            </button>
          </div>
        )}
        {otpSent && !otpVerified && (
          <div className="mt-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={verifyOTP}
              className="mt-3 text-sm text-indigo-600 hover:underline"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


