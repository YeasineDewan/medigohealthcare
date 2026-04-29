import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';

const CARD_CONFIG = {
  premium: { label: 'Premium Health Card', color: 'from-amber-500 to-amber-600' },
  family: { label: 'Family Health Card', color: 'from-blue-500 to-blue-600' },
  corporate: { label: 'Corporate Health Card', color: 'from-purple-500 to-purple-600' },
  charity: { label: 'Charity Health Card', color: 'from-green-500 to-green-600' },
  medicare: { label: 'Medicare Health Card', color: 'from-teal-500 to-teal-600' },
};

export default function HealthCardApply() {
  const { cardType } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    familyMembers: '1',
    occupation: '',
    nid: '',
    notes: '',
  });

  const card = useMemo(() => CARD_CONFIG[cardType] || CARD_CONFIG.family, [cardType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted</h1>
          <p className="text-gray-600 mb-6">
            Your application for <span className="font-semibold">{card.label}</span> has been received.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <p className="text-sm text-gray-600">Applicant: <span className="font-medium text-gray-900">{formData.fullName}</span></p>
            <p className="text-sm text-gray-600">Phone: <span className="font-medium text-gray-900">{formData.phone}</span></p>
            <p className="text-sm text-gray-600">City: <span className="font-medium text-gray-900">{formData.city}</span></p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Submit Another
            </button>
            <button
              onClick={() => navigate('/health-cards')}
              className="px-5 py-2 rounded-lg bg-[#5DBB63] text-white hover:bg-[#4a9a4f]"
            >
              Back to Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Link to={`/health-cards/${cardType || 'family'}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Health Card Application</h1>
          <p className="text-gray-500 mb-6">Complete the form to apply for your membership card.</p>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full Name *" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number *" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" required placeholder="Email *" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <input name="city" value={formData.city} onChange={handleChange} required placeholder="City *" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <input name="nid" value={formData.nid} onChange={handleChange} placeholder="NID / Passport Number" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <select name="familyMembers" value={formData.familyMembers} onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none">
              <option value="1">1 Member</option>
              <option value="2">2 Members</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
              <option value="5+">5+ Members</option>
            </select>
            <input name="address" value={formData.address} onChange={handleChange} required placeholder="Address *" className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none" />
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional Notes (optional)" className="md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] outline-none min-h-24" />
            <button type="submit" className="md:col-span-2 px-5 py-3 rounded-lg bg-[#5DBB63] text-white font-medium hover:bg-[#4a9a4f]">
              Submit Application
            </button>
          </form>
        </div>

        <div className={`rounded-2xl p-6 text-white bg-gradient-to-br ${card.color} shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">{card.label}</h2>
            <CreditCard className="w-6 h-6" />
          </div>
          <p className="text-sm text-white/90 mb-4">Application review starts instantly after submission.</p>
          <ul className="space-y-2 text-sm text-white/95">
            <li>- Priority application processing</li>
            <li>- Support callback within 24 hours</li>
            <li>- Card activation after verification</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
