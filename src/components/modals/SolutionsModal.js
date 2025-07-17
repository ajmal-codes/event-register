'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeaderImg from "@/../../public/images/modal_header.png";


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

export default function SolutionsModal({ selectedSolutions,selectedSubSolutions, onUpdate, onClose }) {
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
          <div className="mb-6">
            <input
              type="text"
              placeholder="Try Product/Service"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              I Am Interested In Sourcing The Following Solutions/Products? (Select Top 5)* Please Ensure You Have Chosen At Least One Category In Each Section
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-80 md:max-h-50 overflow-y-auto">
            {/* Left Column */}
            <div className="">
              {leftColumn.map((solution) => (
                <label key={solution.id} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={localSelected.includes(solution.id)}
                    onChange={() => handleToggleSolution(solution.id)}
                    className="custom-checkbox mt-1"
                  />
                  <div className="flex-1">
                        <div className=" text-gray-900">
                          {solution.name} <span className={solution.duration.length<=3?"text-gray-500":"text-[#000"}>({solution.duration})</span>
                        </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Right Column */}
            <div className="">
              {(localSelected?.length>0&&leftColumn.length>0)&&rightColumn.map((solution) => (
                <label key={solution.id} className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={subSelected.includes(solution.id)}
                    onChange={() => handleToggleSubSolution(solution.id)}
                    className="custom-checkbox mt-1"
                  />
                  <div className="flex-1">
                        <div className=" text-gray-900">
                          {solution.name} <span className={solution.duration.length<=3?"text-gray-500":"text-[#000"}>({solution.duration})</span>
                        </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-4 md:p-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
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
        </div>
      </div>
    </div>
  );
}
