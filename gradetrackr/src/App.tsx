import React, { useState } from 'react';
import './App.css';

const modulesData = [
  {
    term: 'Autumn Term (Term 1)',
    ects: 27.5,
    modules: [
      {
        name: 'Big Issues in Economics and Finance',
        code: 'BUSI40004',
        credits: 5.0,
        assessments: [
          { name: 'Final Exam', weight: 70 },
          { name: 'Group Presentation', weight: 30 },
        ],
      },
      {
        name: 'Introduction to Data Science',
        code: 'BUSI40003',
        credits: 7.5,
        assessments: [
          { name: 'Final Exam', weight: 60 },
          { name: 'Group Presentation', weight: 40 },
        ],
      },
      {
        name: 'Mathematical Foundations',
        code: 'BUSI40001',
        credits: 7.5,
        assessments: [
          { name: 'Final Exam', weight: 70 },
          { name: 'In-class Test', weight: 30 },
        ],
      },
      {
        name: 'Probability and Statistics',
        code: 'BUSI40002',
        credits: 7.5,
        assessments: [
          { name: 'Final Exam', weight: 70 },
          { name: 'In-class Test', weight: 30 },
        ],
      },
    ],
  },
  {
    term: 'Spring Term (Term 2)',
    ects: 32.5,
    modules: [
      {
        name: 'Accounting',
        code: 'BUSI40005',
        credits: 5.0,
        assessments: [
          { name: 'Final Exam', weight: 70 },
          { name: 'In-class Test', weight: 30 },
        ],
      },
      {
        name: 'Data Structures and Algorithms',
        code: 'BUSI40008',
        credits: 7.5,
        assessments: [
          { name: 'Final Exam', weight: 60 },
          { name: 'Individual Problem Set 1', weight: 10 },
          { name: 'Individual Problem Set 2', weight: 10 },
          { name: 'Tutorial Hand-ins (5 submissions)', weight: 20 },
        ],
      },
      {
        name: 'Essential Skills 1: Creative Problem Solving',
        code: 'BUSI40009',
        credits: 5.0,
        assessments: [
          { name: 'Group Presentation', weight: 40 },
          { name: 'Group Report', weight: 50 },
          { name: 'Peer Assessment', weight: 10 },
        ],
      },
      {
        name: 'Macroeconomics 1',
        code: 'BUSI40007',
        credits: 7.5,
        assessments: [
          { name: 'Final Exam', weight: 60 },
          { name: 'Group Presentation and Report', weight: 20 },
          { name: 'Test 1', weight: 10 },
          { name: 'Test 2', weight: 10 },
        ],
      },
      {
        name: 'Microeconomics 1',
        code: 'BUSI40006',
        credits: 7.5,
        assessments: [
          { name: 'Final Exam', weight: 75 },
          { name: 'Group Presentation (Video)', weight: 20 },
          { name: 'Individual Peer Review', weight: 5 },
        ],
      },
    ],
  },
];

function App() {
  const [grades, setGrades] = useState({});

  const handleInputChange = (moduleCode, assessmentName, value) => {
    setGrades((prev) => ({
      ...prev,
      [moduleCode]: {
        ...prev[moduleCode],
        [assessmentName]: value,
      },
    }));
  };

  const calculateModuleGrade = (module) => {
    const moduleGrades = grades[module.code] || {};
    return module.assessments.reduce((sum, a) => {
      const mark = parseFloat(moduleGrades[a.name]) || 0;
      return sum + (mark * a.weight) / 100;
    }, 0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Modules</h1>
      {modulesData.map((term) => (
        <div key={term.term} className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{term.term} ({term.ects} ECTS)</h2>
          {term.modules.map((module) => (
            <div key={module.code} className="border p-4 mb-4 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{module.name}</h3>
                  <p className="text-sm text-gray-500">{module.code}</p>
                </div>
                <div className="text-sm">{module.credits} Credits</div>
              </div>
              {module.assessments.map((assessment) => (
                <div key={assessment.name} className="flex justify-between items-center mb-1">
                  <label>{assessment.name} ({assessment.weight.toFixed(2)}%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="border rounded p-1 w-24 text-right"
                    value={grades[module.code]?.[assessment.name] || ''}
                    onChange={(e) => handleInputChange(module.code, assessment.name, e.target.value)}
                  />
                </div>
              ))}
              <div className="text-right mt-2 font-semibold">
                Module Grade: {calculateModuleGrade(module).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
