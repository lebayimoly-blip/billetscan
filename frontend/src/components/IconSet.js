// src/components/IconSet.js
// 🎨 Centralisation des icônes utilisées dans l'application

// Font Awesome
import { FaPlusCircle, FaChartBar, FaFilePdf, FaSignOutAlt } from 'react-icons/fa';

// Material Design
import { MdQrCodeScanner, MdDashboard, MdHistory, MdAddBox } from 'react-icons/md';

// Bootstrap
import { BsCalendarDate } from 'react-icons/bs';

// Remix Icons
import { RiFileAddLine } from 'react-icons/ri';

export const Icons = {
  scan: MdQrCodeScanner,
  dashboard: MdDashboard,
  history: MdHistory,
  addBillet: FaPlusCircle,
  stats: FaChartBar,
  exportPDF: FaFilePdf,
  logout: FaSignOutAlt,
  calendar: BsCalendarDate,
  ajouterFichier: RiFileAddLine,
};
