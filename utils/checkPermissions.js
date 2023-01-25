import ExpressError from '../errors/ExpressError.js'

export default function checkPermissions(currentUserId, resourceUserId) {
  if (currentUserId === resourceUserId.toString()) return
  throw new ExpressError(403, "You don't have permission to do this")
}
