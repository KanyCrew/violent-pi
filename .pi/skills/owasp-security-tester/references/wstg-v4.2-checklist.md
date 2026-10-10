# OWASP Web Security Testing Guide (WSTG v4.2) Checklist

This reference catalogs all 114 testing procedures from OWASP WSTG v4.2 grouped into the 12 testing categories.

## WSTG-INFO: Information Gathering (10 tests)

### WSTG-INFO-01 - Conduct Search Engine Reconnaissance for Information Leakage
**Objectives:**
- Identify what sensitive design and configuration information of the application, system, or organization is exposed directly (on the organization's site) or indirectly (via third-party services).
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/01-Conduct_Search_Engine_Reconnaissance_for_Information_Leakage)

### WSTG-INFO-02 - Fingerprint Web Server
**Objectives:**
- Determine the version and type of a running web server to enable further discovery of any known vulnerabilities.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server)

### WSTG-INFO-03 - Review Webserver Metafiles for Information Leakage
**Objectives:**
- Identify hidden or obfuscated paths and functionality through the analysis of metadata files.
- Extract and map other information that could lead to a better understanding of the systems at hand.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/03-Review_Webserver_Metafiles_for_Information_Leakage)

### WSTG-INFO-04 - Attack Surface Identification
**Objectives:**
- Enumerate all web applications within scope.
- Identify DNS names, domains, and virtual hosts associated with the target.
- Discover additional domains and subdomains using passive and active DNS techniques.
- Analyze digital certificates and Certificate Transparency logs for additional hostnames.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/04-Attack_Surface_Identification)

### WSTG-INFO-05 - Review Web Page Content for Information Leakage
**Objectives:**
- Review web page comments, metadata, and redirect bodies to find any information leakage.
- Gather JavaScript files and review the JS code to better understand the application and to find any information leakage.
- Identify if source map files or other frontend debug files exist.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/05-Review_Web_Page_Content_for_Information_Leakage)

### WSTG-INFO-06 - Identify Application Entry Points
**Objectives:**
- Identify possible entry and injection points through request and response analysis.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/06-Identify_Application_Entry_Points)

### WSTG-INFO-07 - Map Execution Paths Through Application
**Objectives:**
- Map the target application and understand the principal workflows.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/07-Map_Execution_Paths_Through_Application)

### WSTG-INFO-08 - Fingerprint Web Application Framework
**Objectives:**
- Fingerprint the components used by the web applications.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/08-Fingerprint_Web_Application_Framework)

### WSTG-INFO-09 - Fingerprint Web Application
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/09-Fingerprint_Web_Application)

### WSTG-INFO-10 - Map Application Architecture
**Objectives:**
- Understand the architecture of the application and the technologies in use.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/10-Map_Application_Architecture)

## WSTG-CONF: Configuration and Deployment Management (14 tests)

### WSTG-CONF-01 - Network Infrastructure Configuration
**Objectives:**
- Review the applications' configurations set across the network and validate that they are not vulnerable.
- Validate that used frameworks and systems are secure and not susceptible to known vulnerabilities due to unmaintained software or default settings and credentials.
- Where the infrastructure is cloud-hosted or containerized, review network isolation controls (security groups/NSGs, VPC/subnet layout, load balancer/CDN configuration, service mesh policies, Kubernetes `NetworkPolicy`) for unintended exposure or overly permissive rules.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/01-Network_Infrastructure_Configuration)

### WSTG-CONF-02 - Application Platform Configuration
**Objectives:**
- Ensure that default, sample, and known files have been removed from the deployed platform, container image, or serverless package.
- Validate that no debugging code, debug endpoints, debug modes, or unused modules/dependencies are left enabled in production environments.
- Review the logging mechanisms set in place for the application, including what sensitive data may be captured and who/what can access or retain it.
- Confirm framework-, container-, and serverless-specific production hardening settings are applied rather than left at insecure defaults.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/02-Application_Platform_Configuration)

### WSTG-CONF-03 - File Extensions Handling for Sensitive Information
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/03-File_Extensions_Handling_for_Sensitive_Information)

### WSTG-CONF-04 - Review Old Backup and Unreferenced Files for Sensitive Information
**Objectives:**
- Find and analyze old, backup, and unreferenced files - including files exposed only through their extension, and objects left in cloud storage - that might contain sensitive information.
- Validate that no system or framework bypasses exist for any rules put in place to prevent these files from being served.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/04-Review_Old_Backup_and_Unreferenced_Files_for_Sensitive_Information)

