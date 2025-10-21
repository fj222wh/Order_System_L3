/**
 * Main file for starting and rendering the store view.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { StoreController } from './store/StoreController.js'

const store = new StoreController('€')
store.createStoreView()
