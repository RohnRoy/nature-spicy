
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "spices", label: "Spices" },
      { id: "dryfruits", label: "Dry Fruits" },
      { id: "coffee", label: "Coffee & Tea" },
      { id: "specials", label: "Idukki Specials" },
      { id: "powders", label: "Masala Powders" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "naturespicy", label: "Nature Spicy Originals" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "spices",
    label: "Spices",
    path: "/shop/listing",
  },
  {
    id: "dryfruits",
    label: "Dry Fruits",
    path: "/shop/listing",
  },
  {
    id: "coffee",
    label: "Coffee & Tea",
    path: "/shop/listing",
  },
  {
    id: "specials",
    label: "Idukki Specials",
    path: "/shop/listing",
  },
  {
    id: "powders",
    label: "Powders",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  spices: "Spices",
  dryfruits: "Dry Fruits",
  coffee: "Coffee & Tea",
  specials: "Idukki Specials",
  powders: "Masala Powders",
};

export const brandOptionsMap = {
  naturespicy: "Nature Spicy Originals",

};

export const filterOptions = {
  category: [
    { id: "spices", label: "Spices" },
    { id: "dryfruits", label: "Dry Fruits" },
    { id: "coffee", label: "Coffee & Tea" },
    { id: "specials", label: "Idukki Specials" },
    { id: "powders", label: "Masala Powders" },
  ],
  brand: [
    { id: "naturespicy", label: "Nature Spicy Originals" },
 
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes for delivery",
  },
];