### WSTG-CONF-05 - Enumerate Infrastructure and Application Admin Interfaces
**Objectives:**
- Identify hidden administrator interfaces and functionality, including cloud, container-orchestration, API-management, and CI/CD management consoles.
- Check any discovered interface for default, weak, or reused credentials, and for exposure to networks/users beyond those intended.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/05-Enumerate_Infrastructure_and_Application_Admin_Interfaces)

### WSTG-CONF-06 - HTTP Methods
**Objectives:**
- Enumerate supported HTTP methods.
- Test for access control bypass.
- Test HTTP method overriding techniques.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/06-HTTP_Methods)

### WSTG-CONF-07 - HTTP Strict Transport Security
**Objectives:**
- Review the HSTS header, its directives, and their values for consistency with current best practice.
- Confirm the site is protected against the first-request trust gap, either via preload or an otherwise hardened HTTP-to-HTTPS path.
- Confirm HSTS is applied consistently across the domain and relevant subdomains, and does not mask mixed-content issues.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/07-HTTP_Strict_Transport_Security)

### WSTG-CONF-09 - File Permissions
**Objectives:**
- Review and identify any rogue file permissions on the host filesystem, in container images/filesystems, and on cloud storage objects.
- Assess whether Kubernetes volume mounts and `securityContext` settings enforce least-privilege access to files and secrets.
- Identify secrets stored with overly broad permissions, wherever they are held (filesystem, container image, orchestration secret store, cloud secrets manager export, CI artifacts).
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/09-File_Permissions)

### WSTG-CONF-10 - Subdomain Takeover
**Objectives:**
- Enumerate all possible domains (previous and current), including wildcard-covered names.
- Identify any forgotten or misconfigured domains, and any dangling-service signature not covered by a known response fingerprint.
- Where a takeover is confirmed feasible, assess whether the parent application's cookies, CORS policy, OAuth redirect validation, or CSP allowlist extend trust to the claimed subdomain.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/10-Subdomain_Takeover)

### WSTG-CONF-11 - Cloud Storage
**Objectives:**
- Assess that the access control configuration for the storage services (bucket/container-level public access, and object/principal-level ACLs or IAM policies) is properly in place.
- Assess whether signed/presigned URLs are scoped, time-limited, and handled appropriately.
- Assess whether object versioning and lifecycle configuration could expose old or supposedly-removed sensitive data.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/11-Cloud_Storage)

### WSTG-CONF-12 - Content Security Policy
**Objectives:**
- Review the Content-Security-Policy header or meta element to identify misconfigurations.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/12-Content_Security_Policy)

### WSTG-CONF-13 - Path Confusion
**Objectives:**
- Make sure application paths are configured and normalized consistently across all components (application, proxy, cache, CDN, WAF) that make decisions based on the path.
- Identify cases where trailing slashes, case sensitivity, or encoding differences cause a security control (auth/access rules, routing, cache keying) to be bypassed or behave inconsistently.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/13-Path_Confusion)

### WSTG-CONF-14 - Other HTTP Security Header Misconfigurations
**Objectives:**
- Identify improperly configured security headers.
- Assess the impact of misconfigured security headers.
- Validate the correct implementation of required security headers.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/14-Other_HTTP_Security_Header_Misconfigurations)

### WSTG-CONF-15 - Feature Flag Security Bypass
**Objectives:**
- Identify feature flags and kill-switches that control security-relevant functionality.
- Determine whether feature flag states can be manipulated by an unauthorized client, and verify that backend security controls remain enforced independently of client-side flag state.
- Verify that security controls remain consistently enforced across flag transitions, rollbacks, staged deployments, and services or instances, including whether stale security assertions or session state can be reused after a transition.
- Evaluate fail-safe behavior when the feature flag service is unavailable.
- Identify sensitive information exposed through feature flag configurations, and stale flags that may expose deprecated or unpatched code paths.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management/15-Feature_Flag_Security_Bypass)

## WSTG-IDNT: Identity Management (5 tests)

### WSTG-IDNT-01 - Role Definitions
**Objectives:**
- Identify and document roles used by the application.
- Attempt to switch, change, or access another role.
- Review the granularity of the roles and the needs behind the permissions given.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management/01-Role_Definitions)

