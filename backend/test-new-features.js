#!/usr/bin/env node

/**
 * Test Script for Mobile Authentication & Pilgrim Dashboard
 * Tests all new features and API endpoints
 */

import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:5000/api'
const client = axios.create({ baseURL: API_URL })

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
}

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`)
}

const tests = {
  passed: 0,
  failed: 0,
  errors: []
}

// Test 1: Register with mobile number
async function testRegisterWithMobile() {
  try {
    log.info('Test 1: Register with mobile number')
    
    const response = await client.post('/auth/register', {
      name: 'Test Pilgrim',
      email: 'pilgrim@test.com',
      mobileNumber: '9999999999',
      password: 'test@pass123',
      role: 'viewer'
    })

    if (response.data.success && response.data.data.user.mobileNumber) {
      log.success('Mobile number registration successful')
      tests.passed++
      return response.data.data.user
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Registration failed: ${error.response?.data?.error || error.message}`)
    tests.failed++
    tests.errors.push('Register with mobile')
  }
}

// Test 2: Login with mobile number
async function testLoginWithMobile() {
  try {
    log.info('Test 2: Login with mobile number')
    
    const response = await client.post('/auth/login', {
      mobileNumber: '9876543210',
      password: 'team@123'
    })

    if (response.data.success && response.data.data.token) {
      log.success('Mobile number login successful')
      tests.passed++
      return response.data.data.token
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Mobile login failed: ${error.response?.data?.error || error.message}`)
    tests.failed++
    tests.errors.push('Login with mobile')
  }
}

// Test 3: Login with email
async function testLoginWithEmail() {
  try {
    log.info('Test 3: Login with email')
    
    const response = await client.post('/auth/login', {
      email: 'admin@kumbh-sava.com',
      password: 'team@123'
    })

    if (response.data.success && response.data.data.token) {
      log.success('Email login successful')
      tests.passed++
      return response.data.data.token
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Email login failed: ${error.response?.data?.error || error.message}`)
    tests.failed++
    tests.errors.push('Login with email')
  }
}

