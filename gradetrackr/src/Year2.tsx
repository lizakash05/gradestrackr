import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Year2 from './Year2';
import Summary from './Summary';
import year2ModulesData from './year2ModulesData';
import './App.css';

function App() {
  // Year 2 grades state in App
  const [year2Grades, setYear2Grades] = useState(() => {
    const saved = localStorage.getItem('year2Grades');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('year2Grades', JSON.stringify(year2Grades));
  }, [year2Grades]);

  // Calculate year 2 overall grade in App
  const calculateModuleGrade = (module, gradesObj) => {
    const moduleGrades = gradesObj[module.code] || {};
    return module.assessments.reduce((sum, a) => {
      const mark = parseFloat(moduleGrades[a.name]) || 0;
      return sum + (mark * a.weight) / 100;
    }, 0);
  };

  const year2TotalCredits = year2ModulesData
    .flatMap((term) => term.modules)
    .reduce((sum, m) => sum + m.credits, 0);

  const year2CompletedCredits = year2ModulesData
    .flatMap((term) => term.modules)
    .reduce((sum, m) => {
      const grade = calculateModuleGrade(m, year2Grades);
      return grade > 0 ? sum + m.credits : sum;
    }, 0);

  const year2WeightedGradeSum = year2ModulesData
    .flatMap((term) => term.modules)
    .reduce((sum, m) => {
      const grade = calculateModuleGrade(m, year2Grades);
      return grade > 0 ? sum + grade * m.credits : sum;
    }, 0);

  const year2OverallGrade = year2CompletedCredits > 0 ? year2WeightedGradeSum / year2CompletedCredits : 0;

  return (
    <Router>
      <Routes>
        <Route
          path="/year2"
          element={
            <Year2
              grades={year2Grades}
              setGrades={setYear2Grades}
            />
          }
        />
        <Route
          path="/summary"
          element={
            <Summary
              year1Grade={year1Grade}
              year2Grade={year2OverallGrade}
            />
          }
        />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;

// In Year2.tsx
import React, { useEffect } from 'react';
import year2ModulesData from './year2ModulesData';
import './App.css';

function Year2({ grades, setGrades }) {
  useEffect(() => {
    localStorage.setItem('year2Grades', JSON.stringify(grades));
  }, [grades]);

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

  const totalCredits = year2ModulesData
    .flatMap((term) => term.modules)
    .reduce((sum, m) => sum + m.credits, 0);

  const completedCredits = year2ModulesData
    .flatMap((term) => term.modules)
    .reduce((sum, m) => {
      const grade = calculateModuleGrade(m);
      return grade > 0 ? sum + m.credits : sum;
    }, 0);

  const weightedGradeSum = year2ModulesData
    .flatMap((term) => term.modules)
    .reduce((sum, m) => {
      const grade = calculateModuleGrade(m);
      return grade > 0 ? sum + grade * m.credits : sum;
    }, 0);

  const overallGrade = completedCredits > 0 ? weightedGradeSum / completedCredits : 0;

  const getClassification = (grade) => {
    if (grade >= 70) return { label: 'First Class', color: '#38a169' };
    if (grade >= 60) return { label: 'Upper Second (2:1)', color: '#3182ce' };
    if (grade >= 50) return { label: 'Lower Second (2:2)', color: '#d69e2e' };
    if (grade >= 40) return { label: 'Third Class', color: '#ed8936' };
    return { label: 'Fail', color: '#e53e3e' };
  };

  const classification = getClassification(overallGrade);

  return (
    <div className="main-container">
      <h1 className="title">Economics, Finance and Data Science BSc</h1>
      <p className="subtitle">Imperial College London • Year 2 • 2025/26</p>

      <div className="summary-card">
        <h2 className="summary-title">Overall Performance</h2>
        <div className="summary-top">
          <div>
            <div className="summary-grade">
              {overallGrade > 0 ? `${overallGrade.toFixed(2)}%` : '-'}
            </div>
            <div className="summary-label">Current Average</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              className="classification-pill"
              style={{
                background: classification.color + '20',
                color: classification.color,
              }}
            >
              {classification.label}
            </span>
            <div className="summary-label">Classification</div>
          </div>
        </div>
        <div className="summary-progress">
          <div>
            Completed Credits: <strong>{completedCredits}/{totalCredits}</strong>
          </div>
          <div>
            Progress: <strong>{totalCredits > 0 ? Math.round((completedCredits / totalCredits) * 100) : 0}%</strong>
          </div>
        </div>
      </div>

      {year2ModulesData.map((term) => (
        <div key={term.term} className="term-block">
          <h2 className="term-title">
            {term.term} <span className="term-ects">({term.ects} ECTS)</span>
          </h2>
          {term.modules.map((module) => (
            <div key={module.code} className="module-card">
              <div className="module-header">
                <div>
                  <div className="module-title">{module.name}</div>
                  <div className="module-code">{module.code}</div>
                </div>
              </div>
              {module.assessments.map((assessment) => (
                <div key={assessment.name} className="assessment-row">
                  <span className="assessment-label">{assessment.name}</span>
                  <span className="assessment-weight">
                    {assessment.weight.toFixed(2)}%
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={grades[module.code]?.[assessment.name] || ''}
                    onChange={(e) =>
                      handleInputChange(module.code, assessment.name, e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="module-grade">
                Module Grade: {calculateModuleGrade(module).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Year2;