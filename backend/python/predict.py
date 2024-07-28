import sys
import json
import pandas as pd
import joblib

model_filename = 'G:\\Windsor MAC\\SEM 2\\ADT\\project\\ADT\\Laycon\\python\\rf.pkl'
scaler_filename = 'G:\\Windsor MAC\\SEM 2\\ADT\\project\\ADT\\Laycon\\python\\scaler.pkl'
rfe_filename = 'G:\\Windsor MAC\\SEM 2\\ADT\\project\\ADT\\Laycon\\python\\rfe.pkl'

loaded_model = joblib.load(model_filename)
loaded_scaler = joblib.load(scaler_filename)
loaded_rfe = joblib.load(rfe_filename)

training_feature_names = [
    'Age', 'EducationField', 'JobRole', 'Department', 'Industry', 
    'Stage', 'Education', 'Funds_Raised(m)', 'PerformanceRating', 
    'JobSatisfaction', 'JobInvolvement', 'YearsAtCompany', 
    'YearsInCurrentRole', 'YearsWithCurrManager','MonthlyIncome',
    'NumCompaniesWorked', 'Gender'
]

def main():
    input_data = json.loads(sys.argv[1])
    input_df = pd.DataFrame([input_data])

    for col in training_feature_names:
        if col not in input_df:
            input_df[col] = 0

    input_df = input_df[training_feature_names]

    input_data_scaled = loaded_scaler.transform(input_df)
    input_data_rfe = loaded_rfe.transform(input_data_scaled)

    prob_adjusted = loaded_model.predict_proba(input_data_rfe)[:, 1]
    layoff_probability = prob_adjusted[0] * 100

    print(f"{layoff_probability:.2f}")

if __name__ == '__main__':
    main()
