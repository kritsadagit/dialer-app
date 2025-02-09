import DeviceInfo from "react-native-device-info";

const isTablet = DeviceInfo.isTablet()

export const FONTSIZE_MED = isTablet ? 70 : 40;
export const FONTSIZE_LARGE = isTablet ? 80 : 50;

export const PRIMARY_COLOR = "#316E6A";
export const SECONDARY_COLOR = "#83A8A5";
export const DARK_COLOR = "#132C2A";

export const BGCOLOR = "#5A8B87";

export const LATO_LIGHT = "Lato-Light";
export const LATO_REGULAR= "Lato-Regular";