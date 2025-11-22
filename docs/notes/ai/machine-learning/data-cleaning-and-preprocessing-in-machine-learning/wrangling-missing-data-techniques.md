---
title: 'Wrangling Missing Data: Techniques'
date: '2025-11-16'
fullPath: '/notes/ai/machine-learning/data-cleaning-and-preprocessing-in-machine-learning/wrangling-missing-data-techniques'
sectionSlug: 'notes'
---

## Understanding Missing Data

It's pivotal to understand why data might be missing as it helps in choosing best strategy to handle it.

Missing data can be categorized as:

- **Missing completely at random** _(MCAR)_: missing data entries are random and don't correlate with any other data
- **Missing at random** _(MAR)_: missing values depend on values of other variables
- **Missing not at random** _(MNAR)_: missing values have a particular pattern or logic

## Identifying Missing Values in the Titanic Dataset

Can easily identify missing data using the `isnull()` and `sum()` functions from the **Pandas** library:

```python
import seaborn as sns
import pandas as pd


# Import Titanic dataset
titanic_df = sns.load_dataset('titanic')

# Identify missing values
missing_values = titanic_df.isnull().sum()
print(missing_values)
```

Output:

```txt
survived         0
pclass           0
sex              0
age            177
sibsp            0
parch            0
fare             0
embarked         2
class            0
who              0
adult_male       0
deck           688
embark_town      2
alive            0
alone            0
dtype: int64
```

## Strategies to Handle Missing Data

Broadly, there are three main strategies:

- **Deletion**: involves removing rows and columns containing missing data
  * _might lead to the loss of valuable information_
- **Imputation**: includes filling missing values with substituted ones, such as the **mean**, **median**, or **mode** _(most common value in data frame)_
- **Prediction**: involves using predictive model to estimate missing values

## Handling Missing Data in the Titanic Dataset

In following example:

- for `"age"`, fill missing entries with median passenger age
- for `"deck"`, delete entire column _(since most entries are missing)_

```python
# Dealing with missing values

# Dropping columns with excessive missing data
new_titanic_df = titanic_df.drop(columns=['deck'])

# Imputing median age for missing age data
new_titanic_df['age'].fillna(new_titanic_df['age'].median(), inplace=True)

# Display the number of missing values post-imputation
missing_values_updated = new_titanic_df.isnull().sum()
print(missing_values_updated)


# Removes rows with missing values (MIGHT remove significant portion of data)
new_titanic_df.dropna()
```

Output:

```txt
survived       0
pclass         0
sex            0
age            0
sibsp          0
parch          0
fare           0
embarked       2
class          0
who            0
adult_male     0
embark_town    2
alive          0
alone          0
dtype: int64
```