### WSTG-IDNT-02 - User Registration Process
**Objectives:**
- Verify that the identity requirements for user registration are aligned with business and security requirements.
- Validate the registration process.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management/02-User_Registration_Process)

### WSTG-IDNT-03 - Account Provisioning Process
**Objectives:**
- Verify which accounts may provision other accounts and of what type.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management/03-Account_Provisioning_Process)

### WSTG-IDNT-04 - Account Enumeration and Guessable User Account
**Objectives:**
- Review processes that pertain to user identification (*e.g.* registration, login, etc.).
- Enumerate users where possible through response analysis.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management/04-Account_Enumeration_and_Guessable_User_Account)

### WSTG-IDNT-05 - Weak or Unenforced Username Policy
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management/05-Weak_or_Unenforced_Username_Policy)

## WSTG-ATHN: Authentication (11 tests)

### WSTG-ATHN-01 - Credentials Transported over an Encrypted Channel
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/01-Credentials_Transported_over_an_Encrypted_Channel)

### WSTG-ATHN-02 - Default Credentials
**Objectives:**
- Determine whether the application has any user accounts with default passwords.
- Review whether new user accounts are created with weak or predictable passwords.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/02-Default_Credentials)

### WSTG-ATHN-03 - Weak Lock Out Mechanism
**Objectives:**
- Evaluate the account lockout mechanism's ability to mitigate brute force password guessing.
- Evaluate the unlock mechanism's resistance to unauthorized account unlocking.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/03-Weak_Lock_Out_Mechanism)

### WSTG-ATHN-04 - Bypassing Authentication Schema
**Objectives:**
- Ensure that authentication is applied across all services that require it.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/04-Bypassing_Authentication_Schema)

### WSTG-ATHN-05 - Vulnerable Remember Password
**Objectives:**
- Validate that the generated session is managed securely and do not put the user's credentials in danger.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/05-Vulnerable_Remember_Password)

### WSTG-ATHN-06 - Browser Cache Weaknesses
**Objectives:**
- Review if the application stores sensitive information on the client-side.
- Review if access can occur without authorization.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/06-Browser_Cache_Weaknesses)

### WSTG-ATHN-07 - Weak Authentication Methods
**Objectives:**
- Determine the resistance of the application against brute force password guessing using available password dictionaries by evaluating the length, complexity, reuse, and aging requirements of passwords.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/07-Weak_Authentication_Methods)

### WSTG-ATHN-08 - Weak Security Question Answer
**Objectives:**
- Determine the complexity and how straight-forward the questions are.
- Assess possible user answers and brute force capabilities.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/08-Weak_Security_Question_Answer)

### WSTG-ATHN-09 - Weak Password Change or Reset Functionalities
**Objectives:**
- Determine whether the password change and reset functionality allows accounts to be compromised.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/09-Weak_Password_Change_or_Reset_Functionalities)

### WSTG-ATHN-10 - Weaker Authentication in Alternative Channel
**Objectives:**
- Identify alternative authentication channels.
- Assess the security measures used and if any bypasses exists on the alternative channels.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/10-Weaker_Authentication_in_Alternative_Channel)

### WSTG-ATHN-11 - Multi-Factor Authentication (MFA)
**Objectives:**
- Identify the type of MFA used by the application.
- Determine whether the MFA implementation is robust and secure.
- Attempt to bypass the MFA.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication/11-Multi-Factor_Authentication)

## WSTG-ATHZ: Authorization (5 tests)

### WSTG-ATHZ-01 - Directory Traversal File Include
**Objectives:**
- Identify injection points that pertain to path traversal.
- Assess bypassing techniques and identify the extent of path traversal.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization/01-Directory_Traversal_File_Include)

### WSTG-ATHZ-02 - Bypassing Authorization Schema
**Objectives:**
- Assess if unauthenticated, horizontal, or vertical access is possible.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization/02-Bypassing_Authorization_Schema)

### WSTG-ATHZ-03 - Privilege Escalation
**Objectives:**
- Identify injection points related to privilege manipulation.
- Fuzz or otherwise attempt to bypass security measures.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization/03-Privilege_Escalation)

### WSTG-ATHZ-04 - Insecure Direct Object References
**Objectives:**
- Identify points where object references may occur.
- Assess the access control measures and if they're vulnerable to IDOR.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization/04-Insecure_Direct_Object_References)

