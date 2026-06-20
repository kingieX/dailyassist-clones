

import { useState } from "react";
import { X, Phone, Mail, Car, GraduationCap, MapPin, Check } from "lucide-react";

// ── Visits circle ─────────────────────────────────────────────────────────────
function VisitsCircle({ value }) {
  return (
    <div className="flex justify-center items-center py-3">
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center shadow-sm"
        style={{ backgroundColor: "#f5c045" }}
      >
        <span className="text-4xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
}

// ── Mileage circle ────────────────────────────────────────────────────────────
function MileageCircle({ miles }) {
  return (
    <div className="flex justify-center items-center py-3">
      <div
        className="w-32 h-32 rounded-full flex flex-col items-center justify-center
                   text-center px-3 shadow-sm"
        style={{ backgroundColor: "#60a5fa" }}
      >
        <span className="text-lg font-bold text-white leading-tight">
          {miles} Miles
        </span>
        <span className="text-sm font-semibold text-white opacity-90">
          Covered
        </span>
      </div>
    </div>
  );
}

// ── Pill bar chart (switchable) ───────────────────────────────────────────────
function PillBarChart({ weeklyMiles = [], monthlyMiles = [], yearlyMiles = [] }) {
  const [view, setView]         = useState("week");
  const [dropOpen, setDropOpen] = useState(false);

  const datasets = {
    week: {
      label: "This week",
      bars: weeklyMiles.map((d) => ({
        label: d.label ?? d.day ?? "",
        value: Number(d.value ?? d.miles ?? 0),
      })),
    },
    month: {
      label: "This month",
      bars: monthlyMiles.map((d) => ({
        label: d.label ?? "",
        value: Number(d.value ?? d.miles ?? 0),
      })),
    },
    year: {
      label: "This year",
      bars: yearlyMiles.map((d) => ({
        label: d.label ?? "",
        value: Number(d.value ?? d.miles ?? 0),
      })),
    },
  };

  const current  = datasets[view];
  const maxScale = 200;
  const CHART_H  = 130;
  const yLabels  = ["200+", "150", "100", "50", "0"];
  const isYear   = view === "year";

  return (
    <div>
      {/* Header with dropdown */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-800">Miles Covered</p>
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-1.5 text-xs text-gray-600
                       border border-gray-200 rounded-lg px-3 py-1.5
                       hover:bg-gray-50 transition-colors bg-white"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            {current.label}
            <svg
              className="w-3 h-3 ml-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropOpen && (
            <div
              className="absolute right-0 top-8 bg-white border border-gray-200
                          rounded-xl shadow-lg z-20 overflow-hidden w-32"
            >
              {Object.entries(datasets).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => { setView(key); setDropOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-medium
                              transition-colors hover:bg-[#fef9ec]
                              ${view === key
                                ? "bg-[#fef9ec] text-[#e7b343]"
                                : "text-gray-600"
                              }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="flex gap-1 w-full" style={{ height: `${CHART_H + 24}px` }}>

        {/* Y-axis */}
        <div
          className="flex flex-col justify-between text-right flex-shrink-0 pr-1"
          style={{ height: `${CHART_H}px` }}
        >
          {yLabels.map((l) => (
            <span key={l} className="text-[9px] text-gray-400 leading-none">{l}</span>
          ))}
        </div>

        {/* Bars */}
        <div
          className={`flex items-end flex-1 ${isYear ? "gap-0.5" : "gap-2"}`}
          style={{ height: `${CHART_H + 24}px` }}
        >
          {current.bars.map((d) => {
            const isEmpty = d.value === 0;
            const barH    = isEmpty
              ? 4
              : Math.max(Math.round((d.value / maxScale) * CHART_H), 10);

            return (
              <div
                key={d.label}
                className="flex flex-col items-center justify-end flex-1"
                style={{ height: `${CHART_H + 24}px` }}
              >
                {/* Value bubble above bar */}
                <div className="flex-1 flex items-end justify-center w-full">
                  {!isEmpty && (
                    <div
                      className="flex items-center justify-center rounded-full
                                 font-bold text-gray-800 mb-0.5 border border-amber-300
                                 bg-white shadow-sm"
                      style={{ width: "18px", height: "18px", fontSize: "8px" }}
                    >
                      {d.value}
                    </div>
                  )}
                </div>

                {/* Pill bar */}
                <div
                  className="w-full"
                  style={{
                    height: `${barH}px`,
                    background: isEmpty
                      ? "#e5e7eb"
                      : "linear-gradient(to bottom, #93c5fd 0%, #bfdbfe 35%, #fde68a 70%, #f5c045 100%)",
                    borderRadius: "999px",
                    minHeight: isEmpty ? "3px" : "10px",
                  }}
                />

                {/* Label */}
                <span
                  className={`text-gray-400 uppercase mt-1 leading-none
                              ${isYear ? "text-[7px]" : "text-[9px]"}`}
                >
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function StaffInfoModal({ isOpen, onClose, staff = {} }) {
  const [photoOpen, setPhotoOpen] = useState(false);

  if (!isOpen) return null;

  const isAvailable = staff.status === "available";
  const ownsVehicle = staff.vehicle === "Yes, owns a vehicle";

  const totalVisits      = staff.totalVisits      ?? 0;
  const percentileBetter = staff.percentileBetter ?? 0;
  const totalMileage     = staff.totalMileage     ?? 0;
  const mileageMonth     = staff.mileageMonth     ?? "February";
  const milesCovered     = staff.milesCovered     ?? staff.totalMileage ?? 0;
  const weeklyMiles      = staff.weeklyMiles      ?? [];
  const monthlyMiles     = staff.monthlyMiles     ?? [];
  const yearlyMiles      = staff.yearlyMiles      ?? [];

  return (
    <>
      <div
        className="fixed inset-0 z-[70] flex items-start justify-center
                   bg-black/40 px-3 py-6 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-auto
                     flex flex-col my-2"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Top: ID + close ── */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="w-6" />
            <span className="text-sm font-semibold text-gray-600 tracking-wide">
              {staff.id}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full
                         hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* ── Avatar ── */}
          <div className="flex flex-col items-center px-6 pb-4">
            {staff.photo ? (
              <img
                src={staff.photo}
                alt={staff.name}
                className="w-36 h-36 rounded-full object-cover shadow-md
                           cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setPhotoOpen(true)}
              />
            ) : (
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center
                           text-3xl font-bold text-gray-700 shadow-md bg-amber-200"
              >
                {staff.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            )}

            <span
              className={`mt-3 text-xs font-semibold px-4 py-1 rounded-full border
                          ${isAvailable
                            ? "border-green-400 text-green-600 bg-green-50"
                            : "border-red-300 text-red-500 bg-red-50"
                          }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>

            <p className="mt-2 text-lg font-bold text-gray-900 text-center">
              {staff.name}
            </p>
            <p className="text-sm text-gray-500 text-center">
              {staff.role ?? "Home-Help & Support Assistant"}
            </p>

            <div className="flex flex-col gap-1.5 mt-3 w-full items-center">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Car className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Owns a car</span>
                {ownsVehicle && <Check className="w-4 h-4 text-green-500 stroke-[3]" />}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <GraduationCap className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Training up to date</span>
                <Check className="w-4 h-4 text-green-500 stroke-[3]" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>
                  Miles covered:{" "}
                  <strong className="text-gray-900">{milesCovered} miles</strong>
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 mx-5" />

          {/* ── Contact ── */}
          <div className="flex flex-col items-center gap-2.5 px-6 py-5">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{staff.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="truncate max-w-[220px]">{staff.email}</span>
            </div>
            <button
              className="w-full mt-1 py-3.5 rounded-xl font-semibold text-sm
                         text-gray-900 transition-colors hover:opacity-90
                         active:scale-[0.98]"
              style={{ backgroundColor: "#f5c045" }}
              onClick={() => console.log("Message", staff.name)}
            >
              Send a Message
            </button>
          </div>

          <hr className="border-gray-100 mx-5" />

          {/* ── Charts ── */}
          <div className="px-5 py-5 flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-3">
              {/* Total Visits */}
              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col">
                <p className="text-xs font-bold text-gray-800">Total Visits</p>
                <VisitsCircle value={totalVisits} />
                <p className="text-xs text-gray-500 leading-snug">
                  Better than{" "}
                  <span className="font-bold text-gray-800">{percentileBetter}%</span>{" "}
                  employees
                </p>
              </div>

              {/* Total Mileage */}
              <div className="border border-gray-100 rounded-2xl p-4 flex flex-col">
                <p className="text-xs font-bold text-gray-800">Total Mileage</p>
                <MileageCircle miles={totalMileage} />
                <p className="text-xs font-semibold text-gray-700 mt-1">
                  {mileageMonth}
                </p>
              </div>
            </div>

            {/* Miles Covered switchable chart */}
            <div className="border border-gray-100 rounded-2xl p-4">
              <PillBarChart
                weeklyMiles={weeklyMiles}
                monthlyMiles={monthlyMiles}
                yearlyMiles={yearlyMiles}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Full photo viewer ── */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50"
          onClick={() => setPhotoOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-4 relative"
            style={{ width: "320px", height: "320px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPhotoOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center
                         justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}