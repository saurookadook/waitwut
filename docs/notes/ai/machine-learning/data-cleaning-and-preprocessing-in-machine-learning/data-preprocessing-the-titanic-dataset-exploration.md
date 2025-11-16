---
title: 'Data Preprocessing: The Titanic Dataset Exploration'
date: '2025-11-16'
fullPath: '/notes/ai/machine-learning/data-cleaning-and-preprocessing-in-machine-learning/data-preprocessing-the-titanic-dataset-exploration'
sectionSlug: 'notes'
---

## Overview

**Data preprocessing** is _a vital preliminary step in any machine learning pipeline_

- transforms raw, discordant data into format that can be effectively utilized by machine learning algorithms
- involves techniques such as
    * cleaning data
    * dealing with missing values
    * data format transformations
    * data normalization

## Intro to Data Preprocessing

**Data preprocessing** is

- the heart of any machine learning pipeline
- capable of magnifying accuracy when done right _(or leading to poor performance when overlooked)_

Quality of output of any machine learning model is _**directly proportional**_ to quality of input data. Remember:

> Garbage In, Garbage Out.

**Goal of data preprocessing**: to cleanse, transform, and format raw data into structure that makes it ready for machine learning algorithms

Choosing the right techniques under preprocessing often depends on specifics of your data

## Overview of the Titanic Dataset

The Titanic dataset comes pre-packaged in the Seaborn library, a visualization library in Python.

```python
import seaborn as sns
import pandas as pd

# Load Titanic dataset
titanic_data = sns.load_dataset('titanic')

# Display the first few records
print(titanic_data.head())

# Review the structure of the dataset
print(titanic_data.info())
```

Output:

```txt
   survived  pclass     sex   age  sibsp  parch     fare embarked  class    who  adult_male deck  embark_town alive  alone
0         0       3    male  22.0      1      0   7.2500        S  Third    man        True  NaN  Southampton    no  False
1         1       1  female  38.0      1      0  71.2833        C  First  woman       False    C    Cherbourg   yes  False
2         1       3  female  26.0      0      0   7.9250        S  Third  woman       False  NaN  Southampton   yes   True
3         1       1  female  35.0      1      0  53.1000        S  First  woman       False    C  Southampton   yes  False
4         0       3    male  35.0      0      0   8.0500        S  Third    man        True  NaN  Southampton    no   True
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 891 entries, 0 to 890
Data columns (total 15 columns):
 #   Column       Non-Null Count  Dtype
---  ------       --------------  -----
 0   survived     891 non-null    int64
 1   pclass       891 non-null    int64
 2   sex          891 non-null    object
 3   age          714 non-null    float64
 4   sibsp        891 non-null    int64
 5   parch        891 non-null    int64
 6   fare         891 non-null    float64
 7   embarked     889 non-null    object
 8   class        891 non-null    category
 9   who          891 non-null    object
 10  adult_male   891 non-null    bool
 11  deck         203 non-null    category
 12  embark_town  889 non-null    object
 13  alive        891 non-null    object
 14  alone        891 non-null    bool
dtypes: bool(2), category(2), float64(2), int64(4), object(5)
memory usage: 80.7+ KB
None
```

## Drawing Insights from the Titanic Dataset

Pandas DataFrames provide us with `.describe()` function, which returns various descriptive statistics that summarize central tendency, dispersion, and shape of a dataset's distribution

```python
print(titanic_data.describe())
```

Output:

```txt
         survived      pclass         age       sibsp       parch        fare
count  891.000000  891.000000  714.000000  891.000000  891.000000  891.000000
mean     0.383838    2.308642   29.699118    0.523008    0.381594   32.204208
std      0.486592    0.836071   14.526497    1.102743    0.806057   49.693429
min      0.000000    1.000000    0.420000    0.000000    0.000000    0.000000
25%      0.000000    2.000000   20.125000    0.000000    0.000000    7.910400
50%      0.000000    3.000000   28.000000    0.000000    0.000000   14.454200
75%      1.000000    3.000000   38.000000    1.000000    0.000000   31.000000
max      1.000000    3.000000   80.000000    8.000000    6.000000  512.329200
```

The `.describe()` function lets you see detailed statistics for each numeric column in DataFrame, including:

- number of non-missing values
- mean
- standard deviation
- median _(50th percentile)_
- minimum
- maximum
