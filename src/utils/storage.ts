
/**
 * Clears user authentication data from localStorage
 * @param userId - The ID of the user whose data needs to be cleared
 */
export const clearUserStorage = (userId: string) => {
  // Only clear user authentication data
  localStorage.removeItem(`careermagic_user`);
};

/**
 * Gets the user-specific storage key
 * @param userId - The ID of the user
 */
export const getUserStorageKey = (userId: string) => `careermagic_data_${userId}`;

