import ApiServices from "./api.services"
import config from '../config/config.json'

const ToolsServices = {
  'listOptionsGames': async () => {
    return await ApiServices.get({ url: config.url_api_base + 'options' })
  },
  'dataSelectedGame': async (option: any) => {
    return await ApiServices.get({ url: config.url_api_base + option })
  },
}

export default ToolsServices