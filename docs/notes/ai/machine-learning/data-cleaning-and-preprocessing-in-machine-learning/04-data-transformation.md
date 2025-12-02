---
title: 'Data Transformation'
date: '2025-11-21'
fullPath: '/notes/ai/machine-learning/data-cleaning-and-preprocessing-in-machine-learning/04-data-transformation'
sectionSlug: 'notes'
---

## Understanding Data Transformation

- converting raw data into a format amenable to machine learning models and improving their performance
  * **example 1: ages and income**
    - _imagine you have dataset containing passengers's ages and incomes_
    - _ages could range from 1 to 90_
    - _income ranges from 1,000 to 90,000_
    - _to reduce bias in machine learning models due to vastly differing scales, we would normalize the features with numerical scaling_
  * **example 2: 'Embarked' port**
    - _may have categorical features like 'Embarked' port_
    - _ML models don't handle categorical data well so they need to be converted into numeric format through **One-Hot Encoding**_

Example dataset before transformation:

```python
import pandas as pd


example_data = pd.DataFrame({
  'age': [23, 45, 56, 78, 21],
  'income': [5000, 7000, 11000, 8000, 7600],
  'embarked': ['S', 'C', 'Q', 'S', 'S'],
})

print("Before Transformation:\n", example_data)
```

Output:

```txt
Before Transformation:
    age  income embarked
0   23    5000        S
1   45    7000        C
2   56   11000        Q
3   78    8000        S
4   21    7600        S
```

## Numerical Features Transformation

- **`MinMaxScalar` function from `sklearn.preprocessing`**: scales numerical features within a specified range _(default range is 0 to 1)_

```python
from sklearn.preprocessing import MinMaxScalar


# Converting dataframe into an array for the scalar
titanic_df[['age', 'fare']] = MinMaxScalar().fit_transform(titanic_df[['age', 'fare']])

print('After numerical feature scaling:\n', titanic_df[['age', 'fare']].head())
```

Output:

```txt
After numerical feature scaling:
         age      fare
0  0.271174  0.014151
1  0.472229  0.139136
2  0.321438  0.015469
3  0.434531  0.103644
4  0.434531  0.015713
```

Now the numerical features `age` and `fare` both range in a similar scale of 0 to 1, which

- reduces potential of bias
- greatly enhances predictive accuracy of future model

To adjust the scale range, you can set the `feature_range` parameter in `MinMaxScalar`:

```python
MinMaxScalar(feature_range=(0, 10))
```

## Categorical Features Transformation

**One-Hot Encoding** is

- common way to transform categorical features into form that can be understood by ML algorithms
- involves changing each category value into a new column and assigning it a 1 or 0 _(`True`/`False`)_ value to the column
  * _`True` represents presence of feature_
  * _`False` represents absence of feature_

```python
# Transform the categorical features with One-Hot Encoding
titanic_df = pd.get_dummies(titanic_df, columns=['sex', 'embarked'])

print('After one-hot encoding of categorical features:\n', titanic_df.head())
```

Output:

```txt
After one-hot encoding of categorical features:
    survived  pclass       age  sibsp  parch      fare  class    who  adult_male deck  embark_town alive  alone  sex_female  sex_male  embarked_C  embarked_Q  embarked_S
0         0       3  0.271174      1      0  0.014151  Third    man        True  NaN  Southampton    no  False       False      True       False       False        True
1         1       1  0.472229      1      0  0.139136  First  woman       False    C    Cherbourg   yes  False        True     False        True       False       False
2         1       3  0.321438      0      0  0.015469  Third  woman       False  NaN  Southampton   yes   True        True     False       False       False        True
3         1       1  0.434531      1      0  0.103644  First  woman       False    C  Southampton   yes  False        True     False       False       False        True
4         0       3  0.434531      0      0  0.015713  Third    man        True  NaN  Southampton    no   True       False      True       False       False        True
```

Dataset now has 5 new columns:

- `sex_female`
- `sex_male`
- `embarked_C`
- `embarked_Q`
- `embarked_S`

Instead of the `sex` columns with values `M` and `F`, a male passenger now has a `sex_male` column that is set to `True` and a `sex_female` set to `False`.

> Note that instead of `True`/`False` values, you could also create `1`/`0` values with the following syntax:
>
> ```python
> sex_dummies = pd.get_dummies(titanic_df['sex'], dtype=int).
> ```

## Combining Processed Features

_see [`pd.concat`](https://pandas.pydata.org/docs/reference/api/pandas.concat.html)_

```python
# Import necessary modules
import pandas as pd
from sklearn.preprocessing import OneHotEncoder


# Define DataFrame
df = pd.DataFrame({
    'age': [23, 45, 56, 78, 21],
    'income': [5000, 7000, 11000, 8000, 7600],
    'sex': ['male', 'female', 'male', 'female', 'male'],
    'embarked': ['S', 'C', 'Q', 'S', 'S']
})

# TODO: Apply get_dummies on the 'sex' and 'embarked' features to get `encoded_features`
# X = [['embarked'], ['sec']]
# enc = OneHotEncoder()
# enc.fit(X)

# encoded_features = pd.DataFrame(enc.transform(X).toarray())
encoded_features = pd.get_dummies(df, columns=['sex', 'embarked'], dtype=int)

# TODO: Combine the original DataFrame with the `encoded_features` DataFrame along axis=1
df_encoded = pd.concat([df, encoded_features], axis=1)

print("After One-Hot Encoding with get_dummies:\n", df_encoded)
```

## Complete Example

```python
# Import necessary modules
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder


# Define DataFrame
df = pd.DataFrame({
    'age': [23, 45, 56, 78, 21],
    'income': [5000, 7000, 11000, 8000, 7600],
    'sex': ['male', 'female', 'male', 'female', 'male'],
    'embarked': ['S', 'C', 'Q', 'S', 'S']
})

# Apply MinMaxScaler on the 'age' feature (scale it within a range of 0 to 10)
df[['age']] = MinMaxScaler(feature_range=(0, 10)).fit_transform(df[['age']])

# Apply MinMaxScaler on 'income' feature
df[['income']] = MinMaxScaler().fit_transform(df[['income']])

# Apply get_dummies on the 'sex' and 'embarked' features
encoded_features = pd.get_dummies(df, columns=['sex', 'embarked'], dtype=int)

# Combine the original DataFrame with the encoded DataFrame
df_encoded = pd.concat([df, encoded_features], axis=1)

print("After Transformation:\n", df_encoded)

```
