import React from 'react';

function getClassification(grade: number) {
  if (grade >= 70) return { label: 'First Class', color: '#38a169' };
  if (grade >= 60) return { label: 'Upper Second (2:1)', color: '#3182ce' };
  if (grade >= 50) return { label: 'Lower Second (2:2)', color: '#d69e2e' };
  if (grade >= 40) return { label: 'Third Class', color: '#ed8936' };
  return { label: 'Fail', color: '#e53e3e' };
}

interface SummaryProps {
  year1Grade: number;
  year2Grade: number;
}

const Summary: React.FC<SummaryProps> = ({ year1Grade, year2Grade }) => {
  const year1Weight = 7.5;
  const year2Weight = 35;
  const totalWeight = year1Weight + year2Weight;

  const predictedGrade =
    ((year1Grade * year1Weight) + (year2Grade * year2Weight)) / totalWeight;

  const year1Classification = getClassification(year1Grade);
  const year2Classification = getClassification(year2Grade);
  const predictedClassification = getClassification(predictedGrade);

  return (
    <div className="main-container">
      <h1 className="title">Year 1 & Year 2 Summary</h1>
      <div className="summary-card">
        <h2 className="summary-title">Year 1</h2>
        <div>
          <strong>{year1Grade > 0 ? `${year1Grade.toFixed(2)}%` : '-'}</strong>
          <span
            className="classification-pill"
            style={{
              background: year1Classification.color + '20',
              color: year1Classification.color,
              marginLeft: '1em'
            }}
          >
            {year1Classification.label}
          </span>
        </div>
        <h2 className="summary-title">Year 2</h2>
        <div>
          <strong>{year2Grade > 0 ? `${year2Grade.toFixed(2)}%` : '-'}</strong>
          <span
            className="classification-pill"
            style={{
              background: year2Classification.color + '20',
              color: year2Classification.color,
              marginLeft: '1em'
            }}
          >
            {year2Classification.label}
          </span>
        </div>
        <h2 className="summary-title">Predicted Grade</h2>
        <div>
          <strong>{predictedGrade > 0 ? `${predictedGrade.toFixed(2)}%` : '-'}</strong>
          <span
            className="classification-pill"
            style={{
              background: predictedClassification.color + '20',
              color: predictedClassification.color,
              marginLeft: '1em'
            }}
          >
            {predictedClassification.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;