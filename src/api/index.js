import GroupingAPI from "./Account/GroupingAPI"
import AccountAPI from "./Account/AccountAPI"
import TagAPI from "./Account/TagAPI"
import PassiveAPI from "./Account/PassiveAPI"
import TrumpetAPI from "./Account/TrumpetAPI"

// 导入现有API对象，合并成一个对象
const API = {
  ...GroupingAPI,
  ...AccountAPI,
  ...TagAPI,
  ...PassiveAPI,
  ...TrumpetAPI
}

export default API
