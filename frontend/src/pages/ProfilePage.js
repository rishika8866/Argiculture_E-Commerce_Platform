// import React from "react";
// import { useSelector } from "react-redux";

// const ProfilePage = () => {
//   const user = useSelector((state) => state.auth.user);

//   if (!user) {
//     return (
//       <div style={{ padding: 40, textAlign: "center" }}>
//         <h2>Please log in to view your profile.</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//       <h2 className="mb-4">My Profile</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <tbody>
//           <tr>
//             <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
//               User ID
//             </th>
//             <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>{user.uid}</td>
//           </tr>
//           <tr>
//             <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
//               Name
//             </th>
//             <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>{user.name}</td>
//           </tr>
//           <tr>
//             <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
//               Email
//             </th>
//             <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>{user.email}</td>
//           </tr>
//           <tr>
//             <th style={{ textAlign: "left", padding: 8 }}>Role</th>
//             <td style={{ padding: 8 }}>{user.role || "Farmer"}</td>
//           </tr>
//           {/* Add other fields you have in user */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProfilePage;


///////////////////////////////////////
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2 className="mb-4">My Profile</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              User ID
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.uid || "-"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Name
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.uname || "Farmer"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Email
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.email || "-"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Contact No
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.contact_no || "-"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Account No
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.acc_no || "-"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Password
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.password ? "********" : "-"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Address
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.address || "-"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ccc" }}>
              Role
            </th>
            <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
              {user.rid?.rname || "Farmer"}
            </td>
          </tr>
          <tr>
            <th style={{ textAlign: "left", padding: 8 }}>
              City ID
            </th>
            <td style={{ padding: 8 }}>
              {user.city_id || "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
