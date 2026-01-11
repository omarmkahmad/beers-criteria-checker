# Code Wiki - Beers Criteria Checker

Welcome to the Code Wiki for the **Beers Criteria Checker** project. This document provides comprehensive documentation about the project structure, components, and functionality.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Functionality](#functionality)
5. [Dependencies](#dependencies)
6. [Getting Started](#getting-started)
7. [Architecture](#architecture)
8. [Key Features](#key-features)
9. [Development Guidelines](#development-guidelines)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

The **Beers Criteria Checker** is a tool designed to evaluate medications against the Beers Criteria®, which is a standardized, evidence-based screening tool for potentially inappropriate medication use in older adults. This project helps healthcare professionals, researchers, and developers identify potentially problematic medications and drug interactions in geriatric patients.

### What are the Beers Criteria?

The American Geriatrics Society (AGS) Beers Criteria® provides explicit recommendations for potentially inappropriate medication use in adults aged 65 years and older. These criteria help optimize medication therapy and reduce adverse health outcomes in older adults.

### Project Goals

- Provide an automated, reliable way to check medications against the Beers Criteria
- Facilitate research and clinical decision-making
- Enable easy integration with healthcare systems and EHR platforms
- Maintain compliance with the latest AGS Beers Criteria® updates

---

## Project Structure

```
beers-criteria-checker/
├── README.md                    # Project overview and quick start guide
├── Code-Wiki.md                # This comprehensive documentation
├── package.json                # Node.js project configuration
├── .gitignore                  # Git ignore rules
├── .env.example                # Example environment variables
├── src/                        # Source code directory
│   ├── index.js               # Main entry point
│   ├── config/                # Configuration files
│   │   ├── beers-data.json    # Beers Criteria medication database
│   │   └── config.js          # Application configuration
│   ├── services/              # Core business logic
│   │   ├── medicationChecker.js  # Main checker service
│   │   ├── dataValidator.js      # Input validation service
│   │   └── reportGenerator.js    # Report generation service
│   ├── models/                # Data models
│   │   ├── Medication.js      # Medication model
│   │   ├── Interaction.js     # Drug interaction model
│   │   └── Criteria.js        # Beers Criteria model
│   ├── utils/                 # Utility functions
│   │   ├── logger.js          # Logging utility
│   │   ├── formatters.js      # Data formatting helpers
│   │   └── validators.js      # Validation helpers
│   ├── routes/                # API routes (if applicable)
│   │   ├── medicationRoutes.js  # Medication endpoints
│   │   └── checkRoutes.js       # Checking endpoints
│   └── middleware/            # Express middleware (if applicable)
│       ├── errorHandler.js    # Error handling middleware
│       └── authentication.js   # Authentication middleware
├── tests/                     # Test suite
│   ├── unit/                  # Unit tests
│   │   ├── medicationChecker.test.js
│   │   ├── dataValidator.test.js
│   │   └── reportGenerator.test.js
│   ├── integration/           # Integration tests
│   │   ├── api.test.js
│   │   └── workflow.test.js
│   └── fixtures/              # Test data and fixtures
├── docs/                      # Additional documentation
│   ├── API.md                 # API documentation
│   ├── CONTRIBUTING.md        # Contribution guidelines
│   ├── ARCHITECTURE.md        # Detailed architecture docs
│   └── EXAMPLES.md            # Usage examples
├── scripts/                   # Utility scripts
│   ├── updateBeersData.js     # Update medication database
│   ├── generateReport.js      # Generate sample reports
│   └── seed.js                # Seed initial data
├── logs/                      # Application logs
└── dist/                      # Compiled/built files (if applicable)
```

---

## Core Components

### 1. **Medication Checker Service** (`src/services/medicationChecker.js`)

The heart of the application that performs the actual medication evaluation against Beers Criteria.

**Key Responsibilities:**
- Load and manage the Beers Criteria database
- Process medication lists
- Cross-reference medications against criteria
- Identify potential contraindications
- Detect drug interactions
- Generate findings and recommendations

**Main Methods:**
```javascript
// Check a single medication
checkMedication(medicationName, patientAge, conditions)

// Check multiple medications
checkMedications(medicationList, patientAge, conditions)

// Detect interactions between medications
detectInteractions(medicationList)

// Get detailed criteria information
getCriteriaDetails(medicationId)
```

### 2. **Data Validator Service** (`src/services/dataValidator.js`)

Ensures data integrity and validity before processing.

**Key Responsibilities:**
- Validate medication names and codes
- Verify patient demographic data
- Check for missing or malformed data
- Normalize input formats
- Handle edge cases and exceptions

**Main Methods:**
```javascript
validateMedication(medication)
validatePatientData(patientData)
validateMedicationList(medications)
normalizeMedicationName(name)
```

### 3. **Report Generator Service** (`src/services/reportGenerator.js`)

Creates formatted reports of medication evaluations.

**Key Responsibilities:**
- Compile checking results into readable reports
- Format data for different output types (JSON, PDF, HTML)
- Include clinical recommendations
- Add severity ratings
- Generate summary statistics

**Main Methods:**
```javascript
generateReport(checkResults, format)
generateSummary(checkResults)
addClinicalRecommendations(results)
exportReport(report, format, filename)
```

### 4. **Data Models**

#### **Medication Model** (`src/models/Medication.js`)
Represents a single medication with its properties.

```javascript
{
  id: string,
  name: string,
  genericName: string,
  brand: string[],
  drugClass: string,
  ageRange: { min: number, max: number },
  contraindications: string[],
  side: string,
  severity: 'Strong' | 'Weak',
  reason: string,
  alternative: string[]
}
```

#### **Interaction Model** (`src/models/Interaction.js`)
Represents drug-drug or drug-condition interactions.

```javascript
{
  medicationA: string,
  medicationB: string,
  interactionType: string,
  severity: 'High' | 'Medium' | 'Low',
  recommendation: string,
  evidence: string
}
```

#### **Criteria Model** (`src/models/Criteria.js`)
Represents a single Beers Criteria entry.

```javascript
{
  id: string,
  criterion: string,
  medications: string[],
  conditions: string[],
  recommendation: string,
  rationale: string,
  year: number
}
```

### 5. **Utility Functions** (`src/utils/`)

**logger.js:**
- Debug logging throughout the application
- Log levels: error, warn, info, debug
- File and console output

**formatters.js:**
- Format dates and times
- Format medication names for display
- Convert data between formats (camelCase, snake_case, etc.)

**validators.js:**
- Validate email addresses
- Validate medication codes
- Check age constraints
- Verify condition codes

---

## Functionality

### Main Workflow

```
User Input
    ↓
Data Validation
    ↓
Medication Checking (against Beers Criteria)
    ↓
Interaction Detection (between medications)
    ↓
Clinical Assessment
    ↓
Report Generation
    ↓
Output/Export
```

### Key Features

1. **Medication Screening**
   - Identify medications on the Beers Criteria list
   - Assess age-appropriateness
   - Evaluate disease-related contraindications

2. **Interaction Detection**
   - Identify dangerous drug combinations
   - Assess medication-condition interactions
   - Provide interaction severity ratings

3. **Clinical Recommendations**
   - Suggest safer alternatives
   - Provide rationale for recommendations
   - Include evidence-based guidance

4. **Report Generation**
   - Multiple output formats (JSON, PDF, HTML)
   - Customizable report templates
   - Summary statistics and metrics

5. **Data Management**
   - Maintain current Beers Criteria database
   - Support custom medication lists
   - Version control for criteria changes

---

## Dependencies

### Core Dependencies

```json
{
  "express": "^4.x.x",              // Web framework
  "dotenv": "^16.x.x",              // Environment variables
  "lodash": "^4.x.x",               // Utility library
  "joi": "^17.x.x",                 // Data validation
  "axios": "^1.x.x",                // HTTP client
  "pdfkit": "^0.x.x",               // PDF generation
  "winston": "^3.x.x"               // Logging library
}
```

### Development Dependencies

```json
{
  "jest": "^29.x.x",                // Testing framework
  "supertest": "^6.x.x",            // HTTP testing
  "nodemon": "^3.x.x",              // Auto-restart development
  "eslint": "^8.x.x",               // Code linting
  "prettier": "^3.x.x"              // Code formatting
}
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/omarmkahmad/beers-criteria-checker.git
   cd beers-criteria-checker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check for security vulnerabilities
npm audit
```

---

## Architecture

### Design Patterns

1. **Service Pattern**
   - Separation of concerns with dedicated services
   - Business logic isolated from controllers

2. **Factory Pattern**
   - Medication and Criteria object creation
   - Consistent object initialization

3. **Strategy Pattern**
   - Different report generation strategies
   - Flexible output formatting

4. **Observer Pattern**
   - Event-driven architecture for status updates
   - Logging and monitoring integration

### Data Flow

```
┌─────────────────┐
│   User Input    │
└────────┬────────┘
         │
         ↓
┌──────────────────────┐
│ Data Normalization   │
└────────┬─────────────┘
         │
         ↓
┌──────────────────────┐
│   Data Validation    │
└────────┬─────────────┘
         │
         ↓
┌──────────────────────┐
│ Load Beers Database  │
└────────┬─────────────┘
         │
         ↓
┌──────────────────────┐
│ Medication Checking  │
└────────┬─────────────┘
         │
         ↓
┌──────────────────────┐
│  Interaction Check   │
└────────┬─────────────┘
         │
         ↓
┌──────────────────────┐
│ Report Generation    │
└────────┬─────────────┘
         │
         ↓
┌─────────────────┐
│      Output     │
└─────────────────┘
```

### Error Handling

The application uses a hierarchical error handling approach:

```javascript
// Error types
class ValidationError extends Error { }
class MedicationNotFoundError extends Error { }
class DataLoadError extends Error { }
class ReportGenerationError extends Error { }
```

---

## Key Features

### 1. Comprehensive Medication Database
- Current Beers Criteria entries
- Drug interactions
- Alternative medications
- Evidence-based recommendations

### 2. Flexible Input
- Single medication checking
- Batch medication processing
- Patient demographic consideration
- Condition-based evaluation

### 3. Detailed Output
- Severity ratings
- Clinical rationale
- Alternative suggestions
- Interaction warnings

### 4. Integration Ready
- RESTful API endpoints
- JSON data exchange
- Standard error responses
- Pagination support

### 5. Audit Trail
- Logging of all checks
- User activity tracking
- Result history
- Change documentation

---

## Development Guidelines

### Code Style

- Follow ESLint configuration
- Use Prettier for formatting
- Maintain consistent naming conventions
- Document complex logic with comments

### Naming Conventions

```javascript
// Files and directories: kebab-case
medication-checker.js
data-validator.js

// Constants: UPPER_SNAKE_CASE
const MAX_AGE = 120;
const MIN_AGE = 0;

// Functions and methods: camelCase
function getMedicationData() { }
const validateInput = () => { }

// Classes: PascalCase
class MedicationChecker { }
class DataValidator { }
```

### Testing Requirements

- Minimum 80% code coverage
- Unit tests for all services
- Integration tests for workflows
- Test file naming: `*.test.js`

### Commit Messages

Follow conventional commits:
```
feat: Add new medication database update
fix: Correct interaction detection logic
docs: Update API documentation
test: Add tests for validator service
refactor: Simplify medication checker logic
```

---

## Troubleshooting

### Common Issues

#### 1. **Medication Not Found**
**Problem:** A medication in the input list is not recognized.

**Solutions:**
- Check spelling and capitalization
- Use generic name instead of brand name
- Verify medication is in the current Beers Criteria database
- Check for abbreviations or alternate names

#### 2. **Data Validation Errors**
**Problem:** Input fails validation checks.

**Solutions:**
- Verify required fields are present
- Check data types match expected formats
- Ensure age is within valid range (0-120)
- Validate medication codes are properly formatted

#### 3. **Database Load Failures**
**Problem:** Unable to load Beers Criteria database.

**Solutions:**
- Verify `beers-data.json` exists in `src/config/`
- Check file permissions
- Ensure valid JSON format
- Review error logs for details

#### 4. **Report Generation Errors**
**Problem:** Report creation fails or outputs incorrectly.

**Solutions:**
- Verify output format is supported
- Check disk space for file output
- Ensure templates are properly formatted
- Review generator service logs

#### 5. **Performance Issues**
**Problem:** Medication checking is slow.

**Solutions:**
- Check medication list size
- Review database indexing
- Monitor memory usage
- Optimize database queries

### Getting Help

- Check existing issues in GitHub repository
- Review error logs in `logs/` directory
- Consult API documentation in `docs/API.md`
- Check EXAMPLES.md for usage samples

### Debugging Tips

1. **Enable Debug Logging:**
   ```bash
   DEBUG=beers-criteria-checker:* npm start
   ```

2. **Use Node Inspector:**
   ```bash
   node --inspect src/index.js
   ```

3. **Check Environment Variables:**
   ```bash
   npm run check-env
   ```

4. **Validate Data Files:**
   ```bash
   npm run validate-data
   ```

---

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed contribution guidelines.

---

## License

Please refer to the LICENSE file in the repository for licensing information.

---

## Additional Resources

- [American Geriatrics Society - Beers Criteria](https://www.americangeriatrics.org/)
- [API Documentation](docs/API.md)
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Usage Examples](docs/EXAMPLES.md)

---

**Last Updated:** 2026-01-11  
**Version:** 1.0.0

For questions or feedback about this Code Wiki, please open an issue in the repository or contact the project maintainers.
