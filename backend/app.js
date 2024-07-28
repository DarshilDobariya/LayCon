const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  console.log(req.body);

  // Convert keys to capitalized form
  const capitalizeKeys = (obj) => {
    const capitalizedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        capitalizedObj[capitalizedKey] = obj[key];
      }
    }
    return capitalizedObj;
  };

  const data = {
    Age: parseInt(req.body.age),
    EducationField: parseInt(req.body.educationField),
    JobRole: parseInt(req.body.jobRole),
    Department: parseInt(req.body.department),
    Industry: parseInt(req.body.industry),
    Stage: parseInt(req.body.stage),
    Education: parseInt(req.body.education),
    'Funds_Raised(m)': parseFloat(req.body.fundsRaised),
    PerformanceRating: parseInt(req.body.performanceRating),
    JobSatisfaction: parseInt(req.body.jobSatisfaction),
    JobInvolvement: parseInt(req.body.jobInvolvement),
    YearsAtCompany: parseInt(req.body.yearsAtCompany),
    YearsInCurrentRole: parseInt(req.body.yearsInCurrentRole),
    YearsWithCurrManager: parseInt(req.body.yearsWithCurrManager),
    MonthlyIncome: parseInt(req.body.monthlyincome),
    NumCompaniesWorked: parseInt(req.body.numcompaniesworked),
    Gender: parseInt(req.body.gender)
  };

  const capitalizedData = capitalizeKeys(data);

  const pythonFileName = path.join(__dirname, 'python', 'predict.py');
  const formData = JSON.stringify(capitalizedData);

  const pythonProcess = spawn('python', [pythonFileName, formData]);
  console.log('Python process spawned');
  console.log(formData);

  let pythonData = '';
  let pythonError = '';

  pythonProcess.stdout.on('data', (data) => {
    pythonData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    pythonError += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0 || pythonError) {
      console.error(`Python error: ${pythonError}`);
      if (!res.headersSent) {
        return res.status(500).send(`Python script error: ${pythonError}`);
      }
    } else {
      if (!res.headersSent) {
        res.json({ percentageChanceOfLayoff: parseFloat(pythonData.trim()) });
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
