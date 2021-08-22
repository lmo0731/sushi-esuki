
import { readFile } from '../../../api/storage'
import HomePage from '../../../components/HomePage'
import config from '../../../config'

export default HomePage

// export async function getServerSideProps () {
//   return {
//     props: {
//       storage: readFile(config.STORAGE_PATH + '/storage.db')
//     }
//   }
// }

export async function getServerSideProps ({ params }) {
  const { home } = params
  const storage = readFile(config.STORAGE_PATH + '/storage.db')
  const restaurant = storage.sites[home]
  return {
    props: {
      storage: restaurant
    }
  }
}
