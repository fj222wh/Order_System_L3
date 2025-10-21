/**
 * Main file for starting and rendering the store view.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { StoreControllerView } from './store/StoreControllerView.js'
import { OrderSystemApi } from './store/OrderSystemApi.js'
import { OrderSystemUI } from './store/OrderSystemUI.js'

const currency = 'SEK'
const ui = new OrderSystemUI(currency)
const api = new OrderSystemApi()
const store = new StoreControllerView(ui, api)
store.createStoreView()
