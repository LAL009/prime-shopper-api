module.exports = {
    user: {
        base: _Users,
        formFields: [
            {
                key: 'name',
                label: 'Name',
                type: 'string',
                option: {},
            },
            {
                key: 'email',
                label: 'Email',
                type: 'email',
                option: {
                    required: 'True',
                    unique: 'True'
                },
            },
            {
                key: 'username',
                label: 'Username',
                type: 'string',
                option: {}
            },
            {
                key: 'password',
                label: 'password',
                type: 'string',
                option: {
                    required: 'True'
                },
            },
            {
                key: 'phoneNumber',
                label: 'PhoneNumber',
                type: 'string',
                option: {},
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive']
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        cascading: [
            {
                cart: _Cart
            },
            {
                chat: _Chats
            },
            {
                favorites: _Favorites
            },
            {
                order: _Order
            },
            {
                otp: _OTP
            },
            {
                payment: _Payment
            }
        ]
    },

    brand: {
        base: _Brands,
        formFields: [
            {
                key: 'category',
                lable: 'Category',
                type: 'Schema.Types.ObjectId',
                option: {
                    ref: 'Categories'
                },
            },
            {
                key: 'name',
                lable: 'Name',
                type: 'String',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'image',
                label: 'Image',
                type: 'string',
                option: {}
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive']
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            user: {
                path: 'category',
                select: 'name image banner type'
            }
        }
    },

    category: {
        base: _Category,
        formFields: [
            {
                key: 'name',
                lable: 'Name',
                type: 'String',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'banner',
                lable: 'banner',
                type: 'String',
                option: {},
            },
            {
                key: 'image',
                label: 'Image',
                type: 'string',
                option: {}
            },
            {
                key: 'type',
                label: 'Type',
                type: 'enum',
                option: {
                    enum: ['Main', 'SubCategory'],
                    default: 'Main'
                },
            },
            {
                key: 'dean',
                label: 'Dean',
                type: 'Schema.Types.ObjectId',
                option: {
                    ref: 'Categories',
                    default: null
                }
            },
            {
                key: 'slug',
                label: 'slug',
                type: 'string',
                option: {
                    unique: 'true'
                }
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive']
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            dean: {
                path: 'Categories',
                select: 'name banner image type'
            },
            hasFrom: {
                path: 'hasForm'
            }
        },
        cascading: [
            {
                brand: _Brands
            },
            {
                productForm: _ProductForms
            },
            {
                products: _Products
            }
        ]
    },

    order: {
        base: _Order,
        formFields: [
            {
                key: 'user',
                lable: 'User',
                type: 'Schema.Types.ObjectId',
                option: {
                    ref: 'Users',
                    required: 'true'
                },
            },
            {
                key: 'products',
                lable: 'Products',
                productFiled: [
                    {
                        key: 'product',
                        lable: 'Product',
                        type: 'Schema.Types.ObjectId',
                        option: {
                            ref: 'Products',
                            required: 'true'
                        },
                    },
                    {
                        key: 'quantity',
                        label: 'Quantity',
                        type: 'Number',
                        option: {
                            default: 1
                        }
                    },
                    {
                        key: 'price',
                        label: 'Price',
                        type: 'Number',
                        option: {
                            required: 'true'
                        }
                    }
                ],
                option: {},
            },
            {
                key: 'seller',
                lable: 'Seller',
                type: 'Schema.Types.ObjectId',
                option: {
                    ref: 'Sellers',
                    required: 'true'
                },
            },
            {
                key: 'orderNumber',
                label: 'OrderNumber',
                type: 'String',
                option: {},
            },
            {
                key: 'note',
                label: 'Note',
                type: 'String',
                option: {
                    default: ''
                }
            },
            {
                key: 'subtotal',
                label: 'Subtotal',
                type: 'String',
                option: {
                    required: 'true'
                }
            },
            {
                key: 'discount',
                label: 'Discount',
                type: 'String',
                option: {
                    default: 'true'
                }
            },
            {
                key: 'total',
                label: 'Total',
                type: 'Number',
                option: {
                    required: 'true'
                }
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Pending', 'Unshipped', 'Sent', 'Cancelled'],
                    default: 'Pending'
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            user: {
                path: 'user',
                select: 'name email phoneNumber'
            },
            seller: {
                path: 'seller',
                select: 'name email'
            },
            products: {
                path: 'products.product',
                select: ''
            }
        },
        // cascading: 
    },

    seller: {
        base: _Seller,
        formFields: [
            {
                key: 'name',
                lable: 'Name',
                type: 'String',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'email',
                lable: 'Email',
                type: 'String',
                option: {
                    required: 'true',
                    unique: 'true'
                },
            },
            {
                key: 'password',
                label: 'Password',
                type: 'string',
                option: {
                    required: 'true'
                }
            },
            {
                key: 'phoneNumber',
                label: 'PhoneNumber',
                type: 'String',
                option: {},
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive']
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        cascading: [
            {
                order: _Order
            },
            {
                payment: _Payment
            },
            {
                product: _Products
            }
        ]
    },

    otp: {
        base: _OTP,
        formFields: [
            {
                key: 'otp',
                lable: 'otp',
                type: 'String',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'user',
                lable: 'User',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive']
                },
            }
        ]
    },

    productForms: {
        base: _ProductForms,
        formFields: [
            {
                key: 'category',
                lable: 'Category',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'forms',
                lable: 'forms',
                formFields: [
                    {
                        label: 'String'
                    },
                    {
                        filedType: {
                            type: 'enum'
                        },
                        option: {
                            enumValue: ['numeric', 'text', 'textarea', 'other']
                        }
                    },
                    {
                        isRequired: 'Boolean'
                    }
                ],
                option: {},
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive']
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            category: {
                path: 'category',
                select: 'name banner image'
            }
        },

        // cascading: [_Order,_Payment,_Products]

    },

    product: {
        base: _Products,
        formFields: [
            {
                key: 'category',
                lable: 'Category',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'seller',
                lable: 'Seller',
                type: 'Schema.Types.Object',
                option: {
                    default: null
                }
            },
            {
                key: 'title',
                lable: 'Title',
                type: 'String',
                option: {
                    required: 'true'
                }
            },
            {
                key: 'banner',
                lable: 'Banner',
                type: 'String',
                option: {
                    default: ''
                }
            },
            {
                key: 'images',
                lable: 'Images',
                type: 'Array',
                option: {
                    default: []
                }
            },
            {
                key: 'price',
                lable: 'Price',
                type: 'String',
                option: {
                    required: 'true'
                }
            },
            {
                key: 'sellingPrice',
                lable: 'SellingPrice',
                type: 'String',
                option: {
                    required: 'true'
                }
            },
            {
                key: 'discount',
                lable: 'Discount',
                type: 'String',
                option: {
                    default: ''
                }
            },
            {
                key: 'SKU',
                lable: 'SKU',
                type: 'String',
                option: {
                    required: 'true',
                    unique: 'true'
                }
            },
            {
                key: 'description',
                lable: 'Description',
                type: 'String',
                option: {
                    default: ''
                }
            },
            {
                key: 'features',
                lable: 'Features',
                type: 'String',
                option: {
                    default: ''
                }
            },
            {
                key: 'productStatus',
                label: 'ProductStatus',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive', 'Draft']
                },
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['In stock', 'Out of stock']
                },
            },
            {
                key: 'slug',
                label: 'Slug',
                type: 'String',
                option: {
                    unique: 'true'
                },
            },
            {
                key: 'productOtherDetails',
                label: 'ProductOtherDetails',
                type: 'Array',
                option: {
                    default: []
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            category: {
                path: 'category',
                select: 'name image banner'
            },
            seller: {
                path: 'seller',
                select: 'name email phoneNumber'
            }
        },
        cascading: [
            { cart: _Cart }, 
            { favorites: _Favorites }, 
            { products: _Products }
        ]
    },

    cart: {
        base: _Cart,
        formFields: [
            {
                key: 'product',
                lable: 'Product',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'user',
                lable: 'User',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'quantity',
                lable: 'Quantity',
                type: 'Number',
                option: {
                    default: 1
                }
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive'],
                    default: 'Active'
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            product: {
                path: 'product'
            },
            user: {
                path: 'user'
            }
        }
    },

    favorites: {
        base: _Favorites,
        formFields: [
            {
                key: 'seller',
                lable: 'Seller',
                type: 'Schema.Types.ObjectId',
                option: {
                    default: null,
                },
            },
            {
                key: 'user',
                lable: 'User',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'product',
                lable: 'Product',
                type: 'Schema.Types.ObjectId',
                option: {
                    default: null,
                },
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive'],
                    default: 'Active'
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            seller: {
                path: 'seller',
                select: 'name email phoneNumber'
            },
            user: {
                path: 'user',
                select: 'name email phoneNumber'
            },
            product: {
                path: 'product'
            }
        }
    },

    payment: {
        base: _Payment,
        formFields: [
            {
                key: 'user',
                lable: 'User',
                type: 'Schema.Types.ObjectId',
                option: {},
            },
            {
                key: 'seller',
                lable: 'Seller',
                type: 'Schema.Types.ObjectId',
                option: {},
            },
            {
                key: 'order',
                lable: 'Order',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true',
                },
            },
            {
                key: 'paymentID',
                lable: 'PaymentID',
                type: 'String',
                option: {
                    default: ''
                },
            },
            {
                key: 'paymentStatus',
                label: 'PaymentStatus',
                type: 'enum',
                option: {
                    enumValue: ['Pending', 'Paid', 'Unpaid', 'Failed'],
                    default: 'Pending'
                },
            },
            {
                key: 'paymentType',
                label: 'paymentType',
                type: 'String',
                option: {
                    enumValue: ['COD', 'Stripe'],
                    required: 'true'
                },
            },
            {
                key: 'status',
                label: 'Status',
                type: 'enum',
                option: {
                    enumValue: ['Active', 'Inactive'],
                    default: 'Active'
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            },
            {
                key: 'updatedAt',
                label: 'UpdatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            user: {
                path: 'user',
                select: 'name email phoneNumber'
            },
            seller: {
                path: 'seller',
                select: 'name email phoneNumber'
            },
            order: {
                path: 'order'
            }
        }
    },

    chat: {
        base: _Chats,
        formFields: [
            {
                key: 'user',
                lable: 'User',
                type: 'Schema.Types.ObjectId',
                option: {
                    required: 'true'
                },
            },
            {
                key: 'from',
                lable: 'From',
                type: 'String',
                option: {
                    default: ''
                },
            },
            {
                key: 'to',
                lable: 'To',
                type: 'String',
                option: {
                    default: ''
                },
            },
            {
                key: 'message',
                lable: 'Message',
                type: 'String',
                option: {},
            },
            {
                key: 'isRead',
                lable: 'IsRead',
                type: 'Boolean',
                option: {
                    default: 'false`'
                },
            },
            {
                key: 'type',
                label: 'Type',
                type: 'enum',
                option: {
                    enumValue: ['text', 'emoji', 'media'],
                    default: 'text'
                },
            },
            {
                key: 'toType',
                lable: 'ToType',
                type: 'String',
                option: {
                    default: ''
                },
            },
            {
                key: 'formType',
                lable: 'FormType',
                type: 'String',
                option: {
                    default: ''
                },
            },
            {
                key: 'createdAt',
                label: 'CreatedAt',
                type: 'date',
                option: {}
            }
        ],
        populate: {
            user: {
                path: 'user',
                select: 'name email phoneNumber',
            },
            fromUser: {
                path: 'fromUser'
            },
            toUser: {
                path: 'toUser'
            }
        }
    }
}

// if (populate.length > 1) {
//     var opt = []
//     Object.keys(options).map(key => {
//         obj = {}
//         obj[key] = options[key];
//         opt.push(obj)
//     })
//     options = opt;
//     populate.map(p => {

//         if (req.body.select && tableOptions.populate[p] !== '') {

//             var select = tableOptions.populate[p].select


//             if (tableOptions.populate[p].length > 0) {

//                 tableOptions.populate[p].map((pop, i) => {

//                     keys = Object.keys(pop)

//                     select = tableOptions.populate[p][i][keys[i]].select

//                     options.push({
//                         populate: {
//                             path: `${p}.${keys[i]}`,
//                             select: select,

//                         }
//                     })

//                 })

//                 return;

//             }

//             options.push({
//                 populate: {
//                     path: p,
//                     select: select
//                 }
//             })
//         }
//         else {

//             options.push({
//                 populate: {
//                     path: p
//                 }
//             })
//         }
//     })
// }
// else {

//     populate.map(p => {

//         if (req.body.select && tableOptions.populate[p] !== '') {

//             options.populate = {
//                 path: p,
//                 select: tableOptions.populate[p].select
//             }
//         }
//         else {

//             options.populate = {
//                 path: p
//             }
//         }

//     })
// }