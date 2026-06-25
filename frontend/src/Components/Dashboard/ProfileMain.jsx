import useHeaderData from "../../Hooks/useHeaderData";
import Modal from "../Modal";
import ChangePasswordForm from "./Forms/ChangePasswordForm";
import ImageUploader from "../Profile/ImageUploader";
import userDefaultImage from "../../assets/Images/user.png";

// ── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%] truncate">
        {value || "—"}
      </span>
    </div>
  );
}

export default function ProfileMain() {
  const { userInfo } = useHeaderData();

  const initials = `${userInfo?.firstname?.[0] ?? ""}${userInfo?.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-5">

        {/* ── Profile hero card ───────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-700" />

          {/* Avatar + name */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                {userInfo?.profilePicx ? (
                  <img
                    src={userInfo.profilePicx}
                    alt="avatar"
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl border-4 border-white shadow-lg">
                    {initials || "?"}
                  </div>
                )}
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                userInfo?.role === "ADMIN"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {userInfo?.role ?? "USER"}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-gray-900">
              {userInfo?.firstname} {userInfo?.lastname}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">{userInfo?.email}</p>
          </div>
        </div>

        {/* ── Account details ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-1">
            Account Details
          </h3>
          <InfoRow label="First Name"   value={userInfo?.firstname}  />
          <InfoRow label="Last Name"    value={userInfo?.lastname}   />
          <InfoRow label="Email"        value={userInfo?.email}      />
          <InfoRow label="Customer ID"  value={userInfo?.customerId} />
          <InfoRow label="Role"         value={userInfo?.role}       />
        </div>

        {/* ── Actions ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
            Account Actions
          </h3>

          {/* Change password */}
          <Modal
            caption="Change Password"
            captionButton={true}
            modalContent={<ChangePasswordForm />}
          />

          {/* Upload photo — rendered inline (has its own button) */}
          <div className="pt-1">
            <ImageUploader user={userInfo} />
          </div>
        </div>

      </div>
    </div>
  );
}
