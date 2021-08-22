import MenuPage from "../../../../components/MenuPage";
import config from "../../../../config";
import { readFile } from '../../../../api/storage';

export default MenuPage

export async function getServerSideProps ({ params }) {
  console.log(params)
  return {
    props: {
      storage: readFile(config.STORAGE_PATH + '/storage.db')
    }
  }
}
