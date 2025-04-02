---
title: 'Security'
date: '2025-04-01'
fullPath: '/notes/security'
sectionSlug: 'notes'
---

<!-- TODO: should maybe divide this whole section into categories like software, hardware, web, etc. -->

## XSS Attacks

### Anatomy of Reflected XSS Attack

1. browser actions compromised
2. malicious script created
3. malicious URL shared with victim
4. victim clicks malicious link
5. script is included in browser response
6. browser executes script

#### Prevention

- escape content _(never trust user input)_
- utilize Content Security Policy (CSP)
- keep libraries/dependencies updated
- watch out for third-party components
- avoid inline scripts _(better to use external scripts with nonce values [random tokens] that align with your CSP)_
- educate and review
- utilize security headers, such as `X-XSS-Protection`
- automated testing and scanning
  - [OWASP ZAP](https://www.zaproxy.org/)
- ongoing process

### Stored XSS

1. malicious script gets stored in website's database
2. script activates in specific site sections and/or via user interaction, such as an image error

#### Prevention

- validate user input
- sanitize data before storage
- always escape content
- limit HTML use
- apply strict CSP
- if available, use your framework's guards
- monitor stored content
- vet third-party components
- implement Web Application Firewall (WAF), educate team
- periodically back up data and configurations
- invest in periodic penetration testing

### Cookie Theft XSS

1. attacker lures users to activate trap
2. cookies relayed to attacker when bait taken
3. stolen cookies enable "session hijacking", impersonating victim

#### Prevention

- sanitize user input
- `HttpOnly` attribute for cookies _(though not fully secure)_
- implement CSP for scripts

### Credit Card Theft

1. attacker gains web page access
2. exploits `getElementById`
3. retrieves data via `.value` attribute on input element _(or any info on the page, really)_

#### Prevention

- validate and sanitize user input
- implement CSP
- escape user output
- use framework's built-in defenses
- update and patch software
- limit inline scripts _(if you need them, use nonces)_
- educate team on security
- monitor site and log activity
- always use HTTPS

### Site Defacement XSS

1. JavaScript URLs execute code in browsers
2. poor link validation enables attacker exploits
3. JavaScript scheme bypasses common filters

#### Prevention

- strict input validation is key
- escape user-generated content
- implement strong CSP
- educate web development team
- monitor website regularly
- update software and plugins

### Form Action Overriding XSS

1. login data directed by form's `action` attribute
2. attacker alters `action` to own server
3. users see no change, remain unaware

#### Prevention

- monitor code and escape user inputs
- implement CSP
- validate all user input rigorously
- use anti-forgery tokens for authenticity
- educate users on security signs
- regularly update and patch system

---

## Cross-site Request Forgery

### Anatomy of Cross-site Request Forgery

1. **User Login**: user logs into `example.com` and site drops cookie to recognize her for session duration
2. **Bait Website**: while still logged into `example.com`, user visits `evil.com` _(likely baited into doing so)_
3. **Crafted Request**: `evil.com` has hidden form or script that's crafted to send request to `bank.com` to transfer money to attacker's account

### Prevention

- Synchronizer Token Pattern: generate unique session token
- Server-side Storage: token stored on server
- Client-side Inclusion: include token as hidden field in forms that trigger sensitive actions

---

## Handling Raw Data

### Safeguarding Raw Data in HTML

- secure raw HTML data
- **never** manipulate inner HTML directly with unfiltered data
- use [DOMPurify](https://github.com/cure53/DOMPurify) for safe data rendering

#### Best Practices for Secure JSON Embedding

- securely incorporate JSON, use serialization
- ensure JSON data is escaped
- if serialization isn't an option, use encoded JSON _(such as Base64)_ in quotes for security

#### Handling API Data

- serialize (if possible) and user proper encoding for API data
- apply [DOMPurify](https://github.com/cure53/DOMPurify) for an extra layer of security
- use curly brackets in React components to maintain data integrity

---

## Insecure Client-side Logging

### Preliminary Considerations

- **Data Sensitivity**: Redact or exclude sensitive data like credentials
- **Logging Importance**: Essential for system management
- **Security Logging**: Log security-specific events for analysis

### Caution: Blocking Nature of Logging

- use logging carefully due to inherent challenges
- in JavaScript, logging functions can block processes
- API failure can harm React app user experience

### Considerations When Designing Logging Framework

- logging is key for secure, efficient apps
- robost logging builds user trust
- use OWASP/Nike cheat sheet for best practices
- asynchronous logging is a must in React
- asynchronous logging adds resilience
- avoid synchronous logging due to risks

### Monitoring Abstract Attack Vectors

- watch for red-flag events like frequent admin calls as signs of malicious activity
- detect "Impossible Travel" anomalies indicating session theft or VPN use
- early logging enables quick security countermeasures

---

## Lazy Loading

### Protecting Administrative Code

- lazy loading fetches admin code and APIs only when needed
- aligns with asynchronous loading to follow least-privilege principle
- centralizes security measures on server, boosting app security

---

## Server-side Rendering

- SSR in React boosts performance by using Node.js for dynamic HTML
- React is evolving to include SSR, despite its client-side origins
- using SSR in React increases application complexity

### Dissecting Server-side Rendering

- [renderTo functions](https://react.dev/reference/react-dom/server) secure SSR but misuse risks vulnerabilities
- for security, avoid raw variables in `renderTo` functions and keep templates immutable
- XHR and JSON in React don't secure SSR-based template injections

### Prevention

---

## The Zip Slip Attack

- addresses Zip Slip vulnerability causing file overwrites and remote attacks
- identified by Snyk in 2018
- affects multiple programming languages _(such as JavaScript, Python, Java, .NET, Go, and more)_
- related to inadequate sanitization of relative file paths during archive extraction process
  - if attacker can manipulate content within an archived file, they can inject files with carefully crafted relative paths that navigate out of intended target directory

### Automating Zip Slip

1. attacker concocts a zip archive comprising two files: `Good.txt` and `Evil.txt`
2. zip file sent to victim, often disguised as harmless document archive
3. vulnerable library extracts file outside target directory
4. `Evil.txt` written two levels above target location due to its relative path
5. finally, command is executed
  - ultimate danger if directory where bad file lands is within system's path and has writeable permissions
  - if system intermittently executes files from that location, sets the stage for remote command execution

> **NOTE**: Express.js lacks Zip Slip defenses
