---
title: 'Data Security'
date: '2025-04-02'
fullPath: '/notes/security/data'
sectionSlug: 'notes'
---

## Classifications of Data

**Application Data**
- configuration data
- logging data
- application files

**User Data**
- personal information _(addresses, phone numbers, dates of birth, etc.)_
- personal identifying information _(social security number, passport numbers, name, etc.)_
- health or financial records

**Data Protecting Data**
- crypto keys
- passwords
- access control lists

2 primary factors in classifying data as sensitive
1. laws and regulations _(e.g. [GDPR](https://gdpr-info.eu/) and [PCI DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard))_
2. business requirements _(e.g. what customers of app describe as sensitive data)_

**Sensitive Data**: The set of data that contains elements from user data, application data, and data protecting data such that user data is not exposed to unauthorized parties.
