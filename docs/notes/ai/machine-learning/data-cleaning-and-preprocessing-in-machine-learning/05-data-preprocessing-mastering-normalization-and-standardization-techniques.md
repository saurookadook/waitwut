---
title: 'Data Preprocessing: Mastering Normalization and Standardization Techniques'
date: '2025-11-21'
fullPath: '/notes/ai/machine-learning/data-cleaning-and-preprocessing-in-machine-learning/05-data-preprocessing-mastering-normalization-and-standardization-techniques'
sectionSlug: 'notes'
---

## Understanding Normalization

Normalization is a critical preprocessing step, which primarily involves scaling the numerical data in the dataset to a fixed range, usually from `0` to `1`. It reduces skewness and bias in the data by bringing all the values to a similar range. Therefore, normalization plays a significant role in algorithms that use a distance measure.

To better illustrate how normalization works, let's apply it to the `'age'` column of our Titanic dataset. Normalization will transform the age values so that they fall within a range from `0` to `1`:

```python
import pandas as pd
import seaborn as sns


titanic_df = sns.load_dataset('titanic')

# Normalize 'age'
titanic_df['age'] = (
  (titanic_df['age'] - titanic_df['age'].min()) / (titanic_df['age'].max() - titanic_df['age'].min())
)

print(titanic_df['age'])
```

Output:

```txt
0      0.271174
1      0.472229
2      0.321438
3      0.434531
4      0.434531
         ...
886    0.334004
887    0.233476
888         NaN
889    0.321438
890    0.396833
Name: age, Length: 891, dtype: float64
```

In this code snippet, we first subtract the minimum age from each age value, then divide by the range of ages, thereby scaling the ages to the range `[0, 1]`.

## Understanding Standardization

Unlike normalization, standardization does not scale the data to a limited range. Instead, standardization subtracts the mean value of the feature and then divides it by the feature’s standard deviation, transforming the feature values to have a mean of `0` and a standard deviation of `1`. This method is often used when you want to compare data that was measured on different scales.

Let's apply standardization to the `'fare'` column of the Titanic dataset. This column represents how much each passenger paid for their ticket:

```python
# Standardize 'fare'
titanic_df['fare'] = (titanic_df['fare'] - titanic_df['fare'].mean()) / titanic_df['fare'].std()

print(titanic_df['fare'])
```

Output:

```txt
0     -0.502163
1      0.786404
2     -0.488580
3      0.420494
4     -0.486064
         ...
886   -0.386454
887   -0.044356
888   -0.176164
889   -0.044356
890   -0.492101
Name: fare, Length: 891, dtype: float64
```

Now, the `'fare'` column is re-scaled so the fares have an average value of `0` and a standard deviation of `1`. Notice that the values are not within the `[0, 1]` range like normalized data.

## Implementing Normalization with Pandas

Armed with an understanding of normalization, let's dig a little deeper with the Pandas library. We'll use `MinMaxScaler()` from the `sklearn.preprocessing` module, a handy technique for normalizing data in `pandas`:

```python
from sklearn.preprocessing import MinMaxScalar

# Select 'age' column and drop NaN values
age = titanic_df[['age']].dropna()

# Create a MinMaxScalar object
scalar = MinMaxScalar()

# Use the scalar
titanic_df['norm_age'] = pd.DataFrame(
  scalar.fit_transform(age), columns=age.columns, index=age.index
)

print(titanic_df['norm_age'])
```

Output:

```txt
0      0.271174
1      0.472229
2      0.321438
3      0.434531
4      0.434531
         ...
886    0.334004
887    0.233476
888         NaN
889    0.321438
890    0.396833
Name: norm_age, Length: 891, dtype: float64
```

The `MinMaxScaler` scales and translates each feature individually so that it falls in the given range on the training set, in our case, between `0` and `1`.

## Implementing Standardization with Pandas

To standardize our data with `pandas`, we'll make use of the `StandardScaler()` function from the `sklearn.preprocessing` module that standardizes features by deducting the mean and scaling to unit variance:

```python
from sklearn.preprocessing import StandardScalar


# Select 'fare' column and drop NaN values
fare = titanic_df[['fare']].dropna()

# Create a StandardScalar object
scalar = StandardScalar()

# Use the scalar
titanic_df['stand_fare'] = pd.DataFrame(
  scalar.fit_transform(fare), columns=fare.columns, index=fare.index,
)

print(titanic_df['stand_fare'])
```

Output:

```txt
0     -0.502445
1      0.786845
2     -0.488854
3      0.420730
4     -0.486337
         ...
886   -0.386671
887   -0.044381
888   -0.176263
889   -0.044381
890   -0.492378
Name: stand_fare, Length: 891, dtype: float64
```

`StandardScaler` standardizes a feature by deducting the mean and scaling to unit variance. This operation is performed feature-wise in an independent way. Notice how our standardized fares now have a mean of `0` and a standard deviation of `1`.

## Comparing Normalization and Standardization

Choose normalization when your data needs to be bounded within a specific range (0 to 1, for example) and is not heavily influenced by outliers. This is particularly useful for algorithms that are sensitive to the scale of the data, such as neural networks and k-nearest neighbors. On the other hand, standardization is more effective when your data has a Gaussian distribution, and you are dealing with algorithms that assume this, such as linear regression, logistic regression, and linear discriminant analysis.

Now that you've got to experience both normalization and standardization, it's safe to say each technique is practical and useful but under different circumstances. Their primary purpose is to handle the varying ranges of data. However, depending on the algorithm deployed and the desired output distribution, normalization or standardization is selected. Remember that not all algorithms benefit from normalization or standardization.

## Examples

```python
# Import necessary libraries
import seaborn as sns
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# Load the Titanic Dataset
titanic_df = sns.load_dataset('titanic')

# Create a MinMaxScaler object with a feature range of 0 to 100
age_scaler = MinMaxScaler(feature_range=(0, 100))
# TODO: Create a StandardScaler object for standardizing 'fare'
fare_scalar = StandardScaler()

# Fit the age scaler on the age data without NaN values
non_na_age = titanic_df[['age']].dropna()
age_scaler.fit(non_na_age)
# TODO: Fit the scaler on the 'fare' data without NaN values
non_na_fare = titanic_df[['fare']].dropna()
fare_scalar.fit(non_na_fare)

# Holds the indexes for the rows with non-NaN age and fare values
non_na_age_index = titanic_df['age'].dropna().index
# TODO: Replace the following line with a calculation of the non-NaN fare index values
non_na_fare_index = titanic_df['fare'].dropna().index

# Transform the 'age' and 'fare' columns in the original dataframe without NaN values
titanic_df.loc[non_na_age_index, 'norm_age'] = age_scaler.transform(
    titanic_df.loc[non_na_age_index, ['age']]
)`
# TODO: Transform the 'fare' column using the StandardScaler and non-NaN indices
titanic_df.loc[non_na_fare_index, 'stand_fare'] = fare_scalar.transform(
    titanic_df.loc[non_na_fare_index, ['fare']]
)

# Display transformed 'age' and standardized 'fare' values
# TODO: Update this line to include the newly standardized 'fare' column
print(titanic_df[['age', 'norm_age', 'fare', 'stand_fare']])
```
