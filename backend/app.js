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
  const data = {
    age: req.body.age,
    educationField: req.body.educationField,
    jobRole: req.body.jobRole,
    department: req.body.department,
    industry: req.body.industry,
    stage: req.body.stage,
    education: req.body.education,
    fundsRaised: req.body.fundsRaised,
    performanceRating: req.body.performanceRating,
    jobSatisfaction: req.body.jobSatisfaction,
    jobInvolvement: req.body.jobInvolvement,
    yearsAtCompany: req.body.yearsAtCompany,
    yearsInCurrentRole: req.body.yearsInCurrentRole,
    yearsWithCurrManager: req.body.yearsWithCurrManager,
    monthlyincome:req.body.monthlyincome,
    numcompaniesworked:req.body.numcompaniesworked,
    gender:req.body.gender
  };

  const pythonFileName = path.join(__dirname, 'python', 'predict.py');
  const formData = JSON.stringify(data);

  const pythonProcess = spawn('python', [pythonFileName, formData]);
  console.log('Python process spawned');
  console.log(formData);

  pythonProcess.stdout.on('data', (data) => {
    console.log('Received data from Python process');
    const predictions = data.toString();
    console.log('Prediction:', predictions);

    res.send(`Percentage Chance of Layoff: ${predictions}%`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send('An error occurred');
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
