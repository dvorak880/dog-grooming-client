import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
  Snackbar,
Alert,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Appointment } from "../types/appointment";
import { appointmentService } from "../services/appointmentService";
import {
    MenuItem,
    DialogActions,
  } from "@mui/material";
  import axios from "axios";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);
  const [editGroomingTypeId, setEditGroomingTypeId] = useState("");
  const [editAppointmentDateTime, setEditAppointmentDateTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
const [addOpen, setAddOpen] = useState(false);
const [groomingTypeId, setGroomingTypeId] = useState("");
const [appointmentDateTime, setAppointmentDateTime] = useState("");
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState<"success" | "error">("success");
const currentUserId = Number(localStorage.getItem("userId"));

const loadAppointments = async () => {
    const data = await appointmentService.getAppointments(
      customerName,
      fromDate,
      toDate
    );
  
    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);
  const handleDelete = async (id: number) => {
    try {
      await appointmentService.deleteAppointment(id);
      await loadAppointments();
  
      setMessageType("success");
      setMessage("התור נמחק בהצלחה");
    } catch (error) {
      console.error(error);
  
      setMessageType("error");
  
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data ?? "לא ניתן למחוק את התור");
      } else {
        setMessage("לא ניתן למחוק את התור");
      }
    }
  };

  const handleCreate = async () => {
    try {
      await appointmentService.createAppointment({
        groomingTypeId: Number(groomingTypeId),
        appointmentDateTime,
      });
  
      setAddOpen(false);
      setGroomingTypeId("");
      setAppointmentDateTime("");
      await loadAppointments();
      setMessageType("success");
setMessage("הפעולה בוצעה בהצלחה");
    } catch (error) {
      console.error(error);
      alert("לא ניתן להוסיף את התור");
    }
  };
  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointmentId(appointment.appointmentId);
    setEditAppointmentDateTime(appointment.appointmentDateTime.slice(0, 16));
  
    if (appointment.dogTypeName.includes("קטן")) {
      setEditGroomingTypeId("1");
    } else if (appointment.dogTypeName.includes("בינוני")) {
      setEditGroomingTypeId("2");
    } else if (appointment.dogTypeName.includes("גדול")) {
      setEditGroomingTypeId("3");
    }
  
    setEditOpen(true);
  };
  
  const handleUpdate = async () => {
    if (!editingAppointmentId) return;
  
    try {
      await appointmentService.updateAppointment(editingAppointmentId, {
        groomingTypeId: Number(editGroomingTypeId),
        appointmentDateTime: editAppointmentDateTime,
      });
  
      setEditOpen(false);
      setEditingAppointmentId(null);
      setEditGroomingTypeId("");
      setEditAppointmentDateTime("");
      await loadAppointments();
      setMessageType("success");
setMessage("הפעולה בוצעה בהצלחה");
    } catch (error) {
      console.error(error);
      alert("לא ניתן לעדכן את התור");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        direction: "rtl",
        background:
          "linear-gradient(135deg, #f7efe5 0%, #f4d7b8 45%, #d7ecff 100%)",
        p: { xs: 2, md: 5 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Card
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
            mb: 4,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #6d4c41, #a1887f)",
              color: "white",
              textAlign: "center",
              py: 4,
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <PetsIcon sx={{ fontSize: 42 }} />
            </Box>
            <Typography
  sx={{
    opacity: 0.9,
    mt: 1,
  }}
>
  שלום {localStorage.getItem("firstName")}
</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              תורים למספרה
            </Typography>

            <Typography sx={{ opacity: 0.9, mt: 1 }}>
              רשימת הלקוחות הממתינים לתספורת
            </Typography>
          </Box>
<Button
  variant="contained"
  onClick={() => setAddOpen(true)}
  sx={{
    mb: 3,
    mt:3,
    borderRadius: 3,
    fontWeight: 700,
    background: "linear-gradient(135deg, #6d4c41, #8d6e63)",
  }}
>
  הוספת תור חדש
</Button>
          <CardContent sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.96)" }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ mb: 3 }}
            >
              <TextField
                fullWidth
                label="חיפוש לפי שם לקוח"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <TextField
                fullWidth
                label="מתאריך"
                type="date"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />

              <TextField
                fullWidth
                label="עד תאריך"
                type="date"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <Button
  variant="contained"
  onClick={loadAppointments}
  sx={{
    borderRadius: 3,
    fontWeight: 700,
    background: "linear-gradient(135deg, #6d4c41, #8d6e63)",
  }}
>
  חיפוש
</Button>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {appointments.length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", py: 5 }}
              >
                אין תורים להצגה
              </Typography>
            ) : (
              <Stack spacing={2}>
                {appointments.map((appointment) => (
                  <Card
                    key={appointment.appointmentId}
                    onClick={() => setSelected(appointment)}
                    sx={{
                      borderRadius: 4,
                      cursor: "pointer",
                      transition: "0.2s",
                      border: "1px solid #eee",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent>
                      <Stack
                        spacing={2}
                        sx={{
                          flexDirection: {
                            xs: "column",
                            md: "row",
                          },
                          justifyContent: "space-between",
                          alignItems: {
                            xs: "flex-start",
                            md: "center",
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {appointment.customerName}
                          </Typography>

                          <Typography color="text.secondary">
                            {appointment.dogTypeName} ·{" "}
                            {new Date(
                              appointment.appointmentDateTime
                            ).toLocaleString("he-IL")}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={`${appointment.durationMinutes} דקות`}
                            color="primary"
                            variant="outlined"
                          />

                          <Chip label={`₪${appointment.price}`} color="success" />

                          {appointment.hasDiscount && (
                            <Chip label="10% הנחה" color="warning" />
                          )}
                        </Stack>

                        {appointment.userId === currentUserId && (
  <Stack direction="row" spacing={1}>
    <Button
      variant="outlined"
      startIcon={<EditIcon />}
      onClick={(e) => {
        e.stopPropagation();
        openEditDialog(appointment);
      }}
    >
      ערוך
    </Button>

    <Button
      color="error"
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(appointment.appointmentId);
      }}
    >
      מחק
    </Button>
  </Stack>
)}
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
        dir="rtl"
      >
        <DialogTitle sx={{ fontWeight: 800 }}>פרטי התור</DialogTitle>

        <DialogContent>
          {selected && (
            <Stack spacing={1.5} sx={{ pt: 1 }}>
              <Typography>שם לקוח: {selected.customerName}</Typography>
              <Typography>סוג כלב: {selected.dogTypeName}</Typography>
              <Typography>מחיר: ₪{selected.price}</Typography>
              <Typography>זמן טיפול: {selected.durationMinutes} דקות</Typography>
              <Typography>
                זמן הגעה:{" "}
                {new Date(selected.appointmentDateTime).toLocaleString("he-IL")}
              </Typography>
              <Typography>
                נוצר בתאריך:{" "}
                {new Date(selected.createdAt).toLocaleString("he-IL")}
              </Typography>

              {selected.hasDiscount && (
                <Typography sx={{ color: "success.main", fontWeight: 700 }}>
                  הלקוח זכאי ל־10% הנחה
                </Typography>
              )}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
  open={addOpen}
  onClose={() => setAddOpen(false)}
  fullWidth
  maxWidth="sm"
  dir="rtl"
>
  <DialogTitle sx={{ fontWeight: 800 }}>הוספת תור חדש</DialogTitle>

  <DialogContent>
    <Stack spacing={2} sx={{ pt: 1 }}>
      <TextField
        select
        fullWidth
        label="סוג תספורת"
        value={groomingTypeId}
        onChange={(e) => setGroomingTypeId(e.target.value)}
      >
        <MenuItem value="1">כלב קטן - 30 דקות - ₪100</MenuItem>
        <MenuItem value="2">כלב בינוני - 45 דקות - ₪150</MenuItem>
        <MenuItem value="3">כלב גדול - 60 דקות - ₪200</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="זמן הגעה"
        type="datetime-local"
        value={appointmentDateTime}
        onChange={(e) => setAppointmentDateTime(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
    </Stack>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button onClick={() => setAddOpen(false)}>ביטול</Button>

    <Button
      variant="contained"
      onClick={handleCreate}
      disabled={!groomingTypeId || !appointmentDateTime}
    >
      שמירה
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={editOpen}
  onClose={() => setEditOpen(false)}
  fullWidth
  maxWidth="sm"
  dir="rtl"
>
  <DialogTitle sx={{ fontWeight: 800 }}>עריכת תור</DialogTitle>

  <DialogContent>
    <Stack spacing={2} sx={{ pt: 1 }}>
      <TextField
        select
        fullWidth
        label="סוג תספורת"
        value={editGroomingTypeId}
        onChange={(e) => setEditGroomingTypeId(e.target.value)}
      >
        <MenuItem value="1">כלב קטן - 30 דקות - ₪100</MenuItem>
        <MenuItem value="2">כלב בינוני - 45 דקות - ₪150</MenuItem>
        <MenuItem value="3">כלב גדול - 60 דקות - ₪200</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="זמן הגעה"
        type="datetime-local"
        value={editAppointmentDateTime}
        onChange={(e) => setEditAppointmentDateTime(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
    </Stack>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button onClick={() => setEditOpen(false)}>ביטול</Button>

    <Button
      variant="contained"
      onClick={handleUpdate}
      disabled={!editGroomingTypeId || !editAppointmentDateTime}
    >
      שמירת שינויים
    </Button>
  </DialogActions>
</Dialog>
<Snackbar
  open={!!message}
  autoHideDuration={3000}
  onClose={() => setMessage("")}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert
    severity={messageType}
    onClose={() => setMessage("")}
    sx={{ width: "100%" }}
  >
    {message}
  </Alert>
</Snackbar>
    </Box>
  );
}