/**
 * Ocean Explorer Storage Utility
 * Manages player data persistence across sessionStorage and localStorage
 */

export interface PlayerData {
  name: string
  age: number
  gender: string
  buddy: string
  school_name: string
  school_location?: string
  contact_person?: string
  student_id: string
  onboarding_session_id?: string
  timestamp?: string
}

const SESSION_STORAGE_KEY = 'ocean_explorer_player'
const LOCAL_STORAGE_KEY = 'ocean_explorer_player_backup'

/**
 * Save player data to both sessionStorage (primary) and localStorage (backup)
 */
export function savePlayerData(data: PlayerData): boolean {
  try {
    const enrichedData = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Save to sessionStorage (primary)
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(enrichedData))

    // Save to localStorage (backup)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(enrichedData))

    console.log('✅ Player data saved successfully', enrichedData)
    return true
  } catch (error) {
    console.error('❌ Failed to save player data:', error)
    return false
  }
}

/**
 * Load player data from sessionStorage with fallback to localStorage
 */
export function loadPlayerData(): PlayerData | null {
  try {
    // Try sessionStorage first
    let rawData = sessionStorage.getItem(SESSION_STORAGE_KEY)

    // Fallback to localStorage if sessionStorage is empty
    if (!rawData) {
      console.log('⚠️ SessionStorage empty, loading from localStorage backup')
      rawData = localStorage.getItem(LOCAL_STORAGE_KEY)
    }

    if (!rawData) {
      console.warn('⚠️ No player data found in storage')
      return null
    }

    const data = JSON.parse(rawData) as PlayerData

    // Validate required fields
    if (!data.name || !data.age || !data.buddy) {
      console.error('❌ Invalid player data: missing required fields', data)
      return null
    }

    console.log('✅ Player data loaded successfully', data)
    return data
  } catch (error) {
    console.error('❌ Failed to load player data:', error)
    return null
  }
}

/**
 * Verify that all required data fields are present
 */
export function validatePlayerData(data: PlayerData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name || data.name.trim() === '') {
    errors.push('Player name is missing')
  }

  if (!data.age || data.age < 3 || data.age > 18) {
    errors.push('Player age is invalid')
  }

  if (!data.gender) {
    errors.push('Player gender is missing')
  }

  if (!data.buddy) {
    errors.push('Sea buddy is not selected')
  }

  if (!data.school_name || data.school_name.trim() === '') {
    errors.push('School name is missing')
  }

  if (!data.student_id) {
    console.warn('⚠️ Student ID is missing (may be created on backend)')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Clear all stored player data
 */
export function clearPlayerData(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    console.log('✅ Player data cleared')
  } catch (error) {
    console.error('❌ Failed to clear player data:', error)
  }
}

/**
 * Get debug information about stored data
 */
export function getStorageDebugInfo(): {
  sessionStorageExists: boolean
  localStorageExists: boolean
  sessionStorageSize: number
  localStorageSize: number
} {
  const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY)
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY)

  return {
    sessionStorageExists: !!sessionData,
    localStorageExists: !!localData,
    sessionStorageSize: sessionData?.length || 0,
    localStorageSize: localData?.length || 0,
  }
}

/**
 * Log comprehensive debug information
 */
export function logStorageDebugInfo(): void {
  const info = getStorageDebugInfo()
  console.group('🔍 Ocean Explorer Storage Debug Info')
  console.log('Session Storage Exists:', info.sessionStorageExists)
  console.log('Local Storage Exists:', info.localStorageExists)
  console.log('Session Storage Size:', info.sessionStorageSize, 'bytes')
  console.log('Local Storage Size:', info.localStorageSize, 'bytes')

  const playerData = loadPlayerData()
  if (playerData) {
    console.log('Player Data:', playerData)
    const validation = validatePlayerData(playerData)
    console.log('Validation Result:', validation)
  }
  console.groupEnd()
}
