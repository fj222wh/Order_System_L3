/**
 * The script for the store.
 *
 * @author Filippa Johansson
 * @version 1.0.0
 */

import { StoreOrchestrator } from './store/StoreOrchestrator.js'

const store = new StoreOrchestrator()

store.start()