// Test 4: Get public zones status
async function testPublicZonesStatus() {
  try {
    log.info('Test 4: Get public zones status (no auth)')
    
    const response = await client.get('/public/zones-status')

    if (response.data.success && Array.isArray(response.data.data)) {
      log.success(`Retrieved ${response.data.data.length} zones`)
      tests.passed++
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Zones status failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Public zones status')
  }
}

// Test 5: Get public safety alerts
async function testPublicSafetyAlerts() {
  try {
    log.info('Test 5: Get public safety alerts (no auth)')
    
    const response = await client.get('/public/safety-alerts')

    if (response.data.success && Array.isArray(response.data.data)) {
      log.success(`Retrieved ${response.data.data.length} active alerts`)
      tests.passed++
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Safety alerts failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Public safety alerts')
  }
}

// Test 6: Get helpline information
async function testPublicHelpline() {
  try {
    log.info('Test 6: Get helpline information (no auth)')
    
    const response = await client.get('/public/helpline')

    if (response.data.success && response.data.data.police) {
      log.success('Retrieved helpline information')
      log.info(`  Police: ${response.data.data.police.number}`)
      log.info(`  Ambulance: ${response.data.data.ambulance.number}`)
      tests.passed++
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Helpline failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Public helpline')
  }
}

// Test 7: Get crowd summary
async function testPublicCrowdSummary() {
  try {
    log.info('Test 7: Get crowd summary (no auth)')
    
    const response = await client.get('/public/crowd-summary')

    if (response.data.success && response.data.data.totalVisitors) {
      log.success(`Total visitors: ${response.data.data.totalVisitors}`)
      log.info(`  Busiest zone: ${response.data.data.busiestZone}`)
      log.info(`  Overall status: ${response.data.data.overallStatus}`)
      tests.passed++
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Crowd summary failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Public crowd summary')
  }
}

// Test 8: Get hourly distribution
async function testPublicHourlyDistribution() {
  try {
    log.info('Test 8: Get hourly distribution (no auth)')
    
    const response = await client.get('/public/hourly-distribution')

    if (response.data.success && Array.isArray(response.data.data)) {
      log.success(`Retrieved hourly data for ${response.data.data.length} hours`)
      tests.passed++
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    log.error(`Hourly distribution failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Public hourly distribution')
  }
}

// Test 9: Validate mobile number format
async function testMobileValidation() {
  try {
    log.info('Test 9: Validate mobile number format')
    
    // Test invalid mobile (only 9 digits)
    try {
      await client.post('/auth/register', {
        name: 'Invalid Mobile',
        email: 'invalid@test.com',
        mobileNumber: '987654321', // Only 9 digits
        password: 'test@pass123'
      })
      throw new Error('Should have rejected invalid mobile')
    } catch (error) {
      if (error.response?.status === 400) {
        log.success('Mobile validation working correctly')
        tests.passed++
      } else {
        throw error
      }
    }
  } catch (error) {
    log.error(`Mobile validation test failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Mobile validation')
  }
}

// Test 10: Verify response includes mobile number
async function testResponseMobileField() {
  try {
    log.info('Test 10: Verify mobile number in responses')
    
    const response = await client.post('/auth/login', {
      email: 'operator@kumbh-sava.com',
      password: 'team@123'
    })

    if (response.data.data.user.mobileNumber) {
      log.success(`Mobile number in response: ${response.data.data.user.mobileNumber}`)
      tests.passed++
    } else {
      throw new Error('Mobile number missing from response')
    }
  } catch (error) {
    log.error(`Response mobile field test failed: ${error.message}`)
    tests.failed++
    tests.errors.push('Response mobile field')
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n' + colors.blue + '╔════════════════════════════════════════════╗' + colors.reset)
  console.log(colors.blue + '║  Mobile Auth & Pilgrim Dashboard Test Suite║' + colors.reset)
  console.log(colors.blue + '╚════════════════════════════════════════════╝\n' + colors.reset)

  console.log('🧪 Running tests...\n')

  // Authentication tests
  await testRegisterWithMobile()
  await testLoginWithMobile()
  await testLoginWithEmail()

  // Public API tests
  await testPublicZonesStatus()
  await testPublicSafetyAlerts()
  await testPublicHelpline()
  await testPublicCrowdSummary()
  await testPublicHourlyDistribution()

  // Validation tests
  await testMobileValidation()
  await testResponseMobileField()

  // Summary
  console.log('\n' + colors.blue + '╔════════════════════════════════════════════╗' + colors.reset)
  console.log(colors.blue + '║              Test Summary                  ║' + colors.reset)
  console.log(colors.blue + '╚════════════════════════════════════════════╝\n' + colors.reset)

  console.log(`${colors.green}✅ Passed: ${tests.passed}${colors.reset}`)
  console.log(`${colors.red}❌ Failed: ${tests.failed}${colors.reset}`)

  if (tests.errors.length > 0) {
    console.log(`\n${colors.yellow}Failed Tests:${colors.reset}`)
    tests.errors.forEach(error => {
      console.log(`  - ${error}`)
    })
  }

  const total = tests.passed + tests.failed
  const percentage = ((tests.passed / total) * 100).toFixed(1)

  console.log(`\n${colors.blue}Overall: ${tests.passed}/${total} (${percentage}%)${colors.reset}`)

  if (tests.failed === 0) {
    console.log(`\n${colors.green}🎉 All tests passed!${colors.reset}\n`)
    process.exit(0)
  } else {
    console.log(`\n${colors.red}⚠️  Some tests failed. Check the errors above.${colors.reset}\n`)
    process.exit(1)
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  log.error(`Unexpected error: ${error.message}`)
  process.exit(1)
})

// Start tests
runAllTests().catch((error) => {
  log.error(`Test suite error: ${error.message}`)
  process.exit(1)
})
