const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const ThemeOverride = require('@admin-bro/design-system');


const theme = { colors: { bck: '#2C2F33', defaultText: '#2C2F33', lightText: '#2C2F33', lightBck: '#2C2F33', superLightBack: '#2C2F33', border: '#2C2F33', borderOnDark: '#2C2F33', darkBck: '#2C2F33', superDarkBck: '#2C2F33', love: '#2C2F33', primary: '#2C2F33', primaryHover: '#2C2F33', success: '#2C2F33', successBorder: '#2C2F33', lightSuccess: '#2C2F33', error: '#2C2F33', lightError: '#2C2F33', warning: '#2C2F33', } }



AdminBro.registerAdapter(AdminBroMongoose)


function HashPassword() {
  return {
    before: async (request) => {

      console.log('request.payload', request.payload)

      if (request.payload.password) {
        if (request.payload.password.length < 40 && request.payload.password.length > 0) {
          request.payload = {
            ...request.payload,
            password: _._hashPass(request.payload.password),
          }

          console.log('request.payload', request.payload)

        }
      }
      return request
    },
  }
}


const adminBro = new AdminBro({
  branding: {
    logo: `http://localhost:8080/PS-logo.png`,
    companyName: 'PrimeShopper | Admin',
    softwareBrothers: false,
    theme: theme
  },
  dashboard: {
    component: AdminBro.bundle(path.join(APP_PATH, 'admin/dashboard')),
  },
  database: [mongoose],
  resources: [
    //User
    {
      resource: _Users,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'name', 'username', 'email', 'password', 'phoneNumber']
      },
    },
    //Seller
    {
      resource: _Seller,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'name', 'email', 'password', 'phoneNumber', 'status']
      },
    },
    // Category
    {
      resource: _Category,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'name', 'banner', 'image', 'dean', 'type', 'status'],
        properties: {
          banner: {
            components: {
              list: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              show: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              new: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
              edit: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
            }
          },
          image: {
            components: {
              list: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              show: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              new: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
              edit: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
            }
          },
        }
      },
    },
    //ProductsForms

    {
      resource: _ProductForms,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'category', 'forms', 'status'],
      },
    },

    //Brands

    {
      resource: _Brands,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'category', 'name', 'image', 'status'],
        properties: {
          image: {
            components: {
              list: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              show: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              new: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
              edit: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
            }
          },
        }
      },
    },
    //Products
    {
      resource: _Products,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'title', 'category', 'images', 'banner', 'status'],
        properties: {
          images: {
            components: {
              list: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              show: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              new: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
              edit: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
            }
          },
          banner: {
            components: {
              list: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              show: AdminBro.bundle(path.join(APP_PATH, 'admin/ShowImage')),
              new: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
              edit: AdminBro.bundle(path.join(APP_PATH, 'admin/ImageUpload')),
            }
          },
        },
      },
    },

    //Cart
    {
      resource: _Cart,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'product', 'quantity', 'status']
      },
    },
    //Favorites
    {
      resource: _Favorites,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'seller', 'user', 'product', 'status']
      },
    },
    //Orders
    {
      resource: _Order,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'seller', 'user', 'products', 'orderNumber', 'total', 'status']
      },
    },
    //Payments
    {
      resource: _Payment,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['createdAt', 'seller', 'user', 'order', 'paymentID', 'paymentStatus', 'paymentType', 'amount']
      },
    },
    //Chats
    {
      resource: _Chats,

      options: {
        parent: {
          name: 'Menu'
        },
        listProperties: ['created_at', 'user', 'to', 'message', 'type']
      },
    }

    // // ADMIN
    // {
    //     resource: _Admin,
    //     options: {
    //       parent : {
    //         name : 'Menu'
    //       },
    //         listProperties: ['createdAt', 'name', 'email','status'],
    //         properties: {
    //             password:{
    //                 isVisible: { list: false, filter: false, show: false, edit: true },
    //             }
    //         },
    //         actions: {
    //             new: HashPassword(),
    //             show : {showInDrawer : true},
    //             edit: {...HashPassword(), showInDrawer : true},
    //         },
    //     },
    // },

  ],
  rootPath: '/admin',
})

const routerX = AdminBroExpress.buildRouter(adminBro);
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {

    return await AdminController.login(email, password)

    //   if(email == ADMIN.email && password == ADMIN.password){
    //     return ADMIN;
    //   }

    //  return true
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

module.exports = routerX;