import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Dropdown from "./Dropdown";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loader from "@/loader/Loader";





const educationFieldArray = [
  { value: '0', content: "Human Resources", placeholder: "Select Education", title: "Education Field" },
  { value: '1', content: "Life Sciences" },
  { value: '2', content: "Marketing" },
  { value: '3', content: "Medical" },
  { value: '5', content: "Technical" },
  { value: '4', content: "Other" },
];

const jobRoleArray = [
  { value: '0', content: "Healthcare Representative", placeholder: "Select Your Role", title: "Job Role" },
  { value: '1', content: "Human Resources" },
  { value: '2', content: "Laboratory Technician" },
  { value: '3', content: "Network Engineer" },
  { value: '4', content: "Operational Executive" },
  { value: '5', content: "Project Manager" },
  { value: '6', content: "Research Director" },
  { value: '7', content: "Research Scientist" },
  { value: '8', content: "Sales Executive" },
  { value: '9', content: "Sales Representative" },
  { value: '10', content: "Software Developer" },
  { value: '11', content: "Team Lead" },
];

const departmentArray = [
  { value: '0', content: "Defence", placeholder: "Select Department", title: "Department" },
  { value: '1', content: "Human Resources" },
  { value: '2', content: "IT department" },
  { value: '3', content: "Research & Development" },
  { value: '4', content: "Sales" },
  { value: '5', content: "Tech Development" },
];

const industryArray = [
  { value: '0', content: "Aerospace", placeholder: "Select Industry", title: "Industry" },
  { value: '1', content: "Education" },
  { value: '2', content: "Finance" },
  { value: '3', content: "Fitness" },
  { value: '4', content: "Food" },
  { value: '5', content: "Healthcare" },
  { value: '6', content: "Logistics" },
  { value: '7', content: "Real Estate" },
  { value: '8', content: "Retail" },
  { value: '9', content: "Sales" },
  { value: '10', content: "Transportation" },
  { value: '11', content: "Travel" },
];

const stageArray = [
  { value: '0', content: "Acquired", placeholder: "Select Stage", title: "Organization's Financial Stage" },
  { value: '1', content: "Post-IPO" },
  { value: '2', content: "Private Equity" },
  { value: '3', content: "Seed" },
  { value: '4', content: "Series A" },
  { value: '5', content: "Series B" },
  { value: '6', content: "Series C" },
  { value: '7', content: "Series D" },
  { value: '8', content: "Series E" },
  { value: '9', content: "Series F" },
  { value: '10', content: "Series G" },
  { value: '11', content: "Series H" },
  { value: '12', content: "Series I" },
  { value: '13', content: "Series J" },
  { value: '14', content: "Subsidiary" },
  { value: '15', content: "Unknown" },
];

const genderArray = [
  { value: '0', content: "Female", placeholder: "Select Your Gender", title: "Gender" },
  { value: '1', content: "Male" },
];

const educationArray = [
  { value: '1', content: "High School", placeholder: "Select Your Highest level of Education", title: "Education" },
  { value: '2', content: "Diploma" },
  { value: '3', content: "Bachelor" },
  { value: '4', content: "Master" },
  { value: '5', content: "Doctor" },
];

const performanceRatingArray = [
  { value: '1', content: "Low", placeholder: "Select Your Performance Rating", title: "Performance Rating" },
  { value: '2', content: "Good" },
  { value: '3', content: "Excellent" },
  { value: '4', content: "Outstanding" },
];

const jobSatisfactionArray = [
  { value: '1', content: "Low", placeholder: "Select Employer's Satisfaction", title: "Work Fulfillment" },
  { value: '2', content: "Medium" },
  { value: '3', content: "High" },
  { value: '4', content: "Very High" },
];

const jobInvolvementArray = [
  { value: '1', content: "Low", placeholder: "Select Your Job Involvement", title: "Job Involvement" },
  { value: '2', content: "Medium" },
  { value: '3', content: "High" },
  { value: '4', content: "Very High" },
];

