import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load the dataset
df = pd.read_csv('investment_options.csv')

# Let's first understand our data distribution
print("Dataset Information:")
print(f"Total number of records: {len(df)}")
print("\nInvestment options distribution:")
print(df['InvestmentOption'].value_counts())
print("\nRisk level distribution:")
print(df['RiskLevel'].value_counts())

# Feature Engineering
def create_risk_score(row):
    """Create a composite risk score based on return and potential loss"""
    return (row['ExpectedReturn'] * 0.4) + (row['MaxPotentialLoss'] * 0.6)

# Add engineered features
df['RiskScore'] = df.apply(create_risk_score, axis=1)
df['ReturnToRiskRatio'] = df['ExpectedReturn'] / (df['MaxPotentialLoss'] + 1)
df['IncomeRange'] = df['MaxIncome'] - df['MinIncome']

# Encode categorical variables
le_investment = LabelEncoder()
df['InvestmentCode'] = le_investment.fit_transform(df['InvestmentOption'])
le_risk = LabelEncoder()
df['RiskCode'] = le_risk.fit_transform(df['RiskLevel'])

# Prepare features and target
X = df[[
    'MinIncome', 
    'MaxIncome', 
    'RiskCode',
    'MaxPotentialLoss',
    'ExpectedReturn',
    'RiskScore',
    'ReturnToRiskRatio',
    'IncomeRange'
]]

y = df['InvestmentCode']

# Scale numerical features
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
X_scaled = pd.DataFrame(X_scaled, columns=X.columns)

# For a small dataset like this, we'll use the entire dataset for training
# This is acceptable when we have limited data and the model will be used for recommendation
print("\nNote: Using entire dataset for training due to small dataset size")

# Initialize the model with appropriate parameters for small dataset
model = DecisionTreeClassifier(
    criterion='entropy',
    max_depth=3,  # Reduced to prevent overfitting on small dataset
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42
)

# Fit the model on the entire dataset
model.fit(X_scaled, y)

# Get training accuracy (in-sample accuracy)
y_pred = model.predict(X_scaled)
accuracy = accuracy_score(y, y_pred)
report = classification_report(y, y_pred)

print(f"\nModel Training Accuracy: {accuracy:.2f}")
print("\nClassification Report:")
print(report)

# Save the model and preprocessing objects
joblib.dump(model, 'investment_model.pkl')
joblib.dump(le_investment, 'le_investment.pkl')
joblib.dump(le_risk, 'le_risk.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Analyze and save feature importance information
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
})
feature_importance = feature_importance.sort_values('importance', ascending=False)
feature_importance.to_csv('feature_importance.csv', index=False)

print("\nFeature Importance:")
print(feature_importance)

# Print decision rules for interpretability
def print_decision_path(estimator, feature_names):
    n_nodes = estimator.tree_.node_count
    children_left = estimator.tree_.children_left
    children_right = estimator.tree_.children_right
    feature = estimator.tree_.feature
    threshold = estimator.tree_.threshold
    
    print("\nDecision Path Rules:")
    for node in range(n_nodes):
        if children_left[node] != children_right[node]:  # If internal node
            print(f"Node {node}: if {feature_names[feature[node]]} <= {threshold[node]:.2f} "
                  f"then node {children_left[node]} else node {children_right[node]}")

print_decision_path(model, X.columns)

# Save model metadata for reference
model_metadata = {
    'n_features': len(X.columns),
    'feature_names': list(X.columns),
    'n_classes': len(np.unique(y)),
    'max_depth': model.get_depth(),
    'n_leaves': model.get_n_leaves()
}

print("\nModel Metadata:")
for key, value in model_metadata.items():
    print(f"{key}: {value}")