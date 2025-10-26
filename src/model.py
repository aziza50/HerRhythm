import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

def predict_with_constraints(model_pipeline, yesterday_phase, new_data):

    # Use the model's predict_proba to get probability estimates for all classes
    probabilities = model_pipeline.predict_proba(new_data)
    predicted_class_index = np.argmax(probabilities, axis=1)[0]
    classes = model_pipeline.classes_
    initial_prediction = classes[predicted_class_index]
    print(yesterday_phase, initial_prediction)

    # Check and apply the custom constraint
    if yesterday_phase == 'menstrual' and initial_prediction not in ['menstrual', 'follicular']:        
        # Get probabilities for only the valid classes: 'menstrual' and 'follicular'
        valid_classes = ['menstrual', 'follicular']
        valid_indices = [np.where(classes == vc)[0][0] for vc in valid_classes]
        valid_probabilities = probabilities[0][valid_indices]
        
        # Select the valid class with the highest probability
        constrained_prediction_index = np.argmax(valid_probabilities)
        constrained_prediction = valid_classes[constrained_prediction_index]
        return constrained_prediction

    # Check and apply the custom constraint
    elif yesterday_phase == 'ovulation' and initial_prediction not in ['ovulation', 'luteal']:        
        # Get probabilities for only the valid classes: 'menstrual' and 'follicular'
        print("hey")
        valid_classes = ['ovulation', 'luteal']
        valid_indices = [np.where(classes == vc)[0][0] for vc in valid_classes]
        valid_probabilities = probabilities[0][valid_indices]
        
        # Select the valid class with the highest probability
        constrained_prediction_index = np.argmax(valid_probabilities)
        constrained_prediction = valid_classes[constrained_prediction_index]
        return constrained_prediction

    # Check and apply the custom constraint
    elif yesterday_phase == 'luteal' and initial_prediction not in ['menstrual', 'luteal']:        
        # Get probabilities for only the valid classes: 'menstrual' and 'follicular'
        valid_classes = ['menstrual', 'luteal']
        valid_indices = [np.where(classes == vc)[0][0] for vc in valid_classes]
        valid_probabilities = probabilities[0][valid_indices]
        
        # Select the valid class with the highest probability
        constrained_prediction_index = np.argmax(valid_probabilities)
        constrained_prediction = valid_classes[constrained_prediction_index]
        return constrained_prediction

    # Check and apply the custom constraint
    elif yesterday_phase == 'follicular' and initial_prediction not in ['ovulation', 'follicular']:        
        # Get probabilities for only the valid classes: 'menstrual' and 'follicular'
        valid_classes = ['ovulation', 'follicular']
        valid_indices = [np.where(classes == vc)[0][0] for vc in valid_classes]
        valid_probabilities = probabilities[0][valid_indices]
        
        # Select the valid class with the highest probability
        constrained_prediction_index = np.argmax(valid_probabilities)
        constrained_prediction = valid_classes[constrained_prediction_index]
        return constrained_prediction
    else:
        return initial_prediction
    
train_file = input('Input data file: ')
df = pd.read_csv(train_file)
df

# one-hot encode each symptom individually. 
# This requires splitting the 'symptoms' string into multiple columns.
symptoms_dummies = df['symptoms'].str.get_dummies(sep=', ')
df = pd.concat([df.drop('symptoms', axis=1), symptoms_dummies], axis=1)
print(df)

# 2. Define features (x) and target (y)
x_train = df.drop('current_phase', axis=1)
print(x_train)
y_train = df['current_phase']
print(y_train)

# 3. Split the data
#x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# 4. Create a preprocessor for the different data types
# Numerical features are scaled, while categorical features are one-hot encoded.
numerical_features = ['mean_period_duration', 'mean_cycle_length', 'days_since_last_period_started', 'yesterday_phase_duration', 'energy', 'age']
categorical_features = ['yesterday_phase'] + list(df.columns.difference(numerical_features + ['yesterday_phase', 'current_phase']))

# `ColumnTransformer` applies different transformations to different columns.
preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numerical_features), # `passthrough` keeps numerical data as is.
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ],
    remainder='passthrough' # Catches any other features, in this case, the `symptoms` dummies.
)

# 5. Build the machine learning pipeline
# A `Pipeline` streamlines the process by sequentially applying transformations and a final estimator.
model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# 6. Train the model
model_pipeline.fit(x_train, y_train)

# 7. Evaluate the model
#y_pred = model_pipeline.predict(X_test)
#print(classification_report(y_test, y_pred))

# 8. Make a prediction for a new day
# Example input for a new day's prediction.
new_day_data = {
    'mean_period_duration': [5],
    'mean_cycle_length': [28],
    'days_since_last_period_started': [15],
    'yesterday_phase': ['ovulation'],
    'yesterday_phase_duration': [10],
    'excited': [0], 'happy': [1], 'sad': [0], 'calm': [0], 'anxious': [0], 'bloating': [0], 
    'headache': [0], 'fatigue': [0], 'acne': [0], 'cramps': [0], 'none': [1],
    'energy': [73],
    'age': [28],
}

# Create a DataFrame for the new data. You must include all symptom columns.
new_day_df = pd.DataFrame(new_day_data)
new_df = new_day_df.reindex(columns=x_train.columns, fill_value=0)
#print(new_day_df)

# Predict the phase for the new day
prediction = model_pipeline.predict(new_df)
pred_c = predict_with_constraints(model_pipeline, str(new_day_data['yesterday_phase'][0]), new_day_df)

print(f"\nPredicted menstrual cycle phase for the new day: {prediction[0]}")
print(f"\nPredicted menstrual cycle phase for the new day: {pred_c}")
