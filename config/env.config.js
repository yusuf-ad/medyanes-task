/**
 * Environment Configuration
 * Bu dosya environment variable'ları yönetmek için kullanılır
 */

// Environment variables
export const ENV_CONFIG = {
  // Base URL for API calls
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

/**
 * Get the appropriate base URL based on environment
 * @returns {string} Base URL
 */
export const getBaseURL = () => {
  if (!ENV_CONFIG.BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_BASE_URL is not set. Please provide it in your .env.local file."
    );
  }
  return ENV_CONFIG.BASE_URL;
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
    errors.push(
      "NEXT_PUBLIC_BASE_URL is not set. Please provide it in your .env.local file."
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config: ENV_CONFIG,
  };
};

export default ENV_CONFIG;
