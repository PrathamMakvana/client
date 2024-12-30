import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ClientsContext } from "../context/clientContext";

const schema = yup
  .object({
    clientName: yup.string().required("Client Name is required"),
    interactionType: yup
      .string()
      .oneOf(["Call", "Email", "Meeting"], "Invalid Interaction Type")
      .required("Interaction Type is required"),
    interactionDate: yup
      .date()
      .max(new Date(), "Interaction Date must not be in the future")
      .required("Interaction Date is required"),
    notes: yup.string().required("Notes are required"),
  })
  .required();

export default function ClientsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { addClientIntraction } = useContext(ClientsContext);

  const onSubmit = (data) => {
    addClientIntraction(data);
    reset();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Client Interaction Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-3">
          <label htmlFor="clientName" className="form-label">
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            placeholder="Enter Client Name"
            className={`form-control ${errors.clientName ? "is-invalid" : ""}`}
            {...register("clientName")}
          />
          <div className="invalid-feedback">{errors.clientName?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="interactionType" className="form-label">
            Interaction Type
          </label>
          <select
            id="interactionType"
            className={`form-control ${
              errors.interactionType ? "is-invalid" : ""
            }`}
            {...register("interactionType")}
          >
            <option value="">Select Interaction Type</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
          </select>
          <div className="invalid-feedback">
            {errors.interactionType?.message}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="interactionDate" className="form-label">
            Interaction Date
          </label>
          <input
            type="date"
            id="interactionDate"
            max={new Date().toISOString().split("T")[0]}
            className={`form-control ${
              errors.interactionDate ? "is-invalid" : ""
            }`}
            {...register("interactionDate")}
          />
          <div className="invalid-feedback">
            {errors.interactionDate?.message}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            id="notes"
            className={`form-control ${errors.notes ? "is-invalid" : ""}`}
            rows="4"
            {...register("notes")}
            placeholder="Notes..."
          ></textarea>
          <div className="invalid-feedback">{errors.notes?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
