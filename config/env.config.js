/**
 * Environment Configuration
 * Bu dosya environment variable'ları yönetmek için kullanılır
 */

// Environment variables
export const ENV_CONFIG = {
  // Base URL for API calls
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,

  // Environment type
  NODE_ENV: process.env.NODE_ENV,

  // Default URLs for different environments
  DEFAULTS: {
    development: "http://localhost:3000",
    production: "https://medyanes-task-liart.vercel.app/", // Production URL'inizi buraya ekleyin
  },
};

/**
 * Get the appropriate base URL based on environment
 * @returns {string} Base URL
 */
export const getBaseURL = () => {
  // If explicitly set, use that
  if (ENV_CONFIG.BASE_URL) {
    return ENV_CONFIG.BASE_URL;
  }

  // Use defaults based on environment
  if (ENV_CONFIG.NODE_ENV === "development") {
    return ENV_CONFIG.DEFAULTS.development;
  }

  // For production, try to get from window.location if available
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return ENV_CONFIG.DEFAULTS.production;
};

/**
 * Validate environment configuration
 * @returns {object} Validation result
 */
export const validateEnvConfig = () => {
  const errors = [];
  const warnings = [];

  // Check if BASE_URL is set
  if (!ENV_CONFIG.BASE_URL) {
    warnings.push("NEXT_PUBLIC_BASE_URL is not set, using defaults");
  }

  // Check if NODE_ENV is set
  if (!ENV_CONFIG.NODE_ENV) {
    warnings.push("NODE_ENV is not set");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config: ENV_CONFIG,
  };
};

export default ENV_CONFIG;
