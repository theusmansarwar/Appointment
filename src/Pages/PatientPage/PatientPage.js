// PatientRecordPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [visits, setVisits] = useState([]);
  const [totalDues, setTotalDues] = useState(0);

  // 🟩 Dummy Data for One Patient Profile + Visits
  useEffect(() => {
    // simulate fetching based on id
    const dummyProfile = {
      _id: id,
      full_name: "John Doe",
      age: 35,
      gender: "Male",
      phone: "1234567890",
      email: "john@example.com",
      address: "123 Main St",
      city: "New York",
      blood_group: "O+",
      emergency_contact: {
        name: "Jane Doe",
        phone: "0987654321",
      },
      medical_history: "Diabetes",
    };

    const dummyVisits = [
      {
        _id: "v1",
        appointmentDate: "2025-09-20",
        appointmentTime: "10:30 AM",
        status: "Completed",
        reason: "General Checkup",
        prescription: [
          { name: "Paracetamol", quantity: 10, price: 5 },
          { name: "Vitamin C", quantity: 5, price: 3 },
        ],
        doctorFee: 50,
      },
      {
        _id: "v2",
        appointmentDate: "2025-08-15",
        appointmentTime: "2:00 PM",
        status: "Approved",
        reason: "Follow-up",
        prescription: [],
        doctorFee: 75,
      },
    ];

    // Calculate totals
    let total = 0;
    const visitsWithTotals = dummyVisits.map((v) => {
      const presTotal = v.prescription.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const totalVisit = presTotal + v.doctorFee;
      total += totalVisit;
      return { ...v, totalForThisVisit: totalVisit };
    });

    setProfile(dummyProfile);
    setVisits(visitsWithTotals);
    setTotalDues(total);
  }, [id]);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Patient Record: {profile.full_name}
      </h1>

      {/* Profile Info */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Blood Group:</strong> {profile.blood_group}</p>
        <p><strong>Medical History:</strong> {profile.medical_history}</p>
      </div>

      {/* Visits Table */}
      <h2 className="text-xl font-semibold mb-2">Past Visits</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Prescription</th>
            <th className="border p-2">Doctor Fee</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v._id} className="hover:bg-gray-50">
              <td className="border p-2">
                {new Date(v.appointmentDate).toLocaleDateString()}
              </td>
              <td className="border p-2">{v.appointmentTime}</td>
              <td className="border p-2">{v.status}</td>
              <td className="border p-2">{v.reason}</td>
              <td className="border p-2">
                {v.prescription.length > 0
                  ? v.prescription
                      .map((item) => `${item.name} x${item.quantity}`)
                      .join(", ")
                  : "No prescription"}
              </td>
              <td className="border p-2">{v.doctorFee}</td>
              <td className="border p-2">{v.totalForThisVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Dues */}
      <div className="mt-4 text-right font-bold text-lg">
        Total Dues: {totalDues}
      </div>
    </div>
  );
};

export default PatientPage;
