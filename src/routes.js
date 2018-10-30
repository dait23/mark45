import React from 'react';
import Loadable from 'react-loadable'

import FkppiLayout from './containers/FkppiLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Breadcrumbs = Loadable({
  loader: () => import('./views/Base/Breadcrumbs'),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import('./views/Base/Cards'),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import('./views/Base/Carousels'),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import('./views/Base/Collapses'),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import('./views/Base/Dropdowns'),
  loading: Loading,
});

const Forms = Loadable({
  loader: () => import('./views/Base/Forms'),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import('./views/Base/Jumbotrons'),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import('./views/Base/ListGroups'),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import('./views/Base/Navbars'),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import('./views/Base/Navs'),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import('./views/Base/Paginations'),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import('./views/Base/Popovers'),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import('./views/Base/ProgressBar'),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import('./views/Base/Switches'),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import('./views/Base/Tables'),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import('./views/Base/Tabs'),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import('./views/Base/Tooltips'),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import('./views/Buttons/BrandButtons'),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import('./views/Buttons/ButtonDropdowns'),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import('./views/Buttons/ButtonGroups'),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import('./views/Buttons/Buttons'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Fkppi/Dashboard'),
  loading: Loading,
});


const CoreUIIcons = Loadable({
  loader: () => import('./views/Icons/CoreUIIcons'),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import('./views/Icons/Flags'),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import('./views/Icons/FontAwesome'),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import('./views/Icons/SimpleLineIcons'),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import('./views/Notifications/Alerts'),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import('./views/Notifications/Badges'),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import('./views/Notifications/Modals'),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import('./views/Theme/Colors'),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import('./views/Theme/Typography'),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});


const FAQ = Loadable({
  loader: () => import('./views/Fkppi/FAQ/All'),
  loading: Loading,
});

const FAQAdd = Loadable({
  loader: () => import('./views/Fkppi/FAQ/New/'),
  loading: Loading,
});

const FAQEdit = Loadable({
  loader: () => import('./views/Fkppi/FAQ/Edit/'),
  loading: Loading,
});



const Kantor = Loadable({
  loader: () => import('./views/Fkppi/KantorF/All'),
  loading: Loading,
});

const KantorAdd = Loadable({
  loader: () => import('./views/Fkppi/KantorF/New/'),
  loading: Loading,
});

const KantorEdit = Loadable({
  loader: () => import('./views/Fkppi/KantorF/Edit/'),
  loading: Loading,
});



const News = Loadable({
  loader: () => import('./views/Fkppi/News/All'),
  loading: Loading,
});

const NewsAdd = Loadable({
  loader: () => import('./views/Fkppi/News/New/'),
  loading: Loading,
});

const NewsEdit = Loadable({
  loader: () => import('./views/Fkppi/News/Edit/'),
  loading: Loading,
});

const ProfileUpdate = Loadable({
  loader: () => import('./views/Fkppi/Profile/Update'),
  loading: Loading,
});

const Komunitas = Loadable({
  loader: () => import('./views/Fkppi/Komunitas/All'),
  loading: Loading,
});

const KomunitasEdit = Loadable({
  loader: () => import('./views/Fkppi/Komunitas/Edit'),
  loading: Loading,
});

const KomunitasNew = Loadable({
  loader: () => import('./views/Fkppi/Komunitas/New'),
  loading: Loading,
});


const Hirarki = Loadable({
  loader: () => import('./views/Fkppi/Hirarki/All'),
  loading: Loading,
});

const HirarkiAdd = Loadable({
  loader: () => import('./views/Fkppi/Hirarki/New'),
  loading: Loading,
});

const HirarkiEdit = Loadable({
  loader: () => import('./views/Fkppi/Hirarki/Edit/'),
  loading: Loading,
});


const Keanggotaan = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/All'),
  loading: Loading,
});

const KeanggotaanAdd = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/New/'),
  loading: Loading,
});

const KeanggotaanView = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/View/'),
  loading: Loading,
});

const KeanggotaanEdit = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/EditAnggota/'),
  loading: Loading,
});

const Verify = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/Verify/'),
  loading: Loading,
});

const Active = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/Active/'),
  loading: Loading,
});

const KeanggotaanActive = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/AllActive'),
  loading: Loading,
});

const KeanggotaanVerify = Loadable({
  loader: () => import('./views/Fkppi/Keanggotaan/AllVerify'),
  loading: Loading,
});

const Member = Loadable({
  loader: () => import('./views/Fkppi/Report/Member/'),
  loading: Loading,
});

const ReportAdmin = Loadable({
  loader: () => import('./views/Fkppi/Report/Admin'),
  loading: Loading,
});

const ReportNews = Loadable({
  loader: () => import('./views/Fkppi/Report/News/'),
  loading: Loading,
});

const ReportMessage = Loadable({
  loader: () => import('./views/Fkppi/Report/Message/'),
  loading: Loading,
});

