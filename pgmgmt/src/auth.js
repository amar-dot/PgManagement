export const getAuthUser = () => {
  const userJson = localStorage.getItem('authUser')
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch {
    return null
  }
}

export const clearAuthUser = () => {
  localStorage.removeItem('authUser')
}
