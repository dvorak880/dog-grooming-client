export interface Appointment {
    appointmentId: number;
    userId: number;
    customerName: string;
    dogTypeName: string;
    price: number;
    durationMinutes: number;
    appointmentDateTime: string;
    createdAt: string;
    hasDiscount: boolean;
  }
  
  export interface CreateAppointmentRequest {
    groomingTypeId: number;
    appointmentDateTime: string;
  }