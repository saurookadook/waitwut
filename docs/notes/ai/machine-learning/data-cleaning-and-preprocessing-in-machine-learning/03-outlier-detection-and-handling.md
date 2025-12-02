---
title: 'Outlier Detection and Handling'
date: '2025-11-21'
fullPath: '/notes/ai/machine-learning/data-cleaning-and-preprocessing-in-machine-learning/03-outlier-detection-and-handling'
sectionSlug: 'notes'
---

## Outliers

- data points that significantly deviate from other data points in a dataset
- can drastically influence outcomes of data analysis and machine learning models, possibly leading to erroneous results

### Three Common Methods for Outlier Detection

- [**Z-score**](#z-score)
- [**IQR**](#iqr)
- [**Standard Deviation**](#standard-deviation)

#### Z-score

- identifying data points with a **Z-score** greater than 3 as outliers
- describes data point's relationship to mean of a group of data points
- measured in terms of standard deviations from mean
- if **Z-score** is `0.0`, indicates data point's score is identical to mean score
- if **Z-score** is `1.0`, indicates data point's score is one standard deviation from mean score
- **Z-score**s may be positive and negative, with positive indicating score is above mean and negative indicating score is below mean

```python
import numpy


data = titanic_df['fare']
mean = numpy.mean(data)  # Calculates the mean
std_dev = numpy.std(data)  # Calculates the standard deviation
Z_scores = (data - mean) / std_dev  # Computes the Z-scores
outliers = data[numpy.abs(Z_scores) > 3]  # Finds all the data points that are 3 standard deviations away from mean
```

#### IQR

- stands for **Interquartile Range**
- measure of statistical dispersion
- range within which central half of data lies
- calculated as <em class="math">Q<sup>3</sup>-Q<sup>1</sup></em>
- defining outliers as observations outside the range of <em class="math">Q<sup>1</sup>−1.5⋅IQR</em> and <em class="math">Q<sup>1</sup>+1.5⋅IQR</em>

```python
Q1 = titanic_df['fare'].quantile(0.25)  # Calculates the first quartile
Q3 = titanic_df['fare'].quantile(0.75)  # Calculates the third quartile
IQR = Q3 - Q1  # Computes the IQR

# Below, we find all the data points that fall below the lower bound or above the upper bound
outliers = titanic_df['fare'][
  (titanic_df['fare'] < (Q1 - 1.5 * IQR)) |
  (titanic_df['fare'] > (Q3 + 1.5 * IQR))
]
```

#### Standard Deviation

- identifies outliers based on distance from mean masured in standard deviations
- does not standardize data
  + _(unlike Z-score method, which converts data into standardized Z-scores - mean of zero and standard deviation of one)_
- directly flags data points as outliers if they are more than a certain number of standard deviations away from mean _(commonly three)_
- approach is more straightforward but may be less accurate if data distribution is skewed or not normal

```python
mean = numpy.mean(titanic_df['fare'])  # Calculates the mean
standard_deviation = numpy.std(titanic_df['fare'])  # Calculates the standard deviation
outliers = titanic_df['fare'][numpy.abs(titanic_df['fare'] - mean) > 3 * standard_deviation]  # Finds all the data points that are 3 standard deviations away from the mean
```

## Outlier Detection in Titanic Dataset

```python
import numpy as np
import pandas as pd
import seaborn as sns


titanic_df = sns.load_dataset('titanic')

# ##########    Outlier detection - 'Age'    ##########
# Calculates the mean
mean_age = np.mean(titanic_df['age'])
# Calculates the standard deviation
std_dev_age = np.std(titanic_df['age'])
# Computes the Z-scores
Z_scores_age = (titanic_df['age'] - mean_age) / std_dev_age
# Finds all the data points that are 3 standard deviations away from the mean
outliers_age = titanic_df['age'][np.abs(Z_scores_age) > 3]
print("Outliers in 'Age' using Z-score: \n", outliers_age)

# ##########    Outlier detection - 'Fare'    ##########
# Calculates the mean
mean_fare = np.mean(titanic_df['fare'])
# Calculates the standard deviation
std_dev_fare = np.std(titanic_df['fare'])
# Computes the Z-scores
Z_scores_fare = (titanic_df['fare'] - mean_fare) / std_dev_fare
# Finds all the data points that are 3 standard deviations away from the mean
outliers_fare = titanic_df['fare'][np.abs(Z_scores_fare) > 3]
print("Outliers in 'Fare' using Z-score: \n", outliers_fare)

```

Output:

```txt
Outliers in 'Age' using Z-score:
630    80.0
851    74.0
Name: age, dtype: float64

Outliers in 'Fare' using Z-score:
 27     263.0000
88     263.0000
118    247.5208
258    512.3292
299    247.5208
311    262.3750
341    263.0000
377    211.5000
380    227.5250
438    263.0000
527    221.7792
557    227.5250
679    512.3292
689    211.3375
700    227.5250
716    227.5250
730    211.3375
737    512.3292
742    262.3750
779    211.3375
Name: fare, dtype: float64

```

## Handling Outliers

1. **Dropping**: if outlier doesn't add valuable information or significantly skews data, one option is dropping outlier
2. **Capping**: could also consider replacing outlier value with certain maximum and/or minimum value
3. **Transforming**: techniques such as log transformations are especially effective when dealing with skewed data, as it can reduce impact of outliers

To effectively cap outliers at upper bound, `np.where` can be used to replace values in `'age'` and `'fare'` columns of `titanic_df` dataframe with upper bound if they exceed it.

```python
import numpy as np
import pandas as pd
import seaborn as sns


titanic_df = sns.load_dataset('titanic')

# Drop rows with missing 'age' values
titanic_df = titanic_df.dropna(subset=['age'])

# Calculates the upper bound for 'age'
Q1 = titanic_df['age'].quantile(0.25)
Q3 = titanic_df['age'].quantile(0.75)
IQR = Q3 - Q1
upper_bound = Q3 + 1.5 * IQR

# Cap the outliers for 'age'
titanic_df['age'] = np.where(
  titanic_df['age'] > upper_bound,
  upper_bound,
  titanic_df['age'],
)

# Calculate the upper bound for 'fare'
Q1 = titanic_df['fare'].quantile(0.25)
Q3 = titanic_df['fare'].quantile(0.75)
IQR = Q3 - Q1
upper_bound = Q3 + 1.5 * IQR

# Cap the outliers for 'fare'
titanic_df['fare'] = np.where(
  titanic_df['fare'] > upper_bound,
  upper_bound,
  titanic_df['fare'],
)

```
