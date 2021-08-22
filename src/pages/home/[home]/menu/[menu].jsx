import MenuPage from "../../../../components/MenuPage";
import config from "../../../../config";
import { readFile } from '../../../../api/storage';

export default MenuPage

export async function getServerSideProps ({ params }) {
  const { home, menu } = params
  // console.log(params)
  const storage = readFile(config.STORAGE_PATH + '/storage.db')
  const restaurant = storage.sites[home]
  const { menuPages } = restaurant || {}
  const menuPage = menuPages[menu] || {}
  return {
    props: {
      storage: restaurant,
      menuPage
    }
  }
}