### WSTG-ATHZ-05 - OAuth Weaknesses
**Objectives:**
- Determine if OAuth2 implementation is vulnerable or using a deprecated or custom implementation.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization/05-OAuth_Weaknesses)

## WSTG-SESS: Session Management (11 tests)

### WSTG-SESS-01 - Session Management Schema
**Objectives:**
- Gather session tokens, for the same user and for different users where possible.
- Analyze and ensure that enough randomness exists to stop session forging attacks.
- Modify cookies that are not signed and contain information that can be manipulated.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/01-Session_Management_Schema)

### WSTG-SESS-02 - Cookies Attributes
**Objectives:**
- Ensure that the proper security configuration is set for cookies.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/02-Cookies_Attributes)

### WSTG-SESS-03 - Session Fixation
**Objectives:**
- Analyze the authentication mechanism and its flow.
- Force cookies and assess the impact.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/03-Session_Fixation)

### WSTG-SESS-04 - Exposed Session Variables
**Objectives:**
- Ensure that proper encryption is implemented.
- Review the caching configuration.
- Assess the channel and methods' security.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/04-Exposed_Session_Variables)

### WSTG-SESS-05 - Cross Site Request Forgery
**Objectives:**
- Determine whether it is possible to initiate requests on a user's behalf that are not initiated by the user.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/05-Cross_Site_Request_Forgery)

### WSTG-SESS-06 - Logout Functionality
**Objectives:**
- Assess the logout UI.
- Analyze the session timeout and if the session is properly killed after logout.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/06-Logout_Functionality)

### WSTG-SESS-07 - Session Timeout
**Objectives:**
- Validate that a hard session timeout exists.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/07-Session_Timeout)

### WSTG-SESS-08 - Session Puzzling
**Objectives:**
- Identify all session variables.
- Break the logical flow of session generation.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/08-Session_Puzzling)

### WSTG-SESS-09 - Session Hijacking
**Objectives:**
- Identify vulnerable session cookies.
- Hijack vulnerable cookies and assess the risk level.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/09-Session_Hijacking)

### WSTG-SESS-10 - JSON Web Tokens
**Objectives:**
- Determine whether the JWTs expose sensitive information.
- Determine whether the JWTs can be tampered with or modified.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/10-JSON_Web_Tokens)

### WSTG-SESS-11 - Concurrent Sessions
**Objectives:**
- Evaluate the application's session management by assessing the handling of multiple active sessions for a single user account.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management/11-Concurrent_Sessions)

## WSTG-INJT: Injection (23 tests)

### WSTG-INJT-01 - Reflected Cross Site Scripting
**Objectives:**
- Identify variables that are reflected in responses.
- Assess the input they accept and the encoding that gets applied on return (if any).
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/01-Reflected_Cross_Site_Scripting)

### WSTG-INJT-02 - Stored Cross Site Scripting
**Objectives:**
- Identify stored input that is reflected on the client-side.
- Assess the input they accept and the encoding that gets applied on return (if any).
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/02-Stored_Cross_Site_Scripting)

### WSTG-INJT-03 - HTTP Verb Tampering
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/03-HTTP_Verb_Tampering)

### WSTG-INJT-04 - HTTP Parameter Pollution
**Objectives:**
- Identify the back end and the parsing method used.
- Assess injection points and try bypassing input filters using HPP.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/04-HTTP_Parameter_Pollution)

### WSTG-INJT-05 - SQL Injection
**Objectives:**
- Identify SQL injection points.
- Assess the severity of the injection and the level of access that can be achieved through it.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/05-SQL_Injection)

### WSTG-INJT-06 - LDAP Injection
**Objectives:**
- Identify LDAP injection points.
- Assess the severity of the injection.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/06-LDAP_Injection)

### WSTG-INJT-07 - XML Injection
**Objectives:**
- Identify XML injection points.
- Assess the types of exploits that can be attained and their severities.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/07-XML_Injection)

### WSTG-INJT-08 - SSI Injection
**Objectives:**
- Identify SSI injection points.
- Assess the severity of the injection.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/08-SSI_Injection)

### WSTG-INJT-09 - XPath Injection
**Objectives:**
- Identify XPATH injection points.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/09-XPath_Injection)

### WSTG-INJT-10 - IMAP SMTP Injection
**Objectives:**
- Identify IMAP/SMTP injection points.
- Understand the data flow and deployment structure of the system.
- Assess the injection impacts.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/10-IMAP_SMTP_Injection)

