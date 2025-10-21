/**
 * Main file for starting and rendering the store view.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { StoreControllerView } from './store/StoreControllerView.js'

const store = new StoreControllerView('€')
store.createStoreView()
