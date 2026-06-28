import axiosInstance from "./axiosInstance";
import type {
  Appointment,
  CreateAppointmentRequest,
} from "../types/appointment";

export const appointmentService = {
    getAppointments: async (
        customerName?: string,
        fromDate?: string,
        toDate?: string
      ): Promise<Appointment[]> => {
        const response = await axiosInstance.get("/Appointments", {
          params: {
            customerName: customerName || undefined,
            fromDate: fromDate || undefined,
            toDate: toDate || undefined,
          },
        });
      
        return response.data;
      },

  createAppointment: async (
    data: CreateAppointmentRequest
  ): Promise<void> => {
    await axiosInstance.post("/Appointments", data);
  },

  updateAppointment: async (
    id: number,
    data: CreateAppointmentRequest
  ): Promise<void> => {
    await axiosInstance.put(`/Appointments/${id}`, data);
  },

  deleteAppointment: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/Appointments/${id}`);
  },
};

