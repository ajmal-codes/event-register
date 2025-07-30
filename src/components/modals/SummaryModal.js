'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeaderImg from "@/../../public/images/modal_header.png";
import { useSelector } from 'react-redux';


export const solutionList = [
  { id: 'global-leaders-sol', name: 'Global Leaders Forum !NEW', duration: '5 Days', category: 'leadership' },
  { id: 'gitex-main-sol', name: 'GITEX Main Stage', duration: '4 Days', category: 'main' },
  { id: 'ai-robotics-sol', name: 'Artificial Intelligence & Robotics', duration: '15 Sessions', category: 'technology' },
  { id: 'future-health-sol', name: 'Future Health !NEW', duration: '2 Days', category: 'health' },
  { id: 'cybersecurity-sol', name: 'Cybersecurity', duration: '4 Days', category: 'security' },
  { id: 'ai-everything-sol', name: 'AI Everything', duration: '4 Days', category: 'technology' },
];
export const subOptionsList = [
  { id: 'digital-cities-sol', name: 'Digital Cities', duration: '1 Day', category: 'smart-city' },
  { id: 'edtech-sol', name: 'Edtech', duration: '1 Day', category: 'education' },
  { id: 'energy-transition-sol', name: 'Energy Transition', duration: '1 Day', category: 'energy' },
  { id: 'intelligent-connectivity-sol', name: 'Intelligent Connectivity', duration: '1 Day', category: 'connectivity' },
  { id: 'digital-finance-sol', name: 'Digital Finance', duration: '1 Day', category: 'finance' },
  { id: 'future-mobility-sol', name: 'Future Mobility', duration: '1 Day', category: 'mobility' }
];

export default function SummaryModal({ selectedSolutions,selectedSubSolutions, onUpdate, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelected, setLocalSelected] = useState(selectedSolutions);
  const [subSelected, setSubSelected] = useState(selectedSubSolutions);
  const [filteredSolutions, setFilteredSolutions] = useState(solutionList);

  useEffect(() => {
    const filtered = solutionList.filter(solution =>
      solution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solution.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSolutions(filtered);
  }, [searchTerm]);

  const handleToggleSolution = (solutionId) => {
    setLocalSelected(prev => {
      if (prev.includes(solutionId)) {
        return prev.filter(id => id !== solutionId);
      } else {
        if (prev.length >= 5) {
          alert('You can select maximum 5 solutions');
          return prev;
        }
        return [...prev, solutionId];
      }
    });
  };
  const handleToggleSubSolution = (solutionId) => {
    setSubSelected(prev => {
      if (prev.includes(solutionId)) {
        return prev.filter(id => id !== solutionId);
      } else {
        if (prev.length >= 5) {
          alert('You can select maximum 5 solutions');
          return prev;
        }
        return [...prev, solutionId];
      }
    });
  };

  const handleApply = () => {
    if (localSelected.length === 0) {
      alert('Please select at least one solution');
      return;
    }
    onUpdate(localSelected,subSelected);
    onClose();
  };

  const handleCancel = () => {
    setLocalSelected(selectedSolutions);
    setSubSelected(selectedSubSolutions);
    onClose();
  };

  // Split solutions into two columns
  const leftColumn = filteredSolutions;
  const rightColumn = subOptionsList;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4">
      <div className="bg-white rounded-4xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <Image src={HeaderImg} alt="Header" className="w-full h-auto" />
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 w-8 h-8 bg-transparent border-white border-2 bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-white absolute top-1/2 ps-6 transform -translate-y-1/2">SELECT SOLUTIONS/PRODUCTS</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search */}

          {/* Solutions Grid */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Price
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Count
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {useSelector((state) => state.order.selectedCards)
                  .filter(card => card.count > 0)
                  .map((card) => (
                    <tr key={card.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 font-medium text-gray-900">
                        {card.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                        {card.price > 0 ? `$${card.price.toFixed(2)}` : 'FREE'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                        {card.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-500">
                        {card.price > 0 ? `$${(card.price * card.count).toFixed(2)}` : 'FREE'}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    Total Amount:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${useSelector((state) => state.order.totalPrice.toFixed(2))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>

        {/* Footer */}
        {/* <div className="border-t p-4 md:p-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleCancel}
            className="w-full sm:w-auto px-3 py-[0.3rem] border-2 border-black text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={handleApply}
          className=" font-archivo px-3 py-[0.3rem] bg-gradient-to-r from-[#27963D] to-[#134323] text-white text-xs  rounded transition-colors font-medium"
          >
            APPLY
          </button>
        </div> */}
      </div>
    </div>
  );
}
