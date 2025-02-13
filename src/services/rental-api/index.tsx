import { axiosInstance, BASE_URL } from "./axios"; 
import { BannerApi } from "./generated"
import { BookingApi } from "./generated"
import { CarRentalApi } from "./generated"
import { CouponApi } from "./generated"
import { DropdownApi } from "./generated"
import { LoginApi } from "./generated"
import { MpayPaymentApi } from "./generated"
import { PackageApi } from "./generated"
import { PackageItemApi } from "./generated"
import { PromotionApi } from "./generated"
import { RegisterApi } from "./generated"
import { SettingApi } from "./generated"
import { WebSiteApi } from "./generated"

export const bannerApi = new BannerApi( undefined, BASE_URL, axiosInstance )
export const bookingApi = new BookingApi( undefined, BASE_URL, axiosInstance )
export const carRentalApi = new CarRentalApi( undefined, BASE_URL, axiosInstance )
export const couponApi = new CouponApi( undefined, BASE_URL, axiosInstance )
export const dropdownApi = new DropdownApi( undefined, BASE_URL, axiosInstance )
export const loginApi = new LoginApi( undefined, BASE_URL, axiosInstance )
export const mpayPaymentApi = new MpayPaymentApi( undefined, BASE_URL, axiosInstance )
export const packageApi = new PackageApi( undefined, BASE_URL, axiosInstance )
export const packageItemApi = new PackageItemApi( undefined, BASE_URL, axiosInstance )
export const promotionApi = new PromotionApi( undefined, BASE_URL, axiosInstance )
export const registerApi = new RegisterApi( undefined, BASE_URL, axiosInstance )
export const settingApi = new SettingApi( undefined, BASE_URL, axiosInstance )
export const webSiteApi = new WebSiteApi( undefined, BASE_URL, axiosInstance )