### WSTG-INJT-11 - Code Injection
**Objectives:**
- Identify injection points where you can inject code into the application.
- Assess the injection severity.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/11-Code_Injection)

### WSTG-INJT-12 - Command Injection
**Objectives:**
- Identify and assess command injection points.
- Bypass special characters and OS commands filter.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/12-Command_Injection)

### WSTG-INJT-13 - Format String Injection
**Objectives:**
- Assess whether injecting format string conversion specifiers into user-controlled fields causes undesired behavior from the application.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/13-Format_String_Injection)

### WSTG-INJT-14 - Incubated Vulnerability
**Objectives:**
- Identify injections that are stored and require a recall step to the stored injection.
- Understand how a recall step could occur.
- Set listeners or activate the recall step if possible.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/14-Incubated_Vulnerability)

### WSTG-INJT-15 - HTTP Response Splitting
**Objectives:**
- Identify user-controlled input that is reflected into HTTP response headers.
- Assess whether CR (`\r`) and LF (`\n`) characters can be injected into response headers.
- Determine the potential impact of successful HTTP Response Splitting attacks, such as cache poisoning or client-side exploitation.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/15-HTTP_Response_Splitting)

### WSTG-INJT-16 - HTTP Request Smuggling
**Objectives:**
- Identify request boundary inconsistencies between frontend and backend components
- Detect classic CL/TE desynchronization vulnerabilities
- Evaluate protocol translation logic (HTTP/2 → HTTP/1.1)
- Assess H2C upgrade handling and downgrade safety
- Confirm backend request queue poisoning
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/16-HTTP_Request_Smuggling)

### WSTG-INJT-17 - Host Header Injection
**Objectives:**
- Assess if the Host header is being parsed dynamically in the application.
- Bypass security controls that rely on the header.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/17-Host_Header_Injection)

### WSTG-INJT-18 - Server-side Template Injection
**Objectives:**
- Detect template injection vulnerability points.
- Identify the templating engine.
- Build the exploit.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/18-Server-side_Template_Injection)

### WSTG-INJT-19 - Server-Side Request Forgery
**Objectives:**
- Identify SSRF injection points.
- Test if the injection points are exploitable.
- Asses the severity of the vulnerability.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/19-Server-Side_Request_Forgery)

### WSTG-INJT-20 - Mass Assignment
**Objectives:**
- Identify requests that modify objects
- Assess if it is possible to modify fields never intended to be modified from outside
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/20-Mass_Assignment)

### WSTG-INJT-21 - CSV Injection
**Objectives:**
- Identify CSV/spreadsheet export features that include untrusted input.
- Verify whether attacker-controlled values are interpreted as formulas when the export is opened in common spreadsheet applications.
- Check whether separator/quote injection can move a dangerous prefix to the start of a cell.
- Validate whether mitigations remain effective in Microsoft Excel after saving and re-opening the CSV.
- Assess practical impact based on who opens the export and how it is used.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/21-CSV_Injection)

### WSTG-INJT-22 - Prototype Pollution
**Objectives:**
- Identify functions and libraries that recursively merge, clone, or assign user-controlled properties.
- Determine whether user input can reach and modify `Object.prototype`.
- Identify gadgets that turn prototype pollution into a concrete impact.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/22-Prototype_Pollution)

### WSTG-INJT-23 - Insecure Deserialization
**Objectives:**
- Identify entry points where the application accepts serialized objects from untrusted
- urces (for example, HTTP headers, parameters, or cookies).
- Determine the serialization format used by the application.
- Assess whether serialized input is validated or restricted prior to deserialization.
- Evaluate whether manipulation of serialized data leads to unsafe behavior or security
- pact.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Injection/23-Insecure_Deserialization)

## WSTG-ERRH: Error Handling (2 tests)

### WSTG-ERRH-01 - Improper Error Handling
**Objectives:**
- Identify existing error output.
- Analyze the different output returned.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/08-Error_Handling/01-Improper_Error_Handling)

### WSTG-ERRH-02 - Stack Traces
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/08-Error_Handling/02-Stack_Traces)

## WSTG-CRYP: Weak Cryptography (4 tests)

### WSTG-CRYP-01 - Weak Transport Layer Security
**Objectives:**
- Validate the service configuration.
- Review the digital certificate's cryptographic strength and validity.
- Ensure that the TLS security is not bypassable and is properly implemented across the application.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/09-Weak_Cryptography/01-Weak_Transport_Layer_Security)

