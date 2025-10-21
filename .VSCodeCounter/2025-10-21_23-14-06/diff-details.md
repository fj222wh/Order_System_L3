# Diff Details

Date : 2025-10-21 23:14:06

Directory /Users/filippa/Universitet/År 2/1dv610/Examinations/Order_System_L3/src/logic

Total : 47 files,  -6797 codes, -479 comments, -396 blanks, all -7672 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.json](/.eslintrc.json) | JSON with Comments | -3 | 0 | 0 | -3 |
| [README.md](/README.md) | Markdown | -41 | 0 | -12 | -53 |
| [docs/developer.md](/docs/developer.md) | Markdown | -35 | 0 | -17 | -52 |
| [docs/reflection.md](/docs/reflection.md) | Markdown | -71 | 0 | -48 | -119 |
| [docs/test-report.md](/docs/test-report.md) | Markdown | -15 | 0 | -4 | -19 |
| [docs/tests.md](/docs/tests.md) | Markdown | -130 | 0 | -46 | -176 |
| [nodemon.json](/nodemon.json) | JSON | -3 | 0 | 0 | -3 |
| [package-lock.json](/package-lock.json) | JSON | -5,084 | 0 | -1 | -5,085 |
| [package.json](/package.json) | JSON | -35 | 0 | -1 | -36 |
| [public/css/store.css](/public/css/store.css) | PostCSS | -245 | 0 | -46 | -291 |
| [public/css/style.css](/public/css/style.css) | PostCSS | -22 | 0 | -4 | -26 |
| [public/js/components/my-orderItem/README.md](/public/js/components/my-orderItem/README.md) | Markdown | -1 | 0 | 0 | -1 |
| [public/js/components/my-orderItem/index.js](/public/js/components/my-orderItem/index.js) | JavaScript | -1 | 0 | -1 | -2 |
| [public/js/components/my-orderItem/my-order-item.css.js](/public/js/components/my-orderItem/my-order-item.css.js) | JavaScript | -16 | 0 | -2 | -18 |
| [public/js/components/my-orderItem/my-order-item.html.js](/public/js/components/my-orderItem/my-order-item.html.js) | JavaScript | -8 | 0 | -2 | -10 |
| [public/js/components/my-orderItem/my-order-item.js](/public/js/components/my-orderItem/my-order-item.js) | JavaScript | -19 | -23 | -8 | -50 |
| [public/js/index.js](/public/js/index.js) | JavaScript | -3 | -6 | -3 | -12 |
| [public/js/store/OrderSystemApi.js](/public/js/store/OrderSystemApi.js) | JavaScript | -59 | -46 | -13 | -118 |
| [public/js/store/OrderSystemUI.js](/public/js/store/OrderSystemUI.js) | JavaScript | -241 | -118 | -50 | -409 |
| [public/js/store/StoreControllerView.js](/public/js/store/StoreControllerView.js) | JavaScript | -82 | -58 | -19 | -159 |
| [src/config/mongoose.js](/src/config/mongoose.js) | JavaScript | -20 | -19 | -8 | -47 |
| [src/config/sessionOptions.js](/src/config/sessionOptions.js) | JavaScript | -14 | -6 | -3 | -23 |
| [src/controllers/AdminController.js](/src/controllers/AdminController.js) | JavaScript | -8 | -20 | -2 | -30 |
| [src/controllers/ApiController.js](/src/controllers/ApiController.js) | JavaScript | -81 | -63 | -18 | -162 |
| [src/controllers/StoreController.js](/src/controllers/StoreController.js) | JavaScript | -5 | -13 | -1 | -19 |
| [src/data/productData.js](/src/data/productData.js) | JavaScript | -248 | -6 | -2 | -256 |
| [src/data/storeData.js](/src/data/storeData.js) | JavaScript | -9 | -6 | -5 | -20 |
| [src/middleware/errorhandler.js](/src/middleware/errorhandler.js) | JavaScript | -24 | -14 | -6 | -44 |
| [src/middleware/helmetCSP.js](/src/middleware/helmetCSP.js) | JavaScript | -23 | -3 | -2 | -28 |
| [src/models/OrderModel.js](/src/models/OrderModel.js) | JavaScript | -33 | -5 | -5 | -43 |
| [src/models/ProductModel.js](/src/models/ProductModel.js) | JavaScript | -29 | -5 | -5 | -39 |
| [src/models/baseSchema.js](/src/models/baseSchema.js) | JavaScript | -16 | -22 | -5 | -43 |
| [src/routes/adminRouter.js](/src/routes/adminRouter.js) | JavaScript | -6 | -3 | -4 | -13 |
| [src/routes/apiRouter.js](/src/routes/apiRouter.js) | JavaScript | -12 | -6 | -5 | -23 |
| [src/routes/router.js](/src/routes/router.js) | JavaScript | -13 | -7 | -5 | -25 |
| [src/routes/storeRouter.js](/src/routes/storeRouter.js) | JavaScript | -5 | -6 | -4 | -15 |
| [src/server.js](/src/server.js) | JavaScript | -45 | -21 | -19 | -85 |
| [src/views/admin/index.ejs](/src/views/admin/index.ejs) | HTML | -5 | 0 | -4 | -9 |
| [src/views/admin/productcatalog.ejs](/src/views/admin/productcatalog.ejs) | HTML | -2 | 0 | -1 | -3 |
| [src/views/errors/403.ejs](/src/views/errors/403.ejs) | HTML | -6 | 0 | 0 | -6 |
| [src/views/errors/404.ejs](/src/views/errors/404.ejs) | HTML | -6 | 0 | 0 | -6 |
| [src/views/errors/500.ejs](/src/views/errors/500.ejs) | HTML | -6 | 0 | 0 | -6 |
| [src/views/errors/error.ejs](/src/views/errors/error.ejs) | HTML | -1 | 0 | 0 | -1 |
| [src/views/layouts/default.ejs](/src/views/layouts/default.ejs) | HTML | -16 | -3 | -3 | -22 |
| [src/views/partials/flash.ejs](/src/views/partials/flash.ejs) | HTML | -5 | 0 | 0 | -5 |
| [src/views/partials/header.ejs](/src/views/partials/header.ejs) | HTML | -6 | 0 | 0 | -6 |
| [src/views/store/index.ejs](/src/views/store/index.ejs) | HTML | -39 | 0 | -12 | -51 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details