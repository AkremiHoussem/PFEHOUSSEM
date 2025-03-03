export interface Patient {
  id?: number;  // Optionnel car il n'est pas encore généré lors de la création
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // Correspond au backend
  address: string;
  dateOfBirth: string; // Doit être une `string` au format "YYYY-MM-DD"
  gender: string;
}