### WSTG-CRYP-02 - Padding Oracle
**Objectives:**
- Identify encrypted messages that rely on padding.
- Attempt to break the padding of the encrypted messages and analyze the returned error messages for further analysis.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/09-Weak_Cryptography/02-Padding_Oracle)

### WSTG-CRYP-03 - Sensitive Information Sent via Unencrypted Channels
**Objectives:**
- Identify sensitive information transmitted through the various channels.
- Assess the privacy and security of the channels used.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/09-Weak_Cryptography/03-Sensitive_Information_Sent_via_Unencrypted_Channels)

### WSTG-CRYP-04 - Weak Cryptographic Primitives
**Objectives:**
- Provide a guideline for the identification weak encryption or hashing uses and implementations.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/09-Weak_Cryptography/04-Weak_Cryptographic_Primitives)

## WSTG-BUSL: Business Logic (10 tests)

### WSTG-BUSL-01 - Business Logic Data Validation
**Objectives:**
- Identify data injection points.
- Validate that all checks are occurring on the backend and can't be bypassed.
- Attempt to break the format of the expected data and analyze how the application is handling it.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/01-Business_Logic_Data_Validation)

### WSTG-BUSL-02 - Ability to Forge Requests
**Objectives:**
- Review the project documentation looking for guessable, predictable, or hidden functionality of fields.
- Insert logically valid data in order to bypass normal business logic workflow.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/02-Ability_to_Forge_Requests)

### WSTG-BUSL-03 - Integrity Checks
**Objectives:**
- Review the project documentation for components of the system that move, store, or handle data.
- Determine what type of data is logically acceptable by the component and what types the system should guard against.
- Determine who should be allowed to modify or read that data in each component.
- Attempt to insert, update, or delete data values used by each component that should not be allowed per the business logic workflow.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/03-Integrity_Checks)

### WSTG-BUSL-04 - Process Timing
**Objectives:**
- Review the project documentation for system functionality that may be impacted by time.
- Develop and execute misuse cases.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/04-Process_Timing)

### WSTG-BUSL-05 - Number of Times a Function Can Be Used Limits
**Objectives:**
- Identify functions that must set limits to the times they can be called.
- Assess if there is a logical limit set on the functions and if it is properly validated.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/05-Number_of_Times_a_Function_Can_Be_Used_Limits)

### WSTG-BUSL-06 - Circumvention of Work Flows
**Objectives:**
- Review the project documentation for methods to skip or go through steps in the application process in a different order from the intended business logic flow.
- Develop a misuse case and try to circumvent every logic flow identified.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/06-Circumvention_of_Work_Flows)

### WSTG-BUSL-07 - Defenses Against Application Misuse
**Objectives:**
- Generate notes from all tests conducted against the system.
- Review which tests had a different functionality based on aggressive input.
- Understand the defenses in place and verify if they are enough to protect the system against bypassing techniques.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/07-Defenses_Against_Application_Misuse)

### WSTG-BUSL-08 - Upload of Unexpected File Types
**Objectives:**
- Review the project documentation for file types that are rejected by the system.
- Verify that the unwelcomed file types are rejected and handled safely.
- Verify that file batch uploads are secure and do not allow any bypass against the set security measures.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/08-Upload_of_Unexpected_File_Types)

### WSTG-BUSL-09 - Upload of Malicious Files
**Objectives:**
- Identify the file upload functionality.
- Review the project documentation to identify what file types are considered acceptable, and what types would be considered dangerous or malicious.
- If documentation is not available then consider what would be appropriate based on the purpose of the application.
- Determine how the uploaded files are processed.
- Obtain or create a set of malicious files for testing.
- Try to upload the malicious files to the application and determine whether it is accepted and processed.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/09-Upload_of_Malicious_Files)

### WSTG-BUSL-10 - Payment Functionality
**Objectives:**
- Determine whether the business logic for the e-commerce functionality is robust.
- Understand how the payment functionality works.
- Determine whether the payment functionality is secure.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic/10-Payment_Functionality)

## WSTG-CLNT: Client-side (14 tests)

### WSTG-CLNT-01 - DOM-Based Cross Site Scripting
**Objectives:**
- Identify DOM sinks.
- Build payloads that pertain to every sink type.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/01-DOM-based_Cross_Site_Scripting)

