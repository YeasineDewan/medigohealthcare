import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, X, Calendar, FileText, DollarSign, Search, Filter } from 'lucide-react';

export default function JournalEntry() {
  const [entries, setEntries] = useState([
    { id: 1, date: '2024-01-15', voucherNo: 'JV001', description: 'Office Supplies Purchase', debit: 5000, credit: 0, account: 'Office Expenses' },
    { id: 2, date: '2024-01-15', voucherNo: 'JV001', description: 'Office Supplies Purchase', debit: 0, credit: 5000, account: 'Cash' },
  ]);

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    voucherNo: '',
    description: '',
    lines: [
      { account: '', debit: '', credit: '', narration: '' },
      { account: '', debit: '', credit: '', narration: '' },
    ],
  });

  const addLine = () => {
    setNewEntry({
      ...newEntry,
      lines: [...newEntry.lines, { account: '', debit: '', credit: '', narration: '' }],
    });
  };

  const removeLine = (index) => {
    if (newEntry.lines.length > 2) {
      setNewEntry({
        ...newEntry,
        lines: newEntry.lines.filter((_, i) => i !== index),
      });
    }
  };

  const totalDebit = newEntry.lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
  const totalCredit = newEntry.lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Journal Entry</h2>
        <p className="text-gray-500 mt-1">Record general journal transactions</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">New Journal Entry</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voucher No.</label>
            <input
              type="text"
              value={newEntry.voucherNo}
              onChange={(e) => setNewEntry({ ...newEntry, voucherNo: e.target.value })}
              placeholder="Auto-generated"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              placeholder="Transaction description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Account</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Narration</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Debit</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Credit</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {newEntry.lines.map((line, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <select
                      value={line.account}
                      onChange={(e) => {
                        const newLines = [...newEntry.lines];
                        newLines[index].account = e.target.value;
                        setNewEntry({ ...newEntry, lines: newLines });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    >
                      <option value="">Select Account</option>
                      <option value="cash">Cash</option>
                      <option value="bank">Bank</option>
                      <option value="office-expenses">Office Expenses</option>
                      <option value="salary">Salary</option>
                      <option value="revenue">Revenue</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={line.narration}
                      onChange={(e) => {
                        const newLines = [...newEntry.lines];
                        newLines[index].narration = e.target.value;
                        setNewEntry({ ...newEntry, lines: newLines });
                      }}
                      placeholder="Narration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={line.debit}
                      onChange={(e) => {
                        const newLines = [...newEntry.lines];
                        newLines[index].debit = e.target.value;
                        newLines[index].credit = '';
                        setNewEntry({ ...newEntry, lines: newLines });
                      }}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={line.credit}
                      onChange={(e) => {
                        const newLines = [...newEntry.lines];
                        newLines[index].credit = e.target.value;
                        newLines[index].debit = '';
                        setNewEntry({ ...newEntry, lines: newLines });
                      }}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => removeLine(index)}
                      disabled={newEntry.lines.length <= 2}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="2" className="py-3 px-4 text-right">Total:</td>
                <td className="py-3 px-4 text-right text-gray-900">${totalDebit.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-gray-900">${totalCredit.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={addLine}
            className="px-4 py-2 text-[#5DBB63] border border-[#5DBB63] rounded-lg hover:bg-[#f0fdf2] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Line
          </button>
          
          <div className="flex items-center gap-4">
            {!isBalanced && totalDebit > 0 && (
              <span className="text-sm text-red-600 font-medium">
                Entry not balanced! Difference: ${Math.abs(totalDebit - totalCredit).toFixed(2)}
              </span>
            )}
            {isBalanced && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Entry balanced
              </span>
            )}
            <button
              disabled={!isBalanced}
              className="px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save Entry
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Journal Entries</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Voucher No.</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Account</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Debit</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Credit</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{entry.date}</td>
                  <td className="py-3 px-4 text-gray-900">{entry.voucherNo}</td>
                  <td className="py-3 px-4 text-gray-900">{entry.description}</td>
                  <td className="py-3 px-4 text-gray-900">{entry.account}</td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
