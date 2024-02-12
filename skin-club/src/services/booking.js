import {BASE_URL} from "../env";
import axios from "axios";

const config = {
    headers: {
        'x-api-key': 'SKNCLUB159e6a8-3d8a-4a24-8d12-f2ac1e710906'
    }
}

export const getLocations = async () => {
    return axios.get(BASE_URL + '/locations', {});
}

export const getServices = async (location_id) => {
    return axios.post(BASE_URL + '/services', {location_id});
}

export const getDoctors = async (service_id) => {
    return axios.post(BASE_URL + '/doctors', {service_id});
}

export const getAppointment = async (serviceId, staffId, selectedDate) => {
    console.log(staffId);
    return axios.post(BASE_URL + '/available-slots', {staffId, selectedDate, serviceId});
}

export const bookAppointment = async (serviceId, staffId, fromTime, customerDetails, userInfo) => {
    return axios.post(BASE_URL + '/booking', {staffId, fromTime, customerDetails, serviceId, userInfo})
}

export const verifyOTP = (phoneNumber, code) => {
    return axios.post(BASE_URL + '/user/verify-otp', {phoneNumber, code});
}

export const login = (phoneNumber, email) => {
    return axios.post(BASE_URL + '/user/send-otp', {phoneNumber, email});
}

export const makePurchase = (sourceId, userEmail, staffId, fromTime, customerDetails, serviceId, userInfo) => {
    return axios.post(BASE_URL + '/payment/make-purchase', {sourceId, userEmail, staffId, fromTime, customerDetails, serviceId, userInfo});
}