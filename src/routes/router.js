import Dashboard from "../pages/dasboard/Dashboard";
import FarmGoatList from "../pages/farm list goat wise/FarmGoatList";
import FarmInfo from "../pages/farm info/FarmInfo";
import Login from "../pages/login/Login";
import CreateFarm from "../pages/create farm/CreateFarm";
import AuthenticatedRoute from "../components/wrapper/AuthenticatedRoute";
import PageNotFound from "../pages/error 404/PageNotFound";
import PageInfoProvider from "../contexts/PageInfoContext";
import GoatInfo from "../pages/goat info/GoatInfo";
import FarmList from "../pages/farm list/FarmList";
import DeviceList from "../pages/device/DeviceList";




export const loginroutes = [
    // {
    //     path: "/forgetpassword",
    //     component: <ForgetPassword />,
    //     title: "Acgromalin | Forget Password",
    // },
    // {
    //     path: "/mailconfirmation",
    //     component: <CheckYourMail />,
    //     title: "Acgromalin | Check your mail",
    // },
];


{/* <Route index element={<FarmList />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="farm" element={<FarmList />} />
<Route path="farm/:farmid" element={<FarmInfo />} />
<Route path="farm/:farmid/:goatid" element={<GoatInfo />} />
<Route path="farm/create" element={<CreateFarm />} />
<Route path="goat" element={<FarmGoatList />} />
<Route path="device" element={<DeviceList />} /> */}

export const authenticatedroutes = [
    {
        path: "/dashboard",
        component: <Dashboard />,
        title: "Acgromalin | Dashboard",
    },
    {
        path: "/farm",
        component: <FarmList />,
        title: "Acgromalin | Farm List",
    },
    {
        path: "/farm/:farmid",
        component: <FarmInfo />,
        title: "Acgromalin | Farm Info",
    },
    {
        path: "/farm/:farmid/:goatid",
        component: <GoatInfo />,
        title: "Acgromalin | Goat Info",
    },
    {
        path: "farm/create",
        component: <CreateFarm />,
        title: "Acgromalin | Create Farm",
    },
    {
        path: "/goat",
        component: <FarmGoatList />,
        title: "Acgromalin | Farm Goat List",
    },
    {
        path: "/device",
        component: <DeviceList />,
        title: "Acgromalin | Device List",
    }
];
