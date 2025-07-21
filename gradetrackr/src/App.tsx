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

	const totalCredits = modulesData
		.flatMap((term) => term.modules)
		.reduce((sum, m) => sum + m.credits, 0);
	const completedCredits = modulesData
		.flatMap((term) => term.modules)
		.reduce((sum, m) => {
			const grade = calculateModuleGrade(m);
			return grade > 0 ? sum + m.credits : sum;
		}, 0);

	const weightedGradeSum = modulesData
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
			<p className="subtitle">Imperial College London • Year 1 • 2024/25</p>

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

			{modulesData.map((term) => (
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
								{/* <div className="module-status">Complete</div> */}
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

export default App;
