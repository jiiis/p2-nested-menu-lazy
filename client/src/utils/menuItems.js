import menuItemsApi from '../apis/menuItems'

export const fetchMenuItems = (menuItemIds = []) => {
  try {
    return Promise.all(menuItemIds.map(async itemId => {
      const { data } = await menuItemsApi.get(`/${itemId}`)

      return data
    }))
  } catch (error) {
    // @todo Handle failed XHR requests.
    return Promise.resolve([])
  }
}