export default function Box() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [responseMessage, setResponseMessage] = React.useState(null); // Add this line
  const [openModal, setOpenModal] = React.useState(false)


  const [formData, setFormData] = React.useState({
    age: "",
    educationField: "",
    jobRole: "",
    department: "",
    industry: "",
    stage: "",
    education: "",
    fundsRaised: "",
    performanceRating: "",
    jobSatisfaction: "",
    jobInvolvement: "",
    yearsAtCompany: "",
    yearsInCurrentRole: "",
    yearsWithCurrManager: "",
    monthlyincome: "",
    numcompaniesworked: "",
    gender: "",
  });


  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setResponseMessage(result?.percentageChanceOfLayoff);
      setOpenModal(true);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };


  console.log(responseMessage);

  const handleDropdownChange = (field, value) => {
    if (field === "age") {
      if (value < 18 || value > 70) {
        // setAgeError("Age must be between 18 and 70.");
      } else {
        // setAgeError("");
      }
    }

    if (field === "fundsRaised")
      if (value < 0) {
        // setAgeError("Age must be between 18 and 70.");
      }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // console.log(formData);

  return (
    <Card className="h-max mx-auto w-[60%]">
      <CardHeader className="text-center">
        <CardTitle>Layoff Risk Assessment</CardTitle>
        <CardDescription>
          Determine your job security with a quick and easy score calculation.
        </CardDescription>
      </CardHeader>

      {/* -------------- Age Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => handleDropdownChange("age", e.target.value)}
            min="18"
            max="70"
          />
        </div>
      </div>

      {/* -------------- Education Field Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={educationFieldArray}
              handleChange={(value) => handleDropdownChange("educationField", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Job Role Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={jobRoleArray}
              handleChange={(value) => handleDropdownChange("jobRole", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Department Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={departmentArray}
              handleChange={(value) => handleDropdownChange("department", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Industry Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={industryArray}
              handleChange={(value) => handleDropdownChange("industry", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Stage Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={stageArray}
              handleChange={(value) => handleDropdownChange("stage", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Gender Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={genderArray}
              handleChange={(value) => handleDropdownChange("gender", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Education Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={educationArray}
              handleChange={(value) => handleDropdownChange("education", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Performance Rating Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={performanceRatingArray}
              handleChange={(value) => handleDropdownChange("performanceRating", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Job Satisfaction Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={jobSatisfactionArray}
              handleChange={(value) => handleDropdownChange("jobSatisfaction", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Job Involvement Dropdown --------------------- */}
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <Dropdown
              selectItemArray={jobInvolvementArray}
              handleChange={(value) => handleDropdownChange("jobInvolvement", value)}
            />
          </div>
        </form>
      </CardContent>

      {/* -------------- Fund Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="fundsRaised">Funds Raised</Label>
          <Input
            type="number"
            id="fundsRaised"
            placeholder="Enter your Fund"
            value={formData.fundsRaised}
            onChange={(e) => handleDropdownChange("fundsRaised", e.target.value)}
          />
        </div>
      </div>

      {/* -------------- Year at Company Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="yearsAtCompany">Year at Company</Label>
          <Input
            type="number"
            id="yearsAtCompany"
            placeholder="Enter your Years at Company"
            value={formData.yearsAtCompany}
            onChange={(e) => handleDropdownChange("yearsAtCompany", e.target.value)}
          />
        </div>
      </div>

      {/* -------------- Year in Current Role Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="yearsInCurrentRole">Year in Current Role</Label>
          <Input
            type="number"
            id="yearsInCurrentRole"
            placeholder="Enter your Years in Current Role"
            value={formData.yearsInCurrentRole}
            onChange={(e) => handleDropdownChange("yearsInCurrentRole", e.target.value)}
          />
        </div>
      </div>

      {/* -------------- Year with Current Manager Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="yearsWithCurrManager">Year with Current Manager</Label>
          <Input
            type="number"
            id="yearsWithCurrManager"
            placeholder="Enter your Years with Current Manager"
            value={formData.yearsWithCurrManager}
            onChange={(e) => handleDropdownChange("yearsWithCurrManager", e.target.value)}
          />
        </div>
      </div>

      {/* -------------- Monthly Income Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="monthlyincome">Monthly Income</Label>
          <Input
            type="number"
            id="monthlyincome"
            placeholder="Enter your Monthly Income"
            value={formData.monthlyincome}
            onChange={(e) => handleDropdownChange("monthlyincome", e.target.value)}
          />
        </div>
      </div>

      {/* -------------- Number of Companies Worked Input --------------------- */}
      <div className="grid w-full items-center gap-4 px-6 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="numcompaniesworked">Number of Companies Worked</Label>
          <Input
            type="number"
            id="numcompaniesworked"
            placeholder="Enter the Number of Companies you Worked"
            value={formData.numcompaniesworked}
            onChange={(e) => handleDropdownChange("numcompaniesworked", e.target.value)}
          />
        </div>
      </div>

      <CardFooter className="flex justify-center">
        <Button className="w-36" onClick={handleClick} disabled={loading}>{loading ? <Loader /> : 'Submit'}</Button>
      </CardFooter>



      {
        openModal
        &&
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="h-1/4">
            <DialogHeader className="grid place-content-center text-bold">
              <DialogTitle className="text-2xl">Your chances of getting laid off is </DialogTitle>
              <DialogTitle className="text-3xl text-center">{`${responseMessage}%`}</DialogTitle>
              {/* <DialogDescription>

              </DialogDescription> */}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }


      {/* {loading && <p>Loading...</p>} */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {/* {responseMessage && <p className="text-green-500">{responseMessage}</p>} */}
    </Card>
  );
}
