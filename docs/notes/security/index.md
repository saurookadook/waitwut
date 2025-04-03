---
title: 'Security'
date: '2025-04-01'
fullPath: '/notes/security'
sectionSlug: 'notes'
---

- [Data Security](/notes/security/data)
- [Web Application Security](/notes/security/web-application)

## Recommended Hashing Functions

- **Argon2**
- **Password-Based Key Derivation Function 2** _(PBKDF2)_
  - should be used when FIPS certification or enterprise support on many platforms is required
- **Scrypt**
  - should be used when resisting any or all hardware accelerated attacks is necessary
- **Bcrypt**
  - should be used when support for PBKDF2 or Script is not available
- **keyed hash functions or HMACs**
  - hash functions that use private key to calculate results
