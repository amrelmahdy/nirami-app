import { Image } from 'react-native';
import { IconMap } from './icons';


export const FONT_FAMILIES = {
  ALMARAI_BOLD: "Almarai-Bold",
  ALMARAI_EXTRA_BOLD: "Almarai-ExtraBold",
  ALMARAI_LIGHT: "Almarai-Light",
  ALMARAI_REGULAR: "Almarai-Regular"
}

export const Images: IconMap = {
  splash_logo: Image.resolveAssetSource(require('./images/splash/logo.png')),
  choose_lang_logo: Image.resolveAssetSource(require('./images/choose_lang/choose_lang_logo.png')),
  login_shape: Image.resolveAssetSource(require('./images/login/login_shape.png')),
  register_shape: Image.resolveAssetSource(require('./images/login/register_shape.png')),
  logo_eng_ar: Image.resolveAssetSource(require('./images/logo_eng_ar.png')),
  login_logo_nirami: Image.resolveAssetSource(require('./images/login/login_logo_nirami.png')),
  makeup_tab_bg: Image.resolveAssetSource(require('./images/makeup_tab_bg.png')),
  skin_care_tab_bg: Image.resolveAssetSource(require('./images/skin_care_tab_bg.png')),



  ic_cart: Image.resolveAssetSource(require('./icons/cart.png')),

  ic_close: Image.resolveAssetSource(require('./icons/close.png')),
  ic_lsicon_share_outline: Image.resolveAssetSource(require('./icons/lsicon_share-outline.png')),

  ic_ei_like: Image.resolveAssetSource(require('./icons/ei_like.png')),
  saudi_riyal_symbol: Image.resolveAssetSource(require('./icons/Saudi_Riyal_Symbol.png')),
  ic_weui_arrow_outlined: Image.resolveAssetSource(require('./icons/weui_arrow-outlined.png')),
  ic_weui_arrow_outlined_left_angle: Image.resolveAssetSource(require('./icons/weui_arrow_outlined_left_angle.png')),
  ic_mynaui_search: Image.resolveAssetSource(require('./icons/mynaui_search.png')),
  ic_mdi_light_heart: Image.resolveAssetSource(require('./icons/mdi-light_heart.png')),
  ic_icon_notifications_outline: Image.resolveAssetSource(require('./icons/ion_notifications-outline.png')),
  ic_ph_user_circle_light: Image.resolveAssetSource(require('./icons/bottom_bar/ph_user-circle-light.png')),
  ic_fluent_tag_regular: Image.resolveAssetSource(require('./icons/bottom_bar/fluent_tag_regular.png')),
  ic_N_Gray: Image.resolveAssetSource(require('./icons/bottom_bar/N-Gray.png')),
  ic_famicons_bag_outline: Image.resolveAssetSource(require('./icons/bottom_bar/famicons_bag-outline.png')),
  ic_search: Image.resolveAssetSource(require('./icons/bottom_bar/search.png')),
  ic_dashicons_whatsapp: Image.resolveAssetSource(require('./icons/otp/dashicons_whatsapp.png')),
  ic_material_symbols_sms_rounded: Image.resolveAssetSource(require('./icons/otp/material_symbols_sms_rounded.png')),
};
