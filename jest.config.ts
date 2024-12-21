import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
    // testEnvironment: "jest-environment-jsdom",
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testMatch: ['<rootDir>/test/**/*.test.{js,jsx,ts,tsx}'],
    collectCoverage: false,
    collectCoverageFrom: [
        './src/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    // An array of regexp pattern strings of files to skip.
    coveragePathIgnorePatterns: [],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
