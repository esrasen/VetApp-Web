import API_BASE_URL from './config';


export const ANIMAL_API = {
    GET_ALL: `${API_BASE_URL}/animals`,
    GET_BY_ID: (id) => `${API_BASE_URL}/animals/${id}`,
    SEARCH_BY_NAME: (name, pageNumber, pageSize) => `${API_BASE_URL}/animals/searchByName?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    SEARCH_BY_CUSTOMER: (customerName, pageNumber, pageSize) => `${API_BASE_URL}/animals/searchByCustomer?customerName=${customerName}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    CREATE: `${API_BASE_URL}/animals`,
    UPDATE: (id) => `${API_BASE_URL}/animals/${id}`,
    DELETE: (id) => `${API_BASE_URL}/animals/${id}`,
  };

export const CUSTOMER_API = {
    GET_ALL: `${API_BASE_URL}/customers`,
    GET_BY_ID: (id) => `${API_BASE_URL}/customers/${id}`,
    SEARCH_BY_NAME: (name, pageNumber, pageSize) => `${API_BASE_URL}/customers/searchByName?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    CREATE: `${API_BASE_URL}/customers`,
    UPDATE: (id) => `${API_BASE_URL}/customers/${id}`,
    DELETE: (id) => `${API_BASE_URL}/customers/${id}`,
  };

  export const DOCTOR_API = {
    GET_ALL: `${API_BASE_URL}/doctors`,
    GET_BY_ID: (id) => `${API_BASE_URL}/doctors/${id}`,
    CREATE: `${API_BASE_URL}/doctors`,
    UPDATE: (id) => `${API_BASE_URL}/doctors/${id}`,
    DELETE: (id) => `${API_BASE_URL}/doctors/${id}`,
    GET_WORK_DAYS: (doctorId, pageNumber, pageSize) => `${API_BASE_URL}/available-dates?doctorId=${doctorId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    CREATE_WORK_DAY: `${API_BASE_URL}/available-dates`,
    UPDATE_WORK_DAY: (id) => `${API_BASE_URL}/available-dates/${id}`,
    DELETE_WORK_DAY: (id) => `${API_BASE_URL}/available-dates/${id}`,
  };
  export const VACCINATION_API = {
    GET_ALL: `${API_BASE_URL}/vaccinations`,
    GET_BY_ID: (id) => `${API_BASE_URL}/vaccinations/${id}`,
    CREATE: `${API_BASE_URL}/vaccinations`,
    UPDATE: (id) => `${API_BASE_URL}/vaccinations/${id}`,
    DELETE: (id) => `${API_BASE_URL}/vaccinations/${id}`,
    SEARCH_BY_ANIMAL: (id, pageNumber, pageSize) => `${API_BASE_URL}/vaccinations/searchByName?id=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    SEARCH_BY_RANGE: (startDate, endDate, pageNumber, pageSize) => `${API_BASE_URL}/vaccinations/searchByVaccinationRange?startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  };

  export const REPORT_API = {
    GET_ALL: `${API_BASE_URL}/reports`,
    GET_BY_ID: (id) => `${API_BASE_URL}/reports/${id}`,
    CREATE: `${API_BASE_URL}/reports`,
    UPDATE: (id) => `${API_BASE_URL}/reports/${id}`,
    DELETE: (id) => `${API_BASE_URL}/reports/${id}`,
    DOWNLOAD_PDF: (id) => `${API_BASE_URL}/reports/${id}/pdf`
  };

  export const APPOINTMENT_API = {
    GET_ALL: `${API_BASE_URL}/appointments`,
    GET_BY_ID: (id) => `${API_BASE_URL}/appointments/${id}`,
    CREATE: `${API_BASE_URL}/appointments`,
    UPDATE: (id) => `${API_BASE_URL}/appointments/${id}`,
    DELETE: (id) => `${API_BASE_URL}/appointments/${id}`,
    SEARCH_BY_DOCTOR_AND_DATE: (id, startDate, endDate, pageNumber, pageSize) => `${API_BASE_URL}/appointments/searchByDoctorAndDateRange?id=${id}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    SEARCH_BY_ANIMAL_AND_DATE: (id, startDate, endDate, pageNumber, pageSize) => `${API_BASE_URL}/appointments/searchByAnimalAndDateRange?id=${id}&startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  };