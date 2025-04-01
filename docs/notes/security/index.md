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
