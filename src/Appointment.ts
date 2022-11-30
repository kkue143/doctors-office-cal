export class Appointment {
    public id: number| null = null
    constructor (
    public  doctorId: number,
    public patientId: number | null, 
    public date: Date,
    public slot: number
    ) {}
}