const Pesan = Loadable({
  loader: () => import('./views/Fkppi/Pesan/All'),
  loading: Loading,
});

const PesanAdd = Loadable({
  loader: () => import('./views/Fkppi/Pesan/New/'),
  loading: Loading,
});

const PesanEdit = Loadable({
  loader: () => import('./views/Fkppi/Pesan/Edit/'),
  loading: Loading,
});

const Banner = Loadable({
  loader: () => import('./views/Fkppi/Banner/All'),
  loading: Loading,
});

const BannerAdd = Loadable({
  loader: () => import('./views/Fkppi/Banner/New/'),
  loading: Loading,
});

const BannerEdit = Loadable({
  loader: () => import('./views/Fkppi/Banner/Edit/'),
  loading: Loading,
});

const Upload = Loadable({
  loader: () => import('./views/Fkppi/Upload'),
  loading: Loading,
});

const Office = Loadable({
  loader: () => import('./views/Fkppi/Office/All'),
  loading: Loading,
});

const OfficeEdit = Loadable({
  loader: () => import('./views/Fkppi/Office/Edit'),
  loading: Loading,
});

const OfficeNew = Loadable({
  loader: () => import('./views/Fkppi/Office/New'),
  loading: Loading,
});




// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: FkppiLayout },
  { path: '*', exact: true, name: 'Home', component: FkppiLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/faq', exact: true, name: 'FAQ', component: FAQ },
  { path: '/faq/add', exact: true, name: 'FAQ ADD', component: FAQAdd },
  { path: '/faq/edit/:id', exact: true, name: 'FAQ Edit', component: FAQEdit },

  { path: '/berita', exact: true, name: 'News', component: News },
  { path: '/berita/add', exact: true, name: 'New', component: NewsAdd },
  { path: '/berita/edit/:id', exact: true, name: 'News Edit', component: NewsEdit },

  { path: '/kantorfkppi', exact: true, name: 'kantorfkppi', component: Kantor },
  { path: '/kantorfkppi/add', exact: true, name: 'kantorfkppi New', component: KantorAdd },
  { path: '/kantorfkppi/edit/:id', exact: true, name: 'kantorfkppiEdit', component: KantorEdit },

  { path: '/profile/update', exact: true, name: 'ProfileUpdate', component: ProfileUpdate },
  
  { path: '/hirarki', exact: true, name: 'Hirarki', component: Hirarki },
  { path: '/hirarki/add', exact: true, name: 'Hirarki', component: HirarkiAdd },

  { path: '/keanggotaan', exact: true, name: 'News', component: Keanggotaan },
  { path: '/keanggotaan/add', exact: true, name: 'New', component: KeanggotaanAdd },
  { path: '/keanggotaan/edit/:id', exact: true, name: 'Anggota Edit', component: KeanggotaanEdit },
  { path: '/keanggotaan/view/:id', exact: true, name: 'Anggota View', component: KeanggotaanView },
  { path: '/keanggotaan/verify/:id', exact: true, name: 'Verify', component: Verify },
  { path: '/keanggotaan/active/:id', exact: true, name: 'Active', component: Active },
  { path: '/keanggotaan/active', exact: true, name: 'Anggota Active', component: KeanggotaanActive },
  { path: '/keanggotaan/verify', exact: true, name: 'Anggota Verify', component: KeanggotaanVerify },
  { path: '/hirarki/edit/:id', exact: true, name: 'Hirarki Edit', component: HirarkiEdit },
  { path: '/pesan', exact: true, name: 'News', component: Pesan },
  { path: '/pesan/add', exact: true, name: 'New', component: PesanAdd },
  { path: '/pesan/edit/:id', exact: true, name: 'News Edit', component: PesanEdit },
  { path: '/banner', exact: true, name: 'News', component: Banner },
  { path: '/banner/add', exact: true, name: 'New', component: BannerAdd },
  { path: '/banner/edit/:id', exact: true, name: 'News Edit', component: BannerEdit },
  { path: '/komunitas', exact: true, name: 'Komunitas', component: Komunitas },
  { path: '/komunitas/add', exact: true, name: 'komunitas add', component: KomunitasNew },
  { path: '/komunitas/edit/:id', exact: true, name: 'komunitas Edit', component: KomunitasEdit },
  { path: '/office', exact: true, name: 'office', component: Office },
  { path: '/office/add', exact: true, name: 'office add', component: OfficeNew },
  { path: '/office/edit/:id', exact: true, name: 'office Edit', component: OfficeEdit },
  { path: '/upload', exact: true, name: 'Upload Dashboard', component: Upload },
  { path: '/report', exact: true, name: 'Report Member', component: Member },
  { path: '/report/admin', exact: true, name: 'Report Admin', component: ReportAdmin },
  { path: '/report/news', exact: true, name: 'Report News', component: ReportNews },
  { path: '/report/message', exact: true, name: 'Report Message', component: ReportMessage },
  
];

export default routes;
