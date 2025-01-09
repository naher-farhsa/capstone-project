from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and preprocessing objects
model = joblib.load('investment_model.pkl')
le_investment = joblib.load('le_investment.pkl')
le_risk = joblib.load('le_risk.pkl')
scaler = joblib.load('scaler.pkl')

# Load the dataset
df = pd.read_csv('investment_options.csv')

def create_risk_score(row):
    """Create a composite risk score based on return and potential loss"""
    return (row['ExpectedReturn'] * 0.4) + (row['MaxPotentialLoss'] * 0.6)

# Add encoded columns to the DataFrame
df['InvestmentCode'] = le_investment.transform(df['InvestmentOption'])
df['RiskCode'] = le_risk.transform(df['RiskLevel'])
df['RiskScore'] = df.apply(create_risk_score, axis=1)
df['ReturnToRiskRatio'] = df['ExpectedReturn'] / (df['MaxPotentialLoss'] + 1)
df['IncomeRange'] = df['MaxIncome'] - df['MinIncome']

@app.route('/getInvestmentSuggestions', methods=['POST'])
def get_investment_suggestions():
    try:
        data = request.get_json()
        income = float(data.get('income', 0))
        risk_preference = data.get('risk_preference', 'Medium')  # New parameter
        
        if income <= 0:
            return jsonify({'error': 'Invalid income value.'}), 400

        # Filter suitable investments based on income
        suitable_investments = df[(df['MinIncome'] <= income) & (df['MaxIncome'] >= income)]

        if suitable_investments.empty:
            return jsonify({'message': 'No investment options available for this income level.'}), 404

        # Prepare features for prediction
        X_new = suitable_investments[[
            'MinIncome', 
            'MaxIncome', 
            'RiskCode',
            'MaxPotentialLoss',
            'ExpectedReturn',
            'RiskScore',
            'ReturnToRiskRatio',
            'IncomeRange'
        ]]

        # Scale features
        X_new_scaled = scaler.transform(X_new)

        # Predict investment codes
        predicted_codes = model.predict(X_new_scaled)
        prediction_proba = model.predict_proba(X_new_scaled)

        # Get top 3 recommendations for each prediction
        recommendations = []
        for i, code in enumerate(predicted_codes):
            proba = prediction_proba[i]
            top_3_indices = np.argsort(proba)[-3:][::-1]
            
            investment_options = []
            for idx in top_3_indices:
                option = {
                    'option': le_investment.inverse_transform([idx])[0],
                    'confidence': float(proba[idx]),
                    'expected_return': float(suitable_investments.iloc[i]['ExpectedReturn']),
                    'risk_level': suitable_investments.iloc[i]['RiskLevel'],
                    'max_loss': float(suitable_investments.iloc[i]['MaxPotentialLoss'])
                }
                investment_options.append(option)
            
            recommendations.append({
                'income_range': f"${int(suitable_investments.iloc[i]['MinIncome']):,} - ${int(suitable_investments.iloc[i]['MaxIncome']):,}",
                'options': investment_options
            })

        return jsonify({
            'recommendations': recommendations,
            'message': 'Success'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)