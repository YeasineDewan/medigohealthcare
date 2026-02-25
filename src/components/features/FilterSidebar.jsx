import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterSidebar({ filters, onFilterChange, onClear, isMobile, onClose }) {
  const [openSections, setOpenSections] = useState({
    price: true,
    categories: true,
    manufacturers: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (min, max) => {
    onFilterChange({ ...filters, min_price: min, max_price: max });
  };

  // const handleCategoryChange = (categoryId) => {
  //   onFilterChange({ ...filters, category_id: categoryId });
  // };

  const handleManufacturerChange = (manufacturer) => {
    const current = filters.manufacturer || [];
    const updated = current.includes(manufacturer)
      ? current.filter(m => m !== manufacturer)
      : [...current, manufacturer];
    onFilterChange({ ...filters, manufacturer: updated.length > 0 ? updated : undefined });
  };

  const handleAvailabilityChange = (value) => {
    onFilterChange({ ...filters, in_stock: value });
  };

  const priceRanges = [
    { label: 'Under ৳100', min: 0, max: 100 },
    { label: '৳100 - ৳300', min: 100, max: 300 },
    { label: '৳300 - ৳500', min: 300, max: 500 },
    { label: '৳500 - ৳1000', min: 500, max: 1000 },
    { label: 'Over ৳1000', min: 1000, max: null },
  ];

  const manufacturers = [
    'Square Pharmaceutical',
    'Incepta Pharmaceuticals',
    'Beximco Pharma',
    'Renata Limited',
    'Healthcare Pharmaceuticals',
  ];

  const FilterSection = ({ title, section, children }) => {
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between text-left font-medium text-[#111827] hover:text-[#165028] transition-colors"
        >
          <span>{title}</span>
          {openSections[section] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {openSections[section] && (
          <div className="mt-3 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-[#111827] text-lg">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="text-sm text-[#5DBB63] hover:text-[#4a9a4f] font-medium"
          >
            Clear All
          </button>
          {isMobile && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex-1 overflow-y-auto">
        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer hover:text-[#165028] transition-colors">
              <input
                type="radio"
                name="price"
                checked={filters.min_price === range.min && filters.max_price === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
                className="w-4 h-4 text-[#5DBB63] focus:ring-[#5DBB63]"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </FilterSection>

        {/* Manufacturers */}
        <FilterSection title="Brand/Manufacturer" section="manufacturers">
          {manufacturers.map((manufacturer) => (
            <label key={manufacturer} className="flex items-center gap-2 cursor-pointer hover:text-[#165028] transition-colors">
              <input
                type="checkbox"
                checked={(filters.manufacturer || []).includes(manufacturer)}
                onChange={() => handleManufacturerChange(manufacturer)}
                className="w-4 h-4 text-[#5DBB63] rounded focus:ring-[#5DBB63]"
              />
              <span className="text-sm text-gray-700">{manufacturer}</span>
            </label>
          ))}
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability" section="availability">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#165028] transition-colors">
            <input
              type="checkbox"
              checked={filters.in_stock === true}
              onChange={(e) => handleAvailabilityChange(e.target.checked ? true : undefined)}
              className="w-4 h-4 text-[#5DBB63] rounded focus:ring-[#5DBB63]"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#165028] transition-colors">
            <input
              type="checkbox"
              checked={filters.prescription_required === 'false'}
              onChange={(e) => onFilterChange({ ...filters, prescription_required: e.target.checked ? 'false' : undefined })}
              className="w-4 h-4 text-[#5DBB63] rounded focus:ring-[#5DBB63]"
            />
            <span className="text-sm text-gray-700">No Prescription Needed</span>
          </label>
        </FilterSection>
      </div>

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
        <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-hidden">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 sticky top-24">
      {content}
    </div>
  );
}