### WSTG-CLNT-02 - JavaScript Execution
**Objectives:**
- Identify sinks and possible JavaScript injection points.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/02-JavaScript_Execution)

### WSTG-CLNT-03 - HTML Injection
**Objectives:**
- Identify HTML injection points and assess the severity of the injected content.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/03-HTML_Injection)

### WSTG-CLNT-04 - Client-side URL Redirect
**Objectives:**
- Identify injection points that handle URLs or paths.
- Assess the locations that the system could redirect to.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/04-Client-side_URL_Redirect)

### WSTG-CLNT-05 - CSS Injection
**Objectives:**
- Identify CSS injection points.
- Assess the impact of the injection.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/05-CSS_Injection)

### WSTG-CLNT-06 - Client-side Resource Manipulation
**Objectives:**
- Identify sinks with weak input validation.
- Assess the impact of the resource manipulation.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/06-Client-side_Resource_Manipulation)

### WSTG-CLNT-07 - Cross Origin Resource Sharing
**Objectives:**
- Identify endpoints that implement CORS.
- Ensure that the CORS configuration is secure or harmless.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/07-Cross_Origin_Resource_Sharing)

### WSTG-CLNT-09 - Clickjacking
**Objectives:**
- Assess application vulnerability to clickjacking attacks.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/09-Clickjacking)

### WSTG-CLNT-10 - WebSockets
**Objectives:**
- Identify the usage of WebSockets.
- Assess its implementation by using the same tests on normal HTTP channels.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/10-WebSockets)

### WSTG-CLNT-11 - Web Messaging
**Objectives:**
- Assess the security of the message's origin.
- Validate that it's using safe methods and validating its input.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/11-Web_Messaging)

### WSTG-CLNT-12 - Browser Storage
**Objectives:**
- Determine whether the site is storing sensitive data in client-side storage.
- The code handling of the storage objects should be examined for possibilities of injection attacks, such as utilizing unvalidated input or vulnerable libraries.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/12-Browser_Storage)

### WSTG-CLNT-13 - Cross Site Script Inclusion
**Objectives:**
- Locate sensitive data across the system.
- Assess the leakage of sensitive data through various techniques.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/13-Cross_Site_Script_Inclusion)

### WSTG-CLNT-14 - Reverse Tabnabbing
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/14-Reverse_Tabnabbing)

### WSTG-CLNT-15 - Client-side Template Injection
**Objectives:**
- Identify the client-side framework and its version used by the application.
- Detect injection points where user input is reflected into the DOM and processed by the template engine.
- Assess if the injection allows for arbitrary JavaScript execution (XSS) via the template syntax.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side/15-Client-Side_Template_Injection)

## WSTG-APIT: API Testing (5 tests)

### WSTG-APIT-01 - API Reconnaissance
**Objectives:**
- Find all API endpoints supported by the backend server code, documented or undocumented.
- Find all parameters for each endpoint supported by the backend server, documented or undocumented.
- Discover interesting data related to APIs in HTML and JavaScript sent to clients.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/01-API_Reconnaissance)

### WSTG-APIT-02 - API Broken Object Level Authorization
**Objectives:**
- The objective of this test is to identify whether the API enforces proper **object-level authorization** checks, ensuring that users can only access and manipulate objects they are authorized to interact with.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/02-API_Broken_Object_Level_Authorization)

### WSTG-APIT-03 - Excessive Data Exposure
**Objectives:**
- Identify API responses that contain more data than what the client application displays or requires.
- Detect sensitive fields returned in API responses such as password hashes, authentication tokens, internal object IDs, PII, or infrastructure details.
- Determine whether the API relies on client-side filtering rather than server-side field selection to control data exposure.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/03-Excessive_Data_Exposure)

### WSTG-APIT-04 - API Broken Function Level Authorization
**Objectives:**
- The goal of this test is to determine if the API enforces **role or privilege-based access control** to restrict users from accessing or executing functions they are not authorized to use. This ensures that function-level security boundaries are properly enforced.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/04-API_Broken_Function_Level_Authorization)

### WSTG-APIT-99 - GraphQL
**Objectives:**
- Assess that a secure and production-ready configuration is deployed.
- Validate all input fields against generic attacks.
- Ensure that proper access controls are applied.
**Reference:** [OWASP WSTG Link](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/99-GraphQL)

