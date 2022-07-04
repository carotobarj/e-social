import { SORT_BY } from "../utils/constants"

export function sortBy(payload) {
  return {
    type: SORT_BY,
    payload
  }
}
