import Redirect from "../pages/Redirect";
import Main from "../pages/Main";
import AboutUs from "../pages/AboutUs";
import Collections from "../pages/Collections";
import News from "../pages/News";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import { paths } from "./paths";
import Support from "../pages/Help";
import PublicOffer from "../pages/PublicOffer";
import Search from "../pages/Search";
import SingleCollection from "../pages/SingleCollection";
import SingleProduct from "../pages/SingleProduct";
import Auth from "../pages/Auth";
import Orders from "../pages/Orders";

export const appRoutes = [
    {
        id: 1,
        index: true,
        element: <Main />,
        path: paths.MAIN,
    },
    {
        id: 2,
        element: <Redirect />,
        path: paths.REDIRECT,
    },
    {
        id: 3,
        element: <AboutUs />,
        path: paths.ABOUT_US,
    },
    {
        id: 4,
        element: <Collections />,
        path: paths.COLLECTIONS,
    },
    {
        id: 5,
        element: <News />,
        path: paths.NEWS,
    },
    {
        id: 6,
        element: <Search />,
        path: paths.SEARCH,
    },
    {
        id: 7,
        element: <Cart />,
        path: paths.CART,
    },
    {
        id: 8,
        element: <Wishlist />,
        path: paths.WISHLIST,
    },
    {
        id: 9,
        element: <Support />,
        path: paths.HELP,
    },
    {
        id: 10,
        element: <PublicOffer />,
        path: paths.PUBLIC_OFFER,
    },
    {
        id: 11,
        element: <SingleCollection />,
        path: paths.SINGLE_COLLECTION,
    },
    {
        id: 12,
        element: <SingleProduct />,
        path: paths.SINGLE_PRODUCT,
    },
    {
        id: 13,
        element: <Auth />,
        path: paths.AUTH,
    },
    {
        id: 14,
        element: <Orders />,
        path: paths.ORDERS,
    }
];
