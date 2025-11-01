const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDQzMjhmZTZmMWU2YjhjN2UyNTJiNyIsImlhdCI6MTc2MjAwMzY4NiwiZXhwIjoxNzYyNjA4NDg2fQ.TnTrCuGgg4TS73MYNxqkfDlbXoNh56UU7eWWXwo_t8M";


const secret = "61caeb395df51e307920d33d9a48f1bc26cf3a1f01719c5d309adbc05e30803b";

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token is valid!");
  console.log(decoded);
} catch (err) {
  console.error("❌ Token verification failed:", err.message);
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6Ik
// pXVCJ9.eyJpZCI6IjY5MDQzMjhmZTZ
// kMWU2YjhjN2UyNTJiNyIsImlhdCI6M
// Tc2MjAwMzY4NiwiZXhwIjoxNzYyNjA
// 4NDg2fQ.TnTrCuGgg4TS73MYNxqkfD
// lbXoNh56UU7eWWXwo_t8M